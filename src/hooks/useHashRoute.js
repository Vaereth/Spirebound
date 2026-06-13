import { useEffect, useState, useCallback } from 'react';

// =====================================================================
// Lightweight hash router. No dependency.
// Routes used:
//   #/            → main site (hero/truth/cast/floors-overview inline)
//   #/floors      → the general Floors overview
//   #/floors/1    → the dedicated Floor 1 page
// Browser back/forward, bookmarking, and refresh all work because the
// state is derived purely from window.location.hash.
// =====================================================================

export function parseHash() {
  // strip leading "#"; normalize "" and "#/" to "/"
  let h = window.location.hash.replace(/^#/, '');
  if (h === '' || h === '/') return { path: '/', parts: [] };
  const clean = h.replace(/^\/+|\/+$/g, '');
  return { path: '/' + clean, parts: clean.split('/') };
}

export function useHashRoute() {
  const [route, setRoute] = useState(parseHash);

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash());
      // jump to top on route change (each view manages its own scroll)
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((to) => {
    const target = to.startsWith('#') ? to : '#' + (to.startsWith('/') ? to : '/' + to);
    if (window.location.hash !== target) {
      window.location.hash = target; // pushes history → back/forward work
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return { route, navigate };
}
