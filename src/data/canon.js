// =====================================================================
// SPIREBOUND — CANON UPDATE DATA
// Universal stat system, progression, ranks, Floor 1 named rares & regional
// elites (public), and the DEEP-LORE archive (spoiler-gated).
// Source: Recent Canon Update handoff. TBD stays TBD; nothing invented.
// =====================================================================

export const ATTR_ORDER = ['vitality', 'might', 'guard', 'arcana', 'ward', 'mobility'];
export const ATTR_LABEL = { vitality: 'Vitality', might: 'Might', guard: 'Guard', arcana: 'Arcana', ward: 'Ward', mobility: 'Mobility' };

export const ATTRIBUTES = [
  { key: 'vitality', name: 'Vitality', desc: 'Maximum health, physical endurance, wound resistance, environmental survival, and recovery from critical injury. It is not armour.' },
  { key: 'might', name: 'Might', desc: 'Physical damage, melee force, projectile impact, natural weapon power, collision damage, and physical stagger inflicted.' },
  { key: 'guard', name: 'Guard', desc: 'Armour, hide thickness, structural durability, physical mitigation, resistance to cutting/piercing/crushing, and physical stability.' },
  { key: 'arcana', name: 'Arcana', desc: 'Magical damage, spell potency, rune strength, elemental output, curse strength, supernatural healing, magical status application, and instinctive supernatural power.' },
  { key: 'ward', name: 'Ward', desc: 'Magical mitigation, curse resistance, spiritual and mental resilience, resistance to reality alteration, magical status resistance, and supernatural stability.' },
  { key: 'mobility', name: 'Mobility', desc: 'Movement speed, acceleration, turning, dodge, repositioning, aerial control, chase/disengagement, and movement recovery. A slow creature may still possess one extremely fast committed attack.' },
];

export const CLASSIFICATIONS = {
  size: ['Tiny', 'Small', 'Medium', 'Large', 'Colossal', 'Guardian-scale'],
  intelligence: ['Instinctive', 'Animal', 'Cunning', 'Sapient', 'Tactical', 'Construct Logic', 'Alien'],
  temperament: ['Passive', 'Wary', 'Defensive', 'Territorial', 'Predatory', 'Opportunistic', 'Hostile', 'Command-bound'],
  movement: ['Grounded', 'Burrowing', 'Aquatic', 'Amphibious', 'Climbing', 'Gliding', 'Flying', 'Constructed', 'Phasing', 'Multi-gravity'],
  affinities: ['Wind', 'River', 'Storm', 'Root', 'Rune', 'Solar', 'Temporal', 'Corruption'],
  poise: ['Fragile', 'Light', 'Stable', 'Heavy', 'Unyielding', 'Guardian', 'Absolute'],
  stagger: ['Easily Broken', 'Standard', 'Resistant', 'Highly Resistant', 'Elite', 'Guardian', 'Mechanic-Only'],
};

export const PLAYER_PROGRESSION = {
  intro: 'Every combat-capable entity in Spirebound uses the same six core attributes. Level 1 begins with zero allocatable Attribute Points; Level 100 grants exactly 1,000.',
  table: [
    { lvl: 'Level 1', pts: '0' }, { lvl: 'Level 2', pts: '10' }, { lvl: 'Level 3', pts: '20' },
    { lvl: 'Level 4', pts: '30' }, { lvl: 'Level 5', pts: '40' },
    { lvl: 'Levels 2–99', pts: '+10 / level' }, { lvl: 'Level 100', pts: '+10, plus a +10 capstone' },
  ],
  finalTotal: 'Final Level 100 allocatable total: 1,000.',
  sheet: ['Innate attributes', 'Allocated attributes', 'Gear bonuses', 'Effective total'],
  formulas: [
    'Natural Total = innate attributes + allocated points.',
    'Effective Total = Natural Total + gear, enchantments, buffs, penalties, temporary states, and other modifiers.',
  ],
  softCaps: [
    { band: '0–200', effect: 'Full efficiency' },
    { band: '201–300', effect: 'Mild diminishing returns' },
    { band: '301–400', effect: 'Stronger diminishing returns' },
    { band: '401+', effect: 'Extreme specialisation' },
  ],
  note: 'No hard equipment cap is currently locked.',
};

export const LEVEL_BANDS = [
  { lvl: 'Level 1', desc: 'Minor wildlife, tutorial organisms, juveniles, low-threat magical life, environmental hazards.' },
  { lvl: 'Level 2', desc: 'Standard early regional threats, common predators, basic ambushers.' },
  { lvl: 'Level 3', desc: 'Established predators, pack threats, deeper regional enemies, dangerous seasonal species, Old March constructs.' },
  { lvl: 'Level 4', desc: 'High-end normal Floor 1 enemies, Crownward threats, major pack encounters, apex standard species, dangerous winter creatures.' },
  { lvl: 'Level 5+', desc: 'Named rares, regional alphas, post-Fenrath threats, exceptional elites, anomalous encounters.' },
];

export const RANK_SYSTEM = {
  ecological: ['Common', 'Mature', 'Veteran', 'Alpha', 'Elite', 'Named Rare'],
  separate: ['Boss', 'Guardian', 'Anomalous'],
  defs: [
    { rank: 'Common', d: 'Standard species member.' },
    { rank: 'Mature', d: 'Older, fully developed; stronger natural weapons/resistances, more territorial.' },
    { rank: 'Veteran', d: 'Survived repeated conflict; faster recovery, stronger chains, higher stagger resistance, visible scars.' },
    { rank: 'Alpha', d: 'Dominant local individual; may coordinate packs/herds, lead migration, expand territory, grant shared buffs.' },
    { rank: 'Elite', d: 'Must have meaningful mechanics and world relevance, not merely more health.' },
    { rank: 'Named Rare', d: 'Unique or semi-unique named individual with spawn condition, exclusive mechanics, lore, reward, and respawn rule.' },
    { rank: 'Boss', d: 'Structured encounter with arena, phases, narrative purpose, and unique reward logic.' },
    { rank: 'Guardian', d: 'Both a local stabiliser and an Article of the greater Tower seal.' },
    { rank: 'Anomalous', d: 'Does not fit ordinary ecology or classification.' },
  ],
  respawn: [
    { type: 'Recurring Rare', d: 'The same rare can return when its condition recurs.' },
    { type: 'Successor Rare', d: 'The original dies permanently, but another creature may inherit the ecological role.' },
    { type: 'Truly Unique', d: 'Dies permanently unless explicitly restored or reconstructed.' },
  ],
};

// ---- Floor 1 Named Rares (public) ----
export const NAMED_RARES = [
  { name: 'Old Bramblehide', grade: 'A', species: 'Hornback Grazer', rank: 'Named Rare Alpha', level: 5, stats: { vitality: 42, might: 34, guard: 46, arcana: 8, ward: 24, mobility: 18 }, total: 172, identity: 'Ancient Hornback with thorny vines across its mineral plates.', spawn: 'Excessive Dawnfield grazing pressure or blocked Briarwood routes.', combat: 'Defensive herd leader, vine-entangling charge, protects weaker Hornbacks.', consequence: 'Herd coordination worsens for one season.', respawn: 'Successor Rare' },
  { name: 'The Furrow King', grade: 'A', species: 'Furrowmaw', rank: 'Named Rare Elite', level: 5, stats: { vitality: 40, might: 38, guard: 32, arcana: 8, ward: 20, mobility: 24 }, total: 162, spawn: 'Repeated mining, ploughing, or infrastructure damage.', combat: 'Creates sinkholes, changes burrow routes, collapses structures.', consequence: 'Underground pest surge.', respawn: 'Recurring after major soil disruption' },
  { name: 'Widow-of-the-Reeds', grade: 'A', species: 'Reedlurker', rank: 'Named Rare Elite', level: 5, stats: { vitality: 36, might: 35, guard: 24, arcana: 12, ward: 22, mobility: 28 }, total: 157, identity: 'Massive female with broken harpoons embedded in her hide.', spawn: 'Spring flooding after significant Reedlurker hunting.', combat: 'Commands juveniles, submerged ambush, pulls players through reed channels.', consequence: 'Reedlurker breeding falls sharply.', respawn: 'Truly Unique' },
  { name: 'Lantern Below', grade: 'A', species: 'Lantern Eel', rank: 'Named Rare Anomalous', level: 6, stats: { vitality: 38, might: 22, guard: 24, arcana: 52, ward: 42, mobility: 30 }, total: 208, identity: 'Enormous eel containing too many internal lights.', spawn: 'Severe thunderstorm and active ancient river machinery.', combat: 'Powers/disables arena machinery, moving electrical safe zones, colour-coded attacks.', respawn: 'Recurring during rare storms' },
  { name: 'The Broken Bell Matron', grade: 'A', species: 'Bellwing', rank: 'Named Rare Elite', level: 6, stats: { vitality: 42, might: 38, guard: 34, arcana: 42, ward: 32, mobility: 28 }, total: 216, identity: 'Ancient Bellwing with shattered wing membrane and distorted sonic attacks.', spawn: 'Bellwing colony loses its nesting tower.', combat: 'Irregular sonic timing, resonance amplification, displaced juveniles join.', respawn: 'Truly Unique' },
  { name: 'White-Tail Thief', grade: 'C', species: 'Cloudmarten', rank: 'Named Rare', level: 4, stats: { vitality: 18, might: 12, guard: 10, arcana: 8, ward: 16, mobility: 48 }, total: 112, identity: 'Clever thief of quest items, keys, and trinkets.', combat: 'Chase, trap, track, indirect bargain, or follow to cache; not necessarily a kill target.', respawn: 'Recurring' },
  { name: 'Antler-Lost-in-Dark', grade: 'B', species: 'Lantern Deer', rank: 'Named Rare', level: 5, stats: { vitality: 34, might: 18, guard: 24, arcana: 38, ward: 42, mobility: 30 }, total: 186, identity: 'One missing antler and unstable dim light.', spawn: 'Briarwood luminous flora declines.', combat: 'Protection/tracking; hostile only if cornered.', consequence: 'Severe forest decline.', respawn: 'Truly Unique' },
  { name: 'Nine-Thorn', grade: 'A', species: 'Thornmaw Lynx', rank: 'Named Rare Alpha', level: 5, stats: { vitality: 34, might: 42, guard: 24, arcana: 8, ward: 20, mobility: 40 }, total: 168, identity: 'Old lynx with nine unusually long jaw thorns.', spawn: 'Lantern Deer or Briar Hare populations become excessive.', combat: 'Advanced ambush, false wounded-prey traps, vertical forest movement.', respawn: 'Successor Rare' },
  { name: 'Captain Without a Banner', grade: 'A', species: 'Marching Dead', rank: 'Named Rare Elite', level: 6, stats: { vitality: 40, might: 36, guard: 34, arcana: 18, ward: 28, mobility: 22 }, total: 178, spawn: 'Banner Wraith populations collapse.', combat: 'Reorganises broken undead, creates temporary formations without a banner, command mechanics.', respawn: 'Truly Unique' },
  { name: 'Hound 13', grade: 'A', species: 'Iron Hound', rank: 'Named Rare Elite', level: 6, stats: { vitality: 36, might: 42, guard: 38, arcana: 20, ward: 30, mobility: 44 }, total: 210, identity: 'Pursuit unit with damaged command logic and thirteen recorded target marks.', spawn: 'Repeatedly escape Iron Hound pursuits without destroying them.', combat: 'Studies route habits, intercepts paths, pursues beyond boundaries.', respawn: 'Truly Unique unless reconstructed' },
  { name: 'Sentinel of the Fifth Line', grade: 'A', species: 'Gate Sentinel', rank: 'Named Rare Elite', level: 6, stats: { vitality: 48, might: 40, guard: 52, arcana: 38, ward: 46, mobility: 22 }, total: 246, identity: 'Guards a boundary that no longer exists.', spawn: 'Activate four Proof shrines while leaving the fifth inactive.', combat: 'Creates geometric boundaries, punishes crossing, rewrites arena.', respawn: 'May be reconstructed while Guardian systems remain active' },
  { name: 'The Listening Maw', grade: 'A', species: 'Tunnel Gnawer', rank: 'Named Rare Alpha', level: 5, stats: { vitality: 32, might: 36, guard: 22, arcana: 4, ward: 18, mobility: 38 }, total: 150, spawn: 'Extended mining in one cave network.', combat: 'Reads movement patterns, commands pack positioning, pressures stillness indirectly.', respawn: 'Successor Rare' },
  { name: 'The Last Thirst', grade: 'A', species: 'Thirstmaw', rank: 'Named Rare Alpha', level: 5, stats: { vitality: 34, might: 40, guard: 22, arcana: 4, ward: 18, mobility: 40 }, total: 158, spawn: 'Severe summer drought and multiple failed water routes.', combat: 'Super-pack leader, targets water, strengthens near empty wells.', respawn: 'Successor Rare' },
  { name: 'Winter-Eats-the-Road', grade: 'A', species: 'Palejaw', rank: 'Named Rare Elite', level: 6, stats: { vitality: 42, might: 48, guard: 30, arcana: 20, ward: 30, mobility: 42 }, total: 212, identity: 'Ancient Palejaw that follows roads instead of prey paths.', spawn: 'Long winter and repeated caravan deaths.', combat: 'Controls road geometry, freezes escape paths, summons scouts behind player.', respawn: 'Recurring in severe winters; the name may describe an inherited role' },
];

// ---- Regional Elites (public, shown separately from named rares) ----
export const REGIONAL_ELITES = [
  { name: 'Stonehorn Patriarch', grade: 'A', level: '5', stats: { vitality: 45, might: 40, guard: 50, arcana: 5, ward: 25, mobility: 20 }, total: 185, identity: 'Extreme physical defence, herd leadership, migration influence.' },
  { name: 'Ferryman Without a Face', grade: 'A', level: 'Unknown / L5 equiv.', stats: { vitality: 30, might: 20, guard: 20, arcana: 45, ward: 45, mobility: 30 }, total: 190, identity: 'Anomalous regional elite. Exact species: TBD.' },
  { name: 'Bellwing Matron', grade: 'A', level: '5', stats: { vitality: 40, might: 38, guard: 30, arcana: 35, ward: 30, mobility: 28 }, total: 201, identity: 'Physical/sonic hybrid elite.' },
  { name: 'Grandmother Briar', grade: 'S', level: 'Approx. L8 equiv.', stats: { vitality: 55, might: 35, guard: 48, arcana: 60, ward: 62, mobility: 20 }, total: 280, identity: 'Regional power; not automatically hostile.' },
  { name: 'Last Standard-Bearer', grade: 'A', level: '5', stats: { vitality: 38, might: 35, guard: 30, arcana: 25, ward: 35, mobility: 20 }, total: 183, identity: 'Command-focused undead elite.' },
];

// ---- Fenrath stat charts ----
export const FENRATH_STATS = {
  base: { label: 'Standard Fenrath', stats: { vitality: 85, might: 75, guard: 80, arcana: 40, ward: 55, mobility: 25 }, total: 360,
    note: 'Classification: Floor Guardian. Encounter expectation: Level 3–4 hero. Made manageable through the Five Guardian Proofs, deliberate pacing, readable telegraphs, restraint, arena preparation, and regional suppression.' },
  // gated:
  proofless: { label: 'Proofless Fenrath', stats: { vitality: 105, might: 92, guard: 100, arcana: 68, ward: 78, mobility: 30 }, total: 473,
    props: ['All five regional functions active', 'Higher stagger threshold', 'Shorter recovery windows', 'Overlapping arena attacks', 'Worse Guardianless starting condition after death'] },
  flawless: { label: 'Hidden Flawless Phase 3', trigger: 'Triggered by clearing Phases 1 and 2 without damage.',
    props: ['Mobility approximately doubles', 'Recovery time drastically shortens', 'Poise becomes absolute during committed attacks', 'Any hit triggers guaranteed execution', 'Vitality, Guard, and Ward remain at Phase 2 values'] },
};

// =====================================================================
// DEEP-LORE ARCHIVE — SPOILER GATED. Never shown on public layers.
// =====================================================================
export const DEEP_LORE = {
  sevenElites: {
    intro: 'The Seven Buried Elites are Floor 5-equivalent encounters. They may represent concepts removed from the corrupt god to weaken it — a strong canonical possibility, not yet confirmed absolute truth.',
    list: [
      { name: 'The Unbowed Saint', concept: 'Pride — self-sovereignty', level: 'L20 equiv.', stats: { vitality: 65, might: 40, guard: 55, arcana: 90, ward: 90, mobility: 35 }, total: 375, identity: 'Rule-imposition boss, high Arcana/Ward, barriers, ceremonial authority, lower sustained pursuit.' },
      { name: 'The Gilded Maw', concept: 'Greed — endless accumulation', level: 'L20 equiv.', stats: { vitality: 80, might: 65, guard: 70, arcana: 55, ward: 55, mobility: 30 }, total: 355, identity: 'Heavy physical body, resource theft, possession mechanics, low repositioning.' },
      { name: 'The Velvet Hunger', concept: 'Lust — compulsive attachment', level: 'L20 equiv.', stats: { vitality: 55, might: 35, guard: 35, arcana: 95, ward: 80, mobility: 60 }, total: 360, identity: 'Deception, forced movement, emotional mimicry, lower direct durability, high Arcana/Mobility.' },
      { name: 'The Borrowed One', concept: 'Envy — stolen identity', level: 'L20 equiv.', stats: { vitality: 60, might: 55, guard: 50, arcana: 75, ward: 70, mobility: 60 }, total: 370, identity: 'Stat theft, ability copying, adaptive balanced profile. Displayed stats may change in combat.' },
      { name: 'The Starved Cathedral', concept: 'Gluttony — limitless consumption', level: 'L22 equiv.', stats: { vitality: 110, might: 75, guard: 85, arcana: 65, ward: 70, mobility: 20 }, total: 425, identity: 'Colossal, arena-consuming, slow, extremely high bulk, difficult to stagger.' },
      { name: 'The Red Silence', concept: 'Wrath — extermination', level: 'L21 equiv.', stats: { vitality: 75, might: 95, guard: 70, arcana: 35, ward: 55, mobility: 70 }, total: 400, identity: 'Strongest direct physical combatant of the Seven; high Might and Mobility; disciplined executioner.' },
      { name: 'The Stillborn Hour', concept: 'Sloth — arrested change', level: 'L22 equiv.', stats: { vitality: 85, might: 30, guard: 60, arcana: 110, ward: 100, mobility: 15 }, total: 400, identity: 'Time control, delayed action, frozen processes, low physical movement, temporal danger.' },
    ],
    consequence: 'Defeating them may unknowingly dismantle auxiliary seals, return those concepts, reconstruct part of the source, and allow the hidden fragment to awaken.',
  },
  corruptGod: {
    title: 'The Unfinished God Beneath the First Step',
    finalName: 'TBD',
    classifications: ['Tower-Origin Anomaly', 'Primordial Corruption Source', 'Transcendent Hidden Boss', 'Threat above Floor 100', 'Not part of intended ascent structure'],
    summary: 'The being beneath Floor 1 is the true corrupt god of the Tower — the source of all corruption, the reason the Guardians exist, contained by the Tower-wide Guardian system. The higher floors are not the source; they are closer to its influence. Floor 1 is the lid above the deepest prison.',
    stats: { vitality: 760, might: 510, guard: 570, arcana: 910, ward: 790, mobility: 460 },
    total: 4000,
    statNotes: [
      'Arcana governs corruption, spatial deformation, mutated life, memory failure, seasonal collapse, impossible architecture, time distortion, identity breakdown, and Guardian contamination.',
      'Ward prevents casual purification, sealing, control, curses, or mental manipulation.',
      'Mobility represents broken-space relocation, gravity control, scale changes, limb manifestation, arena-wide repositioning — not running speed.',
    ],
    encounter: 'A Floor 1 hero cannot kill the complete 4,000-stat source through ordinary damage. Locked interpretation: the player defeats a manifested fragment and forces the breach back into dormancy. The true source does not die.',
    phases: [
      { name: 'Phase One — The Chained Origin', d: 'Exposed restrained parts: hands, eyes, ribs, chains, incomplete heads.' },
      { name: 'Phase Two — The Seven Corruptions Return', d: 'Pride imposes rules · Greed seals or steals · Lust creates false allies · Envy copies abilities · Gluttony consumes arena space · Wrath marks for execution · Sloth delays time.' },
      { name: 'Phase Three — The Tower Remembers the Wound', d: 'The Null Descent may be part of the god, the prison, or the Tower\u2019s wound. Hidden true state: TBD.' },
    ],
    reward: { name: 'The First Blight (working)', props: ['Anomalous', 'Cannot be sold, dismantled, purified, or destroyed', 'Unusable as conventional Floor 1 equipment', 'Reacts to Guardians', 'Changes later dialogue', 'May unlock hidden endgame content', 'May be required to confront the true source later'], note: 'Final name and full function: TBD.' },
  },
  seal: {
    title: 'The Hundredfold Seal',
    summary: 'Every Floor Guardian is an active component of the prison containing the corrupt god. Each Guardian is one Article. Fenrath is the First Article; the Floor 100 Guardian is the Final Article.',
    functions: ['Local function — regulates and stabilises its floor.', 'Tower function — maintains one Article of the greater prison.'],
    kill: ['Opens ascent', 'Removes a local stabiliser', 'Weakens the greater seal', 'Gives the corrupt god a weakness to press against'],
    revive: ['Begins floor recovery', 'Closes the active encroachment route', 'Re-engages its Article'],
    states: [
      { s: 'Bound', d: 'Guardian alive; Article intact; no active corruption route.' },
      { s: 'Severed', d: 'Guardian dead; the god begins pressing against the weakness.' },
      { s: 'Breached', d: 'Corruption has established stable entry into the floor.' },
      { s: 'Claimed', d: 'The floor\u2019s own systems carry and reproduce corruption.' },
      { s: 'Rekindled', d: 'Guardian revived; primary breach closes and recovery begins.' },
      { s: 'Reforged', d: 'Guardian and Article restored to original full strength.' },
      { s: 'Corrupted', d: 'Guardian remains active, but the god has compromised the Article and can influence the floor through it.' },
    ],
  },
  corruptionCause: {
    title: 'The Actual Cause of Guardianless Corruption',
    canon: 'A dead Guardian does not generate corruption. Corruption is the corrupt god actively encroaching through a Severed Article — forcing its influence through the exact function the missing Guardian once regulated. It is an active invasion, not passive decay.',
    sequence: ['Sensing', 'Pressure', 'Leakage', 'Rooting', 'Expansion', 'Claiming', 'Manifestation'],
    revivalRule: 'Corruption can recede. History does not rewind. Dead NPCs stay dead, extinct species do not automatically return, destroyed settlements remain destroyed, and rooted corruption must still be removed.',
  },
  floor100: {
    title: 'The Floor 100 Guardian',
    summary: 'The Floor 100 boss is NOT the true corrupt god. It is the strongest sanctioned encounter — likely the Master Warden / Final Article / final authorised lock before the prison. Identity and stats remain TBD. It must remain below the corrupt god\u2019s 4,000 total.',
  },
};

// =====================================================================
// HIDDEN IMPLEMENTATION RULE — HERO ATTRIBUTE BASELINES
// Not public-facing lore. Governs how playable hero stats are presented.
// Heroes begin at Level 1 with 0 in ALL six visible attributes; there are
// NO hidden innate points. Every visible permanent point must be traceable
// to level allocation, gear, enchantments, or explicit permanent rewards.
// Heroes remain fully functional via their Base Character Template; the six
// attributes MODIFY baseline combat values, they do not create them.
// Hero stat totals must NOT be compared 1:1 with a creature's authored total.
// =====================================================================
export const HERO_BASELINE_RULE = {
  level1: { vitality: 0, might: 0, guard: 0, arcana: 0, ward: 0, mobility: 0, allocatedTotal: 0 },
  progression: 'Level 1: 0 points · Levels 2–99: +10 each · Level 100: +10 plus a +10 capstone → 1,000 allocatable total.',
  sources: ['Level-up allocation', 'Gear', 'Enchantments', 'Permanent rewards', 'Other explicit progression systems'],
  totals: [
    { term: 'Allocated Total', def: 'Points spent through levelling.' },
    { term: 'Permanent Effective Total', def: 'Allocated + permanent gear, enchantments, and permanent rewards.' },
    { term: 'Current Effective Total', def: 'Permanent effective total + temporary buffs and penalties.' },
  ],
  calc: 'Final value = Base Character Value + Attribute Contribution + Gear Effects + Temporary Modifiers.',
  functionalAtZero: 'A hero with 0 in all six attributes is still fully functional — they move, dodge, attack, defend, cast, and survive ordinary Level 1 content through their Base Character Template. Attributes enhance these baselines rather than enabling them.',
  identityFrom: ['Base Character Template', 'Weapons', 'Ability coefficients', 'Resource mechanics', 'Movement & dodge style', 'Attack & recovery timing', 'Talent trees', 'Equipment compatibility', 'Unique systems'],
  creatureRule: 'Do not compare a hero\u2019s allocated total 1:1 with a creature\u2019s authored total. Both use the same six names but different base templates; the outcome depends on template, level, gear, abilities, coefficients, size, mechanics, and encounter design.',
};

// Short PUBLIC explainer (opt-in) for the systems page.
export const HERO_STATS_EXPLAINER = {
  title: 'How Hero Stats Work',
  points: [
    'Playable climbers begin at Level 1 with 0 in every visible attribute. This is deliberate — the numbers stay clean and fully traceable.',
    'There are no hidden innate points. Every permanent attribute point comes from level-up allocation, gear, enchantments, or explicit permanent rewards.',
    'A climber at 0 attributes is still fully functional. Movement, dodging, attacking, defending, and abilities come from each climber\u2019s Base Character Template; attributes enhance those baselines, they don\u2019t create them.',
    'This is why two climbers can both read 0 at Level 1 yet feel completely different — identity lives in their template, weapons, coefficients, movement, and unique systems, not in a starting stat spread.',
    'Climber attribute totals are not directly comparable to a creature\u2019s authored stat total; the two use different base templates.',
  ],
  sheet: 'Character sheets show Allocated · Gear · Temporary · Effective — every number traceable, with nothing added invisibly.',
};

// =====================================================================
// COMBAT MATHEMATICS (public reference) — diminishing-return curves.
// Heroes start at 0 in all six; 0 Guard/Ward = 100% listed damage taken.
// Do NOT invent Base Power, Base Health, or final balance numbers.
// =====================================================================
export const COMBAT_MATH = {
  principle: 'A target with 0 Guard or Ward takes exactly 100% listed damage. There is no naked-character penalty. Attributes modify functional baseline values; they do not create them.',
  offense: {
    title: 'Outgoing Damage (Might / Arcana)',
    formula: 'D_raw = P × (1 + 2.5·S / (400 + S))',
    legend: 'P = Base Power · S = Effective Might (physical) or Arcana (magical).',
    note: 'Diminishing returns; approaches ×3.5 at the theoretical limit. Arcana uses the same curve as Might.',
    table: [
      { s: 0, mult: '×1.000' }, { s: 10, mult: '×1.061' }, { s: 30, mult: '×1.174' }, { s: 50, mult: '×1.278' },
      { s: 100, mult: '×1.500' }, { s: 200, mult: '×1.833' }, { s: 300, mult: '×2.071' }, { s: 400, mult: '×2.250' },
      { s: 500, mult: '×2.389' }, { s: 750, mult: '×2.630' }, { s: 1000, mult: '×2.786' }, { s: 1500, mult: '×2.974' },
      { s: 2000, mult: '×3.083' }, { s: '∞', mult: '→ ×3.500' },
    ],
  },
  defense: {
    title: 'Incoming Mitigation (Guard / Ward)',
    formula: 'D_taken = D_raw × 400 / (400 + D)',
    legend: 'D = Effective Guard (physical) or Ward (magical), after penetration.',
    note: 'Ward uses the same curve as Guard.',
    table: [
      { d: 0, taken: '100.0%', red: '0.0%' }, { d: 10, taken: '97.6%', red: '2.4%' }, { d: 30, taken: '93.0%', red: '7.0%' },
      { d: 50, taken: '88.9%', red: '11.1%' }, { d: 100, taken: '80.0%', red: '20.0%' }, { d: 200, taken: '66.7%', red: '33.3%' },
      { d: 300, taken: '57.1%', red: '42.9%' }, { d: 400, taken: '50.0%', red: '50.0%' }, { d: 500, taken: '44.4%', red: '55.6%' },
      { d: 750, taken: '34.8%', red: '65.2%' }, { d: 1000, taken: '28.6%', red: '71.4%' }, { d: 1500, taken: '21.1%', red: '78.9%' },
      { d: 2000, taken: '16.7%', red: '83.3%' },
    ],
  },
  vitality: {
    title: 'Vitality → Maximum Health',
    formula: 'HP_max = HP_base × (1 + 2·V / (500 + V)) + HP_flat',
    note: 'Approaches ×3.0 at the theoretical limit. Base Health stays core to identity.',
    table: [
      { v: 0, mult: '×1.000' }, { v: 50, mult: '×1.182' }, { v: 100, mult: '×1.333' }, { v: 200, mult: '×1.571' },
      { v: 300, mult: '×1.750' }, { v: 500, mult: '×2.000' }, { v: 750, mult: '×2.200' }, { v: 1000, mult: '×2.333' },
      { v: 1500, mult: '×2.500' }, { v: 2000, mult: '×2.600' }, { v: '∞', mult: '→ ×3.000' },
    ],
  },
  mobility: [
    { k: 'Movement Speed', f: 'Base × (1 + 0.35·Mob / (500 + Mob))', cap: '+35% max' },
    { k: 'Dodge Distance', f: 'Base × (1 + 0.25·Mob / (400 + Mob))', cap: '+25% max' },
    { k: 'Recovery Time', f: 'Base × (1 − 0.25·Mob / (600 + Mob))', cap: '−25% max' },
    { k: 'Perfect Windows', f: 'capped enhancement', cap: '+15% max' },
  ],
  penetration: 'Effective Defence = max(0, D × (1 − %Pen) − FlatPen). Percentage applies before flat. Caps: 40% ordinary, 60% pinnacle. Flat cannot drop defence below 0.',
  crit: 'Default critical = ×1.50, applied BEFORE Guard/Ward. Crits do not auto-ignore defence.',
  affinity: [
    { k: 'Severe weakness', m: '×1.50' }, { k: 'Weakness', m: '×1.25' }, { k: 'Neutral', m: '×1.00' },
    { k: 'Resistance', m: '×0.80' }, { k: 'Strong resistance', m: '×0.60' }, { k: 'Immunity', m: '×0.00' },
  ],
  blocking: [
    { k: 'Weak block', m: '70% remains' }, { k: 'Standard block', m: '50% remains' }, { k: 'Strong block', m: '30% remains' },
    { k: 'Perfect block', m: '10% remains' }, { k: 'Perfect parry', m: '0% remains' },
  ],
  order: [
    'Determine Base Power', 'Split physical / magical / mixed portions', 'Compute Effective Offensive Stat',
    'Apply Might or Arcana scaling', 'Apply critical modifier', 'Apply weakness / resistance', 'Apply attack-specific modifiers',
    'Apply percentage penetration', 'Apply flat penetration', 'Apply Guard or Ward mitigation', 'Apply rank Stability',
    'Apply blocking / parrying', 'Apply shields / barriers', 'Apply caps and floors', 'Subtract health', 'Apply stagger / status / knockback',
  ],
  limits: [
    'Minimum successful damage: 1.', 'Guard/Ward alone cannot reduce below 15% of raw.',
    'Ordinary combined mitigation caps at 95%.', 'Only immunity, perfect parry, full shield, invulnerability, or encounter rules reach 100%.',
    'Ordinary vulnerability caps at ×2.50 incoming.',
  ],
  dualScaling: 'For multi-attribute moves, blend first: Effective Stat = (A×wA)+(B×wB), weights total 1.00, then apply the curve once (prevents double-dipping).',
};

// Rank combat rules (sections 20–24)
export const RANK_COMBAT = [
  { rank: 'Standard', rule: 'Universal equations, no rank protection. High health alone does not make an Elite.' },
  { rank: 'Named Rare', rule: 'One authored Signature Trait, +15% stagger threshold, −10% generic CC duration, unique spawn/consequence/reward/respawn. No blanket damage reduction.' },
  { rank: 'Elite', rule: 'Elite Resolve: +30% stagger threshold, −20% generic CC, adaptive repeated-control resistance (100→70→40→20%, resets after 30s), ≥1 exclusive mechanic. No generic damage reduction.' },
  { rank: 'Boss', rule: 'Phase Integrity: one hit cannot skip more than one phase threshold (default 35% excess carry), −50% generic CC, high status resistance, immune to ordinary instakills, stagger-immune during transitions/committed attacks.' },
  { rank: 'Guardian', rule: 'Article Authority + Guardian Stability (applied after Guard/Ward). Fenrath: 25% final reduction proven / 35% proofless, 0% during committed recovery or full stagger. Dedicated stagger gauge — best broken by perfect parries, punish windows, Proof interactions, arena counters.' },
];

// ---- Threat Grade definitions (sections 25–27) ----
export const THREAT_GRADES = {
  public: [
    { g: 'E', color: '#7d9b7d', name: 'Minor', desc: 'Minor creature or tutorial threat. Low lethality, easy escape, weak alone.', response: 'Newly registered adventurer, minimal preparation.' },
    { g: 'D', color: '#8fb36a', name: 'Low', desc: 'Standard low-level field threat. Can injure the careless; clear counterplay.', response: 'One inexperienced adventurer with basic field knowledge.' },
    { g: 'C', color: '#c9b24b', name: 'Serious', desc: 'Serious regional creature. Dangerous ambush, pack tactics, status effects.', response: 'Competent adventurer, proper equipment, knowledge of its behaviour.' },
    { g: 'B', color: '#e0903c', name: 'Major', desc: 'Major regional threat. Apex predator or elite construct; settlement danger.', response: 'Experienced adventurer or small prepared party; contract recommended.' },
    { g: 'A', color: '#e0584f', name: 'Exceptional', desc: 'Exceptional regional danger. Named rare elite, regional elite, powerful anomaly.', response: 'Veteran party, specialised preparation; access restrictions possible.' },
    { g: 'S', color: '#c2487a', name: 'Floor Crisis', desc: 'Floor-level crisis or major boss. Floor Guardian under suppression; regional power.', response: 'Exceptional adventurers, structured preparation, Guild coordination.' },
    { g: 'SS', color: '#9b5fd0', name: 'Catastrophic', desc: 'Catastrophic floor-level threat. Full-power Guardian, powerful hidden elite.', response: 'Elite adventurers, specialised mechanics; survival not expected for ordinary parties.' },
    { g: 'SSS', color: '#6c7be0', name: 'Beyond Floor', desc: 'Threat far beyond the floor\u2019s intended progression.', response: 'Engagement prohibited. Observation and evacuation prioritised.' },
  ],
  restricted: [
    { g: 'Calamity Class', color: '#c2702f', desc: 'Can destroy or permanently transform a major region, multiple settlements, or a substantial floor ecosystem.' },
    { g: 'Cataclysm Class', color: '#b8503a', desc: 'Can destroy or transform an entire floor, several linked floors, or a major Tower system.' },
    { g: 'Extinction Class', color: '#a23a2f', desc: 'Can cause civilisational collapse, mass floor death, widespread Guardian failure, irreversible Tower-scale damage.' },
    { g: 'Tower Class', color: '#7a1f18', desc: 'Threatens the entire Tower, the Hundredfold Seal, and the survival of Tower civilisation. The true corrupt god is Tower Class.' },
  ],
  note: 'Threat Grade is separate from Level, Rank, and stat total. It is authored from mechanics, ecology, context, group behaviour, arena, and consequences — never auto-calculated from stats.',
};

// Fenrath threat grades by state (public) + restricted states
export const FENRATH_GRADES = {
  public: [
    { state: 'Five Proofs invoked', grade: 'S', note: 'Floor Guardian, structured boss, regional functions fully suppressed.' },
    { state: 'Four Proofs', grade: 'S', note: 'Standard S.' },
    { state: 'Three Proofs', grade: 'S', note: 'Severe S — still a Floor Guardian.' },
    { state: 'One or two Proofs', grade: 'SS', note: 'Regional systems active; intended progression assumptions no longer apply.' },
  ],
  restricted: [
    { state: 'Proofless Fenrath', grade: 'SS', note: 'Restricted class: First Article Unbroken. Total 473.' },
    { state: 'The First Fang', grade: 'SS', note: 'Flawless-trigger no-hit encounter; blocking disabled, only perfect parry/dodge valid.' },
    { state: 'Proofless First Fang', grade: 'SSS', note: 'The highest Fenrath challenge currently established.' },
  ],
};

// corrupt god grade (restricted)
export const CORRUPT_GOD_GRADE = { grade: 'Tower Class', note: 'The 4,000-point profile is a manifested or intersecting combat body. The complete entity is unquantifiable — 4,000 does not represent its entire metaphysical existence.' };
