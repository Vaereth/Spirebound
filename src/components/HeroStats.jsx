import { ATTR_ORDER, ATTR_LABEL, HERO_BASELINE_RULE } from '../data/canon.js';
import './HeroStats.css';

const ATTR_COLOR = {
  vitality: '#e0584f', might: '#e8a23c', guard: '#c9b24b',
  arcana: '#60a8e8', ward: '#9b7fd0', mobility: '#5ec98a',
};

// The clean Level 1 character sheet: all six visible attributes at 0,
// with the traceable Allocated · Gear · Temporary · Effective columns.
export default function HeroLevel1Sheet() {
  const base = HERO_BASELINE_RULE.level1;
  return (
    <div className="hsheet">
      <div className="hsheet__head">
        <span className="hsheet__title">Character Sheet</span>
        <span className="hsheet__lvl">Level 1 · Base</span>
      </div>
      <div className="hsheet__cols">
        <span className="hsheet__col-h">Attribute</span>
        <span className="hsheet__col-h">Alloc</span>
        <span className="hsheet__col-h">Gear</span>
        <span className="hsheet__col-h">Temp</span>
        <span className="hsheet__col-h hsheet__col-h--eff">Effective</span>
      </div>
      {ATTR_ORDER.map((k) => (
        <div className="hsheet__row" key={k}>
          <span className="hsheet__attr"><span className="hsheet__dot" style={{ background: ATTR_COLOR[k] }} />{ATTR_LABEL[k]}</span>
          <span className="hsheet__v">{base[k]}</span>
          <span className="hsheet__v hsheet__v--dim">—</span>
          <span className="hsheet__v hsheet__v--dim">—</span>
          <span className="hsheet__v hsheet__v--eff">{base[k]}</span>
        </div>
      ))}
      <div className="hsheet__row hsheet__row--total">
        <span className="hsheet__attr">Allocated Total</span>
        <span className="hsheet__v">{base.allocatedTotal}</span>
        <span className="hsheet__v hsheet__v--dim">—</span>
        <span className="hsheet__v hsheet__v--dim">—</span>
        <span className="hsheet__v hsheet__v--eff">0</span>
      </div>
      <p className="hsheet__note">
        Climbers begin at 0 in every attribute — the sheet stays clean and traceable. Every point earned later
        comes from levelling, gear, enchantments, or permanent rewards. The hero is fully functional now through
        their base template; attributes only enhance it.
      </p>
    </div>
  );
}
