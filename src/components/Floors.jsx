import { useEffect, useRef, useState } from 'react';
import { FLOORS } from '../data/floors.js';
import { Page } from './Layout.jsx';
import GradeBadge, { gradeColor } from './GradeBadge.jsx';
import { floorStats } from '../lib/floorStats.js';
import './Floors.css';

function useActiveFloor(count) {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { setActive(Number(e.target.dataset.index)); e.target.classList.add('is-in'); }
      }),
      { threshold: 0.4, rootMargin: '-15% 0px -30% 0px' }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [count]);
  return { active, refs };
}

// Vertical Tower spine — you are climbing it.
function TowerSpine({ floors, active }) {
  const cleared = floors.filter((f) => f.status !== 'locked').length;
  return (
    <aside className="tower" aria-hidden="true">
      <div className="tower__rail">
        <div className="tower__fill" style={{ height: `${(active / (floors.length - 1)) * 100}%` }} />
        {floors.map((f, i) => (
          <div key={f.n}
            className={`tower__node ${i === active ? 'is-active' : ''} ${f.status === 'locked' ? 'is-locked' : i < cleared ? 'is-open' : ''}`}
            style={{ '--accent': f.accent || 'var(--rune)' }}>
            <span className="tower__num">{f.status === 'locked' ? '⛓' : f.n}</span>
          </div>
        ))}
      </div>
      <span className="tower__cap">The Ascent</span>
    </aside>
  );
}

function OpenFloor({ f, index, refCb, navigate }) {
  const stats = floorStats(f.n);
  return (
    <article className="ifloor" data-index={index} ref={refCb} style={{ '--accent': f.accent || 'var(--accent-floor1)' }}>
      <div className="ifloor__num">
        <span className="ifloor__big">{String(f.n).padStart(2, '0')}</span>
        <span className="ifloor__of">/ 10</span>
      </div>
      <div className="ifloor__body">
        <div className="ifloor__thumb" aria-hidden="true">
          {stats ? (
            <div className="ifloor__assess">
              <span className="ifloor__assess-k">Avg. Guild Grade</span>
              <span className="ifloor__assess-grade" style={{ '--g': gradeColor(stats.avgGrade) }}>{stats.avgGrade}</span>
              <span className="ifloor__assess-lvl">Lv {stats.levelMin}–{stats.levelMax}</span>
              <span className="ifloor__assess-count">{stats.count} species catalogued</span>
            </div>
          ) : (
            <div className="ifloor__assess ifloor__assess--unknown">
              <span className="ifloor__assess-grade ifloor__assess-grade--unknown">?</span>
              <span className="ifloor__assess-k">Uncharted</span>
              <span className="ifloor__assess-count">No Guild survey yet</span>
            </div>
          )}
        </div>
        <div className="ifloor__info">
          <p className="ifloor__eyebrow">{f.biome}{f.settlement ? ` · ${f.settlement.name}` : ''}</p>
          <h3 className="ifloor__name">{f.name}</h3>
          <p className="ifloor__tag">“{f.tagline}”</p>
          <p className="ifloor__sum">{f.summary}</p>
          <div className="ifloor__meta">
            {f.boss && <span className="ifloor__chip ifloor__chip--boss">Guardian · {f.boss.name}</span>}
            <span className="ifloor__chip">{f.settlement ? (f.settlement.type === 'city' ? 'Hub City' : 'Settlement') : 'No settlement'}</span>
            {f.milestone && <span className="ifloor__chip ifloor__chip--mile">Milestone</span>}
          </div>
          {f.hasPage && navigate && (
            <button className="ifloor__enter" onClick={() => navigate('#/floors/' + f.n)}>Enter the Floor →</button>
          )}
        </div>
      </div>
    </article>
  );
}

function SealedFloor({ f, index, refCb }) {
  return (
    <article className="ifloor ifloor--sealed" data-index={index} ref={refCb}>
      <div className="ifloor__num ifloor__num--sealed"><span className="ifloor__big">{String(f.n).padStart(2, '0')}</span></div>
      <div className="ifloor__body ifloor__body--sealed">
        <div className="ifloor__seal" aria-hidden="true"><span>⛓</span></div>
        <div className="ifloor__info">
          <p className="ifloor__eyebrow ifloor__eyebrow--sealed">Higher Floor · Sealed</p>
          <h3 className="ifloor__name ifloor__name--sealed">{f.name}</h3>
          <p className="ifloor__tag ifloor__tag--sealed">“{f.tagline}”</p>
          <p className="ifloor__sealednote">The stair above will not open until the Guardian below has fallen.</p>
        </div>
      </div>
    </article>
  );
}

export default function Floors({ navigate }) {
  const { active, refs } = useActiveFloor(FLOORS.length);
  return (
    <Page variant="wide" className="ifloors">
      <header className="ifloors__intro">
        <p className="ifloors__eyebrow">The Spire</p>
        <h2 className="ifloors__head">Ten realms stand between you and the wish.</h2>
        <p className="ifloors__lead">
          Each floor is a world entire — its own land, its own people, its own Guardian barring the stair above.
          The first five carry you from empty fields to the first great city. What waits higher is not yet spoken of.
        </p>
      </header>

      <div className="ifloors__layout">
        <TowerSpine floors={FLOORS} active={active} />
        <div className="ifloors__track">
          {FLOORS.map((f, i) =>
            f.status === 'locked'
              ? <SealedFloor key={f.n} f={f} index={i} refCb={(el) => (refs.current[i] = el)} />
              : <OpenFloor key={f.n} f={f} index={i} refCb={(el) => (refs.current[i] = el)} navigate={navigate} />
          )}
        </div>
      </div>
    </Page>
  );
}
