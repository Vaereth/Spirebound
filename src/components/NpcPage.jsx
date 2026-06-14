import { FLOOR1 as F } from '../data/floor1.js';
import { slugify } from '../lib/slug.js';
import './EntryPage.css';

// Build a lookup of NPCs with any known hook lines.
function npcRecord(slug) {
  const name = F.npcs.hearthvale.find((n) => slugify(n) === slug);
  if (!name) return null;
  // hooks reference some NPCs by first name or descriptor; match loosely
  const hooks = (F.npcs.hooks || []).filter((h) => {
    const first = name.split(' ')[0].toLowerCase();
    return h.toLowerCase().includes(name.toLowerCase()) || h.toLowerCase().includes(first);
  });
  return { name, hooks };
}

export default function NpcPage({ slug, navigate }) {
  const rec = npcRecord(slug);
  if (!rec) {
    return (
      <div className="entry">
        <div className="entry__nav"><button className="entry__back" onClick={() => navigate('#/floors/1')}>← Floor 1</button></div>
        <div className="entry__body"><p className="entry__p">No such name in the Hearthvale records.</p></div>
      </div>
    );
  }
  const others = F.npcs.hearthvale.filter((n) => n !== rec.name).slice(0, 8);
  return (
    <div className="entry" style={{ '--accent': '#E8B954' }}>
      <div className="entry__nav">
        <button className="entry__back" onClick={() => navigate('#/floors/1')}>← Floor 1</button>
        <span className="entry__crumb">The Verdant Reach · Hearthvale · <b>{rec.name}</b></span>
      </div>

      <header className="entry__banner">
        <p className="entry__eyebrow">Named Soul of Hearthvale</p>
        <h1 className="entry__name">{rec.name}</h1>
        <p className="entry__sub">City of First Light</p>
      </header>

      <div className="entry__body">
        {rec.hooks.length > 0 ? (
          <section className="entry__sec">
            <h2 className="entry__sec-h">What the Guild Notes</h2>
            {rec.hooks.map((h) => <p key={h} className="entry__p">{h}</p>)}
          </section>
        ) : (
          <p className="entry__p entry__p--dim">A known figure of Hearthvale. Their full story is not yet recorded here.</p>
        )}

        <div className="entry__coming">
          <p className="entry__coming-h">Expanded Entry — Coming</p>
          <p className="entry__coming-t">Role, personality, questlines, relationships, and dialogue to be added.</p>
        </div>

        {others.length > 0 && (
          <section className="entry__sec">
            <h2 className="entry__sec-h">Other Souls of Hearthvale</h2>
            <div className="entry__related">
              {others.map((n) => (
                <button key={n} className="entry__relchip" onClick={() => navigate('#/floors/1/npcs/' + slugify(n))}>{n}</button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
