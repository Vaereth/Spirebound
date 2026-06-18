/* =====================================================================
   SPIREBOUND — CURRENCY CANON DATA
   Source of truth: Spirebound_Currency_Economy_Bible.txt (all locked).
   Display logic lives in components; this file holds canon only.
   Nothing here is invented — values, materials, prices, and conversion
   are transcribed from the Bible. Provisional items are marked.
   ===================================================================== */

// Five denominations, low → high. baseValue is in Cinders.
export const DENOMINATIONS = [
  {
    id: 'cinder', name: 'Cinder', shorthand: 'C', baseValue: 1,
    conversionText: '1 Cinder', role: 'Petty coin · smallest daily denomination',
    material: 'Hardened copper-bronze', colourLabel: 'Dark red-brown', silhouette: 'Round',
    verification: 'Weight, alloy, dimensions and relief',
    flavour: 'The spark in every purse — what bread and ale are counted in.',
    colorVar: '#9a5a3c', shapeKey: 'round',
  },
  {
    id: 'ember', name: 'Ember', shorthand: 'E', baseValue: 10,
    conversionText: '10 Cinders', role: 'Everyday working coin',
    material: 'Red brass', colourLabel: 'Warm orange-gold', silhouette: 'Scalloped / notched',
    verification: 'Patterned reeding',
    flavour: 'The honest coin of a day’s work and a good meal.',
    colorVar: '#d08a3a', shapeKey: 'scalloped',
  },
  {
    id: 'dawn', name: 'Dawn', shorthand: 'D', baseValue: 200,
    conversionText: '20 Embers · 200 Cinders', role: 'Wages and shopping',
    material: 'Hardened silver alloy', colourLabel: 'Bright silver-white', silhouette: 'Multi-sided',
    verification: 'Edge lettering and regulated purity',
    flavour: 'Wages, rent, and the registration that makes a climber official.',
    colorVar: '#c9cdd6', shapeKey: 'multisided',
  },
  {
    id: 'beacon', name: 'Beacon', shorthand: 'B', baseValue: 2000,
    conversionText: '10 Dawns · 2,000 Cinders', role: 'Major purchases',
    material: 'Guild-standard electrum', colourLabel: 'Pale luminous gold', silhouette: 'Visibly cored',
    verification: 'Face-integrated partial seal',
    flavour: 'The weight behind a home, a mount, or a master’s commission.',
    colorVar: '#e8cf7e', shapeKey: 'cored',
  },
  {
    id: 'stellar', name: 'Stellar', shorthand: 'St', baseValue: 40000,
    conversionText: '20 Beacons · 40,000 Cinders', role: 'Fortune · property · institutional transactions',
    material: 'Platinum-iridium body with sealed Tower-metal core',
    colourLabel: 'Luminous white-gold body · celestial-blue core', silhouette: 'Ringed pinnacle',
    verification: 'Sealed Tower-metal core · highest-grade verification',
    flavour: 'The bridge between coin and recorded credit. Few will ever hold one.',
    colorVar: '#f0e6cf', coreColorVar: '#5BA3D0', shapeKey: 'pinnacle', apex: true,
  },
];

// Conversion ladder (irregular, deliberate period texture).
export const CONVERSION_LADDER = [
  { from: '10 Cinder', to: '1 Ember' },
  { from: '20 Ember', to: '1 Dawn' },
  { from: '10 Dawn', to: '1 Beacon' },
  { from: '20 Beacon', to: '1 Stellar' },
];

// Anti-counterfeit progression (low → high).
export const VERIFICATION_LADDER = DENOMINATIONS.map((d) => ({
  name: d.name, shorthand: d.shorthand, verification: d.verification,
}));

// Benchmark basket — Floor 1, Hearthvale, normal conditions. Cinder values
// transcribed from the Bible §20. Property is Floor 5 (noted).
export const PRICES = {
  note: 'Baseline Hearthvale prices under normal conditions. Dynamic pricing floats them within bands.',
  groups: [
    { group: 'Daily Living & Food', items: [
      { label: 'Loaf of bread', cinders: 3 },
      { label: 'Mug of ale', cinders: 4 },
      { label: 'Simple meal (tavern)', cinders: 12 },
      { label: 'Good meal', cinders: 30 },
      { label: 'Luxury meal (rare ingredients)', cinders: 250 },
    ] },
    { group: 'Lodging (per night)', items: [
      { label: 'Common bunk room', cinders: 8 },
      { label: 'Broken Compass — downstairs bed', cinders: 6 },
      { label: 'Private room (modest inn)', cinders: 25 },
      { label: 'Broken Compass — upstairs room', cinders: 35 },
      { label: 'Sleeping Lion room (fine)', cinders: 120 },
    ] },
    { group: 'Services', items: [
      { label: 'Public bath', cinders: 5 },
      { label: 'Private bath', cinders: 30 },
      { label: 'Weapon repair (minor)', cinders: 20 },
      { label: 'Armour repair (full)', cinders: 90 },
      { label: 'Healing service (minor)', cinders: 40 },
      { label: 'Healing potion (common)', cinders: 75 },
      { label: 'Guild registration (one-time)', cinders: 200 },
    ] },
    { group: 'Goods & Travel', items: [
      { label: 'Basic clothing set', cinders: 60 },
      { label: 'Sturdy boots', cinders: 45 },
      { label: 'Common tool', cinders: 35 },
      { label: 'Ferry crossing (Silverrun)', cinders: 8 },
      { label: 'Riding mount (horse)', cinders: 1500 },
    ] },
    { group: 'Livestock', items: [
      { label: 'Chicken', cinders: 25 },
      { label: 'Pig', cinders: 300 },
      { label: 'Cow', cinders: 900 },
    ] },
    { group: 'Property (Floor 5)', items: [
      { label: 'Modest starter home', cinders: 8000 },
      { label: 'Comfortable home', cinders: 20000 },
      { label: 'Fine home', cinders: 40000 },
      { label: 'Vanity estate (prestige)', cinders: 200000 },
    ] },
  ],
  reasons: ['Supply', 'Demand', 'Weather', 'Road safety', 'Harvests', 'Guardian state', 'Regional crisis', 'Player actions'],
};

// Stellar feature canon.
export const STELLAR = {
  bodyMaterial: 'Platinum-iridium alloy · luminous white-gold finish',
  coreMaterial: 'Regulated Tower-metal · deep celestial blue · real structural core',
  verification: 'Brief celestial-blue glimmer; fine seal-lines may appear briefly. Never a constant glow.',
  role: 'The bridge between physical wealth and recorded credit.',
  power: [
    'One Stellar can purchase a modest home and support a median household at a standard level for approximately four years.',
    'One Stellar can support one person at a standard living level for approximately eight years.',
  ],
  carryWarning: [
    'Most citizens recognise a Stellar.',
    'Few will ever hold one.',
    'Displaying one openly is an invitation to attention.',
  ],
  practice: 'Most Stellar transactions use bank drafts, vault transfers, or Ledger credit rather than carried coin.',
  unresolved: 'Exact Tower metal, exact dimensions, and exact alloy percentages remain UNRESOLVED.',
};

// Why the currency is trusted — three layers.
export const TRUST_LAYERS = [
  { title: 'Material value', body: 'Coins are genuinely struck from regulated metals and alloys, so even distrustful or lawless parties will take the metal.' },
  { title: 'Mint authority', body: 'Approved hub cities mint coin under Ascendant Guild standards. A properly struck Hearthvale coin is worth more than its raw metal because the mint guarantees weight and purity.' },
  { title: 'Partial magical verification', body: 'Higher denominations carry stronger verification features, culminating in the Stellar’s sealed Tower-metal core. Banking remains institutionally separate from minting.' },
];

// One currency across 100 Floors.
export const HUNDRED_FLOORS = {
  statement: 'A Dawn remains a Dawn on every lawful participating Floor.',
  principle: 'Currency remains universal. Economic power remains progression-gated.',
  points: [
    'Face value remains universal across participating Floors.',
    'Purchasing power varies by region.',
    'Ordinary food and services remain reasonably comparable.',
    'Rare goods, advanced crafting, exotic materials, property, and elite services rise in price.',
    'There are no one hundred separate Floor wallets.',
  ],
  segments: ['Floors 1–10', 'Floors 11–25', 'Floors 26–50', 'Floors 51–75', 'Floors 76–89', 'Floors 90–100'],
  segmentNotes: [
    'Floor 1 has no player-equipment auctioning.',
    'Civilian goods can be traded more broadly.',
    'Power-relevant equipment follows progression, provenance, rarity, and binding rules.',
  ],
};

// Coin / Vault / Ledger — the three layers of money.
export const MONEY_LAYERS = [
  { id: 'coin', title: 'Carried Coin', points: [
    'Used in ordinary commerce.', 'Physical — can become heavy in large quantities.',
    'A small capped loss may occur under certain defeat rules.',
  ] },
  { id: 'vault', title: 'Local Vault', points: [
    'Stores large physical reserves and valuables.', 'Tied to specific locations.',
    'Preserves geographic and logistical meaning.',
  ] },
  { id: 'ledger', title: 'The Ledger', points: [
    'Guild-recognised current balance.', 'Traceable; used for routine authorised payments and major wealth.',
    'Protects banked wealth; supports cross-Floor transfers with time and fees.',
  ] },
];
export const LEDGER_NOTE = 'Registered merchants can process small traceable payments via Guild-certified ledgers. Large transfers and restricted actions require a bank or authorised hall. Dungeons, criminals, isolated traders, and black markets still require coin.';

// Living economy — cause and effect.
export const ECONOMY_FLOWS = [
  { trigger: 'Poor Dawnfields harvest', chain: ['Grain prices rise', 'Bread becomes more expensive', 'Guild relief contracts appear'] },
  { trigger: 'Strong Rendwater catch', chain: ['Fish supply rises', 'Fish prices fall', 'Preserved fish production increases'] },
  { trigger: 'Road closure', chain: ['Imported goods rise', 'Caravan insurance rises', 'Alternative routes gain demand'] },
  { trigger: 'Fenrath crisis', chain: ['Trade disruption', 'Caravan losses', 'Shortages', 'Labour shifts', 'Slow recovery after restoration'] },
];
export const ECONOMY_PRINCIPLE = 'Prices never change without a visible reason.';
export const ECONOMY_SURFACES = ['Market boards', 'Merchant dialogue', 'Price histories', 'Caravan notices', 'Weather reports', 'Regional reports'];

// Monetary trust & consequences.
export const TRUST = {
  judges: ['the coin', 'the person presenting it'],
  positive: ['Honest trade', 'Strong Guild standing', 'Protecting caravans', 'Helping settlements', 'Exposing counterfeiters', 'Becoming a reliable customer'],
  negative: ['Passing counterfeit coin', 'Clipping', 'Laundering', 'Smuggling', 'Refusing verification', 'Carrying suspicious quantities of unmarked coin', 'Becoming wanted', 'Working with criminal networks'],
  consequences: ['Merchant refusal', 'Verification delays', 'Higher scrutiny', 'Banking restrictions', 'Confiscation', 'Fines', 'Wanted status', 'Guild sanctions'],
};

// The Forgotten — spoiler-safe default copy.
export const FORGOTTEN = {
  safe: [
    'Unmarked coin circulates beyond lawful markets.',
    'It may carry greater value among those who prize anonymity — but using it openly can draw scrutiny from merchants, banks, guards, and the Guild.',
  ],
  revealed: {
    name: 'The Forgotten',
    body: 'A clandestine criminal organisation dealing in unmarked coin, smuggling, forged documents, contraband, favour-debts, and information. Behaviour-gated; their access rules are never exposed publicly.',
  },
};

// Taxes & public services.
export const TAXES = {
  traits: [
    'Embedded automatically into displayed prices.', 'Transparent — large deductions shown before you confirm.',
    'Low or exempt on essentials.', 'Higher on luxury, high-value, or progression-related transactions.',
    'Never handled through manual tax filing.',
  ],
  funds: ['Guards', 'Walls', 'Roads', 'Water', 'Sanitation', 'Schools', 'Healthcare', 'Parks', 'Rescue operations', 'Market oversight', 'Regional reconstruction'],
  provisionalRates: [
    { k: 'Normal sales', v: '3%' }, { k: 'Essentials', v: '0–1%' }, { k: 'Luxury', v: '5–8%' },
    { k: 'Civilian auction', v: '3–5%' }, { k: 'Equipment auction', v: '5–10% (by Floor segment)' },
    { k: 'Large credit transfer', v: '1–3%' }, { k: 'Guild contract levy', v: '2–5%' },
  ],
  provisionalNote: 'Provisional tuning values — not final until the full balance pass.',
};

// Deep economic reference (accordion content).
export const REFERENCE = [
  { id: 'authority', title: 'Currency source & authority', body: 'The Ascendant Guild sets denomination, weight, purity, and seal rules. Approved hub cities operate authorised mints; Hearthvale runs the Floor 1 mint with its own respected mint-mark. Banking remains institutionally separate from minting.' },
  { id: 'pricing', title: 'Dynamic pricing', body: 'Baseline prices float within bands driven by supply, demand, weather, harvests, road safety, Guardian state, regional crises, and player actions. Prices never change without a surfaced, explainable reason.' },
  { id: 'banking', title: 'Banking & transfers', body: 'The Ledger is the Guild-recognised balance for routine authorised payments and major wealth. Bulk cross-Floor transfers require both time and a fee, scaling with amount, distance, and risk.' },
  { id: 'markets', title: 'Markets & auction segmentation', body: 'Equipment auctions are split into progression bands (Floors 1–10, 11–25, 26–50, 51–75, 76–89, 90–100). Equipment lists only in the segment matching its intended band; access requires legitimate progression. Floor 1 has no player-equipment auctioning.' },
  { id: 'taxes', title: 'Taxes', body: 'Transparent and embedded into displayed prices. Essentials are exempt or minimal; luxury, high-value, and inter-Floor transactions are taxed more heavily. Provisional rates are not final until the balance pass.' },
  { id: 'counterfeiting', title: 'Counterfeiting', body: 'Metal value makes clipping and debasement real concerns. Anti-counterfeit features rise by denomination, from alloy/relief on the Cinder to the Stellar’s sealed Tower-metal core. Passing false coin, clipping, and tampering with mint-marks carry serious consequences.' },
  { id: 'trading', title: 'Player trading', body: 'Both instant sale (convenient, lower return) and optional timed listings exist. Power-relevant equipment follows progression, provenance, rarity, and binding rules; civilian goods trade more broadly.' },
  { id: 'inflation', title: 'Inflation control', body: 'Controlled through strong sinks, world-grounded diminishing returns, and segmented markets. A single player can influence local markets but cannot casually collapse or control a Floor’s economy.' },
  { id: 'difficulty', title: 'Difficulty rules', body: 'Economic friction, loss rules, and verification scrutiny can vary with difficulty. Progression protection always works through markets, banking, provenance, and access — never through arbitrary coin invalidation.' },
  { id: 'unresolved', title: 'Unresolved specifications', body: 'Open items include the exact Tower metal and alloy percentages of the Stellar, exact coin dimensions, the exact Floor at which equipment auctioning unlocks, and final tax/fee tuning.' },
];

// Cross-links to related pages already in the site.
export const CROSSLINKS = [
  { label: 'Hearthvale — The Living World', route: '#/floors/1/world' },
  { label: 'Floor 1 · The Verdant Reach', route: '#/floors/1' },
  { label: 'Regions of the Reach', route: '#/floors/1/regions' },
  { label: 'Stats & Systems', route: '#/systems' },
];
