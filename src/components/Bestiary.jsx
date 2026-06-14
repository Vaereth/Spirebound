import { useMemo, useState } from 'react';
import { BESTIARY, BESTIARY_ZONES, MIGRATION_CLASSES } from '../data/bestiary.js';
import { StatBars } from './StatBlock.jsx';
import GradeBadge, { gradeColor } from './GradeBadge.jsx';
import Corven from './Corven.jsx';
import { CORVEN, corvenLine } from '../data/corven.js';
import './Bestiary.css';

const GRADE_ORDER = ['E', 'D', 'C', 'B', 'A'];

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

function CreatureCard({ c, accent, open, onToggle, navigate }) {
  return (
    <article className={`best__card ${open ? 'is-open' : ''}`} style={{ '--accent': accent }}>
      <button className="best__cardhead" onClick={onToggle} aria-expanded={open}>
        <span className="best__num">{String(c.id).padStart(2, '0')}</span>
        <span className="best__headmain">
          <span className="best__name">{c.name}</span>
          <span className="best__class">Level {c.level} · {c.classification}</span>
        </span>
        <GradeBadge grade={c.grade} size="sm" />
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

          {/* Guild Threat Grade — the single official classification */}
          <div className="best__assessment">
            <div className="best__grade-line">
              <GradeBadge grade={c.grade} size="md" />
              {c.escalation && <span className="best__escal"><b>Escalation:</b> {c.escalation}</span>}
            </div>
            <p className="best__advisory"><span className="best__advisory-k">Field Risk</span> {c.classification}.</p>
          </div>

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
  const [grade, setGrade] = useState('All');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(null);

  const zonesWithCounts = useMemo(() => {
    const counts = {};
    BESTIARY.forEach((c) => { counts[c.zone] = (counts[c.zone] || 0) + 1; });
    return BESTIARY_ZONES.filter((z) => counts[z]).map((z) => ({ z, n: counts[z] }));
  }, []);

  const gradesWithCounts = useMemo(() => {
    const counts = {};
    BESTIARY.forEach((c) => { counts[c.grade] = (counts[c.grade] || 0) + 1; });
    return GRADE_ORDER.filter((g) => counts[g]).map((g) => ({ g, n: counts[g] }));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BESTIARY.filter((c) => {
      if (zone !== 'All' && c.zone !== zone) return false;
      if (grade !== 'All' && c.grade !== grade) return false;
      if (q && !(`${c.name} ${c.classification} ${c.region}`.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [zone, grade, query]);

  // Corven's reaction — derived from current activity. Pure data, no lag.
  const corven = useMemo(() => {
    const q = query.trim();
    if (q) return corvenLine(filtered.length === 0 ? CORVEN.searchMiss : CORVEN.searchHit, q.length);
    if (grade !== 'All') return corvenLine(CORVEN.grade[grade] || CORVEN.greet, grade.charCodeAt(0));
    if (zone !== 'All') return corvenLine(CORVEN.region[zone] || CORVEN.greet, zone.length);
    return corvenLine(CORVEN.greet, 0);
  }, [query, grade, zone, filtered.length]);

  return (
    <section id="bestiary" className="best best--hall">
      <div className="best__hall-bg" aria-hidden="true" />

      <div className="best__hallhead">
        <div className="best__intro">
          <p className="best__eyebrow">Hearthvale · The Ascendant Guild</p>
          <h2 className="best__title">The Guild Hall &amp; Beast-Rolls</h2>
          <p className="best__lead">
            The lanterns are lit and the rolls lie open. Forty-two creatures of the Verdant Reach are catalogued here —
            filter by region, by Guild threat grade, or ask by name. Open any record for the full field notes.
            The Guildmaster is in, should you care for his opinion.
          </p>
        </div>
        <div className="best__corven"><Corven line={corven} /></div>
      </div>

      {/* Floor selector */}
      <div className="best__floors" role="tablist" aria-label="Floor">
        <button className="best__floor is-active" aria-selected="true">Floor 1 · The Verdant Reach</button>
        <button className="best__floor is-locked" disabled title="Coming later">Floor 2 +</button>
      </div>

      {/* Grade filter */}
      <div className="best__filterbar">
        <span className="best__filterlabel">Threat Grade</span>
        <button className={`best__gradechip ${grade === 'All' ? 'is-on' : ''}`} onClick={() => { setGrade('All'); setOpenId(null); }}>All</button>
        {gradesWithCounts.map(({ g, n }) => (
          <button
            key={g}
            className={`best__gradechip ${grade === g ? 'is-on' : ''}`}
            style={{ '--g': gradeColor(g) }}
            onClick={() => { setGrade(grade === g ? 'All' : g); setOpenId(null); }}
          >
            {g} <span className="best__gradecount">{n}</span>
          </button>
        ))}
      </div>

      {/* Zone filter */}
      <div className="best__filterbar">
        <span className="best__filterlabel">Region</span>
        <button
          className={`best__zone ${zone === 'All' ? 'is-on' : ''}`}
          onClick={() => { setZone('All'); setOpenId(null); }}
        >
          All <span className="best__zonecount">{BESTIARY.length}</span>
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
          placeholder="Ask Corven for a creature by name…"
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
