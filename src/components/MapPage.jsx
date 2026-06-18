// =====================================================================
// SPIREBOUND — MapPage
// Thin wrapper that maps the current hash route to a mapId and mounts the
// reusable MapView engine. Lives under #/floors/1/map[/region[/settle]].
// =====================================================================

import MapView from './MapView.jsx';
import { resolveMapRoute } from '../data/mapConfig.js';

// `subParts` = route.parts AFTER ['floors','1','map']
export default function MapPage({ subParts = [], navigate }) {
  const { mapId } = resolveMapRoute(subParts);
  // `key` forces a clean remount when switching levels so Leaflet resets.
  return <MapView key={mapId} mapId={mapId} navigate={navigate} />;
}
