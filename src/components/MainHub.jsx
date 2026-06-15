import { Page, Stack, Dashboard, CardMatrix } from './Layout.jsx';
import { GlassPanel, WorldPanel, PanelHeader } from './Surfaces.jsx';
import { QuickFacts } from './UIKit.jsx';
import Sigil from './Sigil.jsx';
import { getRecents, getLastVisited } from '../lib/userContext.js';
import './MainHub.css';

// Primary Archive destinations — hierarchy, not equal cards.
const PRIMARY = [
  { key: 'floors',   label: 'The Ascent',      sub: 'Ten realms · the Tower itself', route: '#/floors',         accent: 'var(--accent-floor1)',    glyph: '⛰' },
  { key: 'climbers', label: 'The Climbers',    sub: 'Six will climb · two remembered', route: '#/climbers',      accent: 'var(--accent-authority)', glyph: '⚔' },
  { key: 'bestiary', label: 'Bestiary',        sub: '42 known species of Floor 1',    route: '#/floors/1/bestiary', accent: '#9ab36a',              glyph: '✦' },
];
const SECONDARY = [
  { key: 'systems', label: 'Stats & Systems', sub: 'Six attributes · combat math · ranks', route: '#/systems',        accent: 'var(--accent-interface)', glyph: '◈' },
  { key: 'truth',   label: 'The Three Truths', sub: 'What the Spire promises — and costs',  route: '#/truth',          accent: '#9b7fb0',                 glyph: '✷' },
  { key: 'sealed',  label: 'Sealed Archive',   sub: 'Restricted · endgame records',         route: '#/floors/1/sealed', accent: 'var(--accent-blood)',     glyph: '⛓', locked: true },
];

function routeLabel(r) {
  if (!r) return null;
  const map = {
    '#/': 'Archive Home', '#/floors': 'The Ascent', '#/climbers': 'The Climbers',
    '#/systems': 'Stats & Systems', '#/truth': 'The Three Truths',
    '#/floors/1': 'Floor 1 · The Verdant Reach', '#/floors/1/fenrath': 'Fenrath',
    '#/floors/1/bestiary': 'Bestiary', '#/floors/1/world': 'The Living World',
    '#/floors/1/regions': 'Regions', '#/floors/1/sealed': 'Sealed Archive',
  };
  return map[r] || r.replace('#/', '').replace(/\//g, ' · ');
}

export default function MainHub({ navigate }) {
  const last = getLastVisited();
  const recents = getRecents().slice(0, 5);
  const resumeRoute = last && last !== '#/' ? last : '#/floors/1';

  return (
    <Page variant="wide" className="mhub">
      <div className="mhub__head">
        <span className="mhub__sigil"><Sigil size={26} /></span>
        <div>
          <p className="mhub__eyebrow">The Ascendant Archive</p>
          <h2 className="mhub__title">Where will you continue?</h2>
        </div>
      </div>

      <Dashboard className="mhub__dash">
        {/* RESUME — the major feature panel */}
        <Dashboard.Feature span="lg">
          <GlassPanel accent="var(--accent-interface)" className="mhub__resume">
            <span className="mhub__resume-eyebrow">Resume Ascent</span>
            <h3 className="mhub__resume-title">{routeLabel(resumeRoute)}</h3>
            <p className="mhub__resume-sub">
              {last && last !== '#/'
                ? 'Return to where you left off in the Archive.'
                : 'Begin where every climber begins — the first floor of the Tower.'}
            </p>
            <div className="mhub__resume-actions">
              <button className="mhub__btn mhub__btn--primary" onClick={() => navigate(resumeRoute)}>Continue →</button>
              <button className="mhub__btn" onClick={() => navigate('#/floors/1')}>Floor 1</button>
            </div>
          </GlassPanel>
        </Dashboard.Feature>

        {/* WORLD STATE — status side panel */}
        <Dashboard.Feature span="sm">
          <WorldPanel accent="var(--accent-floor1)" className="mhub__state">
            <PanelHeader eyebrow="World State" title="Floor 1" accent="var(--accent-floor1)" />
            <QuickFacts cols={1} facts={[
              { k: 'Current Floor', v: 'The Verdant Reach' },
              { k: 'Guardian', v: 'Fenrath · Bound' },
              { k: 'Season', v: 'Spring' },
              { k: 'Stability', v: 'Healthy' },
            ]} />
          </WorldPanel>
        </Dashboard.Feature>
      </Dashboard>

      {/* PRIMARY destinations */}
      <CardMatrix min={240} className="mhub__primary">
        {PRIMARY.map((d) => (
          <button key={d.key} className="mhub__dest" style={{ '--dest-accent': d.accent }} onClick={() => navigate(d.route)}>
            <span className="mhub__dest-glyph" aria-hidden="true">{d.glyph}</span>
            <span className="mhub__dest-label">{d.label}</span>
            <span className="mhub__dest-sub">{d.sub}</span>
            <span className="mhub__dest-seam" aria-hidden="true" />
          </button>
        ))}
      </CardMatrix>

      {/* SECONDARY destinations */}
      <CardMatrix min={240} className="mhub__secondary">
        {SECONDARY.map((d) => (
          <button key={d.key} className={`mhub__dest mhub__dest--sm ${d.locked ? 'mhub__dest--locked' : ''}`} style={{ '--dest-accent': d.accent }} onClick={() => navigate(d.route)}>
            <span className="mhub__dest-glyph" aria-hidden="true">{d.glyph}</span>
            <span className="mhub__dest-label">{d.label}</span>
            <span className="mhub__dest-sub">{d.sub}</span>
            {d.locked && <span className="mhub__dest-lock" aria-hidden="true">⛓ sealed</span>}
            <span className="mhub__dest-seam" aria-hidden="true" />
          </button>
        ))}
      </CardMatrix>

      {/* RECENTLY VIEWED */}
      {recents.length > 0 && (
        <div className="mhub__recents">
          <span className="mhub__recents-h">Recently Viewed</span>
          <div className="mhub__recents-row">
            {recents.map((r) => (
              <button key={r.route} className="mhub__recent" onClick={() => navigate(r.route)}>{r.label}</button>
            ))}
          </div>
        </div>
      )}
    </Page>
  );
}
