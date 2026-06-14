import { BESTIARY, MIGRATION_CLASSES } from '../data/bestiary.js';
import { slugify } from '../lib/slug.js';
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
        </div>
      </header>

      <div className="entry__body">
        <ArtSlot
          variant="dossier"
          label="Field Dossier"
          path={`images/bestiary/${slugify(c.name)}-dossier.png`}
          src={`/images/bestiary/${slugify(c.name)}-dossier.png`}
          alt={`${c.name} field dossier`}
        />

        <Field h="Seasonal Presence" t={c.seasonal} />
        <Field h="Visual Identity" t={c.visual} />
        <Field h="Movement & Ordinary Behaviour" t={c.movement} />
        <Field h="World Presence" t={c.world} />

        <ArtSlot
          variant="render"
          label="Specimen Render"
          path={`images/bestiary/${slugify(c.name)}.png`}
          src={`/images/bestiary/${slugify(c.name)}.png`}
          alt={`${c.name} render`}
        />

        <div className="entry__cols2">
          <Field h="Sound" t={c.sound} />
          <Field h="Smell & Physical Traces" t={c.traces} />
        </div>
        <Field h="Behavioural States" t={c.behaviour} />

        <section className="entry__sec">
          <h2 className="entry__sec-h">Ascendant Guild Field Guide</h2>
          {c.fieldguide.map((line, i) => (
            <p key={i} className="entry__p" style={i === 0 ? { color: 'var(--bone)', fontWeight: 600 } : { color: 'var(--bone-dim)', fontStyle: 'italic' }}>{line}</p>
          ))}
        </section>

        <section className="entry__sec">
          <h2 className="entry__sec-h">Guild Threat Assessment</h2>
          <div className="entry__related">
            {c.threat.split('|').map((seg, i) => {
              const [k, v] = seg.split(':').map((s) => s.trim());
              return <span key={i} className="entry__tag"><b style={{ color: 'var(--bone-dim)' }}>{k}</b>{v ? ` — ${v}` : ''}</span>;
            })}
          </div>
        </section>

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
