import { useEffect, useRef, useState } from 'react';
import { FLOORS } from '../data/floors.js';
import './Floors.css';

// Observe which floor is centered in view → drives the spine tracker + reveals.
function useActiveFloor(count) {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number(e.target.dataset.index);
            e.target.classList.add('is-in');
            setActive(i);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [count]);
  return { active, refs };
}

function SpineTracker({ floors, active }) {
  return (
    <aside className="spine" aria-hidden="true">
      <div className="spine__rail">
        <div className="spine__fill" style={{ height: `${(active / (floors.length - 1)) * 100}%` }} />
        {floors.map((f, i) => (
          <div
            key={f.n}
            className={`spine__node ${i <= active ? 'is-cleared' : ''} ${i === active ? 'is-active' : ''} ${f.status === 'locked' ? 'is-locked' : ''}`}
            style={{ '--accent': f.accent || '#60E8DC' }}
          >
            <span className="spine__num">{f.n}</span>
          </div>
        ))}
      </div>
      <span className="spine__label">The Ascent</span>
    </aside>
  );
}

function RevealedFloor({ f, index, refCb, open, onToggle, navigate }) {
  return (
    <article
      className="floor"
      data-index={index}
      ref={refCb}
      style={{ '--accent': f.accent || '#60E8DC' }}
    >
      <div className="floor__bg" aria-hidden="true" />
      <div className="floor__inner wrap">
        <div className="floor__marker">
          <span className="floor__big">{String(f.n).padStart(2, '0')}</span>
          <span className="floor__of">/ 10</span>
        </div>

        <div className="floor__head">
          <p className="floor__eyebrow">
            {f.biome}{f.settlement ? ` · ${f.settlement.type === 'city' ? 'Hub City' : 'Village'}` : ' · No settlement'}
          </p>
          <h3 className="floor__name">{f.name}</h3>
          <p className="floor__tagline">{f.tagline}</p>
          <p className="floor__summary">{f.summary}</p>

          <div className="floor__actions">
            {f.hasPage && navigate && (
              <button className="floor__archive" onClick={() => navigate('#/floors/' + f.n)}>
                Enter the full archive →
              </button>
            )}
            <button className="floor__expand" onClick={onToggle} aria-expanded={open}>
              {open ? 'Close summary –' : 'Quick summary +'}
            </button>
          </div>

          <div className={`floor__detail ${open ? 'is-open' : ''}`}>
            <div className="floor__detail-grid">
              {f.settlement && (
                <div className="floor__block">
                  <h4 className="floor__block-h">{f.settlement.type === 'city' ? 'Hub City' : 'Settlement'}</h4>
                  <p className="floor__block-name">{f.settlement.name}</p>
                  {f.settlement.note && <p className="floor__block-note">{f.settlement.note}</p>}
                </div>
              )}
              {f.landmarks && f.landmarks.length > 0 && (
                <div className="floor__block">
                  <h4 className="floor__block-h">Landmarks</h4>
                  <ul className="floor__landmarks">
                    {f.landmarks.map((l) => (
                      <li key={l.name}><strong>{l.name}</strong> — {l.note}</li>
                    ))}
                  </ul>
                </div>
              )}
              {f.boss && (
                <div className="floor__block">
                  <h4 className="floor__block-h">Floor Boss</h4>
                  <p className="floor__block-name">{f.boss.name}</p>
                  {f.boss.kind && <span className="floor__bosskind">{f.boss.kind}</span>}
                  {f.boss.note && <p className="floor__block-note">{f.boss.note}</p>}
                </div>
              )}
              {f.milestone && (
                <div className="floor__block floor__block--milestone">
                  <h4 className="floor__block-h">The Milestone</h4>
                  <p className="floor__block-note">{f.milestone}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function LockedFloor({ f, index, refCb }) {
  return (
    <article className="floor floor--locked" data-index={index} ref={refCb}>
      <div className="floor__inner wrap">
        <div className="floor__marker floor__marker--locked">
          <span className="floor__big">{String(f.n).padStart(2, '0')}</span>
        </div>
        <div className="floor__head">
          <p className="floor__eyebrow floor__eyebrow--locked">Higher Floor · Shrouded</p>
          <h3 className="floor__name floor__name--locked">{f.name}</h3>
          <p className="floor__tagline floor__tagline--locked">“{f.tagline}”</p>
        </div>
      </div>
    </article>
  );
}

export default function Floors({ navigate }) {
  const { active, refs } = useActiveFloor(FLOORS.length);
  const [openN, setOpenN] = useState(1);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0, rootMargin: '-10% 0px -10% 0px' }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="floors" className="floors" ref={sectionRef}>
      <div className="floors__intro wrap">
        <p className="eyebrow reveal">The Spire</p>
        <h2 className="floors__head reveal">Ten realms stand between you and the wish.</h2>
        <p className="floors__lead reveal">
          Each floor is a world entire — its own land, its own people, its own guardian barring the stair above.
          To clear one is not to pass a level; it is to conquer a realm. The first five carry you from empty fields
          to the first great city. What waits higher is not yet spoken of.
        </p>
      </div>

      <div className={inView ? 'spine-on' : ''}>
        <SpineTracker floors={FLOORS} active={active} />
      </div>

      <div className="floors__track">
        {FLOORS.map((f, i) =>
          f.status === 'locked' ? (
            <LockedFloor key={f.n} f={f} index={i} refCb={(el) => (refs.current[i] = el)} />
          ) : (
            <RevealedFloor
              key={f.n}
              f={f}
              index={i}
              refCb={(el) => (refs.current[i] = el)}
              open={openN === f.n}
              onToggle={() => setOpenN(openN === f.n ? null : f.n)}
              navigate={navigate}
            />
          )
        )}
      </div>
    </section>
  );
}
