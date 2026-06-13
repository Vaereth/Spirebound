// =====================================================================
// SPIREBOUND — FLOOR 1: THE VERDANT REACH (public-layer canon)
// Source: Floor 1 Design Bible. Public + restricted-placeholder only.
// Deep lore, spoilers, and TBD content are NOT included here — they are
// represented as labelled sealed placeholders in the page, never invented.
// =====================================================================

export const FLOOR1 = {
  name: "The Verdant Reach",
  numeral: "I",
  epigraph: "The first step is the longest, and the farthest from home.",
  mapEpigraphs: [
    "The roads are tended. The wilds are not. Choose well.",
    "Where rivers carve, depths whisper. Where roots choke, things remember. Where the Gate rises, all becomes choice.",
  ],
  emotionalArc: [
    "This world is incredible.",
    "This place is older than anyone admits.",
    "Something beneath it was deliberately hidden.",
  ],
  overview:
    "Floor 1 is a vast, prosperous medieval fantasy world within the Spire — a place of open plains and rolling hills, rivers and wetlands, farms and villages, ancient forests, mountains and highlands, caves and ruins, and a forgotten battlefield. It is meant to feel like a complete world, not a tutorial zone: a functioning society, a living ecology, a place with real history. A climber should leave it thinking not 'I finished Floor 1,' but 'I defeated its Guardian, and barely understood the world I left behind.'",

  layout: {
    intro: "Floor 1 runs broadly west to east, from the safety of Hearthvale to the Gate of First Ascent at the eastern boundary.",
    regions: [
      { dir: "West", text: "Hearthvale, the safest settlement." },
      { dir: "Centre-West & Centre", text: "The Dawnfields, which surround Hearthvale and connect the floor." },
      { dir: "South / Southeast", text: "Silverrun — wetlands, mills, villages, waterfalls, flooded ruins, and river caves." },
      { dir: "North", text: "Windmere Hills, rising from hills into dangerous mountain terrain." },
      { dir: "Northeast", text: "Briarwood, with safer outer roads and extremely dangerous deep forest." },
      { dir: "Southeast", text: "The Old March, an ancient battlefield of undead and war constructs." },
      { dir: "Far East", text: "The Crownward Expanse, the final approach to Fenrath." },
      { dir: "Eastern Boundary", text: "The Gate of First Ascent." },
    ],
    travel:
      "Hearthvale to Fenrath's Gate is roughly 30–45 minutes on foot for a climber who knows the route and ignores combat, gathering, quests, caves, and detours. Unlocked travel — ferries, caravans, waystones, repaired roads and bridges, mountain passes, hero shortcuts, improved regional safety — can cut this to roughly 10–15 minutes.",
  },

  hearthvale: {
    blurb:
      "Hearthvale is a prosperous, established medieval city — reliable food, healthy trade, strong services, active craftspeople, guild infrastructure, maintained roads, guards, inns, markets, temples, workshops, and constant caravan and climber traffic. It must not feel like a failing settlement — at least, not before Fenrath dies.",
    locations: [
      "The First Hearth", "Ascendant Guild", "Market of Beginnings", "Shrine of the First Step",
      "Artisan Quarter", "Memorial Wall", "Underchapel", "Guild Trophy Hall",
      "Monster Appraisal Station", "Cartography Office", "Guild Contract Board", "Profession Workshops",
    ],
  },

  regions: [
    { name: "The Dawnfields", accent: "#9ab36a", terrain: "Plains, farms, roads, streams, windmills, grazing animals, low ruins", play: "Early combat, gathering, agriculture, caravan events, the Stonehorn storyline", themes: "Healthy ecology, migration, farming pressure, buried structures" },
    { name: "Silverrun", accent: "#5fa3c4", terrain: "River system, wetlands, mills, villages, floodplains, waterfalls, flooded ruins", play: "Fishing, river travel, water hazards, hidden caves, Ferryman lore", themes: "Water regulation, drowned history, shifting currents" },
    { name: "Windmere Hills", accent: "#8fa4b5", terrain: "Hills, mountains, cliffs, gliders, bell towers, observatories", play: "Vertical navigation, storms, flying monsters, high-altitude caves", themes: "Wind, bells, false stars, aerial routes" },
    { name: "Briarwood", accent: "#5c8a55", terrain: "Old-growth forest, root tunnels, shrines, Greenwake, deep forest", play: "Ambush combat, ecology, negotiation with nature, Grandmother Briar", themes: "Living forest, ancient pact, Rootbound, voice mimicry" },
    { name: "The Old March", accent: "#a8694a", terrain: "Forgotten battlefield, formations, siege ruins, salvage, undead", play: "Coordinated enemy groups, military history, repeating war", themes: "Forgotten nations, oaths, erased history, no birdsong" },
    { name: "Crownward Expanse", accent: "#9b7fb0", terrain: "Final approach to the Gate — artificial constructs, Guardian mechanisms, Proof shrines", play: "The march to Fenrath", themes: "Natural terrain becoming geometric, artificial ecology, Floor 1's constructed foundation" },
  ],

  danger: {
    tiers: [
      { level: "Low", color: "#5E9C68", places: ["Hearthvale", "Hearthvale outskirts", "Inner Dawnfields", "Main roads", "Farms", "Settled riverbanks"] },
      { level: "Moderate", color: "#C9A24B", places: ["Outer Dawnfields", "Lower Windmere", "Outer Briarwood", "Outer Silverrun", "Dawnfield ruins", "Minor caves", "Standard roadside contracts"] },
      { level: "High", color: "#C2702F", places: ["Deep Briarwood", "Upper Windmere", "Flooded caves", "Old March interiors", "Remote ruins", "War tunnels", "Large cave networks"] },
      { level: "Very High", color: "#A33B2A", places: ["Deep mountain caves", "Ancient root caverns", "Sealed war tunnels", "Crownward Expanse", "Regional elites", "Hidden buried-elite domains"] },
    ],
    rule: "Open land is safer. Forests conceal danger. Mountains isolate danger. Caves bury danger.",
    roads: "Road travel is usually safe, with occasional threats — wolves, intelligent monsters, caravan ambushes, bandits, migration crossings, rescue encounters. But road safety no longer meaningfully protects you in Deep Briarwood, Upper Windmere, or the Old March.",
    rumor: "Some unverified reports describe locations beneath Floor 1 that do not conform to recognised danger classifications.",
  },

  seasons: {
    scale: ["1 in-game day = 2 real hours", "1 season = 5 real days", "1 year = 20 real days"],
    list: ["Spring", "Summer", "Autumn", "Winter"],
    phases: [
      { day: "Day 1", name: "Arrival" }, { day: "Day 2", name: "Spread" },
      { day: "Day 3", name: "Peak" }, { day: "Day 4", name: "Pressure" }, { day: "Day 5", name: "Departure" },
    ],
    migration: "Migration is hybrid: each species has preferred routes, but they change with weather, food, predators, hunting, settlement growth, infrastructure, flooding, forest expansion, Fenrath's state, and player action.",
  },

  weather: {
    types: ["Rain", "Thunderstorms", "Fog", "Gale winds", "Snow", "Heat waves", "Rune Aurora", "Red Rain", "Starless periods", "False-sky disturbances"],
    affects: ["Migration", "Spawns", "Gathering", "Visibility", "Rivers", "Fires", "Lightning", "Aerial movement", "Hidden entrances", "NPC schedules", "Contracts"],
    note: "Weather must be forecastable.",
  },

  ecology:
    "The world tracks population, breeding, food, predator and hunting pressure, migration success, and habitat quality — with no visible bars. The player only sees the effects: fewer animals, larger herds, empty nests, predator incursions, crop damage, price changes, guild restrictions, material scarcity, new contracts, and shifting NPC reactions. Overhunting can collapse populations, drive local extinction, and ripple outward into disease, scarcity, and social consequence.",

  guild: {
    name: "The Ascendant Guild",
    functions: ["Registration", "Adventurer Plates", "Monster contracts", "Elite hunts", "Rescue missions", "Escort missions", "Investigations", "Material bounties", "Monster codex", "Mapping", "Emergency notices", "Party registry", "Future co-op support"],
    appraiser: { name: "Vessa Marr", role: "Monster Appraiser", quote: "A dead monster still has work left in it." },
    turnins: ["Horns", "Claws", "Fangs", "Feathers", "Chitin", "Monster cores", "Glands", "Essence fragments", "Corrupted organs", "Named elite trophies"],
  },

  plates: {
    floor1: "Wood → Stone",
    note: "No higher Plate is obtainable on Floor 1.",
    fullLadder: ["Wood","Stone","Copper","Bronze","Iron","Steel","Veinsteel","Whisper Silver","Bloodbronze","Mournsteel","Dreamsilver","Gravegold","Wyrmbone","Rotglass","Nightiron","Voidglass","Godscar","Unmetal","Aetherblight","Spireheart"],
    ladderNote: "The full tower-wide ladder. Higher Plates grow increasingly corrupted and unnatural — because the higher floors are.",
  },

  professions: {
    core: ["Mining","Herbalism","Skinning & Butchery","Fishing","Salvaging","Smithing","Leatherworking","Tailoring","Woodcraft","Jewelling","Enchanting","Runecraft","Alchemy","Soulbinding","Astromancy","Cartography","Beastkeeping","Cooking","Scribing","Relic Restoration","Masonry / Architecture"],
    starter: "Every climber begins with basic access to gathering, cooking, repairs, salvaging, and basic crafting stations. Hearthvale teaches the barebones basics of all major professions.",
    mentors: [
      { name: "Bram Ironwake", craft: "Blacksmithing" }, { name: "Seraphine Vey", craft: "Enchanting" },
      { name: "Toma Fenroot", craft: "Alchemy" }, { name: "Auntie Merra", craft: "Cooking" },
      { name: "Lielle Softstep", craft: "Tailoring" }, { name: "Garrick Tann", craft: "Leatherworking" },
      { name: "Oren Ashbow", craft: "Woodcraft" }, { name: "Nima Kest", craft: "Jewelling" },
      { name: "Master Thalen Orr", craft: "Runecraft" }, { name: "Pella Rook", craft: "Salvaging" },
      { name: "Ysra Mossveil", craft: "Herbalism" }, { name: "Dorren Pike", craft: "Mining" },
      { name: "Sella Reed", craft: "Fishing" }, { name: "Edrin Vale", craft: "Cartography" },
      { name: "Quill Vannis", craft: "Scribing" },
    ],
  },

  npcs: {
    hearthvale: ["Mayor Alric Vane","Captain Mira Sol","Guildmaster Corven Hale","Sister Amarine","Renn and Ressa","The Plaquekeeper","Jori Pell","Lysa Pell","Velka the Broker","Orin Dask","The Pale Climber"],
    hooks: [
      "Seraphine recognises Eluvain's Runeblade pattern.",
      "Auntie Merra remembers people others forget.",
      "Thalen believes Elyr is outside known runic language.",
      "Edrin believes Floor 1 is larger inside than outside.",
      "Orin owns a portrait of all six heroes together.",
      "The Plaquekeeper's own plaque is blank.",
    ],
  },

  progression: {
    start: "Level 1", cap: "Level 4 (pre-Fenrath)",
    steps: [
      { lvl: "Level 2", at: "Early Floor 1, after a meaningful first expedition." },
      { lvl: "Level 3", at: "~25–35% Floor 1 completion." },
      { lvl: "Level 4", at: "~60–75% Floor 1 completion." },
    ],
    notes: [
      "Filling the Level 4 XP bar should require near-completion of most worthwhile Floor 1 content.",
      "XP earned while capped is not banked.",
      "Fenrath is beatable by a strong Level 3 player; most challenge him at Level 4.",
      "Defeating Fenrath unlocks Level 5.",
    ],
  },

  itemTiers: {
    standard: ["Common", "Uncommon", "Rare", "Epic"],
    named: ["Legendary", "Mythic"],
    special: ["Relic", "Divine", "Anomalous", "Spirebound"],
    pinnacle: "Crownforged",
    apex: "Sovereign",
    defs: [
      { t: "Spirebound", d: "Bound to a hero, floor, wish, identity, or cycle." },
      { t: "Crownforged", d: "Crafted using pinnacle professions, pinnacle materials, and high-order laws of the Spire." },
      { t: "Sovereign", d: "A Crownforged item that also becomes truly Spirebound." },
    ],
  },

  quests: {
    authored: "60–75 authored quests",
    excludes: "Not counted: repeatable Guild contracts, procedurally assembled Guild work, dynamic world events, unmarked discoveries, or hidden ritual content.",
    categories: ["Main Story (MSQ)", "Regional storylines", "Hearthvale quests", "Guild contracts", "Profession quests", "Character quests", "Hidden unmarked content", "Dynamic events", "Procedural guild work"],
    msq: "The final Floor 1 main-story quest: Slay Fenrath, First Guardian. Floor 2 cannot be accessed until Fenrath is dead.",
  },

  fenrath: {
    public:
      "Fenrath, First Guardian, bars the Gate of First Ascent. He is the floor's boss and its barrier: while he lives, no climber ascends to Floor 2. Slaying him opens the way up.",
    titles: ["First Guardian", "Gatebound Wolf", "Verdant Warden", "Beast of the First Gate", "First Fang"],
    arena: "The Crownward Basin — a huge circular basin of stone and grass, five regional rune channels, old siege structures, shallow water, giant chain anchors, and the Gate behind him.",
    guardianRole:
      "A tower-wide principle, recognised by Guild scholars: every Floor Guardian is both a progression barrier and a stabilising organ for its floor. Fenrath stabilises Floor 1. His death opens the way upward — but what follows is recorded only in restricted accounts.",
  },

  proofs: {
    intro: "The Gate of First Ascent recognises Guardian Proofs — tokens of the floor's five vital functions. Any three of the five allow the intended challenge; four are also valid; all five reveal the fuller truth.",
    list: [
      { n: 1, name: "The Verdant Pulse", region: "Dawnfields", rep: "Life, fertility, migration — Fenrath's heartbeat in the soil." },
      { n: 2, name: "The Current Pearl", region: "Silverrun", rep: "Water regulation — Fenrath's circulatory tie to the river." },
      { n: 3, name: "The Breath of the First Fang", region: "Windmere", rep: "Wind and weather pressure — Fenrath's respiration." },
      { n: 4, name: "The Root Oath", region: "Briarwood", rep: "Growth and repair — Fenrath's pact with the forest." },
      { n: 5, name: "The Ashen Oath", region: "Old March", rep: "Memory, and the older war over whether Fenrath should be killed." },
    ],
    gates: [
      { count: "Three Proofs", gate: "Three functions acknowledged.\nChallenge recognised.\nConsequences unverified.", fenrath: "You know enough to wake me.\nNot enough to mourn what follows." },
      { count: "Four Proofs", gate: "Four functions acknowledged.\nChallenge recognised.\nOne consequence remains unverified.", fenrath: "One truth remains buried.\nWill you kill first and learn later?" },
      { count: "Five Proofs", gate: "All functions acknowledged.\nChallenge recognised.\nConsequence understood.", fenrath: "You have seen the veins, breath, roots, blood and memory of this floor.\nAnd still you have come to sever them." },
    ],
    proofNote: "Exact mechanical Proof effects are TBD.",
  },

  // Sealed sections — structural placeholders ONLY. No invented lore.
  sealed: [
    { label: "Restricted Records", note: "Guild-restricted accounts of what follows a Guardian's death. Sealed for this build." },
    { label: "Sealed Archive", note: "Disputed histories and contradictory records. Coming later." },
    { label: "Deep Lore Archive", note: "The layered truth beneath Floor 1. Coming later." },
    { label: "Hidden Truths", note: "Content unsuited to new climbers. Coming later." },
  ],

  tbd: [
    "Exact map dimensions, road and cave placement", "Quest dependency tree & final authored count",
    "Exact Proof fight effects", "Fenrath's full attack list & hidden phase reward",
    "Full revival implementation & recovery questline", "Exact economic, crafting, and item values",
    "Exact faction names & Floor 5 factions", "Seasonal spawn tables & migration maps",
    "NPC schedules & disease mechanics", "Co-op implementation", "Heroes 3, 4, 5, and 6",
  ],
};
