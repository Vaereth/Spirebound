/* =====================================================================
   LORE PAGINATION — turn a record's prose into semantic blocks, then
   pack those blocks into page-sized columns so the book can show one
   spread (two pages) at a time without splitting headings from text,
   orphaning speaker labels, or breaking verse badly.
   ===================================================================== */

// Classify one paragraph-chunk into a semantic block.
export function classifyBlock(text) {
  const t = text.trim();
  // redaction / removed sections
  if (/^\[.*(REMOVED|REDACTED).*\]$/i.test(t)) return { type: 'redaction', text: t };
  // bracketed stage/marginal note
  if (/^\[.*\]$/.test(t)) return { type: 'annotation', text: t.replace(/^\[|\]$/g, '') };
  // transcript speaker label: ALL-CAPS line ending in ':' (may have a name like "ARCHITECT SERA:")
  if (/^[A-Z][A-Z' .\u2019-]{1,40}:$/.test(t)) return { type: 'speaker', text: t.replace(/:$/, '') };
  // quoted line (whole chunk is a quote)
  if (/^[\u201C"].*[\u201D"]$/.test(t)) return { type: 'quote', text: t };
  // marginal "in another hand" annotations
  if (/^(At the bottom|In another hand|Later versions|The oldest surviving|No version records)/i.test(t)) {
    return { type: 'annotation', text: t };
  }
  return { type: 'para', text: t };
}

// Rough "height cost" of a block in arbitrary units so we can pack pages.
function blockCost(b) {
  const len = b.text.length;
  const base = { speaker: 1.4, quote: 2, annotation: 1.6, redaction: 1.6, verse: 1.2, para: 1 }[b.type] || 1;
  // ~ lines: assume ~46 chars per line on a page
  const lines = Math.max(1, Math.ceil(len / 46));
  return lines + base;
}

// Detect verse/song records — short lines, classify each as verse.
function isVerseRecord(type) {
  return /song|poem|verse|ballad/i.test(type || '');
}

export function toBlocks(record) {
  const raw = record.body.split(/\n\n+/).map((s) => s.trim()).filter(Boolean);
  const verse = isVerseRecord(record.type);
  return raw.map((chunk) => {
    const b = classifyBlock(chunk);
    if (verse && b.type === 'para') return { type: 'verse', text: b.text };
    return b;
  });
}

/* Pack blocks into pages.
   capacity = approximate "line units" a single page can hold.
   The opening page of a record is given a smaller capacity because it also
   carries the title/metadata masthead. */
export function paginate(record, { capacity = 24, firstPageCapacity = 14 } = {}) {
  const blocks = toBlocks(record);
  const pages = [];
  let cur = [];
  let used = 0;
  let cap = firstPageCapacity;

  const push = () => { pages.push(cur); cur = []; used = 0; cap = capacity; };

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    let cost = blockCost(b);

    // keep a speaker label with at least its following block
    const isSpeaker = b.type === 'speaker';
    const pairCost = isSpeaker && blocks[i + 1] ? cost + blockCost(blocks[i + 1]) : cost;

    if (used > 0 && used + pairCost > cap) push();

    // a single very long paragraph may need to split across pages
    if (cost > cap && b.type === 'para') {
      const words = b.text.split(' ');
      let part = [];
      let pc = 0;
      for (const w of words) {
        const wc = (w.length + 1) / 46;
        if (pc + wc > cap - used && part.length) {
          cur.push({ type: 'para', text: part.join(' ') });
          push();
          part = []; pc = 0;
        }
        part.push(w); pc += wc;
      }
      if (part.length) { cur.push({ type: 'para', text: part.join(' ') }); used += pc; }
      continue;
    }

    cur.push(b);
    used += cost;
    // glue speaker to its line
    if (isSpeaker && blocks[i + 1]) {
      cur.push(blocks[i + 1]);
      used += blockCost(blocks[i + 1]);
      i++;
    }
  }
  if (cur.length) pages.push(cur);
  // guarantee at least one page
  return pages.length ? pages : [[{ type: 'para', text: '—' }]];
}

// Group pages into spreads of two (desktop). Mobile shows one page per "spread".
export function toSpreads(pages, perSpread = 2) {
  const spreads = [];
  for (let i = 0; i < pages.length; i += perSpread) {
    spreads.push(pages.slice(i, i + perSpread));
  }
  return spreads;
}
