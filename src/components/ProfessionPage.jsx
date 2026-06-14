import { FLOOR1 as F } from '../data/floor1.js';
import { slugify } from '../lib/slug.js';
import ArtSlot from './ArtSlot.jsx';
import './EntryPage.css';

export default function ProfessionPage({ slug, navigate }) {
  const name = F.professions.core.find((p) => slugify(p) === slug);
  if (!name) {
    return (
      <div className="entry">
        <div className="entry__nav"><button className="entry__back" onClick={() => navigate('#/floors/1')}>← Floor 1</button></div>
        <div className="entry__body"><p className="entry__p">No such profession in the Guild records.</p></div>
      </div>
    );
  }
  const mentor = F.professions.mentors.find((m) => slugify(m.craft) === slug || m.craft.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(m.craft.toLowerCase()));
  const others = F.professions.core.filter((p) => p !== name).slice(0, 10);

  return (
    <div className="entry" style={{ '--accent': '#60E8DC' }}>
      <div className="entry__nav">
        <button className="entry__back" onClick={() => navigate('#/floors/1')}>← Floor 1</button>
        <span className="entry__crumb">The Verdant Reach · Professions · <b>{name}</b></span>
      </div>

      <header className="entry__banner">
        <p className="entry__eyebrow">Craft of the Reach</p>
        <h1 className="entry__name">{name}</h1>
        {mentor && <p className="entry__sub">Mentor in Hearthvale: {mentor.name}</p>}
      </header>

      <div className="entry__body">
        <div className="entry__hero">
          <div className="entry__hero-art">
            <ArtSlot
              variant="emblem"
              label="Emblem"
              path={`images/professions/${slug}.png`}
              src={`/images/professions/${slug}.png`}
              alt={`${name} emblem`}
            />
          </div>
          <div>
            <div className="entry__panel entry__panel--accent">
              <h2 className="entry__panel-h">Starter Access</h2>
              <p className="entry__p">{F.professions.starter}</p>
            </div>
            {mentor && (
              <div className="entry__panel" style={{ marginTop: 'var(--sp-3)' }}>
                <h2 className="entry__panel-h">Mentor</h2>
                <p className="entry__p"><b>{mentor.name}</b> teaches {mentor.craft} in Hearthvale.</p>
              </div>
            )}
            <div className="entry__coming" style={{ marginTop: 'var(--sp-3)' }}>
              <p className="entry__coming-h">Expanded Entry — Coming</p>
              <p className="entry__coming-t">Recipes, gathering nodes, tiers, station upgrades, and profession quests to be added.</p>
            </div>
          </div>
        </div>

        <section className="entry__sec">
          <h2 className="entry__sec-h">Other Professions</h2>
          <div className="entry__related">
            {others.map((p) => (
              <button key={p} className="entry__relchip" onClick={() => navigate('#/floors/1/professions/' + slugify(p))}>{p}</button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
