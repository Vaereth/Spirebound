import { COMBAT_MATH, RANK_COMBAT, THREAT_GRADES } from '../data/canon.js';
import DamageCalc from './DamageCalc.jsx';
import GradeBadge from './GradeBadge.jsx';
import './EntryPage.css';
import './SystemsPage.css';
import './CombatMath.css';

export default function CombatMathPage({ navigate }) {
  const M = COMBAT_MATH;
  return (
    <div className="entry" style={{ '--accent': '#60E8DC' }}>
      <div className="entry__nav">
        <button className="entry__back" onClick={() => navigate('#/systems')}>← Stats &amp; Systems</button>
        <span className="entry__crumb"><b>Combat Mathematics</b></span>
      </div>

      <header className="entry__banner">
        <p className="entry__eyebrow">Core Game Systems · For the Number-Minded</p>
        <h1 className="entry__name">Combat Mathematics</h1>
        <p className="entry__sub">{M.principle}</p>
      </header>

      <div className="entry__body">
        {/* Calculator first — the toy */}
        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">Damage Calculator</h2>
          <p className="entry__p entry__p--dim">Outgoing and incoming damage, computed live with the canon curves and calculation order.</p>
          <div className="entry__panel entry__panel--accent" style={{ marginTop: 'var(--sp-3)' }}>
            <DamageCalc />
          </div>
        </section>

        {/* Offense */}
        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">{M.offense.title}</h2>
          <div className="cm-formula">{M.offense.formula}</div>
          <p className="entry__p entry__p--dim">{M.offense.legend} {M.offense.note}</p>
          <ScaleTable rows={M.offense.table} cols={['Effective Stat', 'Multiplier']} pick={(r) => [r.s, r.mult]} />
        </section>

        {/* Defense */}
        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">{M.defense.title}</h2>
          <div className="cm-formula">{M.defense.formula}</div>
          <p className="entry__p entry__p--dim">{M.defense.legend} {M.defense.note}</p>
          <ScaleTable rows={M.defense.table} cols={['Guard / Ward', 'Damage Taken', 'Reduction']} pick={(r) => [r.d, r.taken, r.red]} />
        </section>

        {/* Vitality */}
        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">{M.vitality.title}</h2>
          <div className="cm-formula">{M.vitality.formula}</div>
          <p className="entry__p entry__p--dim">{M.vitality.note}</p>
          <ScaleTable rows={M.vitality.table} cols={['Vitality', 'Health Multiplier']} pick={(r) => [r.v, r.mult]} />
        </section>

        {/* Mobility + misc grid */}
        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">Mobility, Penetration, Crits &amp; More</h2>
          <div className="entry__grid">
            <div className="entry__panel">
              <h3 className="entry__panel-h">Mobility (capped curves)</h3>
              {M.mobility.map((m) => (
                <div key={m.k} className="cm-row"><span className="cm-row__k">{m.k}</span><span className="cm-row__cap">{m.cap}</span><code className="cm-row__f">{m.f}</code></div>
              ))}
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">Affinity Modifiers</h3>
              {M.affinity.map((a) => <div key={a.k} className="cm-pair"><span>{a.k}</span><b>{a.m}</b></div>)}
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">Blocking &amp; Parrying</h3>
              {M.blocking.map((b) => <div key={b.k} className="cm-pair"><span>{b.k}</span><b>{b.m}</b></div>)}
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">Penetration &amp; Crits</h3>
              <p className="entry__p" style={{ fontSize: '0.88rem' }}>{M.penetration}</p>
              <p className="entry__p" style={{ fontSize: '0.88rem', marginTop: '0.5rem' }}>{M.crit}</p>
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">Dual-Attribute Scaling</h3>
              <p className="entry__p" style={{ fontSize: '0.88rem' }}>{M.dualScaling}</p>
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">Limits &amp; Floors</h3>
              <ul className="sys-list">{M.limits.map((l) => <li key={l}>{l}</li>)}</ul>
            </div>
          </div>
        </section>

        {/* Calc order */}
        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">Calculation Order</h2>
          <ol className="cm-order">{M.order.map((o, i) => <li key={i}>{o}</li>)}</ol>
        </section>

        {/* Rank combat rules */}
        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">Rank Combat Rules</h2>
          <div className="entry__grid">
            {RANK_COMBAT.map((r) => (
              <div key={r.rank} className="entry__panel entry__panel--accent">
                <h3 className="entry__panel-h">{r.rank}</h3>
                <p className="entry__p" style={{ fontSize: '0.9rem' }}>{r.rule}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Threat grade ladder */}
        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">The Guild Threat-Grade Ladder</h2>
          <p className="entry__p entry__p--dim">{THREAT_GRADES.note}</p>
          <div className="cm-ladder">
            {THREAT_GRADES.public.map((g) => (
              <div key={g.g} className="cm-grade-row">
                <GradeBadge grade={g.g} size="md" />
                <div>
                  <p className="cm-grade-name">{g.name}</p>
                  <p className="cm-grade-desc">{g.desc}</p>
                  <p className="cm-grade-resp"><b>Response:</b> {g.response}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="entry__p entry__p--dim" style={{ marginTop: 'var(--sp-2)', fontStyle: 'italic' }}>
            Restricted classes — Calamity, Cataclysm, Extinction, and Tower — appear only in the Sealed Archive.
          </p>
        </section>
      </div>
    </div>
  );
}

function ScaleTable({ rows, cols, pick }) {
  return (
    <div className="cm-tablewrap">
      <table className="cm-table">
        <thead><tr>{cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => {
            const vals = pick(r);
            return <tr key={i}>{vals.map((v, j) => <td key={j} className={j === 0 ? 'cm-table__k' : ''}>{v}</td>)}</tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}
