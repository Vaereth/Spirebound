import './Surfaces.css';

/* =====================================================================
   CONTENT SURFACE FAMILIES
   Six materially-distinct surfaces sharing spacing, type, and a11y but
   feeling different: System Glass, Archive Vellum, Guardian Stone,
   World Panel, Creature Field Card, Character Interface.
   Each takes an optional `accent` (CSS color) and standard children.
   ===================================================================== */

// SYSTEM GLASS — stats, filters, formulas, controls. Crisp, rune-seamed.
export function GlassPanel({ children, accent, className = '', style, as: Tag = 'div', ...rest }) {
  return (
    <Tag className={`surf surf-glass ${className}`} style={{ '--surf-accent': accent || 'var(--accent-interface)', ...style }} {...rest}>
      {children}
    </Tag>
  );
}

// ARCHIVE VELLUM — lore, history, testimony. Dark parchment, ink, gold-brown edge.
export function VellumPanel({ children, sealed, className = '', style, ...rest }) {
  return (
    <div className={`surf surf-vellum ${sealed ? 'surf-vellum--sealed' : ''} ${className}`} style={style} {...rest}>
      <div className="surf-vellum__inner">{children}</div>
    </div>
  );
}

// GUARDIAN STONE — guardians, proofs, sealed warnings. Blackened stone, engraved metal, chains.
export function StonePanel({ children, accent, className = '', style, ...rest }) {
  return (
    <div className={`surf surf-stone ${className}`} style={{ '--surf-accent': accent || 'var(--accent-guardian)', ...style }} {...rest}>
      <span className="surf-stone__rivet surf-stone__rivet--tl" aria-hidden="true" />
      <span className="surf-stone__rivet surf-stone__rivet--tr" aria-hidden="true" />
      <span className="surf-stone__rivet surf-stone__rivet--bl" aria-hidden="true" />
      <span className="surf-stone__rivet surf-stone__rivet--br" aria-hidden="true" />
      {children}
    </div>
  );
}

// WORLD PANEL — floors, regions, maps, ecology. Organic, landscape motif.
export function WorldPanel({ children, accent, className = '', style, ...rest }) {
  return (
    <div className={`surf surf-world ${className}`} style={{ '--surf-accent': accent || 'var(--accent-floor1)', ...style }} {...rest}>
      {children}
    </div>
  );
}

// Panel header bar — a carved header used inside any surface.
export function PanelHeader({ eyebrow, title, right, accent }) {
  return (
    <div className="surf__header" style={accent ? { '--surf-accent': accent } : undefined}>
      <div>
        {eyebrow && <span className="surf__eyebrow">{eyebrow}</span>}
        {title && <h3 className="surf__title">{title}</h3>}
      </div>
      {right && <div className="surf__header-right">{right}</div>}
    </div>
  );
}

// A sword-point / engraved divider.
export function Divider({ className = '' }) {
  return <div className={`surf-divider ${className}`} aria-hidden="true"><span /></div>;
}
