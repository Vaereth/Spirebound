// =====================================================================
// SPIREBOUND — Map engine helpers (framework-light, no React here)
// ---------------------------------------------------------------------
// Pure functions + the image-source ADAPTER that lets a map level use
// either a single ImageOverlay or a raster tile pyramid, chosen purely
// by config. The React component (MapView.jsx) consumes these.
// =====================================================================

import L from 'leaflet';

// ---------------------------------------------------------------------
// Coordinate model
// ---------------------------------------------------------------------
// Config authors points/polygons in SOURCE-PIXEL space: x → right,
// y → down, origin top-left (the natural way you'd read the art).
// Leaflet CRS.Simple uses LatLng where lat grows UP. So we flip y:
//     leafletLatLng = [ height - yPixels, xPixels ]
// This keeps the visual top-left of the art at the visual top-left.
//
// `height` is the source image height for that level.
// ---------------------------------------------------------------------
export function toLatLng([x, y], height) {
  return [height - y, x];
}

export function polygonToLatLngs(points, height) {
  return points.map((p) => toLatLng(p, height));
}

// Full image bounds in CRS.Simple space.
export function imageBounds(width, height) {
  return [
    [0, 0],
    [height, width],
  ];
}

// ---------------------------------------------------------------------
// IMAGE-SOURCE ADAPTER
// ---------------------------------------------------------------------
// Returns a descriptor the component uses to mount the right Leaflet
// layer. Adding a new source kind later (e.g. 'wms') is localized here.
//
//   kind 'image' → ImageOverlay over the full bounds.
//   kind 'tiles' → TileLayer using a {z}/{x}/{y} template. The pyramid
//                  must be generated offline (e.g. gdal2tiles / a slicing
//                  script) and committed under public/maps/.../tiles/.
//                  tileSize + the level's min/max zoom must match the
//                  pyramid. We do NOT generate tiles at runtime.
// ---------------------------------------------------------------------
export function resolveSource(map) {
  const { source } = map;
  const bounds = imageBounds(source.width, source.height);

  if (source.kind === 'tiles') {
    return {
      type: 'tiles',
      url: source.url,                 // e.g. '.../tiles/{z}/{x}/{y}.png'
      tileSize: source.tileSize || 256,
      bounds,
      noWrap: true,
      // For CRS.Simple pyramids the min/max native zoom come from config.
      minNativeZoom: source.minNativeZoom,
      maxNativeZoom: source.maxNativeZoom,
    };
  }

  // default: single image overlay
  return {
    type: 'image',
    url: source.url,
    bounds,
  };
}

// ---------------------------------------------------------------------
// Marker icons — themed divIcons (no external image files needed).
// Each settlement/feature kind gets an inline-SVG glyph so the map reads
// as illustrated cartography, not generic pins.
// ---------------------------------------------------------------------
const GLYPHS = {
  city: `<path d="M-9 5 L-9 -6 L-6 -10 L-3 -6 L-3 5 Z M-2 5 L-2 -11 L1 -15 L4 -11 L4 5 Z M5 5 L5 -7 L8 -11 L11 -7 L11 5 Z" />
         <rect x="-11" y="5" width="22" height="4" />`,
  town: `<path d="M-7 4 L-7 -4 L-3 -8 L1 -4 L1 4 Z M0 4 L0 -2 L4 -6 L8 -2 L8 4 Z" />`,
  tower:`<path d="M-3 5 L-3 -8 L-4 -11 L0 -14 L4 -11 L3 -8 L3 5 Z" />`,
  shrine:`<path d="M-6 5 L0 -11 L6 5 Z" fill="none" stroke-width="1.6"/>
          <line x1="-3" y1="-1" x2="3" y2="-1" stroke-width="1.4"/>`,
  inn:  `<path d="M-7 5 L-7 -3 L0 -9 L7 -3 L7 5 Z" /><rect x="-2" y="0" width="4" height="5" fill="#2a1d12"/>`,
  market:`<path d="M-8 5 L-8 -3 L8 -3 L8 5 Z M-8 -3 L-6 -8 L6 -8 L8 -3" fill="none" stroke-width="1.4"/>`,
  gate: `<path d="M-8 6 L-8 -6 Q0 -15 8 -6 L8 6" fill="none" stroke-width="2"/>
         <line x1="0" y1="-11" x2="0" y2="6" stroke-width="1.2"/>`,
  cave: `<path d="M-7 5 Q-7 -7 0 -7 Q7 -7 7 5 Z" />`,
  peak: `<path d="M-9 6 L0 -9 L9 6 Z" /><path d="M-3 0 L0 -9 L3 0 Z" fill="#efe6cf"/>`,
  falls:`<path d="M-6 -7 L-6 7 M-2 -7 L-2 7 M2 -7 L2 7 M6 -7 L6 7" stroke-width="1.4" fill="none"/>`,
  ruin: `<path d="M-7 5 L-7 -4 L-4 -4 L-4 -8 L-1 -8 L-1 -2 L2 -2 L2 -6 L5 -6 L5 5 Z" />`,
};

export function glyphIcon(kind, { provisional = false, accent = '#E8B954' } = {}) {
  const body = GLYPHS[kind] || GLYPHS.town;
  const fill = kind === 'shrine' || kind === 'gate' || kind === 'market' || kind === 'falls'
    ? 'none' : '#cbb184';
  const stroke = provisional ? accent : '#2a1d12';
  const dash = provisional ? 'stroke-dasharray="2 2"' : '';
  const ring = provisional
    ? `<circle cx="0" cy="0" r="15" fill="none" stroke="${accent}" stroke-width="1" stroke-dasharray="3 3" opacity="0.8"/>`
    : '';
  const html = `
    <div class="spire-marker spire-marker--${kind} ${provisional ? 'is-provisional':''}">
      <svg viewBox="-18 -22 36 36" width="36" height="36" aria-hidden="true">
        <g fill="${fill}" stroke="${stroke}" stroke-width="1.1" ${dash}
           stroke-linejoin="round" style="filter:drop-shadow(0 1px 1px rgba(0,0,0,.45))">
          ${ring}${body}
        </g>
      </svg>
    </div>`;
  return L.divIcon({
    className: 'spire-divicon',
    html,
    iconSize: [36, 36],
    iconAnchor: [18, 22],     // tip near the glyph base
    popupAnchor: [0, -20],
  });
}

// A small label rendered as a divIcon anchored under a marker / on a region.
export function labelIcon(text, { kind = 'place', provisional = false } = {}) {
  return L.divIcon({
    className: 'spire-label-icon',
    html: `<span class="spire-label spire-label--${kind} ${provisional ? 'is-provisional':''}">${text}${
      provisional ? '<em class="spire-prov">provisional</em>' : ''
    }</span>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
}
