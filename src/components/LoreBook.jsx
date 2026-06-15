import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { toSpreads } from '../lib/lorePaginate.js';
import { useLorePagination } from '../lib/useLorePagination.js';
import { getPref, setPref } from '../lib/userContext.js';
import './LoreBook.css';

/* Render a single semantic block */
function Block({ block }) {
  switch (block.type) {
    case 'speaker': return <p className="lb-speaker">{block.text}</p>;
    case 'quote': return <p className="lb-quote">{block.text}</p>;
    case 'verse': return <p className="lb-verse">{block.text}</p>;
    case 'annotation': return <p className="lb-annotation">{block.text}</p>;
    case 'redaction': return <p className="lb-redaction" aria-label="Redacted section">{block.text}</p>;
    default: return <p className="lb-para">{block.text}</p>;
  }
}

/* A single page surface */
function Page({ record, blocks, pageNo, totalPages, masthead, side, region }) {
  return (
    <div className={`lb-page lb-page--${side} ${record.sealed ? 'lb-page--dark' : ''}`} role="document"
      aria-label={`Page ${pageNo} of ${totalPages}`}>
      <div className="lb-page__inner">
        {masthead && (
          <header className="lb-masthead">
            <span className="lb-masthead__num">{record.n}</span>
            <h3 className="lb-masthead__title">{record.title}</h3>
            <div className="lb-masthead__meta">
              <span>{record.type}</span>
              <span>Author · {record.author}</span>
              <span>Found · {record.found}</span>
              {record.proof && <span>Proof · {record.proof}</span>}
            </div>
            <span className="lb-masthead__sigil" aria-hidden="true">{region}</span>
            <span className="lb-rule" aria-hidden="true" />
          </header>
        )}
        <div className="lb-page__body">
          {blocks.map((b, i) => <Block key={i} block={b} />)}
        </div>
      </div>
      <span className="lb-page__no" aria-hidden="true">{pageNo}</span>
      <span className="lb-page__stamp" aria-hidden="true">✦</span>
    </div>
  );
}

const REGION_GLYPH = {
  Dawnfields: '☀', Silverrun: '≈', 'Windmere Hills': '☁', Briarwood: '❦',
  'Old March': '⚔', 'Crownward Expanse': '◈', 'Crownward Gate': '⛓', 'All regions': '✦',
};

export default function LoreBook({ records, acts, act, setAct, selIdx, setSelIdx, loreAll, setLoreAll }) {
  const discovered = records.filter((r) => !r.sealed).length + (loreAll ? records.filter((r) => r.sealed).length : 0);
  const record = records.find((r) => r.idx === selIdx) || records[0];
  const viewable = loreAll || !record.sealed;

  // one page on mobile, two on desktop
  const [perSpread, setPerSpread] = useState(2);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 820px)');
    const apply = () => setPerSpread(mq.matches ? 1 : 2);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const reduceMotion = typeof window !== 'undefined' && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- measure the real page body area so pagination is exact, not estimated ----
  const measureRef = useRef(null);      // empty ordinary page body → ordinary page height
  const measureFirstRef = useRef(null); // first page body (with masthead sibling) → first page height
  const [dims, setDims] = useState(null); // { pageWidth, bodyHeight, firstBodyHeight }

  const remeasure = useCallback(() => {
    const body = measureRef.current;
    const firstBody = measureFirstRef.current;
    if (!body) return;
    const w = body.clientWidth;
    const h = body.clientHeight;
    // first page body measured directly from a probe whose masthead sits in the
    // same flex inner as the body — identical geometry to the real first page.
    const fh = firstBody ? firstBody.clientHeight : h;
    if (w > 0 && h > 0) setDims({ pageWidth: w, bodyHeight: h, firstBodyHeight: fh });
  }, []);

  useEffect(() => {
    remeasure();
    const ro = new ResizeObserver(remeasure);
    if (measureRef.current) ro.observe(measureRef.current);
    if (measureFirstRef.current) ro.observe(measureFirstRef.current);
    window.addEventListener('resize', remeasure);
    return () => { ro.disconnect(); window.removeEventListener('resize', remeasure); };
  }, [remeasure, perSpread]);

  const measuredPages = useLorePagination(record, {
    pageWidth: dims?.pageWidth,
    bodyHeight: dims?.bodyHeight,
    firstBodyHeight: dims?.firstBodyHeight,
    textScale: 1,
    ready: viewable && !!dims,
  });
  const pages = viewable ? (measuredPages || []) : [];
  const computing = viewable && !measuredPages;
  const spreads = useMemo(() => toSpreads(pages, perSpread), [pages, perSpread]);

  const [spreadIdx, setSpreadIdx] = useState(0);
  const [turning, setTurning] = useState(null); // 'fwd' | 'back' | null
  // restore last-read spread for the current record (persisted)
  useEffect(() => {
    const saved = getPref('loreSpread:' + record.idx, 0);
    setSpreadIdx(typeof saved === 'number' ? saved : 0);
  }, [record.idx, perSpread]);
  useEffect(() => { setPref('loreSpread:' + record.idx, spreadIdx); setPref('loreLastRecord', record.idx); }, [spreadIdx, record.idx]);

  // text size (persisted)
  const [textSize, setTextSize] = useState(() => getPref('loreTextSize', 1));
  useEffect(() => { setPref('loreTextSize', textSize); }, [textSize]);

  // mark record read (persisted)
  useEffect(() => { if (viewable) { const r = getPref('loreRead', {}); if (!r[record.idx]) setPref('loreRead', { ...r, [record.idx]: true }); } }, [record.idx, viewable]);

  const orderedIdxs = records.map((r) => r.idx);
  const pos = orderedIdxs.indexOf(record.idx);
  const prevRecord = records[pos - 1];
  const nextRecord = records[pos + 1];

  const safeSpreadIdx = Math.min(spreadIdx, Math.max(0, spreads.length - 1));
  const atFirstSpread = safeSpreadIdx === 0;
  const atLastSpread = safeSpreadIdx >= spreads.length - 1;

  const animateTo = useCallback((dir, fn) => {
    if (reduceMotion) { fn(); return; }
    setTurning(dir);
    setTimeout(() => { fn(); setTurning(null); }, 220);
  }, [reduceMotion]);

  const goForward = useCallback(() => {
    if (!atLastSpread) animateTo('fwd', () => setSpreadIdx((i) => i + 1));
    else if (nextRecord) animateTo('fwd', () => setSelIdx(nextRecord.idx));
  }, [atLastSpread, nextRecord, animateTo, setSelIdx]);

  const goBack = useCallback(() => {
    if (!atFirstSpread) animateTo('back', () => setSpreadIdx((i) => i - 1));
    else if (prevRecord) animateTo('back', () => { setSelIdx(prevRecord.idx); });
  }, [atFirstSpread, prevRecord, animateTo, setSelIdx]);

  // keyboard
  const bookRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); goForward(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goBack(); }
    };
    const el = bookRef.current;
    if (el) el.addEventListener('keydown', onKey);
    return () => { if (el) el.removeEventListener('keydown', onKey); };
  });

  // global Escape closes Reading Mode regardless of focus (defined after the
  // fullscreen state below)

  // swipe
  const touch = useRef(null);
  const onTouchStart = (e) => { touch.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (Math.abs(dx) > 50) (dx < 0 ? goForward : goBack)();
    touch.current = null;
  };

  const [fullscreen, setFullscreen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = fullscreen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [fullscreen]);
  // global Escape closes Reading Mode regardless of focus
  useEffect(() => {
    if (!fullscreen) return;
    const onEsc = (e) => { if (e.key === 'Escape') setFullscreen(false); };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [fullscreen]);

  // collapsible acts in rail
  const [openAct, setOpenAct] = useState(act);
  useEffect(() => { setOpenAct(act); }, [act]);

  const recordsByAct = (a) => records.filter((r) => r.act === a);
  const currentSpread = spreads[safeSpreadIdx] || [];
  const firstPageNumber = safeSpreadIdx * perSpread + 1;

  const Rail = (
    <nav className="lb-rail" aria-label="Lore contents">
      <div className="lb-rail__head">
        <span className="lb-rail__count">{discovered} / {records.length} records</span>
        <h3 className="lb-rail__title">The Floor That Learned His Name</h3>
        <p className="lb-rail__sub">Ilyen's concealed archive · Floor 1</p>
        <div className="lb-rail__modes">
          <button className={`lb-chip ${!loreAll ? 'is-on' : ''}`} onClick={() => setLoreAll(false)}>Player Progress</button>
          <button className={`lb-chip ${loreAll ? 'is-on' : ''}`} onClick={() => setLoreAll(true)}>Reveal All</button>
        </div>
      </div>
      <div className="lb-rail__acts">
        {acts.map((a) => {
          const recs = recordsByAct(a.n);
          const open = openAct === a.n;
          return (
            <div key={a.n} className={`lb-act ${open ? 'is-open' : ''}`}>
              <button className="lb-act__head" aria-expanded={open}
                onClick={() => { setOpenAct(open ? null : a.n); }}>
                <span className="lb-act__chevron" aria-hidden="true">{open ? '▾' : '▸'}</span>
                <span className="lb-act__label">Act {a.n} — {a.title}</span>
              </button>
              {open && (
                <ul className="lb-act__list">
                  {recs.map((r) => {
                    const sealed = r.sealed && !loreAll;
                    return (
                      <li key={r.idx}>
                        <button className={`lb-tocrow ${record.idx === r.idx ? 'is-on' : ''} ${sealed ? 'is-sealed' : ''}`}
                          onClick={() => { setAct(a.n); setSelIdx(r.idx); }} aria-current={record.idx === r.idx}>
                          <span className="lb-tocrow__n">{r.n}</span>
                          <span className="lb-tocrow__t">{sealed ? 'Sealed Record' : r.title}</span>
                          <span className="lb-tocrow__mark" aria-hidden="true">{sealed ? '⛓' : (record.idx === r.idx ? '◆' : '◇')}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );

  const BookInner = (
    <div className={`lb-book ${turning ? `is-turning-${turning}` : ''} ${perSpread === 1 ? 'lb-book--single' : ''}`}
      ref={bookRef} tabIndex={0} role="group" aria-roledescription="Lore book"
      aria-label={`${record.n}. ${record.title}, page ${firstPageNumber} of ${pages.length}`}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>

      {/* outer left edge */}
      <button className="lb-edge lb-edge--left" aria-label="Previous page"
        disabled={atFirstSpread && !prevRecord} onClick={goBack}><span aria-hidden="true">‹</span></button>

      <div className="lb-spread">
        {!viewable ? (
          <div className="lb-sealed">
            <span className="lb-sealed__icon" aria-hidden="true">⛓</span>
            <h3>Sealed Record</h3>
            <p>This record is sealed in Player Progress mode.</p>
            <p className="lb-sealed__gate"><b>Unlock —</b> {record.gate}.</p>
            <button className="lb-chip is-on" onClick={() => setLoreAll(true)}>Reveal all lore</button>
          </div>
        ) : computing ? (
          <div className="lb-loading" aria-live="polite"><span className="lb-loading__mark" aria-hidden="true">✦</span><span>Turning to the page…</span></div>
        ) : (
          currentSpread.map((pageBlocks, i) => (
            <Page key={safeSpreadIdx + '-' + i} record={record} blocks={pageBlocks}
              pageNo={firstPageNumber + i} totalPages={pages.length}
              masthead={safeSpreadIdx === 0 && i === 0}
              side={perSpread === 1 ? 'single' : (i === 0 ? 'left' : 'right')}
              region={REGION_GLYPH[record.region] || '✦'} />
          ))
        )}
        {viewable && !computing && perSpread === 2 && <span className="lb-spine" aria-hidden="true" />}
      </div>

      {/* outer right edge */}
      <button className="lb-edge lb-edge--right" aria-label="Next page"
        disabled={atLastSpread && !nextRecord} onClick={goForward}><span aria-hidden="true">›</span></button>

      {/* hidden measuring spread: identical CSS to the real spread so the
          measured body area is exactly the true available area */}
      <div className="lb-measure" aria-hidden="true">
        <div className={`lb-spread ${perSpread === 1 ? '' : ''}`}>
          <div className={`lb-page ${perSpread === 1 ? 'lb-page--single' : 'lb-page--left'}`}>
            <div className="lb-page__inner">
              <div className="lb-page__body" ref={measureRef} />
            </div>
          </div>
          <div className={`lb-page ${perSpread === 1 ? 'lb-page--single' : 'lb-page--right'}`}>
            <div className="lb-page__inner">
              <header className="lb-masthead">
                <span className="lb-masthead__num">{record.n}</span>
                <h3 className="lb-masthead__title">{record.title}</h3>
                <div className="lb-masthead__meta">
                  <span>{record.type}</span>
                  <span>Author · {record.author}</span>
                  <span>Found · {record.found}</span>
                  {record.proof && <span>Proof · {record.proof}</span>}
                </div>
                <span className="lb-masthead__sigil" aria-hidden="true">{REGION_GLYPH[record.region] || '✦'}</span>
                <span className="lb-rule" />
              </header>
              <div className="lb-page__body" ref={measureFirstRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Controls = (
    <div className="lb-controls">
      <button className="lb-navbtn" disabled={atFirstSpread && !prevRecord} onClick={goBack}>
        {atFirstSpread && prevRecord ? `‹ ${prevRecord.n}. ${prevRecord.title}` : '‹ Previous'}
      </button>
      <span className="lb-controls__pos" aria-live="polite">
        {viewable ? (perSpread === 1
          ? `Page ${firstPageNumber} of ${pages.length}`
          : `Page ${firstPageNumber}${currentSpread.length > 1 ? '–' + (firstPageNumber + currentSpread.length - 1) : ''} of ${pages.length}`)
          : 'Sealed'}
      </span>
      <button className="lb-navbtn" disabled={atLastSpread && !nextRecord} onClick={goForward}>
        {atLastSpread && nextRecord ? `${nextRecord.n}. ${nextRecord.title} ›` : 'Next ›'}
      </button>
    </div>
  );

  const readerBlock = (
    <div className="lb__layout">
      {Rail}
      <div className={`lb__reader ${fullscreen ? 'lb__reader--fs' : ''}`}>
        {BookInner}
        {Controls}
      </div>
    </div>
  );

  return (
    <div className="lb">
      <div className="lb__toolbar">
        <button className="lb-chip" onClick={() => setFullscreen(true)}>⛶ Open Reading Mode</button>
      </div>
      {!fullscreen && readerBlock}

      {fullscreen && createPortal(
        <div className="lb lb--fs">
          <div className="lb-fs" role="dialog" aria-modal="true" aria-label="Reading mode">
            <div className="lb-fs__bar">
              <span className="lb-fs__title">{record.n}. {record.title}</span>
              <button className="lb-chip lb-fs__close" onClick={() => setFullscreen(false)}>✕ Close (Esc)</button>
            </div>
            <div className="lb-fs__body">
              {readerBlock}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
