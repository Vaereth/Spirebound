// =====================================================================
// SPIREBOUND — FLOORS DATA
// Canon: 10 floors are the "fields, mountains, fantasy realms" tier.
// Floor 1 = The Verdant Reach (fully designed — see floor1.js for the deep
// content). Floors 2–4 small villages, Floor 5 the hub city (first-act
// climax), Floors 6–10 the darker, locked back half.
// =====================================================================

export const FLOORS = [
  {
    n: 1,
    status: "revealed",
    name: "The Verdant Reach",
    biome: "A prosperous medieval realm",
    settlement: { type: "city", name: "Hearthvale, City of First Light" },
    tagline: "The first step is the longest, and the farthest from home.",
    summary:
      "A vast, prosperous medieval fantasy world: Hearthvale in the west, the Dawnfields through the centre, Windmere Hills to the north, Briarwood to the northeast, Silverrun through the south, the Old March to the southeast, and the Crownward Expanse rising to the Gate of First Ascent. A world that feels incredible — and older than anyone admits.",
    boss: { name: "Fenrath, First Guardian", kind: "Guardian", note: "Slaying him opens Floor 2." },
    milestone: "Defeat Fenrath to open the Gate of First Ascent.",
    accent: "#5E9C68",
    hasPage: true,
  },
  {
    n: 2, status: "framed", name: "Floor II", biome: "Highland Foothills",
    settlement: { type: "village", name: "A small village" },
    tagline: "The first sign that others have passed this way.",
    summary: "Rising foothills and stone paths, with the first small village — a frontier waypoint. (Framed by canon; details to come.)",
    boss: { name: "Floor Guardian II", kind: "TBD", note: "" },
    milestone: "First village reached.", accent: "#7BA86A",
  },
  {
    n: 3, status: "framed", name: "Floor III", biome: "Mountain Passes",
    settlement: { type: "village", name: "A small village" },
    tagline: "Higher, colder, and more dangerous than the last.",
    summary: "Mountain country — switchback passes, thin air, a second village clinging to the rock. (Framed by canon; details to come.)",
    boss: { name: "Floor Guardian III", kind: "TBD", note: "" },
    milestone: "The mountains test resolve.", accent: "#8FA4B5",
  },
  {
    n: 4, status: "framed", name: "Floor IV", biome: "Deep Forest Realm",
    settlement: { type: "village", name: "A small village" },
    tagline: "The final waypoint before the great city above.",
    summary: "A vast old forest realm — the third and final village before Floor 5. (Framed by canon; details to come.)",
    boss: { name: "Floor Guardian IV", kind: "TBD", note: "" },
    milestone: "The last village.", accent: "#5C8A6B",
  },
  {
    n: 5, status: "framed", name: "Floor V", biome: "The Hub City",
    settlement: { type: "city", name: "A proper hub city" },
    tagline: "The first true city of the Spire — and a place to call base.",
    summary: "Floor 5 escalates into a proper city — services, people, a sense of arrival. The first-act climax and the climber's home above the clouds. (Framed by canon; details to come.)",
    boss: { name: "Floor Guardian V", kind: "Major", note: "A first-act climax encounter." },
    milestone: "Arrival at the hub city. The first act ends here.", accent: "#E8B954",
  },
  { n: 6,  status: "locked", name: "Floor VI",   tagline: "The higher floors are not spoken of by those who turned back." },
  { n: 7,  status: "locked", name: "Floor VII",  tagline: "Where the promise begins to rot." },
  { n: 8,  status: "locked", name: "Floor VIII", tagline: "Climbers who reach here remember things they did not live." },
  { n: 9,  status: "locked", name: "Floor IX",   tagline: "The truth waits, patient and cold." },
  { n: 10, status: "locked", name: "Floor X",    tagline: "The summit of the known realms. Beyond it, only the Spire's heart." },
];
