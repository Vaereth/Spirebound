import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { paginate, toSpreads } from '../lib/lorePaginate.js';
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

  const pages = useMemo(() => (viewable ? paginate(record) : []), [record.idx, viewable]);
  const spreads = useMemo(() => toSpreads(pages, perSpread), [pages, perSpread]);

  const [spreadIdx, setSpreadIdx] = useState(0);
  const [turning, setTurning] = useState(null); // 'fwd' | 'back' | null
  useEffect(() => { setSpreadIdx(0); }, [record.idx, perSpread]);

  const orderedIdxs = records.map((r) => r.idx);
  const pos = orderedIdxs.indexOf(record.idx);
  const prevRecord = records[pos - 1];
  const nextRecord = records[pos + 1];

  const atFirstSpread = spreadIdx === 0;
  const atLastSpread = spreadIdx >= spreads.length - 1;

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
      else if (e.key === 'Escape' && fullscreen) setFullscreen(false);
    };
    const el = bookRef.current;
    if (el) el.addEventListener('keydown', onKey);
    return () => { if (el) el.removeEventListener('keydown', onKey); };
  });

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

  // collapsible acts in rail
  const [openAct, setOpenAct] = useState(act);
  useEffect(() => { setOpenAct(act); }, [act]);

  const recordsByAct = (a) => records.filter((r) => r.act === a);
  const currentSpread = spreads[spreadIdx] || [];
  const firstPageNumber = spreadIdx * perSpread + 1;

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
        ) : (
          currentSpread.map((pageBlocks, i) => (
            <Page key={spreadIdx + '-' + i} record={record} blocks={pageBlocks}
              pageNo={firstPageNumber + i} totalPages={pages.length}
              masthead={spreadIdx === 0 && i === 0}
              side={perSpread === 1 ? 'single' : (i === 0 ? 'left' : 'right')}
              region={REGION_GLYPH[record.region] || '✦'} />
          ))
        )}
        {viewable && <span className="lb-spine" aria-hidden="true" />}
      </div>

      {/* outer right edge */}
      <button className="lb-edge lb-edge--right" aria-label="Next page"
        disabled={atLastSpread && !nextRecord} onClick={goForward}><span aria-hidden="true">›</span></button>
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

  return (
    <div className={`lb ${fullscreen ? 'lb--fs' : ''}`}>
      {!fullscreen && (
        <div className="lb__toolbar">
          <button className="lb-chip" onClick={() => setFullscreen(true)}>⛶ Open Reading Mode</button>
        </div>
      )}
      <div className="lb__layout">
        {Rail}
        <div className="lb__reader">
          {BookInner}
          {Controls}
        </div>
      </div>

      {fullscreen && (
        <div className="lb-fs" role="dialog" aria-modal="true" aria-label="Reading mode">
          <div className="lb-fs__bar">
            <span className="lb-fs__title">{record.n}. {record.title}</span>
            <button className="lb-chip" onClick={() => setFullscreen(false)}>✕ Close (Esc)</button>
          </div>
          <div className="lb-fs__body">
            <details className="lb-fs__toc">
              <summary>Contents</summary>
              {Rail}
            </details>
            <div className="lb__reader lb__reader--fs">
              {BookInner}
              {Controls}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
