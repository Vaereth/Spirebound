/* =====================================================================
   LORE PAGINATION — turn a record's prose into semantic blocks, then
   pack those blocks into page-sized columns. The goal is a professionally
   typeset volume: fill ~75–90% of each page before turning, never orphan a
   speaker from its dialogue, size redactions to their content, and only
   advance to the next spread when neither page can hold the next block.
   ===================================================================== */

// ---- tuning: a page's usable text area measured in "lines" --------------
// A desktop page (min 620px tall, up to ~820px) at ~1.6 line-height and a
// ~17–18px body fits roughly 30 body lines. The opening page also carries a
// compact masthead, so it gets fewer.
const PAGE_LINES = 32;          // ordinary page line budget
const FIRST_PAGE_LINES = 24;    // opening page (compact masthead ~6-7 lines)
const CHARS_PER_LINE = 50;      // approx measure at the page text column

// Per-block vertical overhead, expressed in lines (margins between blocks).
// Kept small so transcripts stay tight (~0.55–0.8em between exchanges).
const GAP = {
  para: 0.6, verse: 0.25, quote: 0.8, speaker: 0.55, annotation: 0.7, redaction: 0.7,
};

// ---- block classification ----------------------------------------------
export function classifyBlock(text) {
  const t = text.trim();
  if (/^\[.*(REMOVED|REDACTED).*\]$/i.test(t)) return { type: 'redaction', text: t };
  if (/^\[.*\]$/.test(t)) return { type: 'annotation', text: t.replace(/^\[|\]$/g, '') };
  if (/^[A-Z][A-Z' .\u2019-]{1,40}:$/.test(t)) return { type: 'speaker', text: t.replace(/:$/, '') };
  if (/^[\u201C"].*[\u201D"]$/.test(t)) return { type: 'quote', text: t };
  if (/^(At the bottom|In another hand|Later versions|The oldest surviving|No version records)/i.test(t)) {
    return { type: 'annotation', text: t };
  }
  return { type: 'para', text: t };
}

function isVerseRecord(type) { return /song|poem|verse|ballad/i.test(type || ''); }

export function toBlocks(record) {
  const raw = record.body.split(/\n\n+/).map((s) => s.trim()).filter(Boolean);
  const verse = isVerseRecord(record.type);
  return raw.map((chunk) => {
    const b = classifyBlock(chunk);
    if (verse && b.type === 'para') return { type: 'verse', text: b.text };
    return b;
  });
}

// rendered text lines for a block (no gap)
function textLines(b) {
  if (b.type === 'speaker') return 1;              // compact label, one line
  if (b.type === 'redaction') return 1;            // sized to its content
  const lines = Math.max(1, Math.ceil(b.text.length / CHARS_PER_LINE));
  return lines;
}
// total cost including the gap before the block
function blockCost(b) { return textLines(b) + (GAP[b.type] || 0.6); }

// Split a long paragraph into line-bounded pieces that each fit `budget` lines.
function splitPara(text, firstBudget, restBudget) {
  const words = text.split(' ');
  const pieces = [];
  let line = '';
  let lines = [];
  for (const w of words) {
    const tryLine = line ? line + ' ' + w : w;
    if (tryLine.length > CHARS_PER_LINE && line) { lines.push(line); line = w; }
    else line = tryLine;
  }
  if (line) lines.push(line);
  // now group lines into pieces of firstBudget then restBudget
  let i = 0;
  let budget = firstBudget;
  while (i < lines.length) {
    const take = Math.max(1, Math.floor(budget));
    pieces.push(lines.slice(i, i + take).join(' '));
    i += take;
    budget = restBudget;
  }
  return pieces;
}

/* Pack blocks into pages, filling each page before turning. */
export function paginate(record, opts = {}) {
  const pageLines = opts.pageLines || PAGE_LINES;
  const firstPageLines = opts.firstPageLines || FIRST_PAGE_LINES;
  const blocks = toBlocks(record);

  const pages = [];
  let cur = [];
  let used = 0;
  let cap = firstPageLines;

  const flush = () => { if (cur.length) { pages.push(cur); cur = []; } used = 0; cap = pageLines; };
  const remaining = () => cap - used;

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];

    // SPEAKER: must stay with at least the first ~2 lines of its dialogue.
    if (b.type === 'speaker') {
      const next = blocks[i + 1];
      const labelCost = blockCost(b);
      // minimum the speaker + 2 lines of following block needs
      const minNext = next ? Math.min(textLines(next), 2) + (GAP[next.type] || 0.6) : 0;
      if (used > 0 && remaining() < labelCost + minNext) flush();
      cur.push(b); used += labelCost;

      if (next) {
        const nextCost = blockCost(next);
        if (nextCost <= remaining()) {
          cur.push(next); used += nextCost; i++;
        } else if (next.type === 'para') {
          // split the dialogue paragraph: keep >=2 lines here, rest flows
          const firstBudget = Math.max(2, Math.floor(remaining() - (GAP.para)));
          const pieces = splitPara(next.text, firstBudget, pageLines - 1);
          cur.push({ type: 'para', text: pieces[0] }); used = cap; // fill page
          // queue remaining pieces as paras
          const rest = pieces.slice(1).map((t) => ({ type: 'para', text: t }));
          blocks.splice(i + 1, 1, ...rest.length ? rest : [{ type: 'para', text: '' }]);
          if (!rest.length) i++; // consumed fully
          flush();
        } else {
          // non-para next that doesn't fit: move whole pair to next page
          cur.pop(); used -= labelCost; flush();
          cur.push(b); used += labelCost;
          cur.push(next); used += nextCost; i++;
        }
      }
      continue;
    }

    let cost = blockCost(b);

    // very long paragraph spanning more than a page: split across pages
    if (cost > remaining() && b.type === 'para' && textLines(b) > pageLines) {
      const firstBudget = Math.max(1, Math.floor(remaining() - GAP.para));
      const pieces = splitPara(b.text, firstBudget, pageLines - 1);
      pieces.forEach((p, k) => {
        const pc = { type: 'para', text: p };
        const c = blockCost(pc);
        if (used > 0 && c > remaining()) flush();
        cur.push(pc); used += c;
        if (k < pieces.length - 1) flush();
      });
      continue;
    }

    // ordinary block: place if it fits, else turn the page first
    if (used > 0 && cost > remaining()) flush();
    cur.push(b); used += cost;
  }
  flush();
  return pages.length ? pages : [[{ type: 'para', text: '\u2014' }]];
}

export function toSpreads(pages, perSpread = 2) {
  const spreads = [];
  for (let i = 0; i < pages.length; i += perSpread) spreads.push(pages.slice(i, i + perSpread));
  return spreads;
}
