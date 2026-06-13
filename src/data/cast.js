// =====================================================================
// SPIREBOUND — CAST DATA (canon)
// Source of truth: spirebound_design/canon/eluvain_feiyan_bible.txt
// This file structures the bible for the site. Mechanics are canon —
// do not alter values, runes, thresholds, or abilities without updating
// the bible first. Names of future climbers are placeholders (locked: 2).
// =====================================================================

export const CAST = [
  {
    id: "eluvain",
    name: "Eluvain",
    epithet: "The Forgotten",
    order: 1,
    isDefault: true,
    accent: "#60E8DC", // rune-cyan — his signature glow
    tagline: "He always seems to have the correct answer.",

    overview:
      "A nimble runeblade duelist and Spirebound's adaptable all-rounder. He appears to fill the traditional knight archetype, but in practice he is a highly technical character built around rune management, precision execution, perfect parries, perfect dodges, and intelligent decision-making. He uses no mana, stamina, rage, energy, or combo points — instead he generates and manipulates runes through combat, then spends them on Rune Arts.",

    appearance: [
      "Elf",
      "Silver, blue, and gold light-medium plate armor",
      "Elegant but practical design",
      "Long hair, Legolas-inspired aesthetic",
      "Runeblade Rapier in the main hand",
      "Parrying Dirk in the off hand",
      "Calm, experienced, measured demeanor",
    ],

    identity: {
      role: "Adaptive Duelist",
      difficulty: "Medium to learn, extremely high to master",
      health: "Medium",
      defense: "Medium",
      mobility: "Medium",
      damage: "Medium–High",
      skillCeiling: "Exceptional",
    },

    // For the radar/stat-compare UI (0–5 scale derived from the bible's words)
    stats: { health: 3, defense: 3, mobility: 3, damage: 3, ceiling: 5 },

    coreFantasy:
      "Eluvain does not overwhelm opponents through speed or brute force. He wins because he always seems to have the correct answer. Every parry, dodge, attack, and Rune Art is another piece of a constantly evolving puzzle.",

    weapons: [
      {
        name: "Runeblade Rapier",
        hand: "Main",
        notes: ["Precision attacks", "Weakpoint strikes", "Rune generation", "Rune Arts", "Generates Kael through successful attacks"],
      },
      {
        name: "Parrying Dirk",
        hand: "Off",
        notes: ["Parries", "Deflections", "Counters", "Generates Dorn through successful defensive play"],
      },
    ],

    mobility: {
      dash: { cooldown: "0.45s", properties: ["Animation cancel", "Invulnerability frames", "Medium distance", "Generates Veyn"] },
      perfectDodge: ["Instantly refreshes dash cooldown", "Replaces front rune slot with Veyn"],
    },

    runeSystem: {
      capacity: "Starts at 3, expanded through progression and talents",
      queue: "Runes are stored in sequence. Normal rune generation pushes the oldest rune out of the queue. Instant rune recovery effects — such as a perfect dodge or perfect parry — replace the rune in the first slot instead, allowing skilled players to deliberately force and manipulate their next Rune Art.",
      slotExamples: [
        "Perfect Dodge restores Veyn and places Veyn into the first rune slot.",
        "Perfect Parry restores Dorn and places Dorn into the first rune slot.",
      ],
      runes: [
        { name: "Kael",  theme: "Strength · Offense · Pressure",      gen: "Attacks, weakpoint hits, and counters" },
        { name: "Veyn",  theme: "Motion · Mobility · Positioning",    gen: "Dashes and perfect dodges" },
        { name: "Dorn",  theme: "Guard · Defense · Control",          gen: "Perfect parries and projectile deflections" },
        { name: "Astra", theme: "Arcana · Runecraft · Manipulation",  gen: "Successful Rune Arts and advanced interactions" },
        { name: "Elyr",  theme: "Memory · Mastery · Recollection",    gen: "Earned through mastery conditions, including perfect defensive actions chained into Rune Arts, major weakpoint punishments, and advanced combat sequences" },
      ],
    },

    moveset: {
      groundCombo: ["Fast Thrust", "Diagonal Cut", "Rune-Infused Thrust", "Finisher Slash"],
      chargedAttack: { name: "Piercing Lunge", notes: ["High damage", "High stagger", "High commitment", "Cannot be cancelled after release"] },
      dashAttack: "Flowing Cut",
      airAttacks: ["Air Slash", "Falling Fang"],
      dirkJab: "Fastest attack in kit. Used for combo extension and utility.",
      parry: "Primary defensive mechanic. Generates Dorn and enables advanced rune manipulation.",
    },

    animationCancels: {
      cancelable: ["Light attacks", "Dirk attacks", "Dash", "Most Rune Arts"],
      notCancelable: ["Charged attacks after release", "Certain major Rune Arts", "High commitment techniques"],
    },

    signature: {
      name: "Final Remembrance",
      activation: "Freezes the entire battlefield for three seconds so the player has time to think and plan.",
      duringFreeze: ["Enemies cannot act", "Bosses cannot act", "Projectiles freeze", "Environmental hazards freeze", "Eluvain cannot move or attack normally"],
      planning: "During the three-second time freeze, the player may queue up to five combat inputs, including attacks, movement, parries, and Rune Arts.",
      queueable: ["Normal attacks", "Charged attacks", "Dash", "Parry", "Rune Arts"],
      execution: "Time resumes and Eluvain performs the complete planned sequence at supernatural speed.",
      drawback: { name: "Rune Burnout", text: "After the sequence finishes, Eluvain's rune system is temporarily locked. For a short period, he cannot generate, recover, or manipulate runes." },
      visualIdentity: [
        "Battlefield frozen in absolute stillness",
        "Sound and music collapse into a distant echo",
        "Desaturated world with vivid blue-white runes",
        "Translucent memory echoes in five combat stances",
        "Each queued input locks one echo into place",
        "Ordered rune sequence visible around Eluvain",
        "Five echoes collapse into one before execution",
        "Supernatural-speed sequence with readable afterimages",
        "Rune light violently extinguishes after execution",
        "Darkened runes visually communicate Rune Burnout",
      ],
      visualEssence: "The entire world becomes motionless while Eluvain silently considers five remembered possibilities, chooses the correct sequence, and then resolves the frozen battlefield in a burst of impossible precision — calm, eerie, intelligent, and inevitable.",
      theme: "For a brief moment, Eluvain remembers everything he has learned across countless forgotten climbs.",
    },
  },

  {
    id: "feiyan",
    name: "Feiyan",
    epithet: "Daughter of the Luan",
    order: 2,
    isDefault: false,
    accent: "#E8B954", // celestial gold — Luan plumage
    tagline: "A novice is dangerous. A master becomes a living storm.",

    overview:
      "A hyper-mobile aerial glass cannon who specializes in maintaining Flow and building unstoppable momentum. Where Eluvain's mastery comes from decision-making, Feiyan's comes from execution and consistency. The longer she fights without breaking her Flow chain, the more powerful she becomes.",

    appearance: [
      "Daughter of a mythical Luan",
      "Human appearance",
      "Large feathered wings",
      "Graceful athletic build",
      "Flowing wuxia-inspired attire",
      "Dual Chain Chakrams",
    ],

    identity: {
      role: "Aerial Momentum Fighter",
      difficulty: "Low–medium floor, exceptionally high ceiling",
      health: "Low",
      defense: "Very Low",
      mobility: "Very High",
      damage: "Potentially Extreme",
      skillCeiling: "Exceptionally High",
    },

    stats: { health: 1, defense: 1, mobility: 5, damage: 5, ceiling: 5 },

    coreFantasy:
      "A novice Feiyan is dangerous. A master Feiyan becomes a living storm.",

    weapons: [
      {
        name: "Dual Chain Chakrams",
        hand: "Both",
        notes: ["Weapon states: Held, Extended, Thrown", "Medium-range flexible weapons", "Support both combat and movement"],
      },
    ],

    mobility: {
      philosophy: "70% Air · 30% Ground",
      wingBurst: "Directional aerial propulsion and momentum maintenance tool.",
      skybound: ["Flow decays slower while airborne", "Flow generation increases while airborne", "Momentum is easier to maintain in the air"],
    },

    flowSystem: {
      rule: "Using the same attack twice consecutively breaks Flow. An attack may be reused later in the sequence as long as another attack occurs between uses.",
      validExample: "1 → 2 → 3 → 2 → 1 → 4",
      brokenExample: "1 → 1",
      counting: "Different attacks contribute their actual number of successful hits toward Flow. A dangerous multi-hit technique may therefore build Flow far faster than a safe single-hit attack.",
      stacking: "Bonuses stack. Reaching a later threshold does not replace the previous effect — it adds the next layer: Damage → Critical Chance → Critical Damage → Additional Hits.",
      thresholds: [
        { at: 15,  name: "Gathering Storm", bonus: "Damage begins increasing" },
        { at: 30,  name: "Rising Violence",  bonus: "Damage continues scaling toward its cap" },
        { at: 60,  name: "Razorwind",        bonus: "Critical-strike chance begins increasing" },
        { at: 120, name: "Tempest Dance",    bonus: "Critical-strike damage begins increasing" },
        { at: 200, name: "Luan Ascendant",   bonus: "Attacks gain additional hit instances — a strike that normally hits once can hit twice, making her already rapid attacks dramatically more destructive" },
      ],
    },

    aerialMomentum: {
      intro: "Feiyan is fast on the ground, but her true speed develops in the air. The longer she remains airborne while actively attacking and moving, the greater her aerial movement speed becomes, up to a fixed maximum.",
      points: [
        "Builds through sustained active airtime",
        "Increases aerial movement speed, not Flow damage",
        "Has a fixed maximum speed",
        "Landing or becoming inactive causes it to fall or reset",
        "Designed around ~70% aerial combat and ~30% grounded combat",
        "Her exceptionally high skill ceiling comes from maintaining both her attack sequence and her airborne momentum at the same time",
      ],
    },

    moveset: {
      ground: ["Feather Cut", "Wing Arc", "Chain Lash", "Crossing Moons"],
      air: ["Falling Feather", "Sky Spiral", "Moonfall"],
      heavyAttack: { name: "Crescent Cast", notes: ["Throws and deploys a chakram"] },
      recall: "Returns deployed chakrams. Awards bonus Flow when outgoing and returning hits both connect.",
    },

    signature: {
      name: "Thousand Feather Requiem",
      charge: "After each use, Feiyan must land 200 additional valid Flow hits before it can be used again. Those hits must be earned while obeying her Flow sequence rules — breaking the sequence does not count. A normal duration-based cooldown also applies; both the cooldown must finish AND 200 valid Flow hits must accumulate.",
      activation: "Feiyan rises into the air, wings fully unfurled, spectral feathers forming around her.",
      effects: ["100% Dodge Rate — effectively impossible to strike", "Flow cannot break during the technique", "Full aerial control", "Maximum Momentum state"],
      attackPattern: [
        "Against multiple enemies: dashes between every available target, distributing ~60 total hits across the battlefield",
        "Against a single target: concentrates ~50 hits into that enemy",
        "Appears as a spectacular storm of celestial plumage, not a generic rapid-slash animation",
      ],
      visualIdentity: [
        "Feiyan spinning through the air",
        "Both wings fully unfurled",
        "Enormous waves of luminous feathers",
        "Feathers spreading across the entire battlefield",
        "Rapid dashes between targets",
        "Circular chain-chakram trails",
        "Increasingly dense and ornate plumage",
        "A vast spectral Luan forming behind her near the climax",
      ],
      flowScaling: {
        intro: "Thousand Feather Requiem snapshots Feiyan's Flow tier at the exact moment of activation and inherits every bonus she has built. It does not reset her to neutral — every hit released benefits from the tier she earned and maintained.",
        byTier: [
          { at: 15,  effect: "All ultimate hits gain the active damage increase" },
          { at: 30,  effect: "Higher damage scaling earned at this stage applies" },
          { at: 60,  effect: "Every individual feather hit can benefit from increased crit chance" },
          { at: 120, effect: "Critical hits also use the increased critical-strike damage" },
          { at: 200, effect: "Inherits Luan Ascendant — strikes produce additional hit instances" },
        ],
        balance: "Power reflects the Flow state at activation — max bonuses are never granted automatically. Activating at 30 Flow is far weaker than at 200; 120 grants damage, crit chance, and crit damage but not additional hits; 200 grants every stacked bonus. Using it early gives immediate safety and damage; holding to maximum Flow creates a vastly stronger payoff but demands a flawless sequence held far longer.",
        lock: [
          "Flow tier is locked for the entire duration",
          "The ultimate cannot lose bonuses midway",
          "Flow cannot break during the technique",
          "Hits dealt do NOT increase its own power after activation",
          "Snapshots Feiyan's Flow state at the moment of use (no feedback loops)",
        ],
        luanInteraction: "At 200 Flow, each standard ultimate strike may generate an additional lighter follow-up hit dealing reduced damage — appearing as a second feather echo delayed a fraction of a second behind the original, so every feather seems to have a spectral twin. Implemented for readability, not by simply doubling every projectile.",
        visualEscalation: [
          { tier: "Low Flow", notes: "Fewer spectral feathers · less intense wing glow · cleaner, simpler trails" },
          { tier: "Mid Flow", notes: "Denser feather waves · stronger chakram light trails · more afterimages · brighter plumage" },
          { tier: "High Flow", notes: "Heavy feather saturation · layered wing projections · brighter celestial effects · larger spectral Luan" },
          { tier: "Maximum Flow", notes: "Battlefield saturated with luminous plumage · every major strike leaves a second feather echo · overlapping wing silhouettes · the spectral Luan fully visible at the climax · almost apocalyptic in speed and beauty" },
        ],
      },
      visualEssence: "The stronger Feiyan's Flow state when she activates Thousand Feather Requiem, the more destructive and visually overwhelming the ultimate becomes.",
      theme: "For a brief moment, Feiyan fully embraces the celestial blood of the Luan and becomes the storm itself.",
    },
  },
];

// Placeholder slots for the four climbers still in design.
export const RESERVED_SLOTS = 4;
