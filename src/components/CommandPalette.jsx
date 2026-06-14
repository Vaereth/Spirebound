import { useEffect, useMemo, useRef, useState } from 'react';
import { searchIndex } from '../lib/nav.js';
import './CommandPalette.css';

const KIND_ACCENT = {
  Climber: '#E8B954', Creature: '#9ab36a', 'Named Rare': '#c98a4a', Elite: '#c98a4a',
  NPC: '#d8b06a', Craft: '#60E8DC', Boss: '#9a2f23', Restricted: '#7a1f18',
  Floor: '#5fa3c4', Page: '#60E8DC',
};

function score(item, q) {
  const label = item.label.toLowerCase();
  const sub = (item.sub || '').toLowerCase();
  if (label === q) return 100;
  if (label.startsWith(q)) return 80;
  if (label.includes(q)) return 60;
  // word-boundary match
  if (label.split(/\s+/).some((w) => w.startsWith(q))) return 50;
  if (sub.includes(q)) return 30;
  return 0;
}

export default function CommandPalette({ open, onClose, navigate }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);
  const index = useMemo(() => searchIndex(), []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) {
      // show a sensible default set when empty
      return index.filter((i) => i.kind === 'Page' || i.kind === 'Floor' || i.kind === 'Climber').slice(0, 8);
    }
    return index
      .map((i) => ({ i, s: score(i, query) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s || a.i.label.length - b.i.label.length)
      .slice(0, 12)
      .map((x) => x.i);
  }, [q, index]);

  useEffect(() => { setSel(0); }, [q]);

  useEffect(() => {
    if (open) { setQ(''); setSel(0); setTimeout(() => inputRef.current?.focus(), 20); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, results.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
      else if (e.key === 'Enter') { e.preventDefault(); const r = results[sel]; if (r) { navigate(r.route); onClose(); } }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, results, sel, navigate, onClose]);

  if (!open) return null;

  return (
    <div className="cmdp" onClick={onClose}>
      <div className="cmdp__panel" onClick={(e) => e.stopPropagation()}>
        <div className="cmdp__inputrow">
          <span className="cmdp__icon" aria-hidden="true">⌕</span>
          <input
            ref={inputRef}
            className="cmdp__input"
            placeholder="Search climbers, creatures, NPCs, systems…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <kbd className="cmdp__esc">esc</kbd>
        </div>

        <div className="cmdp__results">
          {results.length === 0 && <p className="cmdp__empty">Nothing in the archive matches “{q}”.</p>}
          {results.map((r, i) => (
            <button
              key={r.route + r.label}
              className={`cmdp__row ${i === sel ? 'is-sel' : ''}`}
              style={{ '--accent': KIND_ACCENT[r.kind] || '#60E8DC' }}
              onMouseEnter={() => setSel(i)}
              onClick={() => { navigate(r.route); onClose(); }}
            >
              <span className="cmdp__dot" aria-hidden="true" />
              <span className="cmdp__label">{r.label}</span>
              {r.sub && <span className="cmdp__sub">{r.sub}</span>}
              <span className="cmdp__kind">{r.kind}</span>
            </button>
          ))}
        </div>

        <div className="cmdp__foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
