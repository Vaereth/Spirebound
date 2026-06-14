import { BESTIARY, MIGRATION_CLASSES } from '../data/bestiary.js';
import { slugify } from '../lib/slug.js';
import { StatPanel } from './StatBlock.jsx';
import GradeBadge from './GradeBadge.jsx';
import ArtSlot from './ArtSlot.jsx';
import './EntryPage.css';

const ZONE_ACCENT = {
  'Dawnfields': '#9ab36a', 'Silverrun': '#5fa3c4', 'Windmere Hills': '#8fa4b5', 'Briarwood': '#5c8a55',
  'The Old March': '#a8694a', 'Crownward Expanse': '#9b7fb0', 'Caves and Underground': '#7d7468',
  'Spring': '#7cc08a', 'Summer': '#e0b24e', 'Autumn': '#c87b41', 'Winter': '#9cc2d6', 'Rare Weather': '#b59ad6',
};

export default function CreaturePage({ id, navigate }) {
  const c = BESTIARY.find((x) => String(x.id) === String(id));
  if (!c) {
    return (
      <div className="entry">
        <div className="entry__nav"><button className="entry__back" onClick={() => navigate('#/floors/1')}>← Floor 1</button></div>
        <div className="entry__body"><p className="entry__p">No such creature in the Guild records.</p></div>
      </div>
    );
  }
  const accent = ZONE_ACCENT[c.zone] || '#60E8DC';
  const others = BESTIARY.filter((x) => x.zone === c.zone && x.id !== c.id).slice(0, 6);

  return (
    <div className="entry" style={{ '--accent': accent }}>
      <div className="entry__nav">
        <button className="entry__back" onClick={() => navigate('#/floors/1')}>← Floor 1</button>
        <span className="entry__crumb">The Verdant Reach · Bestiary · <b>{c.name}</b></span>
      </div>

      <header className="entry__banner">
        <p className="entry__eyebrow">{c.zone} · Species {String(c.id).padStart(2, '0')}</p>
        <h1 className="entry__name">{c.name}</h1>
        <p className="entry__sub">{c.classification}</p>
        <div className="entry__tags">
          <span className="entry__tag entry__tag--accent">{c.region}</span>
          <span className="entry__tag" title={MIGRATION_CLASSES[c.migration] || ''}>{c.migration}</span>
          {c.level != null && <span className="entry__tag">Level {c.level}</span>}
          {c.total != null && <span className="entry__tag">Total {c.total}</span>}
        </div>
        <div style={{ marginTop: 'var(--sp-3)' }}>
          <GradeBadge grade={c.grade} size="lg" />
        </div>
      </header>

      <div className="entry__body">
        <div className="entry__hero">
          <div className="entry__hero-art">
            <ArtSlot
              variant="dossier"
              label="Field Dossier"
              path={`images/bestiary/${slugify(c.name)}-dossier.png`}
              src={`/images/bestiary/${slugify(c.name)}-dossier.png`}
              alt={`${c.name} field dossier`}
            />
            <div style={{ marginTop: 'var(--sp-3)' }}>
              <ArtSlot
                variant="render"
                label="Specimen Render"
                path={`images/bestiary/${slugify(c.name)}.png`}
                src={`/images/bestiary/${slugify(c.name)}.png`}
                alt={`${c.name} render`}
              />
            </div>
          </div>

          <div>
            {c.stats && (
              <div className="entry__panel entry__panel--accent" style={{ marginBottom: 'var(--sp-3)' }}>
                <h3 className="entry__panel-h">Attribute Profile</h3>
                <StatPanel stats={c.stats} total={c.total} level={c.level} accent={accent} maxScale={Math.max(30, ...Object.values(c.stats))} />
              </div>
            )}
            <div className="entry__grid">
            <div className="entry__panel entry__panel--accent">
              <h3 className="entry__panel-h">Seasonal Presence</h3>
              <p className="entry__field-t">{c.seasonal}</p>
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">Visual Identity</h3>
              <p className="entry__field-t">{c.visual}</p>
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">Movement & Behaviour</h3>
              <p className="entry__field-t">{c.movement}</p>
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">World Presence</h3>
              <p className="entry__field-t">{c.world}</p>
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">Sound</h3>
              <p className="entry__field-t">{c.sound}</p>
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">Smell & Traces</h3>
              <p className="entry__field-t">{c.traces}</p>
            </div>
            <div className="entry__panel">
              <h3 className="entry__panel-h">Behavioural States</h3>
              <p className="entry__field-t">{c.behaviour}</p>
            </div>
          </div>
          </div>
        </div>

        <div className="entry__grid">
          <section className="entry__panel entry__panel--accent">
            <h2 className="entry__panel-h">Ascendant Guild Field Guide</h2>
            {c.fieldguide.map((line, i) => (
              <p key={i} className="entry__p" style={i === 0 ? { color: 'var(--bone)', fontWeight: 600 } : { color: 'var(--bone-dim)', fontStyle: 'italic' }}>{line}</p>
            ))}
          </section>

          <section className="entry__panel">
            <h2 className="entry__panel-h">Guild Threat Assessment</h2>
            <div style={{ marginBottom: 'var(--sp-2)' }}><GradeBadge grade={c.grade} size="lg" /></div>
            {c.escalation && (
              <p className="entry__p" style={{ fontSize: '0.92rem' }}>
                <b style={{ color: '#e0903c' }}>Escalation — </b>{c.escalation}
              </p>
            )}
            <p className="entry__p" style={{ fontSize: '0.92rem', marginTop: 'var(--sp-2)' }}>
              <b style={{ color: 'var(--accent)' }}>Field Risk — </b>{c.classification}.
            </p>
            <p className="entry__p entry__p--dim" style={{ fontSize: '0.82rem', marginTop: 'var(--sp-2)' }}>
              Guild Threat Grade is the single official classification. Conditions below alter the field grade situationally.
            </p>
          </section>
        </div>

        <div className="entry__coming">
          <p className="entry__coming-h">Expanded Entry — Coming</p>
          <p className="entry__coming-t">Combat profile, drops, ecology role, encounter design, and lore to be added.</p>
        </div>

        {others.length > 0 && (
          <section className="entry__sec">
            <h2 className="entry__sec-h">Others of {c.zone}</h2>
            <div className="entry__related">
              {others.map((o) => (
                <button key={o.id} className="entry__relchip" onClick={() => navigate('#/floors/1/bestiary/' + o.id)}>{o.name}</button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function Field({ h, t }) {
  if (!t) return null;
  return (
    <div className="entry__field">
      <h3 className="entry__field-h">{h}</h3>
      <p className="entry__field-t">{t}</p>
    </div>
  );
}
