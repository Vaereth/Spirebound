import { useState, useEffect, useRef, useCallback } from 'react';
import './SectionRail.css';

/* =====================================================================
   SECTION RAIL — sticky "on this page" nav with scroll-spy.
   Desktop: vertical rail. Mobile: a dropdown. Reusable on any long page.
   sections: [{ id, label }].  Provides register() refs via children render.
   ===================================================================== */
export function useSectionSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  const refs = useRef({});
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    );
    Object.values(refs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [ids.join(',')]);
  const setRef = useCallback((id) => (el) => { refs.current[id] = el; }, []);
  const go = useCallback((id) => {
    const el = refs.current[id];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);
  return { active, setRef, go };
}

export default function SectionRail({ sections, active, onGo, accent = 'var(--accent-interface)', title = 'On This Page' }) {
  const [open, setOpen] = useState(false);
  const current = sections.find((s) => s.id === active) || sections[0];
  return (
    <nav className="srail" style={{ '--rail-accent': accent }} aria-label={title}>
      {/* desktop rail */}
      <div className="srail__desk">
        <span className="srail__title">{title}</span>
        <ul className="srail__list">
          {sections.map((s) => (
            <li key={s.id}>
              <button className={`srail__btn ${active === s.id ? 'is-on' : ''}`} onClick={() => onGo(s.id)}>
                <span className="srail__tick" aria-hidden="true" />{s.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* mobile dropdown */}
      <div className="srail__mob">
        <button className="srail__mobtoggle" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          <span className="srail__moblabel">{title}</span>
          <span className="srail__mobcurrent">{current?.label}</span>
          <span className={`srail__chev ${open ? 'is-open' : ''}`} aria-hidden="true">▾</span>
        </button>
        {open && (
          <ul className="srail__moblist">
            {sections.map((s) => (
              <li key={s.id}>
                <button className={`srail__btn ${active === s.id ? 'is-on' : ''}`} onClick={() => { onGo(s.id); setOpen(false); }}>{s.label}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
