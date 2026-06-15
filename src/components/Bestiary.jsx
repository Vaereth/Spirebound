import { useMemo, useState, useEffect } from 'react';
import { BESTIARY, BESTIARY_ZONES } from '../data/bestiary.js';
import GradeBadge, { gradeColor } from './GradeBadge.jsx';
import Corven from './Corven.jsx';
import { CORVEN, corvenLine } from '../data/corven.js';
import { GlassPanel, PanelHeader } from './Surfaces.jsx';
import { getPref, setPref } from '../lib/userContext.js';
import './Bestiary.css';

const GRADE_ORDER = ['E', 'D', 'C', 'B', 'A'];
const ZONE_ACCENT = {
  'Dawnfields': '#9ab36a', 'Silverrun': '#5fa3c4', 'Windmere Hills': '#8fa4b5',
  'Briarwood': '#5c8a55', 'The Old March': '#a8694a', 'Crownward Expanse': '#9b7fb0',
  'Caves and Underground': '#7d7468', 'Spring': '#7cc08a', 'Summer': '#e0b24e',
  'Autumn': '#c87b41', 'Winter': '#9cc2d6', 'Rare Weather': '#b59ad6',
};
const advisoryOf = (c) => (c.escalation ? c.escalation : c.classification);

/* art-first field card — compact, grade prominent, one-line advisory */
function FieldCard({ c, accent, navigate }) {
  return (
    <button className="bcard" style={{ '--accent': accent }} onClick={() => navigate('#/floors/1/bestiary/' + c.id)}>
      <div className="bcard__art" aria-hidden="true">
        <span className="bcard__silhouette">{c.name[0]}</span>
        <span className="bcard__num">{String(c.id).padStart(2, '0')}</span>
        <span className="bcard__grade"><GradeBadge grade={c.grade} size="sm" /></span>
      </div>
      <div className="bcard__body">
        <h3 className="bcard__name">{c.name}</h3>
        <div className="bcard__meta">
          <span className="bcard__lvl">Lv {c.level}</span>
          <span className="bcard__region" style={{ '--rc': accent }}>{c.region}</span>
        </div>
        <p className="bcard__class">{c.classification}</p>
        <p className="bcard__advisory"><span aria-hidden="true">⚑</span> {advisoryOf(c)}</p>
      </div>
      <span className="bcard__seam" aria-hidden="true" />
    </button>
  );
}

/* compact list row */
function ListRow({ c, accent, navigate }) {
  return (
    <button className="brow" style={{ '--accent': accent }} onClick={() => navigate('#/floors/1/bestiary/' + c.id)}>
      <span className="brow__num">{String(c.id).padStart(2, '0')}</span>
      <span className="brow__name">{c.name}</span>
      <span className="brow__class">{c.classification}</span>
      <span className="brow__region">{c.region}</span>
      <span className="brow__lvl">Lv {c.level}</span>
      <GradeBadge grade={c.grade} size="sm" />
    </button>
  );
}

export default function Bestiary({ navigate }) {
  const [zone, setZone] = useState(() => getPref('bestZone', 'All'));
  const [grade, setGrade] = useState(() => getPref('bestGrade', 'All'));
  const [query, setQuery] = useState('');
  const [view, setView] = useState(() => getPref('bestView', 'grid'));

  useEffect(() => { setPref('bestZone', zone); }, [zone]);
  useEffect(() => { setPref('bestGrade', grade); }, [grade]);
  useEffect(() => { setPref('bestView', view); }, [view]);

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

  const corven = useMemo(() => {
    const q = query.trim();
    if (q) return corvenLine(filtered.length === 0 ? CORVEN.searchMiss : CORVEN.searchHit, q.length);
    if (grade !== 'All') return corvenLine(CORVEN.grade[grade] || CORVEN.greet, grade.charCodeAt(0));
    if (zone !== 'All') return corvenLine(CORVEN.region[zone] || CORVEN.greet, zone.length);
    return corvenLine(CORVEN.greet, 0);
  }, [query, grade, zone, filtered.length]);

  const resetFilters = () => { setZone('All'); setGrade('All'); setQuery(''); };
  const activeFilters = (zone !== 'All' ? 1 : 0) + (grade !== 'All' ? 1 : 0) + (query ? 1 : 0);

  const FilterRail = (
    <div className="bfilter">
      <div className="bfilter__searchwrap">
        <input className="bfilter__search" type="search" placeholder="Search by name…" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="bfilter__group">
        <span className="bfilter__label">Threat Grade</span>
        <div className="bfilter__chips">
          <button className={`bfilter__chip ${grade === 'All' ? 'is-on' : ''}`} onClick={() => setGrade('All')}>All</button>
          {gradesWithCounts.map(({ g, n }) => (
            <button key={g} className={`bfilter__chip bfilter__chip--grade ${grade === g ? 'is-on' : ''}`} style={{ '--g': gradeColor(g) }}
              onClick={() => setGrade(grade === g ? 'All' : g)}>{g}<span className="bfilter__count">{n}</span></button>
          ))}
        </div>
      </div>

      <div className="bfilter__group">
        <span className="bfilter__label">Region</span>
        <div className="bfilter__list">
          <button className={`bfilter__zone ${zone === 'All' ? 'is-on' : ''}`} onClick={() => setZone('All')}>
            <span>All Regions</span><span className="bfilter__count">{BESTIARY.length}</span>
          </button>
          {zonesWithCounts.map(({ z, n }) => (
            <button key={z} className={`bfilter__zone ${zone === z ? 'is-on' : ''}`} style={{ '--accent': ZONE_ACCENT[z] || 'var(--rune)' }}
              onClick={() => setZone(zone === z ? 'All' : z)}>
              <span className="bfilter__dot" /><span>{z}</span><span className="bfilter__count">{n}</span>
            </button>
          ))}
        </div>
      </div>

      {activeFilters > 0 && <button className="bfilter__reset" onClick={resetFilters}>Clear filters ({activeFilters})</button>}
    </div>
  );

  return (
    <section className="best2">
      <div className="best2__head">
        <div className="best2__intro">
          <p className="best2__eyebrow">Hearthvale · The Ascendant Guild</p>
          <h2 className="best2__title">The Guild Field Guide</h2>
          <p className="best2__lead">
            Forty-two creatures of the Verdant Reach, catalogued by the Guild. Filter by region or threat grade,
            search by name, and open any record for the full field notes. The Guildmaster is in.
          </p>
        </div>
        <div className="best2__corven"><Corven line={corven} /></div>
      </div>

      <div className="best2__layout">
        <aside className="best2__rail">{FilterRail}</aside>

        <div className="best2__main">
          <div className="best2__toolbar">
            <span className="best2__count">{filtered.length} of {BESTIARY.length} records</span>
            <div className="best2__views" role="tablist" aria-label="View mode">
              {['grid', 'list'].map((v) => (
                <button key={v} role="tab" aria-selected={view === v} className={`best2__viewbtn ${view === v ? 'is-on' : ''}`} onClick={() => setView(v)}>
                  {v === 'grid' ? '▦ Grid' : '☰ List'}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <GlassPanel className="best2__empty"><p>No creatures match. The Guild has no record of that here.</p></GlassPanel>
          ) : view === 'grid' ? (
            <div className="best2__grid">
              {filtered.map((c) => <FieldCard key={c.id} c={c} accent={ZONE_ACCENT[c.zone] || 'var(--rune)'} navigate={navigate} />)}
            </div>
          ) : (
            <div className="best2__listwrap">
              <div className="brow brow--head">
                <span className="brow__num">#</span><span className="brow__name">Name</span>
                <span className="brow__class">Classification</span><span className="brow__region">Region</span>
                <span className="brow__lvl">Level</span><span>Grade</span>
              </div>
              {filtered.map((c) => <ListRow key={c.id} c={c} accent={ZONE_ACCENT[c.zone] || 'var(--rune)'} navigate={navigate} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
