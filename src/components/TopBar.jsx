import { useState } from 'react';
import { NAV_LINKS } from '../lib/nav.js';
import Sigil from './Sigil.jsx';
import NavDrawer from './NavDrawer.jsx';
import './TopBar.css';

// derive current-floor context from the route
function currentFloorOf(route) {
  const [s0, s1] = route.parts;
  if (s0 === 'floors' && s1 === '1') return { label: 'Floor 1 · The Verdant Reach', route: '#/floors/1' };
  return null;
}

export default function TopBar({ navigate, route, onOpenSearch }) {
  const here = '#' + (route.path === '/' ? '/' : route.path);
  const isActive = (r) => here === r || (r !== '#/' && here.startsWith(r));
  const [drawer, setDrawer] = useState(false);
  const floor = currentFloorOf(route);

  return (
    <>
      <header className="topbar">
        <div className="topbar__seam" aria-hidden="true" />
        <button className="topbar__logo" onClick={() => navigate('#/')} aria-label="Spirebound home">
          <span className="topbar__sigil"><Sigil size={22} /></span>
          <span className="topbar__word">SPIREBOUND</span>
        </button>

        <nav className="topbar__nav" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <button
              key={l.route}
              className={`topbar__link ${isActive(l.route) ? 'is-active' : ''}`}
              onClick={() => navigate(l.route)}
            >
              {l.label}
              <span className="topbar__underseam" aria-hidden="true" />
            </button>
          ))}
        </nav>

        {floor && (
          <button className="topbar__floor" onClick={() => navigate(floor.route)} title={floor.label}>
            <span className="topbar__floor-dot" aria-hidden="true" />
            <span className="topbar__floor-txt">Floor 1</span>
          </button>
        )}

        <button className="topbar__search" onClick={onOpenSearch} aria-label="Search (press /)">
          <span className="topbar__search-icon" aria-hidden="true">⌕</span>
          <span className="topbar__search-text">Search</span>
          <kbd className="topbar__kbd">/</kbd>
        </button>

        <button className="topbar__burger" onClick={() => setDrawer(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </header>

      <NavDrawer
        open={drawer}
        onClose={() => setDrawer(false)}
        navigate={navigate}
        onOpenSearch={onOpenSearch}
        currentFloor={floor}
      />
    </>
  );
}
