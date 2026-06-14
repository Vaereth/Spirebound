import { NAV_LINKS } from '../lib/nav.js';
import './TopBar.css';

export default function TopBar({ navigate, route, onOpenSearch }) {
  const here = '#' + (route.path === '/' ? '/' : route.path);
  const isActive = (r) => here === r || (r !== '#/' && here.startsWith(r));

  return (
    <header className="topbar">
      <button className="topbar__logo" onClick={() => navigate('#/')} aria-label="Spirebound home">
        <span className="topbar__spire" aria-hidden="true">▲</span>
        <span className="topbar__word">SPIREBOUND</span>
      </button>

      <nav className="topbar__nav">
        {NAV_LINKS.map((l) => (
          <button
            key={l.route}
            className={`topbar__link ${isActive(l.route) ? 'is-active' : ''}`}
            onClick={() => navigate(l.route)}
          >
            {l.label}
          </button>
        ))}
      </nav>

      <button className="topbar__search" onClick={onOpenSearch} aria-label="Search (press /)">
        <span className="topbar__search-icon" aria-hidden="true">⌕</span>
        <span className="topbar__search-text">Search</span>
        <kbd className="topbar__kbd">/</kbd>
      </button>
    </header>
  );
}
