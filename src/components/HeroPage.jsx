import { CAST } from '../data/cast.js';
import { EluvainKit, FeiyanKit, StatRadar } from './Cast.jsx';
import './EntryPage.css';
import './Cast.css';

function FieldRow({ k, v }) {
  return (
    <div className="entry__field">
      <h3 className="entry__field-h">{k}</h3>
      <p className="entry__field-t">{v}</p>
    </div>
  );
}

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
        <p className="entry__eyebrow">Climber {String(c.order).padStart(2, '0')}{c.isDefault ? ' · Default' : ''}</p>
        <h1 className="entry__name">{c.name}</h1>
        {c.epithet && <p className="entry__sub">{c.epithet}</p>}
        <div className="entry__tags">
          {c.identity?.role && <span className="entry__tag entry__tag--accent">{c.identity.role}</span>}
          {c.identity?.damage && <span className="entry__tag">Damage · {c.identity.damage}</span>}
          {c.identity?.skillCeiling && <span className="entry__tag">Skill Ceiling · {c.identity.skillCeiling}</span>}
        </div>
      </header>

      <div className="entry__body">
        {c.tagline && <p className="entry__p" style={{ fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--summit)' }}>“{c.tagline}”</p>}
        {c.overview && (
          <section className="entry__sec">
            <h2 className="entry__sec-h">Overview</h2>
            <p className="entry__p">{c.overview}</p>
          </section>
        )}

        {c.coreFantasy && (
          <section className="entry__sec">
            <h2 className="entry__sec-h">Core Fantasy</h2>
            <p className="entry__p">{c.coreFantasy}</p>
          </section>
        )}

        <section className="entry__sec">
          <h2 className="entry__sec-h">Combat Profile</h2>
          <div className="entry__cols2">
            <div>
              {c.identity?.difficulty && <FieldRow k="Difficulty" v={c.identity.difficulty} />}
              {c.identity?.health && <FieldRow k="Health" v={c.identity.health} />}
              {c.identity?.defense && <FieldRow k="Defense" v={c.identity.defense} />}
              {c.identity?.mobility && <FieldRow k="Mobility" v={c.identity.mobility} />}
              {c.identity?.damage && <FieldRow k="Damage" v={c.identity.damage} />}
              {c.identity?.skillCeiling && <FieldRow k="Skill Ceiling" v={c.identity.skillCeiling} />}
            </div>
            {c.stats && <div style={{ maxWidth: 380 }}><StatRadar stats={c.stats} accent={c.accent} /></div>}
          </div>
        </section>

        {c.weapons && (
          <section className="entry__sec">
            <h2 className="entry__sec-h">Weapons</h2>
            {c.weapons.map((w) => (
              <div key={w.name} className="entry__field">
                <h3 className="entry__field-h">{w.name} · {w.hand}</h3>
                <p className="entry__field-t">{w.notes.join(' · ')}</p>
              </div>
            ))}
          </section>
        )}

        {c.appearance && (
          <section className="entry__sec">
            <h2 className="entry__sec-h">Appearance</h2>
            <p className="entry__p entry__p--dim">{c.appearance.join(' · ')}</p>
          </section>
        )}

        <section className="entry__sec">
          <h2 className="entry__sec-h entry__sec-h--display">Kit &amp; Signature</h2>
          {c.id === 'eluvain' ? <EluvainKit c={c} /> : <FeiyanKit c={c} />}
        </section>

        <div className="entry__coming">
          <p className="entry__coming-h">Expanded Entry — Coming</p>
          <p className="entry__coming-t">Backstory, the wish, talent trees, and full ability frame data to be added.</p>
        </div>
      </div>
    </div>
  );
}
