import { NAMED_RARES, REGIONAL_ELITES } from '../data/canon.js';
import { StatBars } from './StatBlock.jsx';
import './EntryPage.css';
import './SystemsPage.css';

export default function SystemsPage({ navigate }) {
  return (
    <div className="entry" style={{ '--accent': '#c98a4a' }}>
      <div className="entry__nav">
        <button className="entry__back" onClick={() => navigate('#/floors/1')}>← Floor 1</button>
        <span className="entry__crumb">The Verdant Reach · <b>Named Rares &amp; Elites</b></span>
        <button className="entry__back" onClick={() => navigate('#/systems')} style={{ marginLeft: 'auto' }}>Core Game Systems →</button>
      </div>

      <header className="entry__banner">
        <p className="entry__eyebrow">Ascendant Guild Records · Floor 1</p>
        <h1 className="entry__name">Named Rares &amp; Regional Elites</h1>
        <p className="entry__sub">The individually-authored threats of the Verdant Reach. For the universal six-attribute system, see Core Game Systems.</p>
      </header>

      <div className="entry__body">
        {/* Named Rares */}
        <section className="entry__sec" id="named-rares">
          <h2 className="entry__sec-h entry__sec-h--display">Floor 1 Named Rares</h2>
          <p className="entry__p entry__p--dim">Unique, conditional, individually authored individuals — shown separately from regional elites.</p>
          <div className="entry__grid" style={{ marginTop: 'var(--sp-3)' }}>
            {NAMED_RARES.map((r) => (
              <div key={r.name} className="entry__panel entry__panel--accent">
                <div className="sys-rare__head">
                  <h3 className="sys-rare__name">{r.name}</h3>
                  <span className="sys-rare__species">{r.species} · {r.rank} · L{r.level}</span>
                </div>
                {r.identity && <p className="entry__p" style={{ fontStyle: 'italic', fontSize: '0.92rem' }}>{r.identity}</p>}
                <StatBars stats={r.stats} total={r.total} maxScale={Math.max(40, ...Object.values(r.stats))} />
                <div className="sys-rare__facts">
                  {r.spawn && <p><b>Spawn:</b> {r.spawn}</p>}
                  {r.combat && <p><b>Combat:</b> {r.combat}</p>}
                  {r.consequence && <p><b>If slain:</b> {r.consequence}</p>}
                  <p><b>Respawn:</b> {r.respawn}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Regional Elites */}
        <section className="entry__sec" id="regional-elites">
          <h2 className="entry__sec-h entry__sec-h--display">Regional Elites</h2>
          <div className="entry__grid">
            {REGIONAL_ELITES.map((e) => (
              <div key={e.name} className="entry__panel">
                <div className="sys-rare__head">
                  <h3 className="sys-rare__name">{e.name}</h3>
                  <span className="sys-rare__species">Level {e.level}</span>
                </div>
                <p className="entry__p" style={{ fontStyle: 'italic', fontSize: '0.92rem' }}>{e.identity}</p>
                <StatBars stats={e.stats} total={e.total} maxScale={Math.max(50, ...Object.values(e.stats))} />
              </div>
            ))}
          </div>
        </section>

        <p className="entry__p entry__p--dim" style={{ textAlign: 'center', fontStyle: 'italic' }}>
          A higher total does not automatically win. Mechanics, terrain, flight, groups, special rules, and executes all matter.
        </p>
      </div>
    </div>
  );
}

