// =====================================================================
// SPIREBOUND — Map configuration (single source of truth)
// ---------------------------------------------------------------------
// Every map level (floor → region → settlement → optional district/
// interior) is declared here as data. The MapView engine reads this and
// renders the right level for the current route. Adding a new region or
// settlement is a data edit — no engine changes required.
//
// COORDINATE SYSTEM
//   We use Leaflet's CRS.Simple. Coordinates are [y, x] in "image units"
//   where the image's natural pixel size defines the bounds:
//       bounds = [[0, 0], [height, width]]
//   y grows DOWNWARD in source pixels; the engine flips it so that the
//   top-left of the art is the visual top-left (see lib/mapEngine.js).
//   Author polygon/marker coords in source-pixel space — see EDITOR note.
//
// IMAGE SOURCES (image-source adapter)
//   source.kind = 'image'  → single ImageOverlay (good up to a few k px)
//   source.kind = 'tiles'  → {z}/{x}/{y} raster pyramid (very large art)
//   Start with 'image'; switch a level to 'tiles' later without touching
//   the engine or routes. See lib/mapEngine.js → resolveSource().
//
// PROVISIONAL CANON
//   Any place not yet approved by the author MUST carry provisional:true.
//   The engine renders these with a dashed outline + "provisional" badge
//   so unapproved locations never read as settled canon.
//
// EDITOR WORKFLOW (adjusting coordinates)
//   Set ?mapedit=1 in the URL. The engine then logs the [y,x] of every
//   click to the console and shows a live coordinate readout, so you can
//   place/redraw markers and polygons against the real art, then paste
//   the numbers back here. Nothing is persisted automatically.
// =====================================================================

// Asset base that respects Vite's base path on GitHub Pages.
// import.meta.env.BASE_URL is "/" in dev and "/Spirebound/" in build.
const asset = (p) => `${import.meta.env.BASE_URL}maps/${p}`.replace(/\/{2,}/g, '/');

// ---------------------------------------------------------------------
// MAP REGISTRY
// Keyed by mapId. Routes resolve to a mapId via the hierarchy below.
// ---------------------------------------------------------------------
export const MAPS = {
  // =================================================================
  // FLOOR 1 — the whole floor
  // =================================================================
  'floor1': {
    id: 'floor1',
    level: 'floor',
    title: 'Floor I — Spirebound',
    subtitle: 'The first step is the longest, and the farthest from home.',
    // Source art natural size in px. UPDATE to match the real export.
    source: {
      kind: 'image',
      url: asset('floor1/floor1.png'),
      width: 1600,
      height: 900,
    },
    // Zoom range for CRS.Simple. minZoom negative lets us zoom OUT past 1:1.
    minZoom: -2,
    maxZoom: 2,
    initialZoom: -1,

    // Clickable regions (GeoJSON-style polygons in source-pixel coords).
    // Clicking navigates into the region map. Polygons double as hover
    // highlight zones. Coordinates are [x, y] pairs (engine converts).
    regions: [
      {
        id: 'dawnfields',
        name: 'The Dawnfields',
        blurb: 'The safe green heart of the floor.',
        mapId: 'region-dawnfields',          // drill-in target
        labelAt: [540, 300],
        accent: 'var(--accent-floor1)',
        polygon: [
          [250,150],[300,185],[440,185],[600,175],[760,150],[900,150],
          [880,330],[700,330],[560,370],[320,380],[250,360],
        ],
      },
      {
        id: 'windmere',
        name: 'Windmere Hills',
        blurb: 'Where the wind keeps its counsel.',
        mapId: null,                          // not yet authored
        provisional: true,
        labelAt: [560, 110],
        polygon: [
          [250,40],[880,40],[900,150],[760,150],[600,175],[440,185],
          [300,185],[250,150],
        ],
      },
      {
        id: 'silverrun',
        name: 'Silverrun',
        blurb: 'A thousand silver veins.',
        mapId: null,
        provisional: true,
        labelAt: [560, 560],
        polygon: [
          [250,360],[320,380],[560,370],[700,330],[800,520],[600,700],
          [360,720],[250,560],
        ],
      },
      {
        id: 'briarwood',
        name: 'Briarwood',
        blurb: 'The roots remember.',
        mapId: null,
        provisional: true,
        labelAt: [1070, 200],
        accent: 'var(--verdant-deep)',
        polygon: [
          [905,55],[1230,70],[1210,300],[980,340],[900,300],[905,150],
        ],
      },
      {
        id: 'oldmarch',
        name: 'The Old March',
        blurb: 'The rampart that failed.',
        mapId: null,
        provisional: true,
        labelAt: [1085, 540],
        accent: 'var(--accent-guardian)',
        polygon: [
          [900,340],[1130,355],[1300,420],[1300,720],[1000,740],
          [880,520],[900,340],
        ],
      },
      {
        id: 'crownward',
        name: 'Crownward Expanse',
        blurb: 'All paths converge.',
        mapId: null,
        provisional: true,
        labelAt: [1320, 300],
        polygon: [
          [1235,70],[1470,200],[1470,440],[1300,420],[1130,355],[1235,70],
        ],
      },
      {
        id: 'fenrath',
        name: 'Basin of Fenrath',
        blurb: 'Where the Gate rises, all becomes choice.',
        mapId: null,
        provisional: true,
        labelAt: [1430, 560],
        accent: 'var(--accent-blood)',
        polygon: [
          [1470,200],[1560,210],[1560,760],[1320,740],[1300,440],[1470,440],
        ],
      },
    ],

    // Point markers shown on the floor view. `to` = drill-in route target
    // (settlement mapId) when this is an enterable settlement.
    markers: [
      { id:'hearthvale', name:'Hearthvale', kind:'city',
        at:[150,445], sub:'City of First Light', to:'settle-hearthvale',
        blurb:'The last walled city before the wilds.' },
      { id:'amberford', name:'Amberford', kind:'town',
        at:[432,248], sub:'Dawnfields township', to:null, provisional:true,
        blurb:'Amber lamps and grain barges on the upper river.' },
      { id:'gate', name:'Gate of First Ascent', kind:'gate',
        at:[1480,170], sub:'One path ascends.', to:null,
        blurb:'All roads on this floor end here.' },
    ],

    // Non-interactive labelled features (lore flavour).
    features: [
      { name:'Stormcrag Peaks', at:[630,60], kind:'peak' },
      { name:"Howler's Cave", at:[760,135], kind:'cave' },
      { name:'Silverfall Falls', at:[660,600], kind:'falls' },
      { name:'Broken Bastion', at:[1010,370], kind:'ruin' },
    ],
  },

  // =================================================================
  // REGION — The Dawnfields  (the one worked example region)
  // =================================================================
  'region-dawnfields': {
    id: 'region-dawnfields',
    level: 'region',
    title: 'The Dawnfields',
    subtitle: 'The Golden Way runs straight through the safe green heart.',
    parent: { mapId:'floor1', label:'Floor I' },
    source: {
      kind: 'image',
      url: asset('regions/dawnfields.png'),
      width: 1400,
      height: 900,
    },
    minZoom: -2, maxZoom: 2, initialZoom: -1,
    regions: [],   // sub-regions could go here later
    markers: [
      { id:'hearthvale', name:'Hearthvale', kind:'city',
        at:[210,470], sub:'City of First Light', to:'settle-hearthvale',
        blurb:'Enter the city.' },
      { id:'amberford', name:'Amberford', kind:'town',
        at:[620,300], sub:'Trade town', to:null, provisional:true,
        blurb:'Grain barges and amber lamps.' },
      { id:'greenhollow', name:'Greenhollow', kind:'town',
        at:[820,360], sub:'Farming hamlet', to:null, provisional:true,
        blurb:'A ring of farmsteads around a sunken green.' },
      { id:'waystation', name:'Highroad Waystation', kind:'tower',
        at:[950,470], sub:'Road post', to:null, provisional:true,
        blurb:'Last guarded rest on the Golden Way.' },
    ],
    features: [
      { name:'Dawnbreak Shrine', at:[780,560], kind:'shrine' },
      { name:'The Golden Way', at:[600,420], kind:null },
    ],
  },

  // =================================================================
  // SETTLEMENT — Hearthvale  (the one worked example settlement)
  // =================================================================
  'settle-hearthvale': {
    id: 'settle-hearthvale',
    level: 'settlement',
    title: 'Hearthvale',
    subtitle: 'City of First Light — where every climber begins.',
    parent: { mapId:'region-dawnfields', label:'The Dawnfields' },
    source: {
      kind: 'image',
      url: asset('settlements/hearthvale.png'),
      width: 1200,
      height: 900,
    },
    minZoom: -1, maxZoom: 3, initialZoom: 0,
    regions: [],
    // District markers; some open interior maps (provisional examples).
    markers: [
      { id:'first-hearth', name:'The First Hearth', kind:'shrine',
        at:[600,300], sub:'Eternal flame', to:null,
        blurb:'Lit on the day the floor opened. Climbers light a taper before they leave.' },
      { id:'lanternrow', name:"Lanternmakers' Row", kind:'market',
        at:[420,440], sub:'Guild district', to:null,
        blurb:'Every lamp in the city is born here.' },
      { id:'chapel', name:'The Ascendant Chapel', kind:'shrine',
        at:[760,480], sub:'Hall of names', to:null,
        blurb:'The names of those who climbed and never returned.' },
      { id:'rest', name:"The Climbers' Rest", kind:'inn',
        at:[470,600], sub:'Inn', to:null,
        blurb:'Last warm bed before the wilds.' },
      { id:'watchspire', name:'Watchspire', kind:'tower',
        at:[820,360], sub:'Lookout', to:null,
        blurb:'On clear nights you can see the Gate burning far to the east.' },
      { id:'stonebridge-gate', name:'Stonebridge Gate', kind:'gate',
        at:[700,640], sub:'South gate', to:null, provisional:true,
        blurb:'Onto Stonebridge Crossing — the only safe span across the headwaters.' },
    ],
    features: [],
  },
};

// ---------------------------------------------------------------------
// ROUTE ↔ MAP RESOLUTION
// Routes live under #/floors/1/map[/<region>[/<settlement>]]
// We resolve the deepest valid segment to a mapId, and also return the
// breadcrumb chain so nav stays in sync.
// ---------------------------------------------------------------------

// region-segment → mapId (only authored regions resolve; others fall back)
const REGION_SEG = {
  dawnfields: 'region-dawnfields',
};
// settlement-segment → mapId
const SETTLE_SEG = {
  hearthvale: 'settle-hearthvale',
};

export function resolveMapRoute(parts) {
  // parts are the hash segments AFTER 'floors','1','map'
  const [regionSeg, settleSeg] = parts;

  if (regionSeg && settleSeg) {
    const id = SETTLE_SEG[settleSeg];
    if (id && MAPS[id]) return { mapId:id, regionSeg, settleSeg };
  }
  if (regionSeg) {
    const id = REGION_SEG[regionSeg];
    if (id && MAPS[id]) return { mapId:id, regionSeg };
  }
  return { mapId:'floor1' };
}

// Build the in-engine route a marker/region should navigate to.
export function mapHrefFor(mapId) {
  if (mapId === 'floor1') return '#/floors/1/map';
  if (mapId.startsWith('region-')) {
    const seg = Object.keys(REGION_SEG).find((k) => REGION_SEG[k] === mapId);
    return seg ? `#/floors/1/map/${seg}` : '#/floors/1/map';
  }
  if (mapId.startsWith('settle-')) {
    const seg = Object.keys(SETTLE_SEG).find((k) => SETTLE_SEG[k] === mapId);
    // settlement lives under its parent region segment
    const map = MAPS[mapId];
    const parentSeg = map?.parent
      ? Object.keys(REGION_SEG).find((k) => REGION_SEG[k] === map.parent.mapId)
      : null;
    if (seg && parentSeg) return `#/floors/1/map/${parentSeg}/${seg}`;
  }
  return '#/floors/1/map';
}
