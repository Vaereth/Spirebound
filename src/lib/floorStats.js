/* =====================================================================
   FLOOR STATS — compute a floor's average Guild grade + enemy level range
   from real bestiary data. Only Floor 1 has a catalogued bestiary today;
   higher floors return null (shown honestly as "Uncharted"), never invented.
   ===================================================================== */
import { BESTIARY } from '../data/bestiary.js';

const GRADE_ORDER = ['E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS'];

// Map a floor number to its creature set. Floor 1 = the Verdant Reach bestiary.
function creaturesForFloor(n) {
  if (n === 1) return BESTIARY;
  return []; // higher floors not yet catalogued
}

export function floorStats(n) {
  const creatures = creaturesForFloor(n);
  if (!creatures.length) return null;

  const idxs = creatures.map((c) => GRADE_ORDER.indexOf(c.grade)).filter((i) => i >= 0);
  const levels = creatures.map((c) => c.level).filter((v) => v != null);
  if (!idxs.length) return null;

  const avgIdx = idxs.reduce((a, b) => a + b, 0) / idxs.length;
  const avgGrade = GRADE_ORDER[Math.round(avgIdx)];

  return {
    avgGrade,
    count: creatures.length,
    levelMin: levels.length ? Math.min(...levels) : null,
    levelMax: levels.length ? Math.max(...levels) : null,
  };
}
