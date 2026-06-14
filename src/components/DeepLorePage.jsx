import { useState } from 'react';
import { DEEP_LORE, FENRATH_STATS } from '../data/canon.js';
import { StatPanel, StatBars } from './StatBlock.jsx';
import './EntryPage.css';
import './DeepLore.css';

export default function DeepLorePage({ navigate }) {
  const [revealed, setRevealed] = useState(false);
  const D = DEEP_LORE;

  if (!revealed) {
    return (
      <div className="entry dl" style={{ '--accent': '#9a2f23' }}>
        <div className="entry__nav">
          <button className="entry__back" onClick={() => navigate('#/floors/1')}>← The Verdant Reach</button>
          <span className="entry__crumb">Restricted · <b>Sealed Archive</b></span>
        </div>
        <div className="dl__gate">
          <span className="dl__seal" aria-hidden="true">⛓</span>
          <h1 className="dl__gate-title">The Sealed Archive</h1>
          <p className="dl__gate-warn">
            Beyond this point lies endgame and ending-defining material: the truth beneath Floor 1,
            the Hundredfold Seal, the true corrupt god, the Seven Buried Elites, the proofless and
            flawless Guardian, and the First Blight.
          </p>
          <p className="dl__gate-warn dl__gate-warn--strong">These are deliberate spoilers. They are not meant for new climbers.</p>
          <div className="dl__gate-actions">
            <button className="dl__reveal" onClick={() => setRevealed(true)}>I understand — unseal the archive</button>
            <button className="dl__decline" onClick={() => navigate('#/floors/1')}>Take me back</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="entry dl" style={{ '--accent': '#9a2f23' }}>
      <div className="entry__nav">
        <button className="entry__back" onClick={() => navigate('#/floors/1')}>← The Verdant Reach</button>
        <span className="entry__crumb">Restricted · <b>Sealed Archive — Unsealed</b></span>
        <button className="entry__back" onClick={() => setRevealed(false)} style={{ marginLeft: 'auto' }}>Re-seal</button>
      </div>

      <header className="entry__banner">
        <p className="entry__eyebrow">Restricted Records · Spoilers</p>
        <h1 className="entry__name">The Truth Beneath the First Step</h1>
        <p className="entry__sub">Floor 1 is not merely the first floor. It is the lid above the prison.</p>
      </header>

      <div className="entry__body">
        {/* The Hundredfold Seal */}
        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">{D.seal.title}</h2>
          <p className="entry__p">{D.seal.summary}</p>
          <div className="entry__grid" style={{ marginTop: 'var(--sp-3)' }}>
            <div className="entry__panel entry__panel--accent">
              <h3 className="entry__panel-h">Every Guardian's Two Functions</h3>
              <ul className="dl__list">{D.seal.functions.map((f) => <li key={f}>{f}</li>)}</ul>
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">Killing a Guardian</h3>
              <ul className="dl__list">{D.seal.kill.map((f) => <li key={f}>{f}</li>)}</ul>
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">Reviving a Guardian</h3>
              <ul className="dl__list">{D.seal.revive.map((f) => <li key={f}>{f}</li>)}</ul>
            </div>
          </div>
          <h3 className="entry__panel-h" style={{ marginTop: 'var(--sp-3)' }}>Article States</h3>
          <div className="entry__grid">
            {D.seal.states.map((s) => (
              <div key={s.s} className="dl__state"><span className="dl__state-k">{s.s}</span><span className="dl__state-d">{s.d}</span></div>
            ))}
          </div>
        </section>

        {/* Corruption cause */}
        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">{D.corruptionCause.title}</h2>
          <p className="entry__p">{D.corruptionCause.canon}</p>
          <div className="entry__panel" style={{ marginTop: 'var(--sp-3)' }}>
            <h3 className="entry__panel-h">Encroachment Sequence</h3>
            <div className="dl__seq">{D.corruptionCause.sequence.map((s, i) => <span key={s} className="dl__seq-step">{i + 1}. {s}</span>)}</div>
          </div>
          <p className="entry__p" style={{ marginTop: 'var(--sp-2)', fontStyle: 'italic', color: 'var(--summit)' }}>{D.corruptionCause.revivalRule}</p>
        </section>

        {/* Fenrath gated stats */}
        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">Fenrath — Beyond the Public Record</h2>
          <div className="entry__grid">
            <div className="entry__panel entry__panel--accent">
              <h3 className="entry__panel-h">{FENRATH_STATS.proofless.label} · Total {FENRATH_STATS.proofless.total}</h3>
              <StatBars stats={FENRATH_STATS.proofless.stats} total={FENRATH_STATS.proofless.total} maxScale={110} />
              <ul className="dl__list" style={{ marginTop: 'var(--sp-2)' }}>{FENRATH_STATS.proofless.props.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">{FENRATH_STATS.flawless.label}</h3>
              <p className="entry__p entry__p--dim" style={{ fontStyle: 'italic' }}>{FENRATH_STATS.flawless.trigger}</p>
              <ul className="dl__list" style={{ marginTop: 'var(--sp-2)' }}>{FENRATH_STATS.flawless.props.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          </div>
        </section>

        {/* Seven Buried Elites */}
        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">The Seven Buried Elites</h2>
          <p className="entry__p">{D.sevenElites.intro}</p>
          <div className="entry__grid" style={{ marginTop: 'var(--sp-3)' }}>
            {D.sevenElites.list.map((e) => (
              <div key={e.name} className="entry__panel entry__panel--accent">
                <div className="sys-rare__head">
                  <h3 className="sys-rare__name">{e.name}</h3>
                  <span className="sys-rare__species" style={{ color: '#d98a6a' }}>{e.concept} · {e.level} · Total {e.total}</span>
                </div>
                <p className="entry__p" style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>{e.identity}</p>
                <StatBars stats={e.stats} total={e.total} maxScale={110} />
              </div>
            ))}
          </div>
          <p className="entry__p" style={{ marginTop: 'var(--sp-2)', fontStyle: 'italic', color: 'var(--summit)' }}>{D.sevenElites.consequence}</p>
        </section>

        {/* The corrupt god */}
        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">{D.corruptGod.title}</h2>
          <p className="entry__p entry__p--dim">Final true name: {D.corruptGod.finalName}</p>
          <div className="entry__related" style={{ margin: 'var(--sp-2) 0' }}>
            {D.corruptGod.classifications.map((c) => <span key={c} className="entry__tag entry__tag--accent">{c}</span>)}
          </div>
          <p className="entry__p">{D.corruptGod.summary}</p>

          <div className="dl__god">
            <div className="entry__panel entry__panel--accent">
              <h3 className="entry__panel-h">Stat Profile · Total {D.corruptGod.total}</h3>
              <StatPanel stats={D.corruptGod.stats} total={D.corruptGod.total} accent="#9a2f23" maxScale={910} />
              <ul className="dl__list" style={{ marginTop: 'var(--sp-2)' }}>{D.corruptGod.statNotes.map((n) => <li key={n}>{n}</li>)}</ul>
            </div>
          </div>

          <p className="entry__p" style={{ marginTop: 'var(--sp-3)' }}>{D.corruptGod.encounter}</p>
          <div className="entry__grid" style={{ marginTop: 'var(--sp-2)' }}>
            {D.corruptGod.phases.map((p) => (
              <div key={p.name} className="entry__panel">
                <h3 className="entry__panel-h">{p.name}</h3>
                <p className="entry__p" style={{ fontSize: '0.9rem' }}>{p.d}</p>
              </div>
            ))}
          </div>

          <div className="entry__panel" style={{ marginTop: 'var(--sp-3)' }}>
            <h3 className="entry__panel-h">Reward — {D.corruptGod.reward.name}</h3>
            <div className="entry__related">{D.corruptGod.reward.props.map((p) => <span key={p} className="entry__tag">{p}</span>)}</div>
            <p className="entry__p entry__p--dim" style={{ marginTop: '0.6rem', fontSize: '0.85rem' }}>{D.corruptGod.reward.note}</p>
          </div>
        </section>

        {/* Floor 100 */}
        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">{D.floor100.title}</h2>
          <p className="entry__p">{D.floor100.summary}</p>
        </section>

        <p className="entry__p entry__p--dim" style={{ textAlign: 'center', fontStyle: 'italic' }}>
          Anything marked TBD is not yet canon and must not be invented.
        </p>
      </div>
    </div>
  );
}
