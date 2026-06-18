import { CAST } from '../data/cast.js';
import { BESTIARY } from '../data/bestiary.js';
import { NAMED_RARES, REGIONAL_ELITES } from '../data/canon.js';
import { FLOOR1 as F } from '../data/floor1.js';
import { slugify } from './slug.js';

// ---- Top-level nav links (always available in the bar) ----
export const NAV_LINKS = [
  { label: 'Climbers', route: '#/climbers' },
  { label: 'Systems', route: '#/systems' },
  { label: 'Ascent', route: '#/floors' },
  { label: 'Floor 1', route: '#/floors/1' },
];

// ---- Breadcrumbs derived from the current hash parts ----
// Returns [{ label, route }] where the last item is the current page (no link).
export function crumbsFor(parts) {
  const [s0, s1, s2, s3] = parts;
  const home = { label: 'Spire', route: '#/' };
  if (!s0) return [home];

  if (s0 === 'truth') return [home, { label: 'The Three Truths' }];
  if (s0 === 'climbers') return [home, { label: 'The Climbers' }];
  if (s0 === 'systems') return [home, { label: 'Stats & Systems' }];

  if (s0 === 'heroes' && s1) {
    const c = CAST.find((x) => x.id === s1);
    return [home, { label: 'The Climbers', route: '#/climbers' }, { label: c ? c.name : s1 }];
  }

  if (s0 === 'floors') {
    const out = [home, { label: 'The Ascent', route: '#/floors' }];
    if (!s1) return out;
    out.push({ label: 'Floor 1', route: '#/floors/1' });
    if (!s2) { out[out.length - 1] = { label: 'Floor 1' }; return out; }

    const f1 = { route: '#/floors/1' };
    if (s2 === 'world') return [...out, { label: 'The Living World' }];
    if (s2 === 'map') {
      const REGION_LABELS = { dawnfields: 'The Dawnfields' };
      const SETTLE_LABELS = { hearthvale: 'Hearthvale' };
      const chain = [...out, { label: 'Map', route: '#/floors/1/map' }];
      if (!s3) { chain[chain.length - 1] = { label: 'Map' }; return chain; }
      const settleSeg = parts[4];
      chain.push({ label: REGION_LABELS[s3] || s3, route: `#/floors/1/map/${s3}` });
      if (settleSeg) chain.push({ label: SETTLE_LABELS[settleSeg] || settleSeg });
      else chain[chain.length - 1] = { label: REGION_LABELS[s3] || s3 };
      return chain;
    }
    if (s2 === 'regions') return [...out, { label: 'Regions' }];
    if (s2 === 'fenrath') return [...out, { label: 'Fenrath' }];
    if (s2 === 'systems') return [...out, { label: 'Named Rares & Elites' }];
    if (s2 === 'sealed') return [...out, { label: 'Sealed Archive' }];
    if (s2 === 'bestiary') {
      const base = [...out, { label: 'Bestiary', route: '#/floors/1/bestiary' }];
      if (s3) {
        const c = BESTIARY.find((x) => String(x.id) === String(s3));
        return [...base, { label: c ? c.name : `Species ${s3}` }];
      }
      base[base.length - 1] = { label: 'Bestiary' };
      return base;
    }
    if (s2 === 'npcs' && s3) {
      const name = F.npcs.hearthvale.find((n) => slugify(n) === s3) || s3;
      return [...out, { label: 'Named Souls', route: '#/floors/1/world' }, { label: name }];
    }
    if (s2 === 'professions' && s3) {
      const name = (F.professions.core.find((p) => slugify(p) === s3)) || s3;
      return [...out, { label: 'Professions', route: '#/floors/1/world' }, { label: name }];
    }
    return out;
  }

  return [home];
}

// ---- Search index: every navigable destination ----
let _index = null;
export function searchIndex() {
  if (_index) return _index;
  const idx = [];
  // top-level
  idx.push({ label: 'Home', kind: 'Page', route: '#/' });
  idx.push({ label: 'The Three Truths', kind: 'Page', route: '#/truth' });
  idx.push({ label: 'The Climbers', kind: 'Page', route: '#/climbers' });
  idx.push({ label: 'Stats & Systems', kind: 'Page', route: '#/systems' });
  idx.push({ label: 'Combat Mathematics & Damage Calculator', kind: 'Page', route: '#/systems/combat' });
  idx.push({ label: 'The Ascent', kind: 'Page', route: '#/floors' });
  idx.push({ label: 'Floor 1 · The Verdant Reach', kind: 'Floor', route: '#/floors/1' });
  idx.push({ label: 'Regions of the Reach', kind: 'Page', route: '#/floors/1/regions' });
  idx.push({ label: 'The Living World', kind: 'Page', route: '#/floors/1/world' });
  idx.push({ label: 'Floor 1 Map', kind: 'Map', route: '#/floors/1/map' });
  idx.push({ label: 'Map · The Dawnfields', kind: 'Map', route: '#/floors/1/map/dawnfields' });
  idx.push({ label: 'Map · Hearthvale', kind: 'Map', route: '#/floors/1/map/dawnfields/hearthvale' });
  idx.push({ label: 'Bestiary', kind: 'Page', route: '#/floors/1/bestiary' });
  idx.push({ label: 'Named Rares & Regional Elites', kind: 'Page', route: '#/floors/1/systems' });
  idx.push({ label: 'Fenrath — The First Guardian', kind: 'Boss', route: '#/floors/1/fenrath' });
  idx.push({ label: 'Sealed Archive', kind: 'Restricted', route: '#/floors/1/sealed' });

  // heroes
  CAST.forEach((c) => idx.push({ label: c.name, sub: c.epithet, kind: 'Climber', route: '#/heroes/' + c.id }));
  // creatures
  BESTIARY.forEach((c) => idx.push({ label: c.name, sub: `${c.region} · L${c.level} · ${c.grade}`, kind: 'Creature', route: '#/floors/1/bestiary/' + c.id }));
  // named rares & elites (point to the section page)
  NAMED_RARES.forEach((r) => idx.push({ label: r.name, sub: `Named Rare · ${r.species}`, kind: 'Named Rare', route: '#/floors/1/systems' }));
  REGIONAL_ELITES.forEach((r) => idx.push({ label: r.name, sub: 'Regional Elite', kind: 'Elite', route: '#/floors/1/systems' }));
  // npcs
  F.npcs.hearthvale.forEach((n) => idx.push({ label: n, sub: 'Hearthvale', kind: 'NPC', route: '#/floors/1/npcs/' + slugify(n) }));
  // professions
  F.professions.core.forEach((p) => idx.push({ label: p, sub: 'Profession', kind: 'Craft', route: '#/floors/1/professions/' + slugify(p) }));

  _index = idx;
  return idx;
}
