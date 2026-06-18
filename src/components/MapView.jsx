// =====================================================================
// SPIREBOUND — MapView (reusable hierarchical map engine)
// ---------------------------------------------------------------------
// One component renders ANY level (floor / region / settlement / …).
// It is driven entirely by data/mapConfig.js + the current route, so the
// same engine powers the whole hierarchy. Features:
//   • ImageOverlay or raster-tile source (via lib/mapEngine adapter)
//   • Clickable GeoJSON regions (hover highlight + drill-in navigation)
//   • Glyph markers with popups; settlement markers drill in
//   • Semantic zoom: labels/markers fade in/out by zoom level
//   • Layer toggles (regions / settlements / features / labels)
//   • In-map search across this level's places
//   • Fullscreen, breadcrumbs (host-provided) + in-map Back/Up
//   • Keyboard + touch friendly; respects prefers-reduced-motion
//   • Editor mode (?mapedit=1): click → console [x,y] + live readout
// =====================================================================

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  MapContainer, ImageOverlay, TileLayer, Polygon, Marker, Popup, Tooltip,
  useMap, useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { MAPS, mapHrefFor } from '../data/mapConfig.js';
import {
  resolveSource, imageBounds, toLatLng, polygonToLatLngs,
  glyphIcon, labelIcon,
} from '../lib/mapEngine.js';
import './MapView.css';

// ---- semantic-zoom thresholds (relative to a level's zoom range) ----
const LABEL_MIN_ZOOM_OFFSET = 0;   // labels appear at/above initialZoom
const FEATURE_MIN_ZOOM_OFFSET = 1; // small features appear one step in

// =====================================================================
// Source layer (image OR tiles) — chosen by adapter
// =====================================================================
function SourceLayer({ map }) {
  const src = resolveSource(map);
  if (src.type === 'tiles') {
    return (
      <TileLayer
        url={src.url}
        tileSize={src.tileSize}
        bounds={src.bounds}
        noWrap={src.noWrap}
        minNativeZoom={src.minNativeZoom}
        maxNativeZoom={src.maxNativeZoom}
      />
    );
  }
  return <ImageOverlay url={src.url} bounds={src.bounds} />;
}

// =====================================================================
// Fit + clamp the view to the image bounds on mount / map change
// =====================================================================
function ViewController({ map }) {
  const lmap = useMap();
  useEffect(() => {
    const b = imageBounds(map.source.width, map.source.height);
    lmap.setMaxBounds(b);
    lmap.fitBounds(b, { animate: false });
    if (typeof map.initialZoom === 'number') {
      lmap.setZoom(map.initialZoom, { animate: false });
    }
  }, [lmap, map]);
  return null;
}

// =====================================================================
// Track zoom for semantic visibility + report to parent
// =====================================================================
function ZoomWatcher({ onZoom }) {
  const lmap = useMapEvents({
    zoomend: () => onZoom(lmap.getZoom()),
  });
  useEffect(() => { onZoom(lmap.getZoom()); }, [lmap, onZoom]);
  return null;
}

// =====================================================================
// Editor: click → log + readout (only when ?mapedit=1)
// =====================================================================
function EditorProbe({ map, onReadout }) {
  useMapEvents({
    mousemove: (e) => {
      const x = Math.round(e.latlng.lng);
      const y = Math.round(map.source.height - e.latlng.lat);
      onReadout([x, y]);
    },
    click: (e) => {
      const x = Math.round(e.latlng.lng);
      const y = Math.round(map.source.height - e.latlng.lat);
      // eslint-disable-next-line no-console
      console.log(`[mapedit] ${map.id}  [x,y] = [${x}, ${y}]`);
    },
  });
  return null;
}

// =====================================================================
// Region polygons (clickable, hover highlight, provisional styling)
// =====================================================================
function RegionLayer({ map, navigate, visible }) {
  const h = map.source.height;
  if (!visible) return null;
  return (
    <>
      {map.regions.map((r) => {
        const latlngs = polygonToLatLngs(r.polygon, h);
        const enterable = !!r.mapId;
        const accent = r.accent || 'var(--accent-floor1)';
        return (
          <Polygon
            key={r.id}
            positions={latlngs}
            pathOptions={{
              className: `spire-region ${r.provisional ? 'is-provisional' : ''} ${enterable ? 'is-enterable' : ''}`,
              color: 'rgba(231,227,214,0.35)',
              weight: 1,
              fillColor: 'rgba(94,156,104,0.0)',
              fillOpacity: 0,
              dashArray: r.provisional ? '6 5' : undefined,
            }}
            eventHandlers={{
              click: () => { if (enterable) navigate(mapHrefFor(r.mapId)); },
              mouseover: (e) => e.target.setStyle({ fillOpacity: enterable ? 0.16 : 0.06, weight: 2 }),
              mouseout: (e) => e.target.setStyle({ fillOpacity: 0, weight: 1 }),
            }}
          >
            <Popup>
              <div className="spire-pop">
                <strong>{r.name}{r.provisional && <em className="spire-prov"> · provisional</em>}</strong>
                {r.blurb && <p>{r.blurb}</p>}
                {enterable
                  ? <button className="spire-pop__btn" onClick={() => navigate(mapHrefFor(r.mapId))}>Enter region →</button>
                  : <span className="spire-pop__muted">Map not yet charted</span>}
              </div>
            </Popup>
          </Polygon>
        );
      })}
    </>
  );
}

// =====================================================================
// Markers (settlements / points of interest)
// =====================================================================
function MarkerLayer({ map, navigate, showMarkers, showLabels }) {
  const h = map.source.height;
  if (!showMarkers) return null;
  return (
    <>
      {map.markers.map((m) => {
        const enterable = !!m.to;
        return (
          <Marker
            key={m.id}
            position={toLatLng(m.at, h)}
            icon={glyphIcon(m.kind, { provisional: m.provisional })}
            keyboard
            eventHandlers={{
              click: () => { if (enterable) navigate(mapHrefFor(m.to)); },
            }}
          >
            <Popup>
              <div className="spire-pop">
                <strong>{m.name}{m.provisional && <em className="spire-prov"> · provisional</em>}</strong>
                {m.sub && <div className="spire-pop__sub">{m.sub}</div>}
                {m.blurb && <p>{m.blurb}</p>}
                {enterable &&
                  <button className="spire-pop__btn" onClick={() => navigate(mapHrefFor(m.to))}>Enter →</button>}
              </div>
            </Popup>
            {showLabels && (
              <LabelTooltip text={m.name} kind={m.kind} provisional={m.provisional} />
            )}
          </Marker>
        );
      })}
    </>
  );
}

// permanent tooltip used as a map label under a marker
function LabelTooltip({ text }) {
  return (
    <Tooltip permanent direction="bottom" offset={[0, 6]} className="spire-tt">
      {text}
    </Tooltip>
  );
}

// =====================================================================
// Features (non-interactive labelled lore points)
// =====================================================================
function FeatureLayer({ map, visible }) {
  const h = map.source.height;
  if (!visible || !map.features?.length) return null;
  return (
    <>
      {map.features.map((f, i) => (
        <Marker
          key={i}
          position={toLatLng(f.at, h)}
          icon={f.kind ? glyphIcon(f.kind) : labelIcon(f.name, { kind: 'feature' })}
          interactive={false}
          keyboard={false}
        >
          {f.kind && (
            <FeatureTip text={f.name} />
          )}
        </Marker>
      ))}
    </>
  );
}
function FeatureTip({ text }) {
  return <Tooltip permanent direction="bottom" offset={[0, 4]} className="spire-tt spire-tt--feature">{text}</Tooltip>;
}

// =====================================================================
// In-map search across this level's places
// =====================================================================
function SearchBox({ map, onPick }) {
  const [q, setQ] = useState('');
  const items = useMemo(() => {
    const list = [
      ...map.markers.map((m) => ({ id:m.id, name:m.name, sub:m.sub, at:m.at, kind:m.kind })),
      ...map.regions.map((r) => ({ id:r.id, name:r.name, sub:r.blurb, at:r.labelAt, kind:'region' })),
    ];
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return list.filter((x) => x.name.toLowerCase().includes(s)).slice(0, 6);
  }, [q, map]);

  return (
    <div className="spire-search">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search this map…"
        aria-label="Search places on this map"
      />
      {items.length > 0 && (
        <ul className="spire-search__results">
          {items.map((it) => (
            <li key={it.id}>
              <button onClick={() => { onPick(it); setQ(''); }}>
                <span>{it.name}</span>
                {it.sub && <em>{it.sub}</em>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Pans the map to a chosen search result.
function SearchFlyer({ target, map }) {
  const lmap = useMap();
  useEffect(() => {
    if (!target) return;
    lmap.panTo(toLatLng(target.at, map.source.height), { animate: true });
  }, [target, lmap, map]);
  return null;
}

// =====================================================================
// MAIN COMPONENT
// =====================================================================
export default function MapView({ mapId, navigate }) {
  const map = MAPS[mapId] || MAPS['floor1'];
  const wrapRef = useRef(null);
  const [zoom, setZoom] = useState(map.initialZoom ?? 0);
  const [layers, setLayers] = useState({ regions: true, settlements: true, features: true, labels: true });
  const [flyTarget, setFlyTarget] = useState(null);
  const [readout, setReadout] = useState(null);
  const [isFs, setIsFs] = useState(false);

  const editor = useMemo(
    () => new URLSearchParams(window.location.search).get('mapedit') === '1', []);

  // semantic zoom gates
  const showLabels = layers.labels && zoom >= (map.initialZoom + LABEL_MIN_ZOOM_OFFSET);
  const showFeatures = layers.features && zoom >= (map.initialZoom + FEATURE_MIN_ZOOM_OFFSET);

  const toggle = (k) => setLayers((s) => ({ ...s, [k]: !s[k] }));

  const goUp = useCallback(() => {
    if (map.parent) navigate(mapHrefFor(map.parent.mapId));
    else navigate('#/floors/1');
  }, [map, navigate]);

  // fullscreen
  const toggleFs = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen?.().then(() => setIsFs(true)).catch(()=>{});
    else document.exitFullscreen?.().then(() => setIsFs(false)).catch(()=>{});
  }, []);
  useEffect(() => {
    const h = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  // keyboard: Esc = up a level, F = fullscreen
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target?.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (e.key === 'Escape' && !document.fullscreenElement) goUp();
      if (e.key.toLowerCase() === 'f') toggleFs();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goUp, toggleFs]);

  return (
    <section className="spire-mapview" ref={wrapRef} aria-label={`Map: ${map.title}`}>
      {/* header / chrome */}
      <div className="spire-mapview__top">
        <div className="spire-mapview__id">
          <button className="spire-up" onClick={goUp} aria-label="Up one level">
            ← {map.parent ? map.parent.label : 'Floor 1'}
          </button>
          <div className="spire-mapview__title">
            <h2>{map.title}</h2>
            {map.subtitle && <p>{map.subtitle}</p>}
          </div>
        </div>

        <div className="spire-mapview__tools">
          <SearchBox map={map} onPick={setFlyTarget} />
          <div className="spire-layers" role="group" aria-label="Map layers">
            {map.regions.length > 0 &&
              <LayerToggle on={layers.regions} onClick={() => toggle('regions')}>Regions</LayerToggle>}
            <LayerToggle on={layers.settlements} onClick={() => toggle('settlements')}>Places</LayerToggle>
            {map.features?.length > 0 &&
              <LayerToggle on={layers.features} onClick={() => toggle('features')}>Features</LayerToggle>}
            <LayerToggle on={layers.labels} onClick={() => toggle('labels')}>Labels</LayerToggle>
          </div>
          <button className="spire-fs" onClick={toggleFs} aria-label="Toggle fullscreen">
            {isFs ? '⤢ Exit' : '⤢ Full'}
          </button>
        </div>
      </div>

      {/* the map */}
      <div className="spire-mapview__canvas">
        <MapContainer
          crs={L.CRS.Simple}
          minZoom={map.minZoom}
          maxZoom={map.maxZoom}
          zoom={map.initialZoom}
          center={[map.source.height / 2, map.source.width / 2]}
          zoomControl
          attributionControl={false}
          className="spire-leaflet"
          style={{ width:'100%', height:'100%' }}
        >
          <ViewController map={map} />
          <ZoomWatcher onZoom={setZoom} />
          <SourceLayer map={map} />

          <RegionLayer map={map} navigate={navigate} visible={layers.regions} />
          <MarkerLayer map={map} navigate={navigate}
                       showMarkers={layers.settlements} showLabels={showLabels} />
          <FeatureLayer map={map} visible={showFeatures} />

          <SearchFlyer target={flyTarget} map={map} />
          {editor && <EditorProbe map={map} onReadout={setReadout} />}
        </MapContainer>

        {editor && (
          <div className="spire-editor-readout">
            <strong>EDITOR</strong> {map.id} · [x,y] = [{readout ? readout.join(', ') : '–'}]
            <span> · click logs to console</span>
          </div>
        )}
      </div>
    </section>
  );
}

function LayerToggle({ on, onClick, children }) {
  return (
    <button
      className={`spire-layer ${on ? 'is-on' : ''}`}
      onClick={onClick}
      aria-pressed={on}
    >
      {children}
    </button>
  );
}
