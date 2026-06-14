import './Layout.css';

/* =====================================================================
   LAYOUT PRIMITIVES
   The composition system that replaces "stack everything vertically".
   Every page builds from these instead of one-off grids.
   ===================================================================== */

// Page shell — controls max width + gutters. variant: default | wide | narrow
export function Page({ children, variant = 'default', className = '', style }) {
  return <div className={`pg pg--${variant} ${className}`} style={style}>{children}</div>;
}

// A vertical rhythm container for page sections.
export function Stack({ children, gap = 'section', className = '', style }) {
  return <div className={`stack stack--${gap} ${className}`} style={style}>{children}</div>;
}

// Editorial Split — main prose 60-70% + aside 30-40%. Collapses on tablet.
export function EditorialSplit({ children, aside, flip = false, className = '' }) {
  return (
    <div className={`lay-editorial ${flip ? 'lay-editorial--flip' : ''} ${className}`}>
      <div className="lay-editorial__main">{children}</div>
      <aside className="lay-editorial__aside">{aside}</aside>
    </div>
  );
}

// Data Split — identity/controls 35-45% + data 55-65%.
export function DataSplit({ left, right, className = '' }) {
  return (
    <div className={`lay-data ${className}`}>
      <div className="lay-data__left">{left}</div>
      <div className="lay-data__right">{right}</div>
    </div>
  );
}

// Card Matrix — responsive 2-4 col grid. min sets the column floor.
export function CardMatrix({ children, min = 260, className = '', style }) {
  return (
    <div className={`lay-matrix ${className}`} style={{ '--col-min': `${min}px`, ...style }}>
      {children}
    </div>
  );
}

// Sticky Contents — left rail (nav) + main. Rail becomes a dropdown on mobile (handled by SectionRail).
export function StickyContents({ rail, children, className = '' }) {
  return (
    <div className={`lay-sticky ${className}`}>
      <div className="lay-sticky__rail">{rail}</div>
      <div className="lay-sticky__main">{children}</div>
    </div>
  );
}

// Master-Detail — list/filter panel + detail panel.
export function MasterDetail({ master, detail, className = '' }) {
  return (
    <div className={`lay-md ${className}`}>
      <div className="lay-md__master">{master}</div>
      <div className="lay-md__detail">{detail}</div>
    </div>
  );
}

// Asymmetric Dashboard — large primary (65%) + side panel (35%), then supporting rows.
export function Dashboard({ children, className = '' }) {
  return <div className={`lay-dash ${className}`}>{children}</div>;
}
Dashboard.Feature = ({ children, span = 'lg' }) => <div className={`lay-dash__cell lay-dash__cell--${span}`}>{children}</div>;

// A constrained reading column for long prose.
export function Reading({ children, className = '', style }) {
  return <div className={`lay-reading ${className}`} style={style}>{children}</div>;
}
