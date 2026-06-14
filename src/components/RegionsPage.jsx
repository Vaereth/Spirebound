import { FLOOR1 as F } from '../data/floor1.js';
import './EntryPage.css';

export default function RegionsPage({ navigate }) {
  return (
    <div className="entry" style={{ '--accent': '#5E9C68' }}>
      <div className="entry__nav">
        <button className="entry__back" onClick={() => navigate('#/floors/1')}>← Floor 1</button>
        <span className="entry__crumb">The Verdant Reach · <b>Regions</b></span>
      </div>

      <header className="entry__banner">
        <p className="entry__eyebrow">Geography of the Reach</p>
        <h1 className="entry__name">The Six Lands</h1>
        <p className="entry__sub">{F.layout.intro}</p>
      </header>

      <div className="entry__body">
        <div className="entry__grid">
          {F.regions.map((r) => (
            <div key={r.name} className="entry__panel" style={{ '--accent': r.accent, borderLeft: '3px solid var(--accent)' }}>
              <h3 className="entry__panel-h" style={{ fontSize: '1.3rem', fontFamily: 'var(--font-display)', textTransform: 'none', letterSpacing: 0 }}>{r.name}</h3>
              <p className="entry__field-t" style={{ marginBottom: '0.6rem' }}>{r.terrain}</p>
              <p className="entry__field-t" style={{ fontSize: '0.9rem' }}><b style={{ color: 'var(--accent)' }}>Play · </b>{r.play}</p>
              <p className="entry__field-t" style={{ fontSize: '0.9rem' }}><b style={{ color: 'var(--accent)' }}>Themes · </b>{r.themes}</p>
            </div>
          ))}
        </div>

        <section className="entry__sec">
          <h2 className="entry__sec-h">West → East</h2>
          <div className="entry__grid">
            {F.layout.regions.map((r) => (
              <div key={r.dir} className="entry__panel">
                <span className="entry__panel-h">{r.dir}</span>
                <p className="entry__field-t">{r.text}</p>
              </div>
            ))}
          </div>
          <p className="entry__p entry__p--dim" style={{ marginTop: 'var(--sp-3)' }}>{F.layout.travel}</p>
        </section>
      </div>
    </div>
  );
}
