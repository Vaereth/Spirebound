import './AppShell.css';

/* =====================================================================
   APP SHELL — the global frame every route sits inside.
   Layered atmosphere (Tower architecture, faint rune geometry, depth)
   behind a readable interface. Subtle, never noisy.
   `accent` lets a route tint the ambient light (floor/guardian/etc).
   ===================================================================== */
export default function AppShell({ children, accent }) {
  return (
    <div className="shell" style={accent ? { '--shell-accent': accent } : undefined}>
      {/* atmosphere — fixed, behind everything, pointer-inert */}
      <div className="shell__atmos" aria-hidden="true">
        <div className="shell__vignette" />
        <div className="shell__runefield" />
        <div className="shell__pillars" />
        <div className="shell__glow" />
      </div>
      <div className="shell__content">{children}</div>
    </div>
  );
}
