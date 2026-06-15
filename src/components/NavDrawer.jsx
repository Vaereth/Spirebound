import { useEffect } from 'react';
import Sigil from './Sigil.jsx';
import { getRecents, getBookmarks, getPref, setPref } from '../lib/userContext.js';
import './NavDrawer.css';

const MAIN = [
  { label: 'Archive Home', route: '#/', kind: 'home' },
  { label: 'Floors', route: '#/floors', kind: 'floors' },
  { label: 'Climbers', route: '#/climbers', kind: 'climbers' },
  { label: 'Bestiary', route: '#/floors/1/bestiary', kind: 'bestiary' },
  { label: 'Systems', route: '#/systems', kind: 'systems' },
  { label: 'Lore', route: '#/floors/1/sealed', kind: 'lore' },
];

export default function NavDrawer({ open, onClose, navigate, onOpenSearch, currentFloor }) {
  // lock scroll + esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  if (!open) return null;
  const recents = getRecents().slice(0, 6);
  const bookmarks = getBookmarks().slice(0, 6);
  const go = (r) => { navigate(r); onClose(); };
  const spoilers = getPref('spoilers', false);
  const reduce = getPref('reduceMotion', false);

  return (
    <div className="drawer" role="dialog" aria-modal="true" aria-label="Navigation">
      <div className="drawer__scrim" onClick={onClose} />
      <aside className="drawer__panel">
        <header className="drawer__head">
          <button className="drawer__brand" onClick={() => go('#/')}>
            <Sigil size={20} /><span>SPIREBOUND</span>
          </button>
          <button className="drawer__close" onClick={onClose} aria-label="Close menu">✕</button>
        </header>

        <button className="drawer__search" onClick={() => { onClose(); onOpenSearch(); }}>
          <span className="drawer__search-ic" aria-hidden="true">⌕</span> Search the Archive
        </button>

        {currentFloor && (
          <button className="drawer__floor" onClick={() => go(currentFloor.route)}>
            <span className="drawer__floor-k">Current Floor</span>
            <span className="drawer__floor-v">{currentFloor.label}</span>
          </button>
        )}

        <nav className="drawer__nav">
          {MAIN.map((m) => (
            <button key={m.route} className="drawer__link" onClick={() => go(m.route)}>{m.label}</button>
          ))}
        </nav>

        {recents.length > 0 && (
          <section className="drawer__sec">
            <h3 className="drawer__sech">Recently Viewed</h3>
            {recents.map((r) => <button key={r.route} className="drawer__sub" onClick={() => go(r.route)}>{r.label}</button>)}
          </section>
        )}

        {bookmarks.length > 0 && (
          <section className="drawer__sec">
            <h3 className="drawer__sech">Bookmarks</h3>
            {bookmarks.map((b) => <button key={b.route} className="drawer__sub" onClick={() => go(b.route)}>{b.label}</button>)}
          </section>
        )}

        <section className="drawer__sec">
          <h3 className="drawer__sech">Settings</h3>
          <label className="drawer__toggle">
            <span>Show spoilers by default</span>
            <input type="checkbox" defaultChecked={spoilers} onChange={(e) => setPref('spoilers', e.target.checked)} />
          </label>
          <label className="drawer__toggle">
            <span>Reduce motion</span>
            <input type="checkbox" defaultChecked={reduce} onChange={(e) => setPref('reduceMotion', e.target.checked)} />
          </label>
        </section>
      </aside>
    </div>
  );
}
