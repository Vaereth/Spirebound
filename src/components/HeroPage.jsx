import { CAST } from '../data/cast.js';
import { EluvainKit, FeiyanKit, StatRadar } from './Cast.jsx';
import './EntryPage.css';
import './Cast.css';

export default function HeroPage({ id, navigate }) {
  const c = CAST.find((x) => x.id === id);
  if (!c) {
    return (
      <div className="entry">
        <div className="entry__nav"><button className="entry__back" onClick={() => navigate('#/')}>← Home</button></div>
        <div className="entry__body"><p className="entry__p">No such climber.</p></div>
      </div>
    );
  }
  const other = CAST.find((x) => x.id !== c.id);

  return (
    <div className="entry" style={{ '--accent': c.accent }}>
      <div className="entry__nav">
        <button className="entry__back" onClick={() => navigate('#/')}>← Home</button>
        <span className="entry__crumb">The Climbers · <b>{c.name}</b></span>
        {other && <button className="entry__back" onClick={() => navigate('#/heroes/' + other.id)} style={{ marginLeft: 'auto' }}>{other.name} →</button>}
      </div>

      <header className="entry__banner">
        <p className="entry__eyebrow">{c.title || 'The Climbers'}</p>
        <h1 className="entry__name">{c.name}</h1>
        {c.epithet && <p className="entry__sub">{c.epithet}</p>}
        <div className="entry__tags">
          {c.combat?.role && <span className="entry__tag entry__tag--accent">{c.combat.role}</span>}
          {c.combat?.damage && <span className="entry__tag">Damage · {c.combat.damage}</span>}
          {c.combat?.skillCeiling && <span className="entry__tag">Skill Ceiling · {c.combat.skillCeiling}</span>}
        </div>
      </header>

      <div className="entry__body">
        {c.tagline && <p className="entry__p" style={{ fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--summit)' }}>{c.tagline}</p>}
        {c.identity && (
          <section className="entry__sec">
            <h2 className="entry__sec-h">Identity</h2>
            <p className="entry__p">{c.identity}</p>
          </section>
        )}

        {c.stats && (
          <section className="entry__sec">
            <h2 className="entry__sec-h">Combat Profile</h2>
            <div style={{ maxWidth: 420 }}><StatRadar stats={c.stats} accent={c.accent} /></div>
          </section>
        )}

        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">Kit & Signature</h2>
          {c.id === 'eluvain' ? <EluvainKit c={c} /> : <FeiyanKit c={c} />}
        </section>

        <div className="entry__coming">
          <p className="entry__coming-h">Expanded Entry — Coming</p>
          <p className="entry__coming-t">Backstory, the wish, weapon detail, talent trees, and full ability frame data to be added.</p>
        </div>
      </div>
    </div>
  );
}
