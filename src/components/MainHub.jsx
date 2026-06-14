import './MainHub.css';

const DOMAINS = [
  { key: 'truth', label: 'The Three Truths', sub: 'What the Spire promises — and what it costs', route: '#/truth', accent: '#60E8DC' },
  { key: 'climbers', label: 'The Climbers', sub: 'Six will climb. Two are remembered.', route: '#/climbers', accent: '#E8B954' },
  { key: 'systems', label: 'Stats & Systems', sub: 'The six attributes · progression · ranks', route: '#/systems', accent: '#5ec98a' },
  { key: 'ascent', label: 'The Ascent', sub: 'Ten realms stand between you and the wish', route: '#/floors', accent: '#9b7fb0' },
];

export default function MainHub({ navigate }) {
  return (
    <section className="mhub">
      <div className="mhub__inner">
        <p className="mhub__eyebrow">The Archive</p>
        <h2 className="mhub__head">Choose where to begin.</h2>
        <p className="mhub__lead">
          The Spire is vast, and the record of it vaster still. Enter by whichever door calls to you —
          the truth of the wish, the climbers who chase it, the systems that govern every blow, or the floors themselves.
        </p>

        <div className="mhub__tiles">
          {DOMAINS.map((d) => (
            <button key={d.key} className="mhub__tile" style={{ '--accent': d.accent }} onClick={() => navigate(d.route)}>
              <span className="mhub__tile-label">{d.label}</span>
              <span className="mhub__tile-sub">{d.sub}</span>
              <span className="mhub__tile-arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
