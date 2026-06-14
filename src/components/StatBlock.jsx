import { ATTR_ORDER, ATTR_LABEL } from '../data/canon.js';
import './StatBlock.css';

const ATTR_COLOR = {
  vitality: '#e0584f', might: '#e8a23c', guard: '#c9b24b',
  arcana: '#60a8e8', ward: '#9b7fd0', mobility: '#5ec98a',
};

// Compact horizontal bars (for cards). maxScale defaults so most Floor-1
// creatures read clearly; pass a higher maxScale for elites/bosses.
export function StatBars({ stats, maxScale = 50, total }) {
  return (
    <div className="sb-bars">
      {ATTR_ORDER.map((k) => {
        const v = stats[k] ?? 0;
        const pct = Math.min(100, (v / maxScale) * 100);
        return (
          <div className="sb-bar" key={k}>
            <span className="sb-bar__label">{ATTR_LABEL[k]}</span>
            <span className="sb-bar__track"><span className="sb-bar__fill" style={{ width: `${pct}%`, background: ATTR_COLOR[k] }} /></span>
            <span className="sb-bar__val">{v}</span>
          </div>
        );
      })}
      {total != null && (
        <div className="sb-bar sb-bar--total">
          <span className="sb-bar__label">Total</span>
          <span className="sb-bar__track" />
          <span className="sb-bar__val">{total}</span>
        </div>
      )}
    </div>
  );
}

// Hexagonal radar (for dedicated pages). maxScale sizes the ring.
export function StatRadarHex({ stats, maxScale, accent = '#60E8DC', size = 280 }) {
  const keys = ATTR_ORDER;
  const n = keys.length;
  const cx = size / 2, cy = size / 2, r = size * 0.36;
  const peak = maxScale || Math.max(...keys.map((k) => stats[k] ?? 0), 1);

  const pt = (i, radius) => {
    const ang = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + Math.cos(ang) * radius, cy + Math.sin(ang) * radius];
  };
  const rings = [0.25, 0.5, 0.75, 1];
  const dataPts = keys.map((k, i) => pt(i, (Math.min(stats[k] ?? 0, peak) / peak) * r));
  const dataPath = dataPts.map((p) => p.join(',')).join(' ');

  return (
    <svg className="sb-radar" viewBox={`0 0 ${size} ${size}`} style={{ '--accent': accent }}>
      {rings.map((rr, ri) => (
        <polygon key={ri} points={keys.map((_, i) => pt(i, r * rr).join(',')).join(' ')} className="sb-radar__ring" />
      ))}
      {keys.map((_, i) => { const [x, y] = pt(i, r); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} className="sb-radar__spoke" />; })}
      <polygon points={dataPath} className="sb-radar__data" />
      {keys.map((k, i) => {
        const [x, y] = pt(i, r + 18);
        return <text key={k} x={x} y={y} className="sb-radar__label" textAnchor="middle" dominantBaseline="middle">{ATTR_LABEL[k]}</text>;
      })}
      {dataPts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2.5" className="sb-radar__dot" />)}
    </svg>
  );
}

// Full stat panel: radar + numeric breakdown + total. For dedicated pages.
export function StatPanel({ stats, total, maxScale, accent = '#60E8DC', level, rank }) {
  return (
    <div className="sb-panel">
      <div className="sb-panel__radar"><StatRadarHex stats={stats} maxScale={maxScale} accent={accent} /></div>
      <div className="sb-panel__nums">
        {ATTR_ORDER.map((k) => (
          <div className="sb-num" key={k}>
            <span className="sb-num__k" style={{ color: ATTR_COLOR[k] }}>{ATTR_LABEL[k]}</span>
            <span className="sb-num__v">{stats[k] ?? 0}</span>
          </div>
        ))}
        {total != null && <div className="sb-num sb-num--total"><span className="sb-num__k">Total</span><span className="sb-num__v">{total}</span></div>}
        {level != null && <div className="sb-num"><span className="sb-num__k">Level</span><span className="sb-num__v">{level}</span></div>}
        {rank && <div className="sb-num"><span className="sb-num__k">Rank</span><span className="sb-num__v" style={{ fontSize: '0.8rem' }}>{rank}</span></div>}
      </div>
    </div>
  );
}
