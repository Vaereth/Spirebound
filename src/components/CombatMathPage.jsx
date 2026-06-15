import { COMBAT_MATH, RANK_COMBAT, THREAT_GRADES, BOSS_MATH } from '../data/canon.js';
import DamageCalc from './DamageCalc.jsx';
import GradeBadge from './GradeBadge.jsx';
import { Page, Stack, StickyContents, DataSplit, CardMatrix } from './Layout.jsx';
import { GlassPanel, StonePanel, PanelHeader } from './Surfaces.jsx';
import SectionRail, { useSectionSpy } from './SectionRail.jsx';
import './CombatMath.css';
import './CombatMathPage.css';

const SECTIONS = [
  { id: 'calc', label: 'Calculator' },
  { id: 'offense', label: 'Offense' },
  { id: 'defense', label: 'Defense' },
  { id: 'vitality', label: 'Vitality' },
  { id: 'modifiers', label: 'Modifiers' },
  { id: 'order', label: 'Calc Order' },
  { id: 'ranks', label: 'Rank Rules' },
  { id: 'boss', label: 'Boss Math' },
  { id: 'ladder', label: 'Threat Ladder' },
];

function ScaleTable({ rows, cols, pick }) {
  return (
    <div className="cm-tablewrap">
      <table className="cm-table">
        <thead><tr>{cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => { const vals = pick(r); return <tr key={i}>{vals.map((v, j) => <td key={j} className={j === 0 ? 'cm-table__k' : ''}>{v}</td>)}</tr>; })}
        </tbody>
      </table>
    </div>
  );
}

// formula beside a table/example
function FormulaBlock({ id, title, formula, legend, children, setRef }) {
  return (
    <section id={id} ref={setRef(id)}>
      <h2 className="cm2__h">{title}</h2>
      <DataSplit
        left={
          <GlassPanel accent="var(--accent-interface)">
            <PanelHeader eyebrow="Formula" />
            <div className="cm-formula">{formula}</div>
            {legend && <p className="cm2__p cm2__p--dim">{legend}</p>}
          </GlassPanel>
        }
        right={children}
      />
    </section>
  );
}

export default function CombatMathPage({ navigate }) {
  const M = COMBAT_MATH;
  const { active, setRef, go } = useSectionSpy(SECTIONS.map((s) => s.id));

  return (
    <Page variant="wide" className="cm2">
      <div className="cm2__topnav">
        <button className="cm2__back" onClick={() => navigate('#/systems')}>← Stats &amp; Systems</button>
        <span className="cm2__crumb"><b>Combat Mathematics</b></span>
      </div>
      <header className="cm2__head">
        <p className="cm2__eyebrow">Core Game Systems · For the Number-Minded</p>
        <h1 className="cm2__title">Combat Mathematics</h1>
        <p className="cm2__lead">{M.principle}</p>
      </header>

      <StickyContents rail={<SectionRail sections={SECTIONS} active={active} onGo={go} title="Combat Math" />}>
        <Stack gap="section">
          <section id="calc" ref={setRef('calc')}>
            <h2 className="cm2__h">Damage Calculator</h2>
            <p className="cm2__p cm2__p--dim">Outgoing and incoming damage, computed live with the canon curves and calculation order.</p>
            <GlassPanel accent="var(--accent-interface)" style={{ marginTop: 'var(--sp-2)' }}><DamageCalc /></GlassPanel>
          </section>

          <FormulaBlock id="offense" title={M.offense.title} formula={M.offense.formula} legend={`${M.offense.legend} ${M.offense.note}`} setRef={setRef}>
            <GlassPanel accent="var(--accent-interface)"><PanelHeader eyebrow="Scaling" /><ScaleTable rows={M.offense.table} cols={['Effective Stat', 'Multiplier']} pick={(r) => [r.s, r.mult]} /></GlassPanel>
          </FormulaBlock>

          <FormulaBlock id="defense" title={M.defense.title} formula={M.defense.formula} setRef={setRef}>
            <GlassPanel accent="var(--accent-interface)"><PanelHeader eyebrow="Mitigation" /><ScaleTable rows={M.defense.table} cols={['Guard / Ward', 'Taken', 'Reduction']} pick={(r) => [r.d, r.taken, r.red]} /></GlassPanel>
          </FormulaBlock>

          <FormulaBlock id="vitality" title={M.vitality.title} formula={M.vitality.formula} setRef={setRef}>
            <GlassPanel accent="var(--accent-interface)"><PanelHeader eyebrow="Health" /><ScaleTable rows={M.vitality.table} cols={['Vitality', 'Health Multiplier']} pick={(r) => [r.v, r.mult]} /></GlassPanel>
          </FormulaBlock>

          <section id="modifiers" ref={setRef('modifiers')}>
            <h2 className="cm2__h">Mobility, Penetration, Crits &amp; More</h2>
            <CardMatrix min={250}>
              <GlassPanel accent="var(--accent-interface)"><PanelHeader eyebrow="Mobility" title="Capped Curves" />{M.mobility.map((m) => <div key={m.k} className="cm-row"><span className="cm-row__k">{m.k}</span><span className="cm-row__cap">{m.cap}</span><code className="cm-row__f">{m.f}</code></div>)}</GlassPanel>
              <GlassPanel accent="var(--accent-interface)"><PanelHeader eyebrow="Affinity" title="Modifiers" />{M.affinity.map((a) => <div key={a.k} className="cm-pair"><span>{a.k}</span><b>{a.m}</b></div>)}</GlassPanel>
              <GlassPanel accent="var(--accent-interface)"><PanelHeader eyebrow="Defense" title="Blocking & Parrying" />{M.blocking.map((b) => <div key={b.k} className="cm-pair"><span>{b.k}</span><b>{b.m}</b></div>)}</GlassPanel>
              <GlassPanel accent="var(--accent-interface)"><PanelHeader eyebrow="Penetration & Crits" />{<><p className="cm2__p">{M.penetration}</p><p className="cm2__p">{M.crit}</p></>}</GlassPanel>
              <GlassPanel accent="var(--accent-interface)"><PanelHeader eyebrow="Dual-Attribute Scaling" /><p className="cm2__p">{M.dualScaling}</p></GlassPanel>
              <GlassPanel accent="var(--accent-interface)"><PanelHeader eyebrow="Limits & Floors" /><ul className="cm2__list">{M.limits.map((l) => <li key={l}>{l}</li>)}</ul></GlassPanel>
            </CardMatrix>
          </section>

          <section id="order" ref={setRef('order')}>
            <h2 className="cm2__h">Calculation Order</h2>
            <GlassPanel accent="var(--accent-interface)"><ol className="cm-order">{M.order.map((o, i) => <li key={i}>{o}</li>)}</ol></GlassPanel>
          </section>

          <section id="ranks" ref={setRef('ranks')}>
            <h2 className="cm2__h">Rank Combat Rules</h2>
            <CardMatrix min={240}>
              {RANK_COMBAT.map((r) => <GlassPanel key={r.rank} accent="var(--accent-interface)"><PanelHeader eyebrow="Rank" title={r.rank} /><p className="cm2__p">{r.rule}</p></GlassPanel>)}
            </CardMatrix>
          </section>

          <section id="boss" ref={setRef('boss')}>
            <h2 className="cm2__h">Boss &amp; Guardian Math</h2>
            <p className="cm2__p cm2__p--dim">The rules that support Floor Guardians like Fenrath, layered on the universal equations.</p>
            <CardMatrix min={260}>
              <StonePanel accent="var(--accent-guardian)"><PanelHeader eyebrow="Guardian Stability" accent="var(--accent-guardian)" /><p className="cm2__p">{BOSS_MATH.stabilityFormula}</p><p className="cm2__p cm2__p--ex"><b>Example —</b> {BOSS_MATH.stabilityExample}</p><p className="cm2__p cm2__p--ex"><b>Interpolation —</b> {BOSS_MATH.stabilityInterp}</p></StonePanel>
              <GlassPanel accent="var(--accent-guardian)"><PanelHeader eyebrow="Phase Health" accent="var(--accent-guardian)" /><p className="cm2__p">{BOSS_MATH.phaseHealth}</p></GlassPanel>
              <GlassPanel accent="var(--accent-guardian)"><PanelHeader eyebrow="Phase Integrity" accent="var(--accent-guardian)" /><p className="cm2__p">{BOSS_MATH.phaseIntegrity}</p></GlassPanel>
              <GlassPanel accent="var(--accent-guardian)"><PanelHeader eyebrow="Stagger Generation" accent="var(--accent-guardian)" /><p className="cm2__p">{BOSS_MATH.staggerGen}</p></GlassPanel>
              <GlassPanel accent="var(--accent-guardian)"><PanelHeader eyebrow="Bleed & Crushed Guard" accent="var(--accent-guardian)" /><p className="cm2__p">{BOSS_MATH.bleed}</p><p className="cm2__p cm2__p--ex">{BOSS_MATH.crushedGuard}</p></GlassPanel>
              <GlassPanel accent="var(--accent-guardian)"><PanelHeader eyebrow="Status Caps" accent="var(--accent-guardian)" /><ul className="cm2__list">{BOSS_MATH.statusCaps.map((s) => <li key={s}>{s}</li>)}</ul><p className="cm2__p cm2__p--dim">{BOSS_MATH.statusRule}</p></GlassPanel>
              <StonePanel accent="var(--accent-blood)"><PanelHeader eyebrow="Phase 3 Execution Rule" accent="var(--accent-blood)" /><p className="cm2__p">{BOSS_MATH.execution}</p></StonePanel>
              <GlassPanel accent="var(--accent-guardian)"><PanelHeader eyebrow="Difficulty Application Order" accent="var(--accent-guardian)" /><ol className="cm-order">{BOSS_MATH.diffOrder.map((o, i) => <li key={i}>{o}</li>)}</ol></GlassPanel>
            </CardMatrix>
          </section>

          <section id="ladder" ref={setRef('ladder')}>
            <h2 className="cm2__h">The Guild Threat-Grade Ladder</h2>
            <p className="cm2__p cm2__p--dim">{THREAT_GRADES.note}</p>
            <div className="cm-ladder">
              {THREAT_GRADES.public.map((g) => (
                <div key={g.g} className="cm-grade-row">
                  <GradeBadge grade={g.g} size="md" />
                  <div><p className="cm-grade-name">{g.name}</p><p className="cm-grade-desc">{g.desc}</p><p className="cm-grade-resp"><b>Response:</b> {g.response}</p></div>
                </div>
              ))}
            </div>
            <p className="cm2__p cm2__p--dim cm2__tbd">Restricted classes — Calamity, Cataclysm, Extinction, and Tower — appear only in the Sealed Archive.</p>
          </section>
        </Stack>
      </StickyContents>
    </Page>
  );
}
