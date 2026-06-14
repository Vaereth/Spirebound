import { useState } from 'react';
import './UIKit.css';

/* =====================================================================
   SHARED UI KIT — tabs, responsive comparison table, quick-facts grid,
   spoiler gate. All reusable site-wide.
   ===================================================================== */

// TABS — accessible, keyboard-navigable. tabs: [{id,label,badge?}]
export function Tabs({ tabs, value, onChange, accent = 'var(--accent-interface)', className = '' }) {
  return (
    <div className={`uik-tabs ${className}`} role="tablist" style={{ '--tab-accent': accent }}>
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={value === t.id}
          className={`uik-tab ${value === t.id ? 'is-on' : ''}`}
          onClick={() => onChange(t.id)}
        >
          {t.label}{t.badge != null && <span className="uik-tab__badge">{t.badge}</span>}
        </button>
      ))}
    </div>
  );
}

// QUICK FACTS — compact label/value grid (kills "one row per fact").
export function QuickFacts({ facts, cols = 2, className = '' }) {
  return (
    <dl className={`uik-facts ${className}`} style={{ '--fact-cols': cols }}>
      {facts.map((f) => (
        <div key={f.k} className="uik-fact">
          <dt>{f.k}</dt>
          <dd>{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}

// COMPARE TABLE — wide on desktop, retains first column + scrolls on mobile.
// cols: string[]; rows: [{k, v: string[]}]
export function CompareTable({ cols, rows, firstHeader = '', accent = 'var(--accent-interface)', className = '' }) {
  return (
    <div className={`uik-tablewrap ${className}`} style={{ '--tbl-accent': accent }}>
      <table className="uik-table">
        <thead>
          <tr><th className="uik-table__corner">{firstHeader}</th>{cols.map((c) => <th key={c}>{c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.k}>
              <td className="uik-table__rowh">{r.k}</td>
              {r.v.map((v, i) => <td key={i}>{v}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// SPOILER GATE — reusable confirm-to-reveal wrapper.
export function SpoilerGate({ open, onReveal, onHide, title, warning, children, accent = 'var(--accent-guardian)' }) {
  return (
    <div className="uik-spoiler" style={{ '--sp-accent': accent }}>
      {!open ? (
        <div className="uik-spoiler__gate">
          {title && <h4 className="uik-spoiler__title">{title}</h4>}
          {warning && <p className="uik-spoiler__warn">{warning}</p>}
          <button className="uik-spoiler__btn" onClick={onReveal}>⚠ Reveal — spoilers</button>
        </div>
      ) : (
        <div className="uik-spoiler__body">
          {onHide && <button className="uik-spoiler__hide" onClick={onHide}>Hide spoilers</button>}
          {children}
        </div>
      )}
    </div>
  );
}

// SEGMENTED — small multi-toggle (e.g. proof on/off chips). items:[{id,label,on}]
export function Segmented({ items, onToggle, accent = 'var(--accent-interface)', className = '' }) {
  return (
    <div className={`uik-seg ${className}`} style={{ '--seg-accent': accent }}>
      {items.map((it) => (
        <button key={it.id} className={`uik-seg__chip ${it.on ? 'is-on' : ''}`} onClick={() => onToggle(it.id)} aria-pressed={it.on}>
          {it.label}
        </button>
      ))}
    </div>
  );
}
