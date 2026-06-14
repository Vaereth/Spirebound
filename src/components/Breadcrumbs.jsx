import { crumbsFor } from '../lib/nav.js';
import './Breadcrumbs.css';

export default function Breadcrumbs({ route, navigate }) {
  const crumbs = crumbsFor(route.parts);
  if (crumbs.length <= 1) return null; // don't show on home

  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1;
        return (
          <span key={i} className="crumbs__item">
            {c.route && !last ? (
              <button className="crumbs__link" onClick={() => navigate(c.route)}>{c.label}</button>
            ) : (
              <span className={last ? 'crumbs__current' : 'crumbs__plain'}>{c.label}</span>
            )}
            {!last && <span className="crumbs__sep" aria-hidden="true">›</span>}
          </span>
        );
      })}
    </nav>
  );
}
