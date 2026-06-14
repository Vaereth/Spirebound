import { ATTRIBUTES, CLASSIFICATIONS, PLAYER_PROGRESSION, LEVEL_BANDS, RANK_SYSTEM, NAMED_RARES, REGIONAL_ELITES } from '../data/canon.js';
import { StatBars } from './StatBlock.jsx';
import './EntryPage.css';
import './SystemsPage.css';

export default function SystemsPage({ navigate }) {
  return (
    <div className="entry" style={{ '--accent': '#60E8DC' }}>
      <div className="entry__nav">
        <button className="entry__back" onClick={() => navigate('#/floors/1')}>← Floor 1</button>
        <span className="entry__crumb">The Verdant Reach · <b>Stats &amp; Systems</b></span>
      </div>

      <header className="entry__banner">
        <p className="entry__eyebrow">Ascendant Guild Reference</p>
        <h1 className="entry__name">Stats &amp; Systems</h1>
        <p className="entry__sub">Every combat-capable being in the Spire shares one language of power.</p>
      </header>

      <div className="entry__body">
        {/* Attributes */}
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

        {/* Player progression */}
        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">Player Attribute Progression</h2>
          <p className="entry__p">{PLAYER_PROGRESSION.intro}</p>
          <div className="entry__grid" style={{ marginTop: 'var(--sp-3)' }}>
            <div className="entry__panel">
              <h3 className="entry__panel-h">Points by Level</h3>
              <table className="sys-table">
                <tbody>
                  {PLAYER_PROGRESSION.table.map((r) => (
                    <tr key={r.lvl}><td>{r.lvl}</td><td className="sys-table__v">{r.pts}</td></tr>
                  ))}
                </tbody>
              </table>
              <p className="entry__p entry__p--dim" style={{ marginTop: 'var(--sp-2)' }}>{PLAYER_PROGRESSION.finalTotal}</p>
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">The Character Sheet</h3>
              <ul className="sys-list">{PLAYER_PROGRESSION.sheet.map((s) => <li key={s}>{s}</li>)}</ul>
              {PLAYER_PROGRESSION.formulas.map((f) => <p key={f} className="entry__p" style={{ marginTop: '0.6rem', fontSize: '0.92rem' }}>{f}</p>)}
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">Soft Caps (natural investment)</h3>
              <table className="sys-table">
                <tbody>
                  {PLAYER_PROGRESSION.softCaps.map((s) => (
                    <tr key={s.band}><td>{s.band}</td><td>{s.effect}</td></tr>
                  ))}
                </tbody>
              </table>
              <p className="entry__p entry__p--dim" style={{ marginTop: 'var(--sp-2)', fontSize: '0.85rem' }}>{PLAYER_PROGRESSION.note}</p>
            </div>
          </div>
        </section>

        {/* Level bands + ranks */}
        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">Floor 1 Level Bands &amp; Creature Ranks</h2>
          <div className="entry__grid">
            <div className="entry__panel entry__panel--accent">
              <h3 className="entry__panel-h">Level Bands</h3>
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

        {/* Supporting classifications */}
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
