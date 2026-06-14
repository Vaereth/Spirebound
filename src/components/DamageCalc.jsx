import { useState, useMemo } from 'react';
import './DamageCalc.css';

// ---- Canon formulas (Combat Mathematics doc) ----
const offenseMult = (s) => 1 + (2.5 * s) / (400 + s);          // Might / Arcana
const mitigation = (d) => 400 / (400 + d);                      // Guard / Ward
const vitalityMult = (v) => 1 + (2 * v) / (500 + v);           // Vitality → HP

const AFFINITY = {
  'Severe weakness': 1.5, 'Weakness': 1.25, 'Neutral': 1.0,
  'Resistance': 0.8, 'Strong resistance': 0.6, 'Immunity': 0.0,
};
const BLOCK = {
  'None': 1.0, 'Weak block': 0.7, 'Standard block': 0.5,
  'Strong block': 0.3, 'Perfect block': 0.1, 'Perfect parry': 0.0,
};

function Num({ label, value, set, min = 0, max = 2000, step = 1, hint }) {
  return (
    <label className="dc-field">
      <span className="dc-field__label">{label}{hint && <span className="dc-field__hint"> {hint}</span>}</span>
      <input className="dc-field__input" type="number" value={value} min={min} max={max} step={step}
        onChange={(e) => set(Math.max(min, Math.min(max, Number(e.target.value) || 0)))} />
    </label>
  );
}

export default function DamageCalc() {
  const [basePower, setBasePower] = useState(100);
  const [offStat, setOffStat] = useState(100);     // Might or Arcana
  const [defStat, setDefStat] = useState(100);     // Guard or Ward
  const [pctPen, setPctPen] = useState(0);         // 0-60
  const [flatPen, setFlatPen] = useState(0);
  const [crit, setCrit] = useState(false);
  const [critMult, setCritMult] = useState(1.5);
  const [affinity, setAffinity] = useState('Neutral');
  const [block, setBlock] = useState('None');
  const [stability, setStability] = useState(0);   // rank/guardian % final reduction
  const [shield, setShield] = useState(0);         // flat absorb
  const [school, setSchool] = useState('Physical');

  const r = useMemo(() => {
    // 1-7 offense
    const raw0 = basePower * offenseMult(offStat);
    const afterCrit = crit ? raw0 * critMult : raw0;
    const afterAffinity = afterCrit * (AFFINITY[affinity] ?? 1);
    // 8-9 penetration
    const effDef = Math.max(0, defStat * (1 - pctPen / 100) - flatPen);
    // 10 mitigation
    const afterMit = afterAffinity * mitigation(effDef);
    // 11 rank stability (final % reduction)
    const afterStability = afterMit * (1 - stability / 100);
    // 12 block
    const afterBlock = afterStability * (BLOCK[block] ?? 1);
    // 13 shield
    const afterShield = Math.max(0, afterBlock - shield);
    // 14 caps/floors: min 1 if it was a damaging non-zero hit; 15% raw floor from mitigation alone
    let final = afterShield;
    const isNullified = (AFFINITY[affinity] === 0) || (BLOCK[block] === 0);
    if (!isNullified) final = Math.max(1, final);
    return {
      raw: raw0, offMult: offenseMult(offStat), effDef, mit: mitigation(effDef),
      afterCrit, afterAffinity, afterMit, afterStability, afterBlock, final, isNullified,
    };
  }, [basePower, offStat, defStat, pctPen, flatPen, crit, critMult, affinity, block, stability, shield]);

  const offLabel = school === 'Physical' ? 'Might' : 'Arcana';
  const defLabel = school === 'Physical' ? 'Guard' : 'Ward';

  return (
    <div className="dc">
      <div className="dc__schools">
        {['Physical', 'Magical'].map((s) => (
          <button key={s} className={`dc__school ${school === s ? 'is-on' : ''}`} onClick={() => setSchool(s)}>{s}</button>
        ))}
      </div>

      <div className="dc__cols">
        <div className="dc__group">
          <h4 className="dc__group-h">Attacker</h4>
          <Num label="Base Power" value={basePower} set={setBasePower} max={5000} />
          <Num label={`Effective ${offLabel}`} value={offStat} set={setOffStat} hint={`(×${r.offMult.toFixed(3)})`} />
          <label className="dc-field dc-field--row">
            <span className="dc-field__label">Critical hit (×)</span>
            <span className="dc-field__inline">
              <input type="checkbox" checked={crit} onChange={(e) => setCrit(e.target.checked)} />
              <input className="dc-field__input dc-field__input--sm" type="number" value={critMult} min={1} max={5} step={0.05} disabled={!crit}
                onChange={(e) => setCritMult(Number(e.target.value) || 1.5)} />
            </span>
          </label>
          <label className="dc-field">
            <span className="dc-field__label">Affinity</span>
            <select className="dc-field__input" value={affinity} onChange={(e) => setAffinity(e.target.value)}>
              {Object.keys(AFFINITY).map((a) => <option key={a}>{a}</option>)}
            </select>
          </label>
          <Num label="% Penetration" value={pctPen} set={setPctPen} max={60} hint="(cap 60)" />
          <Num label="Flat Penetration" value={flatPen} set={setFlatPen} max={2000} />
        </div>

        <div className="dc__group">
          <h4 className="dc__group-h">Defender</h4>
          <Num label={`Effective ${defLabel}`} value={defStat} set={setDefStat} hint={`(→ eff ${r.effDef.toFixed(0)}, ×${r.mit.toFixed(3)})`} />
          <label className="dc-field">
            <span className="dc-field__label">Block / Parry</span>
            <select className="dc-field__input" value={block} onChange={(e) => setBlock(e.target.value)}>
              {Object.keys(BLOCK).map((b) => <option key={b}>{b}</option>)}
            </select>
          </label>
          <Num label="Rank / Guardian Stability %" value={stability} set={setStability} max={50} hint="(final reduction)" />
          <Num label="Shield / Barrier (flat absorb)" value={shield} set={setShield} max={5000} />
        </div>
      </div>

      <div className="dc__result">
        <div className="dc__final">
          <span className="dc__final-label">Final Damage</span>
          <span className="dc__final-value">{r.final.toFixed(1)}</span>
          {r.isNullified && <span className="dc__final-note">Nullified (immunity / perfect parry)</span>}
        </div>
        <div className="dc__steps">
          <Step k="Raw (Base × offense curve)" v={r.raw} />
          {crit && <Step k={`After crit ×${critMult}`} v={r.afterCrit} />}
          {affinity !== 'Neutral' && <Step k={`After affinity (${affinity})`} v={r.afterAffinity} />}
          <Step k={`After mitigation (eff ${defLabel} ${r.effDef.toFixed(0)})`} v={r.afterMit} />
          {stability > 0 && <Step k={`After Stability −${stability}%`} v={r.afterStability} />}
          {block !== 'None' && <Step k={`After ${block}`} v={r.afterBlock} />}
          {shield > 0 && <Step k={`After shield −${shield}`} v={r.final} />}
        </div>
      </div>

      <p className="dc__disclaimer">
        Implements the canon curves: offense ×(1 + 2.5·S/(400+S)), mitigation ×400/(400+D), penetration, crit, affinity,
        Stability, block, and shield — in calculation order. Base Power and final balance numbers are illustrative; real
        move values are separate balancing work.
      </p>
    </div>
  );
}

function Step({ k, v }) {
  return <div className="dc-step"><span className="dc-step__k">{k}</span><span className="dc-step__v">{v.toFixed(1)}</span></div>;
}
