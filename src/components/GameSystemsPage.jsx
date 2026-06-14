import { ATTRIBUTES, CLASSIFICATIONS, PLAYER_PROGRESSION, LEVEL_BANDS, RANK_SYSTEM, HERO_STATS_EXPLAINER } from '../data/canon.js';
import './EntryPage.css';
import './SystemsPage.css';

export default function GameSystemsPage({ navigate }) {
  return (
    <div className="entry" style={{ '--accent': '#60E8DC' }}>
      <div className="entry__nav">
        <button className="entry__back" onClick={() => navigate('#/')}>← Home</button>
        <span className="entry__crumb"><b>Stats &amp; Systems</b></span>
      </div>

      <header className="entry__banner">
        <p className="entry__eyebrow">Core Game Systems</p>
        <h1 className="entry__name">Stats &amp; Systems</h1>
        <p className="entry__sub">Every combat-capable being in the Spire — hero, beast, guardian, or god — shares one language of power.</p>
      </header>

      <div className="entry__body">
        <section className="entry__sec">
          <button className="entry__back" style={{ fontSize: '0.82rem', padding: '0.7rem 1.3rem' }} onClick={() => navigate('#/systems/combat')}>
            ⚔ Combat Mathematics &amp; Damage Calculator →
          </button>
        </section>

        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">The Six Universal Attributes</h2>
          <div className="entry__grid">
            {ATTRIBUTES.map((a) => (
              <div key={a.key} className="entry__panel entry__panel--accent">
                <h3 className="entry__panel-h">{a.name}</h3>
                <p className="entry__p">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">Player Attribute Progression</h2>
          <p className="entry__p">{PLAYER_PROGRESSION.intro}</p>
          <div className="entry__grid" style={{ marginTop: 'var(--sp-3)' }}>
            <div className="entry__panel">
              <h3 className="entry__panel-h">Points by Level</h3>
              <table className="sys-table"><tbody>
                {PLAYER_PROGRESSION.table.map((r) => (
                  <tr key={r.lvl}><td>{r.lvl}</td><td className="sys-table__v">{r.pts}</td></tr>
                ))}
              </tbody></table>
              <p className="entry__p entry__p--dim" style={{ marginTop: 'var(--sp-2)' }}>{PLAYER_PROGRESSION.finalTotal}</p>
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">The Character Sheet</h3>
              <ul className="sys-list">{PLAYER_PROGRESSION.sheet.map((s) => <li key={s}>{s}</li>)}</ul>
              {PLAYER_PROGRESSION.formulas.map((f) => <p key={f} className="entry__p" style={{ marginTop: '0.6rem', fontSize: '0.92rem' }}>{f}</p>)}
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">Soft Caps (natural investment)</h3>
              <table className="sys-table"><tbody>
                {PLAYER_PROGRESSION.softCaps.map((s) => (
                  <tr key={s.band}><td>{s.band}</td><td>{s.effect}</td></tr>
                ))}
              </tbody></table>
              <p className="entry__p entry__p--dim" style={{ marginTop: 'var(--sp-2)', fontSize: '0.85rem' }}>{PLAYER_PROGRESSION.note}</p>
            </div>
          </div>
        </section>

        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">{HERO_STATS_EXPLAINER.title}</h2>
          <div className="entry__grid">
            <div className="entry__panel entry__panel--accent">
              <ul className="sys-list">
                {HERO_STATS_EXPLAINER.points.map((p) => <li key={p} style={{ marginBottom: '0.5rem' }}>{p}</li>)}
              </ul>
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">The Character Sheet</h3>
              <p className="entry__p">{HERO_STATS_EXPLAINER.sheet}</p>
            </div>
          </div>
        </section>

        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">Level Bands &amp; Creature Ranks</h2>
          <div className="entry__grid">
            <div className="entry__panel entry__panel--accent">
              <h3 className="entry__panel-h">Floor 1 Level Bands</h3>
              {LEVEL_BANDS.map((b) => (
                <div key={b.lvl} className="sys-band"><span className="sys-band__lvl">{b.lvl}</span><span className="sys-band__d">{b.desc}</span></div>
              ))}
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">Ecological Ranks</h3>
              <p className="entry__p entry__p--dim" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>{RANK_SYSTEM.ecological.join(' → ')}</p>
              {RANK_SYSTEM.defs.map((r) => (
                <div key={r.rank} className="sys-rank"><span className="sys-rank__k">{r.rank}</span><span className="sys-rank__d">{r.d}</span></div>
              ))}
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">Named-Rare Respawn Types</h3>
              {RANK_SYSTEM.respawn.map((r) => (
                <div key={r.type} className="sys-rank"><span className="sys-rank__k">{r.type}</span><span className="sys-rank__d">{r.d}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">Supporting Classifications</h2>
          <div className="entry__grid">
            {Object.entries(CLASSIFICATIONS).map(([k, vals]) => (
              <div key={k} className="entry__panel">
                <h3 className="entry__panel-h">{k}</h3>
                <div className="entry__related">{vals.map((v) => <span key={v} className="entry__tag">{v}</span>)}</div>
              </div>
            ))}
          </div>
        </section>

        <p className="entry__p entry__p--dim" style={{ textAlign: 'center', fontStyle: 'italic' }}>
          Per-floor creatures, named rares, and regional elites are catalogued within each floor's own archive.
        </p>
      </div>
    </div>
  );
}
