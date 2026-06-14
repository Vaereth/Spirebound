// =====================================================================
// GUILDMASTER CORVEN HALE — dialogue bank for the Ascendant Guild Hall.
// Lines are keyed to what the visitor is doing. Pure data; no lag.
// Corven runs Floor 1's Ascendant Guild in Hearthvale. Gruff, warm, seen
// too many young climbers walk out and not come back. Human, medieval.
// =====================================================================

export const CORVEN = {
  // Shown on arrival / idle
  greet: [
    'Welcome to the Ascendant Guild, climber. Mind the ale, mind the records — both\u2019ll save your life.',
    'Corven Hale. I keep the beast-rolls for the Verdant Reach. Ask, and I\u2019ll tell you what I know.',
    'Sit if you like. The dead don\u2019t read these pages — only the living who mean to stay that way.',
    'Every name in this hall cost someone a scar to write. Read them like it.',
  ],
  // When the visitor filters/looks at a grade band
  grade: {
    E: ['E-grade. Pests and prey. Still — I\u2019ve buried a fool who underestimated a hungry colony.'],
    D: ['D-grade. They\u2019ll bloody a careless hand. Bring a blade and a brain.'],
    C: ['C-grade. Now you\u2019re reading the serious rolls. Ambushers, pack-hunters. Don\u2019t go alone.'],
    B: ['B-grade. Apex things. I\u2019d want a prepared party and a clear escape before I\u2019d sign that contract.'],
    A: ['A-grade? Looking for trouble, are we. These are the ones that empty villages. Bring veterans.'],
    S: ['S-grade. That\u2019s Guardian country, climber. You don\u2019t \u201Cbrowse\u201D those. You prepare for them.'],
  },
  // When searching by text
  search: [
    'Hunting for something specific? Good. A climber who knows their quarry lives longer.',
    'Type the name. The rolls remember everything that\u2019s tried to kill us.',
  ],
  searchHit: [
    'Aye, we\u2019ve got a page on that one. Read it twice.',
    'There it is. Learn its habits before it learns yours.',
  ],
  searchMiss: [
    'No such beast in my rolls. Either you misheard the name\u2026 or you\u2019ve found something new. Pray it\u2019s the former.',
    'Nothing under that name. If you saw it with your own eyes, the Guild will want a word.',
  ],
  // When filtering by region
  region: {
    'Dawnfields': ['The Dawnfields. Gentle country — which is exactly why the careless die there.'],
    'Silverrun': ['Silverrun. Watch the water. What you can\u2019t see under it is the problem.'],
    'Windmere Hills': ['Windmere. Keep one eye on the sky and one on the cliff edge.'],
    'Briarwood': ['Briarwood. The forest hides its teeth well. Trust the lanterns, not your eyes.'],
    'The Old March': ['The Old March. Old war never quite ended there. The dead still keep formation.'],
    'Crownward Expanse': ['The Crownward constructs don\u2019t tire and don\u2019t forget. Neither should you.'],
    'Caves and Underground': ['Down in the dark, sound carries further than light. So does hunger.'],
  },
  // Browsing many / clearing filters
  browseLots: [
    'Reading the whole roll, are you? Thorough. I like the ones who come back.',
    'All of them at once. Ambitious. Don\u2019t let it go to your head before it goes to your gut.',
  ],
  cleared: [
    'Back to the full roll. Take your time — the ale\u2019s paid for.',
  ],
  // When opening a creature's full record
  open: [
    'Good choice. Read the field notes, not just the picture.',
    'Study that one properly. The Guild wrote every line for a reason.',
  ],
};

// Small helper: pick a deterministic-ish line so it doesn't reshuffle every render.
export function corvenLine(pool, seed = 0) {
  if (!pool || pool.length === 0) return '';
  return pool[Math.abs(seed) % pool.length];
}
