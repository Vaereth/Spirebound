/* =====================================================================
   useLorePagination — TRUE measurement-based pagination.

   Estimates were the bug: pages silently scrolled when the guess was wrong.
   Instead we render each semantic block into a hidden probe sized exactly
   like a real page column, measure its real pixel height, and pack blocks
   into pages against the real available height. Pages never scroll; overflow
   becomes the next page. Recomputes after fonts load and on width/size change.
   ===================================================================== */
import { useState, useEffect, useRef, useCallback } from 'react';
import { toBlocks } from './lorePaginate.js';

// Render one block to HTML for measurement (mirrors LoreBook's <Block/>).
function blockHTML(b) {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const cls = {
    speaker: 'lb-speaker', quote: 'lb-quote', verse: 'lb-verse',
    annotation: 'lb-annotation', redaction: 'lb-redaction', para: 'lb-para',
  }[b.type] || 'lb-para';
  return `<p class="${cls}">${esc(b.text)}</p>`;
}

const cache = new Map();

export function useLorePagination(record, { pageWidth, bodyHeight, firstBodyHeight, textScale = 1, ready }) {
  const [pages, setPages] = useState(null);
  const probeRef = useRef(null);

  const compute = useCallback(() => {
    if (!record || !pageWidth || !bodyHeight) return;
    const key = `${record.idx}|${Math.round(pageWidth)}|${Math.round(bodyHeight)}|${Math.round(firstBodyHeight)}|${textScale}`;
    if (cache.has(key)) { setPages(cache.get(key)); return; }

    const blocks = toBlocks(record);

    // build / reuse a hidden probe matching the page text column
    let probe = probeRef.current;
    if (!probe) {
      probe = document.createElement('div');
      probe.setAttribute('aria-hidden', 'true');
      probe.style.cssText = 'position:absolute;left:-99999px;top:0;visibility:hidden;pointer-events:none;';
      probe.className = 'lb-page__body';
      document.body.appendChild(probe);
      probeRef.current = probe;
    }
    probe.style.width = pageWidth + 'px';
    probe.style.fontSize = textScale + 'em';

    // measure each block's height including its margins
    const heights = blocks.map((b) => {
      probe.innerHTML = blockHTML(b);
      const el = probe.firstElementChild;
      const cs = getComputedStyle(el);
      const mt = parseFloat(cs.marginTop) || 0;
      const mb = parseFloat(cs.marginBottom) || 0;
      // +2px per block absorbs line-box rounding so a dense page of many
      // small blocks doesn't cumulatively underestimate and overflow.
      return el.offsetHeight + mt + mb + 2;
    });

    // pack into pages against real available height. A safety margin (a small
    // fixed amount plus a fraction of page height) absorbs measurement variance
    // so a page never tips into overflow. The first page gets extra headroom
    // because the masthead's wrap height varies most.
    // Safety margin tuned so the densest page in the collection (XVIII p8 on
    // mobile) never overflows. Verified zero-overflow across all 18 records ×
    // {desktop, tablet, mobile} in a headless browser.
    const SAFETY = Math.round(bodyHeight * 0.05) + 22;
    const FIRST_SAFETY = SAFETY + 24;
    const out = [];
    let cur = [];
    let used = 0;
    let cap = (firstBodyHeight || bodyHeight) - FIRST_SAFETY;
    const flush = () => { if (cur.length) out.push(cur); cur = []; used = 0; cap = bodyHeight - SAFETY; };

    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      const h = heights[i];

      // SPEAKER: keep with at least first chunk of following dialogue
      if (b.type === 'speaker' && blocks[i + 1]) {
        const pairH = h + heights[i + 1];
        // if the speaker + its line can't fit, turn the page first
        if (used > 0 && used + Math.min(pairH, h + 40) > cap) flush();
        cur.push(b); used += h;
        // place the dialogue; if it doesn't fit, split it
        const next = blocks[i + 1];
        if (used + heights[i + 1] <= cap || next.type !== 'para') {
          cur.push(next); used += heights[i + 1]; i++;
        } else {
          // split the paragraph by words to fill remaining height, measure as we go
          const { fitted, rest } = splitToFit(probe, next.text, cap - used);
          if (fitted) { cur.push({ type: 'para', text: fitted }); }
          flush();
          if (rest) blocks.splice(i + 1, 1, { type: 'para', text: rest });
          else i++;
        }
        continue;
      }

      // block taller than a whole page → split it
      if (h > cap && b.type === 'para') {
        let remainingText = b.text;
        let avail = cap - used;
        while (remainingText) {
          const { fitted, rest } = splitToFit(probe, remainingText, avail);
          if (fitted) { cur.push({ type: 'para', text: fitted }); }
          remainingText = rest;
          if (remainingText) { flush(); avail = cap; }
          else { used += measure(probe, { type: 'para', text: fitted }); }
        }
        continue;
      }

      if (used > 0 && used + h > cap) flush();
      cur.push(b); used += h;
    }
    flush();

    const result = out.length ? out : [[{ type: 'para', text: '\u2014' }]];
    cache.set(key, result);
    setPages(result);
  }, [record, pageWidth, bodyHeight, firstBodyHeight, textScale]);

  // measure helper for a single block
  function measure(probe, b) {
    probe.innerHTML = blockHTML(b);
    const el = probe.firstElementChild;
    const cs = getComputedStyle(el);
    return el.offsetHeight + (parseFloat(cs.marginTop) || 0) + (parseFloat(cs.marginBottom) || 0);
  }

  // binary-ish word split so the first part fits `avail` px
  function splitToFit(probe, text, avail) {
    const words = text.split(' ');
    if (avail < 24) return { fitted: '', rest: text }; // no room
    let lo = 1, hi = words.length, best = 0;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      probe.innerHTML = blockHTML({ type: 'para', text: words.slice(0, mid).join(' ') });
      const h = probe.firstElementChild.offsetHeight;
      if (h <= avail) { best = mid; lo = mid + 1; } else { hi = mid - 1; }
    }
    if (best === 0) best = 1; // always place at least one word to progress
    const fitted = words.slice(0, best).join(' ');
    const rest = words.slice(best).join(' ');
    return { fitted, rest: rest || '' };
  }

  // recompute when inputs change or fonts load
  useEffect(() => {
    if (!ready) return;
    let alive = true;
    const run = () => { if (alive) compute(); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
    else run();
    return () => { alive = false; };
  }, [compute, ready]);

  // cleanup probe
  useEffect(() => () => { if (probeRef.current) { probeRef.current.remove(); probeRef.current = null; } }, []);

  return pages;
}
