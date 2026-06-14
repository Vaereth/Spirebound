import { useMemo, useState } from 'react';
import { BESTIARY, BESTIARY_ZONES, MIGRATION_CLASSES } from '../data/bestiary.js';
import { StatBars } from './StatBlock.jsx';
import './Bestiary.css';

// Accent per zone (kept in sync with the region palette where they overlap).
const ZONE_ACCENT = {
  'Dawnfields': '#9ab36a',
  'Silverrun': '#5fa3c4',
  'Windmere Hills': '#8fa4b5',
  'Briarwood': '#5c8a55',
  'The Old March': '#a8694a',
  'Crownward Expanse': '#9b7fb0',
  'Caves and Underground': '#7d7468',
  'Spring': '#7cc08a',
  'Summer': '#e0b24e',
  'Autumn': '#c87b41',
  'Winter': '#9cc2d6',
  'Rare Weather': '#b59ad6',
};

// Pull the headline threat severity for a quick at-a-glance tag.
function peakThreat(threatStr) {
  const order = ['Minimal', 'Low', 'Moderate', 'High', 'Very High', 'Extreme', 'Elite threat', 'Regional emergency', 'Infrastructure emergency', 'Severe', 'Variable', 'Unknown'];
  let best = '', bestRank = -1;
  order.forEach((label, i) => {
    if (threatStr.includes(label) && i > bestRank) { best = label; bestRank = i; }
  });
  return best || '—';
}
const THREAT_COLOR = {
  'Minimal': '#5E9C68', 'Low': '#7CA84B', 'Moderate': '#C9A24B', 'High': '#C2702F',
  'Very High': '#A33B2A', 'Extreme': '#8B2C20', 'Elite threat': '#8B2C20',
  'Regional emergency': '#7A1F18', 'Infrastructure emergency': '#7A1F18',
  'Severe': '#A33B2A', 'Variable': '#8a7d5a', 'Unknown': '#6c6c6c', '—': '#6c6c6c',
};

function ThreatBadge({ threat }) {
  const peak = peakThreat(threat);
  return <span className="best__threat" style={{ '--tc': THREAT_COLOR[peak] || '#6c6c6c' }}>{peak}</span>;
}

function CreatureCard({ c, accent, open, onToggle, navigate }) {
  return (
    <article className={`best__card ${open ? 'is-open' : ''}`} style={{ '--accent': accent }}>
      <button className="best__cardhead" onClick={onToggle} aria-expanded={open}>
        <span className="best__num">{String(c.id).padStart(2, '0')}</span>
        <span className="best__headmain">
          <span className="best__name">{c.name}</span>
          <span className="best__class">{c.classification}</span>
        </span>
        <ThreatBadge threat={c.threat} />
        <span className="best__chev" aria-hidden="true">{open ? '–' : '+'}</span>
      </button>

      {open && (
        <div className="best__detail">
          <div className="best__tags">
            <span className="best__tag best__tag--zone">{c.region}</span>
            <span className="best__tag" title={MIGRATION_CLASSES[c.migration] || ''}>{c.migration}</span>
            {c.level != null && <span className="best__tag">Level {c.level}</span>}
          </div>

          {c.stats && <StatBars stats={c.stats} total={c.total} maxScale={Math.max(30, ...Object.values(c.stats))} />}

          <Field label="Seasonal Presence" text={c.seasonal} />
          <Field label="Visual Identity" text={c.visual} />

          {navigate && (
            <button className="best__full" onClick={() => navigate('#/floors/1/bestiary/' + c.id)}>
              Full field record — open {c.name}'s page →
            </button>
          )}
        </div>
      )}
    </article>
  );
}

function Field({ label, text }) {
  if (!text) return null;
  return (
    <div className="best__field">
      <h5 className="best__field-h">{label}</h5>
      <p className="best__field-t">{text}</p>
    </div>
  );
}

export default function Bestiary({ navigate }) {
  const [zone, setZone] = useState('All');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(null);

  const zonesWithCounts = useMemo(() => {
    const counts = {};
    BESTIARY.forEach((c) => { counts[c.zone] = (counts[c.zone] || 0) + 1; });
    return BESTIARY_ZONES.filter((z) => counts[z]).map((z) => ({ z, n: counts[z] }));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BESTIARY.filter((c) => {
      if (zone !== 'All' && c.zone !== zone) return false;
      if (q && !(`${c.name} ${c.classification} ${c.region}`.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [zone, query]);

  return (
    <section id="bestiary" className="best">
      <div className="best__intro">
        <p className="best__eyebrow">Ascendant Guild Records</p>
        <h2 className="best__title">The Floor 1 Bestiary</h2>
        <p className="best__lead">
          Forty-two species are known to the Reach. “The Dawnfields are not harmless. They are healthy.
          Learn the difference.” Filter by region, or search by name — then open any record for the
          full Guild field notes.
        </p>
      </div>

      {/* Floor selector — only Floor 1 is active; scaffolded for later floors. */}
      <div className="best__floors" role="tablist" aria-label="Floor">
        <button className="best__floor is-active" aria-selected="true">Floor 1 · The Verdant Reach</button>
        <button className="best__floor is-locked" disabled title="Coming later">Floor 2 +</button>
      </div>

      {/* Zone filter */}
      <div className="best__zonebar">
        <button
          className={`best__zone ${zone === 'All' ? 'is-on' : ''}`}
          onClick={() => setZone('All')}
        >
          All Regions <span className="best__zonecount">{BESTIARY.length}</span>
        </button>
        {zonesWithCounts.map(({ z, n }) => (
          <button
            key={z}
            className={`best__zone ${zone === z ? 'is-on' : ''}`}
            style={{ '--accent': ZONE_ACCENT[z] || '#60E8DC' }}
            onClick={() => { setZone(z); setOpenId(null); }}
          >
            {z} <span className="best__zonecount">{n}</span>
          </button>
        ))}
      </div>

      <div className="best__searchrow">
        <input
          className="best__search"
          type="search"
          placeholder="Search creatures…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="best__resultcount">{filtered.length} shown</span>
      </div>

      <div className="best__grid">
        {filtered.map((c) => (
          <CreatureCard
            key={c.id}
            c={c}
            accent={ZONE_ACCENT[c.zone] || '#60E8DC'}
            open={openId === c.id}
            onToggle={() => setOpenId(openId === c.id ? null : c.id)}
            navigate={navigate}
          />
        ))}
        {filtered.length === 0 && (
          <p className="best__empty">No creatures match. The Guild has no record of that here.</p>
        )}
      </div>
    </section>
  );
}
