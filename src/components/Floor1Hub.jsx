import { useState } from 'react';
import { FLOOR1 as F } from '../data/floor1.js';
import { Page, Stack, Dashboard } from './Layout.jsx';
import { WorldPanel, GlassPanel, StonePanel, PanelHeader } from './Surfaces.jsx';
import './Floor1Hub.css';

// Living-world status — a game-world zone interface.
const STATUS = [
  { k: 'Season', v: 'Spring', tone: 'ok' },
  { k: 'Time Remaining', v: '~5 real days', tone: '' },
  { k: 'Guardian', v: 'Fenrath · Bound', tone: 'guardian' },
  { k: 'Corruption', v: 'None', tone: 'ok' },
  { k: 'Floor Health', v: 'Healthy', tone: 'ok' },
  { k: 'Trade', v: 'Open', tone: 'ok' },
  { k: 'Population', v: 'Stable', tone: '' },
  { k: 'Stability', v: 'Secure', tone: 'ok' },
];

function MapBlock() {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="f1map">
      {!failed ? (
        <a className="f1map__link" href="/images/floor1-map.png" target="_blank" rel="noopener noreferrer">
          <img className="f1map__img" src="/images/floor1-map.png" alt="Map of Floor 1, The Verdant Reach" onError={() => setFailed(true)} />
          <span className="f1map__zoom">Open full map ⤢</span>
        </a>
      ) : (
        <div className="f1map__fallback">
          <span className="f1map__rune">✦</span>
          <p className="f1map__title">Map of Floor 1 — The Verdant Reach</p>
          <p className="f1map__note">Place the map at <code>public/images/floor1-map.png</code></p>
        </div>
      )}
    </figure>
  );
}

// destination features — sized by importance, not equal tiles.
function Feature({ accent, eyebrow, title, sub, onClick, danger, locked, big }) {
  return (
    <button className={`f1feat ${big ? 'f1feat--big' : ''} ${danger ? 'f1feat--danger' : ''} ${locked ? 'f1feat--locked' : ''}`}
      style={{ '--accent': accent }} onClick={onClick}>
      <span className="f1feat__eyebrow">{eyebrow}</span>
      <span className="f1feat__title">{title}</span>
      <span className="f1feat__sub">{sub}</span>
      {locked && <span className="f1feat__lock">⛓ sealed</span>}
      <span className="f1feat__arrow" aria-hidden="true">→</span>
      <span className="f1feat__seam" aria-hidden="true" />
    </button>
  );
}

export default function Floor1Hub({ navigate }) {
  return (
    <Page variant="wide" className="f1hub">
      {/* hero plate */}
      <header className="f1hub__plate">
        <div>
          <span className="f1hub__floornum">Floor 01</span>
          <h1 className="f1hub__name">{F.name}</h1>
          <p className="f1hub__epigraph">“{F.epigraph}”</p>
        </div>
      </header>

      {/* asymmetric dashboard: map 65% + living status 35% */}
      <Dashboard className="f1hub__dash">
        <Dashboard.Feature span="lg">
          <WorldPanel accent="var(--accent-floor1)" className="f1hub__mapwrap">
            <MapBlock />
            <p className="f1hub__overview">{F.overview}</p>
          </WorldPanel>
        </Dashboard.Feature>
        <Dashboard.Feature span="sm">
          <GlassPanel accent="var(--accent-floor1)" className="f1hub__status">
            <PanelHeader eyebrow="Living World" title="Zone Status" accent="var(--accent-floor1)" />
            <dl className="f1hub__statlist">
              {STATUS.map((s) => (
                <div key={s.k} className="f1hub__statrow">
                  <dt>{s.k}</dt>
                  <dd className={s.tone ? `is-${s.tone}` : ''}>{s.v}</dd>
                </div>
              ))}
            </dl>
            <p className="f1hub__scale">{F.seasons.scale[1]} · {F.seasons.scale[2]}</p>
          </GlassPanel>
        </Dashboard.Feature>
      </Dashboard>

      {/* feature destinations — paired rows, weighted */}
      <Dashboard className="f1hub__features">
        <Dashboard.Feature span="lg">
          <Feature big accent="var(--accent-floor1)" eyebrow="Six Lands" title="Regions"
            sub="The Dawnfields · Silverrun · Windmere · Briarwood · Old March · Crownward" onClick={() => navigate('#/floors/1/regions')} />
        </Dashboard.Feature>
        <Dashboard.Feature span="sm">
          <Feature accent="#9ab36a" eyebrow="42 Species" title="Bestiary" sub="The Guild field guide" onClick={() => navigate('#/floors/1/bestiary')} />
        </Dashboard.Feature>

        <Dashboard.Feature span="lg">
          <Feature big accent="#5fa3c4" eyebrow="Seasons · Ecology · Hearthvale" title="The Living World"
            sub="Weather, ecology, the Ascendant Guild, and the town of Hearthvale" onClick={() => navigate('#/floors/1/world')} />
        </Dashboard.Feature>
        <Dashboard.Feature span="sm">
          <Feature accent="#c98a4a" eyebrow="Rare Individuals" title="Named Rares & Elites" sub="Floor 1 rares & regional elites" onClick={() => navigate('#/floors/1/systems')} />
        </Dashboard.Feature>
      </Dashboard>

      {/* guardian + sealed — major dramatic pair */}
      <div className="f1hub__guardrow">
        <StonePanel accent="var(--accent-guardian)" className="f1hub__guardian" onClick={() => navigate('#/floors/1/fenrath')} role="button" tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') navigate('#/floors/1/fenrath'); }}>
          <span className="f1hub__guardian-eyebrow">The First Guardian</span>
          <h3 className="f1hub__guardian-name">Fenrath</h3>
          <p className="f1hub__guardian-sub">The Guardian of the Verdant Reach bars the stair above. Configure the encounter, study his five Proofs, and read the full raid dossier.</p>
          <span className="f1hub__guardian-cta">Open Guardian Dossier →</span>
        </StonePanel>
        <button className="f1feat f1feat--locked f1hub__sealed" style={{ '--accent': 'var(--accent-blood)' }} onClick={() => navigate('#/floors/1/sealed')}>
          <span className="f1feat__eyebrow">Restricted</span>
          <span className="f1feat__title">Sealed Archive</span>
          <span className="f1feat__sub">Endgame records · spoilers</span>
          <span className="f1feat__lock">⛓ sealed</span>
          <span className="f1feat__arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </Page>
  );
}
