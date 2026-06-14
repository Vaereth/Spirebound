import { useState } from 'react';
import { FLOOR1 as F } from '../data/floor1.js';
import './Floor1Hub.css';

function MapBlock() {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="hub__map">
      {!failed ? (
        <a className="hub__map-link" href="/images/floor1-map.png" target="_blank" rel="noopener noreferrer">
          <img className="hub__map-img" src="/images/floor1-map.png" alt="Map of Floor 1, The Verdant Reach" onError={() => setFailed(true)} />
          <span className="hub__map-zoom">Open full map ⤢</span>
        </a>
      ) : (
        <div className="hub__map-fallback">
          <span className="hub__map-rune">✦</span>
          <p className="hub__map-title">Map of Floor 1 — The Verdant Reach</p>
          <p className="hub__map-note">Place the map at <code>public/images/floor1-map.png</code></p>
        </div>
      )}
      <figcaption className="hub__map-cap">Map of Floor 1 — The Verdant Reach</figcaption>
    </figure>
  );
}

// The districts/systems you can drill into.
const TILES = [
  { key: 'regions', label: 'Regions', sub: 'The six lands, west to east', route: '#/floors/1/regions', accent: '#5E9C68' },
  { key: 'bestiary', label: 'Bestiary', sub: '42 known species', route: '#/floors/1/bestiary', accent: '#9ab36a' },
  { key: 'systems', label: 'Stats & Systems', sub: 'Attributes · ranks · named rares · elites', route: '#/floors/1/systems', accent: '#60E8DC' },
  { key: 'world', label: 'The Living World', sub: 'Seasons · weather · ecology · Hearthvale · Guild', route: '#/floors/1/world', accent: '#5fa3c4' },
  { key: 'fenrath', label: 'Fenrath', sub: 'The First Guardian', route: '#/floors/1/fenrath', accent: '#9a2f23', danger: true },
  { key: 'sealed', label: 'Sealed Archive', sub: 'Restricted · endgame spoilers', route: '#/floors/1/sealed', accent: '#7a1f18', locked: true },
];

export default function Floor1Hub({ navigate }) {
  return (
    <div className="hub">
      <div className="hub__nav">
        <button className="hub__back" onClick={() => navigate('#/floors')}>← The Ascent</button>
        <span className="hub__crumb">The Spire · <b>Floor 01</b></span>
      </div>

      {/* Floor data-plate */}
      <header className="hub__plate">
        <div className="hub__plate-left">
          <span className="hub__floornum">Floor 01</span>
          <h1 className="hub__name">{F.name}</h1>
          <p className="hub__epigraph">“{F.epigraph}”</p>
        </div>
        <div className="hub__plate-right">
          <div className="hub__stat"><span className="hub__stat-k">Guardian</span><span className="hub__stat-v">Fenrath</span></div>
          <div className="hub__stat"><span className="hub__stat-k">Gate</span><span className="hub__stat-v">Sealed until Fenrath falls</span></div>
          <div className="hub__stat"><span className="hub__stat-k">Known Species</span><span className="hub__stat-v">42</span></div>
          <div className="hub__stat"><span className="hub__stat-k">Status</span><span className="hub__stat-v hub__stat-v--ok">Bound · Healthy</span></div>
        </div>
      </header>

      {/* Map centerpiece */}
      <MapBlock />
      <p className="hub__overview">{F.overview}</p>

      {/* District console */}
      <div className="hub__tiles">
        {TILES.map((t) => (
          <button
            key={t.key}
            className={`hub__tile ${t.danger ? 'hub__tile--danger' : ''} ${t.locked ? 'hub__tile--locked' : ''}`}
            style={{ '--accent': t.accent }}
            onClick={() => navigate(t.route)}
          >
            <span className="hub__tile-label">{t.label}</span>
            <span className="hub__tile-sub">{t.sub}</span>
            <span className="hub__tile-arrow">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
