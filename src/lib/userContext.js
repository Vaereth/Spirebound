/* =====================================================================
   USER CONTEXT — site-wide quality-of-life backed by localStorage.
   Recently viewed, bookmarks, and remembered preferences. Safe no-ops
   if storage is unavailable. (Stage 1 foundation; pages opt in over time.)
   ===================================================================== */
const KEY = 'spirebound:v1';

function read() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
  catch { return {}; }
}
function write(data) {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* ignore */ }
}

export function getRecents() { return read().recents || []; }
export function pushRecent(entry) {
  // entry: { label, route, kind }
  if (!entry || !entry.route) return;
  const data = read();
  const list = (data.recents || []).filter((r) => r.route !== entry.route);
  list.unshift({ ...entry, at: Date.now() });
  data.recents = list.slice(0, 12);
  write(data);
}

export function getBookmarks() { return read().bookmarks || []; }
export function isBookmarked(route) { return getBookmarks().some((b) => b.route === route); }
export function toggleBookmark(entry) {
  const data = read();
  const list = data.bookmarks || [];
  const exists = list.some((b) => b.route === entry.route);
  data.bookmarks = exists ? list.filter((b) => b.route !== entry.route) : [{ ...entry, at: Date.now() }, ...list].slice(0, 50);
  write(data);
  return !exists;
}

export function getPref(name, fallback) {
  const p = read().prefs || {};
  return name in p ? p[name] : fallback;
}
export function setPref(name, value) {
  const data = read();
  data.prefs = { ...(data.prefs || {}), [name]: value };
  write(data);
}

export function getLastVisited() { return read().lastVisited || null; }
export function setLastVisited(route) {
  if (!route) return;
  const data = read();
  data.lastVisited = route;
  write(data);
}
