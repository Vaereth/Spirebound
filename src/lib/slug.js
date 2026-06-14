// Stable URL slug from a display name.
// "Mayor Alric Vane" → "mayor-alric-vane"; "Renn and Ressa" → "renn-and-ressa"
export function slugify(name) {
  return String(name)
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
