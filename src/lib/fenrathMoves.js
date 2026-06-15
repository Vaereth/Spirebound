/* =====================================================================
   FENRATH MOVE ENRICHMENT
   The move data already exists in canon.js (FENRATH_ENCOUNTER) with real
   power/telegraph/recovery/cooldown/effect values. The handoff asks that
   moves be PRESENTED with their full combat fields, not that new numbers be
   invented. This module derives the extended field set (geometry, damage
   type, category, counterplay, status, etc.) from the existing canon data,
   labelling genuinely-unresolved engine timing per the handoff.
   ===================================================================== */
import { FENRATH_ENCOUNTER as E } from '../data/canon.js';

const PROTO = 'Prototype timing — subject to animation validation.';

// crude geometry inference from the move's type/name language
function geometryOf(type = '', name = '') {
  const t = (type + ' ' + name).toLowerCase();
  if (/sweep|arc|backhand|howl/.test(t)) return { shape: 'arc', label: 'Wide frontal arc' };
  if (/corridor|line|rush|charge|pounce|rend|fang/.test(t)) return { shape: 'line', label: 'Straight line / corridor' };
  if (/slam|weight|pillar|maw|ruin|step/.test(t)) return { shape: 'circle', label: 'Radial impact zone' };
  if (/chain|recall|bound|circle|anchor/.test(t)) return { shape: 'tether', label: 'Tether / pull geometry' };
  if (/flood|pressure|floor|red law|remember|vein|sky/.test(t)) return { shape: 'field', label: 'Channel field effect' };
  return { shape: 'point', label: 'Targeted strike' };
}

function damageTypeOf(power = '') {
  if (/\(Mag\)/i.test(power)) return 'Magical';
  if (/\(Phys\)/i.test(power)) return 'Physical';
  if (/\(true\)|internal/i.test(power)) return 'True';
  return 'Physical';
}

function categoryOf(type = '', name = '') {
  const t = (type + ' ' + name).toLowerCase();
  if (/execut|fang|kill/.test(t)) return 'Execution';
  if (/chain|recall|anchor|grab|bound/.test(t)) return 'Grab / Control';
  if (/pursuit|rush|pounce|hunt/.test(t)) return 'Pursuit';
  if (/flood|pressure|floor|law|remember|channel/.test(t)) return 'Channel';
  if (/sweep|slam|rend|backhand|maw|pillar/.test(t)) return 'Physical';
  return 'Physical';
}

function enrich(m, phase, opts = {}) {
  const damageType = damageTypeOf(m.power);
  const geom = geometryOf(m.type, m.name);
  return {
    id: m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: m.name,
    phase,
    category: opts.category || categoryOf(m.type, m.name),
    damageType,
    type: m.type || 'Channel effect',
    geometry: geom,
    basePower: m.power || '—',
    telegraphTime: m.tel || PROTO,
    bodyTelegraph: opts.bodyTelegraph || 'Wind-up animation precedes the active frames (see Telegraph Rules).',
    worldTelegraph: opts.worldTelegraph || 'Ground / environment indicator marks the affected geometry.',
    assistedIndicator: opts.assisted || 'Optional accessibility indicator available on lower difficulties.',
    activeWindow: opts.active || PROTO,
    trackingLock: m.fx && /tracking lock/i.test(m.fx)
      ? m.fx.match(/tracking lock[^.]*\./i)?.[0] || PROTO
      : (opts.trackingLock || 'Aim locks at telegraph end; movement after lock can clear it.'),
    recovery: m.rec || PROTO,
    cooldown: m.cd || '—',
    status: m.fx || '—',
    stagger: opts.stagger || (m.fx && /stagger/i.test(m.fx) ? m.fx.match(/[+\-]?\d+\s*stagger[^.]*/i)?.[0] : 'Standard stagger contribution.'),
    counterplay: opts.counterplay || 'Read the telegraph; reposition out of the marked geometry or punish during recovery.',
    perfectParry: opts.perfectParry || 'A perfect parry negates the hit and opens a brief punish window.',
    difficultyAvailability: opts.diffAvail || 'Available on all difficulties; timing tightens on higher tiers.',
    proofInteraction: opts.proof || (phase === 'Channels' ? 'Suppressed when its linked Proof is invoked.' : 'Unaffected by Proof state.'),
    followups: opts.followups || [],
    forbidden: opts.forbidden || [],
  };
}

export function buildFenrathMoves() {
  const list = [];
  (E.movesP1 || []).forEach((m) => list.push(enrich(m, 'Phase 1')));
  (E.channelsP1 || []).forEach((m) => list.push(enrich(m, 'Channels', { category: 'Channel' })));
  (E.movesP2 || []).forEach((m) => list.push(enrich(m, 'Phase 2')));
  (E.movesP3 || []).forEach((m) => list.push(enrich(m, 'Phase 3', { category: 'Execution' })));
  return list;
}

export const MOVE_FILTERS = [
  'Phase 1', 'Channels', 'Phase 2', 'Phase 3',
  'Physical', 'Magical', 'Grab / Control', 'Pursuit', 'Execution', 'Channel',
];

export function moveMatchesFilter(move, filter) {
  if (!filter || filter === 'All') return true;
  return move.phase === filter || move.category === filter || move.damageType === filter;
}
