/* =====================================================================
   FENRATH LORE — "The Floor That Learned His Name"
   Ilyen Vey's concealed archive: 18 collectible records scattered across
   Floor 1, plus the Wayfarer profiles and the historical timeline.
   This is canon from the Fenrath Complete Lore handoff. TBD stays TBD.
   Large prose lives here (NOT in FenrathPage.jsx) by design.
   ===================================================================== */

export const FENRATH_LORE = {
  collectionTitle: 'The Floor That Learned His Name',
  provisionalTitles: ['First Guardian', 'The First Article'],
  summary: {
    role: 'Warden of Ways',
    intro: 'Fenrath was once mortal — the Warden of Ways in an early civilisation of Floor 1, responsible for roads, crossings, migration corridors, emergency routes, and the agreements between settlements and the living Floor. His defining quality was attention.',
    belief: 'A road is not where stone has been laid. A road is where the world continues to permit passage.',
    beats: [
      `When the seal beneath Floor 1 weakened, corruption first appeared not as monsters but as disagreement: rivers arriving before their sources, animals carrying memories of extinct species, roads returning people to places they had never visited. Something beneath the Floor was persuading it that it had always worked differently.`,
      `The Wayfarers found the First Wound beneath Crownward. The Tower architects proposed Article-Binding: binding five living people permanently to the five systems — concealing that the process would erase the vessels and become the basis for every later Guardian.`,
      `Fenrath discovered the truth after his companions had entered their ritual circles. Rather than let five people be dissolved into separate functions, he used his bonds with each of them as the structure joining all five systems. The five survived. Fenrath took the entire binding into himself.`,
      `His flesh reorganised around function. His additional humanoid arms are not the literal arms of his companions — they are the permanent shape of five lives he refused to let the ritual consume. Fenrath became the First Guardian, the First Article, and the first living lock of the Hundredfold Seal.`,
      `The architects promised the binding would be reversed. It was not. They studied him; his suffering proved the process worked, and future Guardians were refined from his transformation — deliberately preserving less mortal identity, because Fenrath's retained conscience caused resistance.`,
      `Fenrath created the Proofs. The Tower compels him to challenge those seeking ascent, but he defines the conditions. The Proofs ask whether a challenger understands the Floor they are about to wound — and grant him brief relief from the systems they suppress.`,
    ],
  },

  characters: [
    {
      id: 'fenrath', name: `Fenrath`, function: `The Path`, role: `Warden of Ways`,
      belief: `He was not counted among the five functions. He was the path connecting them.`, fate: `Became the First Guardian / First Article`, proof: `—`,
    },
    {
      id: 'selka', name: `Selka Marr`, function: `The Veins`, role: `Riverwright & flood engineer`,
      belief: `Understood water as circulation rather than property; opposed saving one settlement by quietly starving another.`, fate: `Bound to the Veins; survived`, proof: `Proof of the Living Current`,
    },
    {
      id: 'vael', name: `Vael Ardin`, function: `The Breath`, role: `Wind-reader & tower climber`,
      belief: `Understood that still air could become more dangerous than violent weather.`, fate: `Bound to the Breath; survived`, proof: `Proof of the Open Sky`,
    },
    {
      id: 'orra', name: `Mother Orra`, function: `The Roots`, role: `Briarwood healer & fungal gardener`,
      belief: `Taught that death was not the opposite of life, but part of how life continued.`, fate: `Bound to the Roots; survived`, proof: `Proof of the Shared Root`,
    },
    {
      id: 'rovan', name: `Rovan Hale`, function: `The Blood`, role: `Hunter & battlefield surgeon`,
      belief: `Understood predator, prey, injury, hunger, fear, killing and recovery as one connected cycle.`, fate: `Bound to the Blood; survived`, proof: `Proof of the Red Cycle`,
    },
    {
      id: 'ilyen', name: `Ilyen Vey`, function: `The Memory`, role: `Surveyor & record keeper`,
      belief: `Mapped geography, abandoned settlements, migrations, and the memories people attached to places.`, fate: `Bound to the Memory; became Floor 1’s first hidden historian`, proof: `Proof of the Remembered Path`,
    },
  ],

  timeline: [
    {
      n: 1, title: `Wayfarers of the First Accord`, desc: `Six specialists — Fenrath and five companions — keep the agreements between Floor 1’s settlements and the living Floor.`, records: [2],
    },
    {
      n: 2, title: `First systemic disagreement`, desc: `The Floor begins forgetting its own laws: rivers arrive before their sources, roads return people to places they never visited.`, records: [1, 3],
    },
    {
      n: 3, title: `The First Wound`, desc: `The Wayfarers find the First Wound beneath Crownward — an intelligence attempting to enter Floor 1 by rewriting the relationships that make it alive.`, records: [4],
    },
    {
      n: 4, title: `The Council of Measures`, desc: `Architects and Wayfarers convene. The Articles are proposed: laws given form, carried by living vessels.`, records: [5],
    },
    {
      n: 5, title: `Article-Binding`, desc: `The plan to bind five living people permanently to the five systems — concealing that it would erase them.`, records: [6, 7],
    },
    {
      n: 6, title: `Fenrath becomes the First Article`, desc: `Fenrath alters the ritual, taking the whole binding into himself so the five survive.`, records: [7, 8],
    },
    {
      n: 7, title: `Three Nights`, desc: `Fenrath’s transformation and the Wayfarers’ vigil.`, records: [9],
    },
    {
      n: 8, title: `Guardian replication`, desc: `The architects refine the process; later Guardians preserve less mortal identity.`, records: [10, 12],
    },
    {
      n: 9, title: `Ilyen’s Redaction`, desc: `Ilyen removes Fenrath’s mortal history from the public archive — but scatters the truth across Floor 1.`, records: [11],
    },
    {
      n: 10, title: `The First Challenger`, desc: `The first climber reaches the Gate.`, records: [13],
    },
    {
      n: 11, title: `Creation of the Proofs`, desc: `Fenrath defines the conditions of his own encounter.`, records: [14],
    },
    {
      n: 12, title: `Guild doctrine`, desc: `The Guild transforms his tragedy into prerequisites, encounter design, and progression.`, records: [14, 15],
    },
    {
      n: 13, title: `The current encounter`, desc: `Climbers face Fenrath as a Floor 1 Guardian.`, records: [],
    },
    {
      n: 14, title: `Severance / corruption`, desc: `A Severed Article opens a route for corruption beneath the Floor.`, records: [16],
    },
    {
      n: 15, title: `Restoration or continuing breach`, desc: `The unresolved future: release, restoration, or continuing wound.`, records: [17, 18],
    },
  ],

  acts: [
    { n: 'I', title: `The Wayfarers` },
    { n: 'II', title: `The First Wound` },
    { n: 'III', title: `The Binding` },
    { n: 'IV', title: `The First Lie` },
    { n: 'V', title: `The Proofs` },
    { n: 'VI', title: `The Wound` },
  ],

  records: [
    {
      n: 'I', idx: 1, title: `A ROAD IS AN AGREEMENT`,
      act: 'I',
      found: `Dawnfields, beneath an old roadside marker near the first eastern caravan route.`,
      type: `Warden’s field journal.`,
      author: `Fenrath.`,
      region: `Dawnfields`,
      proof: `Proof of the Remembered Path`, phase: null,
      gate: null, sealed: false,
      body: `The lower road has moved again.

Not the stones. The stones remain where we laid them.

The road itself has moved.

The grazers no longer cross at the split oak. They climb the northern bank, though the slope is poor and two calves have already broken legs there. Briar Hares leave the wheat untouched along the old verge. Even the Sicklewings circle but will not descend.

Hearthvale’s surveyor told me a road cannot move unless men move it.

I told him he was confusing stone with permission.

A road is not where we place our feet. It is where the land, the weather, the animals, and those travelling have agreed that passage can continue.

Break any part of that agreement and a road becomes only a line drawn by someone who is no longer listening.

Selka believes the river is pushing salt beneath the roots.

Vael says the wind tastes of cold iron.

Orra has found fungus fruiting in direct sun.

Rovan says the predators are hungry but will not kill.

Ilyen has drawn the route three times. Each copy is different, though she swears she did not move her hand.

We leave before dawn.

If the road has changed, something persuaded it to change.

I intend to know what.

At the bottom, in another hand:

He always wrote as though the Floor could answer.

I do not know when it began doing so.`,
    },
    {
      n: 'II', idx: 2, title: `SIX AT THE FORD`,
      act: 'I',
      found: `Silverrun, inside the foundations of a collapsed mill.`,
      type: `Local song transcribed by Ilyen Vey.`,
      author: `Unknown.`,
      region: `Silverrun`,
      proof: `Proof of the Living Current`, phase: null,
      gate: null, sealed: false,
      body: `Six came down where the white ford broke.

Selka bore a cup with no bottom.

Vael carried a bell that hated stillness.

Orra brought bread for the dead.

Rovan wore a red cord and cut no throat without naming it.

Ilyen held a map blank on both sides.

Fenrath brought nothing.

When the river asked what each could offer, Selka offered direction.

Vael offered breath.

Orra offered return.

Rovan offered hunger.

Ilyen offered remembrance.

The river asked Fenrath what remained.

He answered:

“The way between them.”

The oldest surviving version ends here.

Later versions add a final verse:

The river took the cup.

The storm took the bell.

The soil took the bread.

The wolf took the cord.

The road took the map.

The Gate took Fenrath.

No version records who first added the final line.`,
    },
    {
      n: 'III', idx: 3, title: `THE MAP THAT DISAGREED`,
      act: 'I',
      found: `Crownward Expanse, inside a broken survey obelisk.`,
      type: `Survey notes.`,
      author: `Ilyen Vey.`,
      region: `Crownward Expanse`,
      proof: `Proof of the Remembered Path`, phase: null,
      gate: null, sealed: false,
      body: `I have produced nine maps of the eastern boundary in twelve days.

None agree.

This is not ordinary survey failure.

The obelisks remain fixed. The stars remain reliable. The distances measured by chain are consistent.

Yet when translated to parchment, the roads bend toward places that do not exist.

One map shows a settlement west of Briarwood named Veyra.

No such settlement appears in any census.

Three travellers remember purchasing bread there.

One remembers being born there.

All four were born elsewhere.

Fenrath asked whether I recognised the handwriting labelling it.

I did.

It was mine.

I had not written it.

He ordered the maps burned.

I refused.

A false record is still evidence of something attempting to become true.

Fenrath looked toward the Crownward Gate for a very long time.

Then he said:

“It is not changing the Floor.”

“It is teaching the Floor to remember another one.”`,
    },
    {
      n: 'IV', idx: 4, title: `WHEN WATER CLIMBED`,
      act: 'II',
      found: `Silverrun, behind the sealed mechanism of an ancient sluice.`,
      type: `Riverwright emergency report.`,
      author: `Selka Marr.`,
      region: `Silverrun`,
      proof: `Proof of the Living Current`, phase: `Phase 1`,
      gate: null, sealed: false,
      body: `At second bell the eastern branch reversed.

Not slowed.

Not redirected.

Reversed.

Water climbed six spans against its own fall and entered the upper reservoir without raising the lower level.

Silverfin emerged bearing scars from hooks not yet forged.

A child at the bank identified one fish as belonging to her grandfather.

Her grandfather died before she was born.

At third bell, the river began speaking through the sluice.

No words.

It used the rhythm of names.

Fenrath ordered every channel opened.

The council objected that Hearthvale would flood.

He replied that a flood obeyed more laws than what we were facing.

We opened all gates.

The reverse current divided across three branches and weakened.

For eleven minutes, the water remembered gravity.

Then something beneath the river laughed.

I write that word deliberately.

It did not produce sound.

The current changed in the way a face changes when amused.

Fenrath stood waist-deep in the branch until nightfall.

When I asked what he had heard, he said:

“An invitation.”`,
    },
    {
      n: 'V', idx: 5, title: `THE COUNCIL OF MEASURES`,
      act: 'II',
      found: `Old March, beneath the foundations of an abandoned command hall.`,
      type: `Council transcript.`,
      author: `The Wayfarers and the First Architects.`,
      region: `Old March`,
      proof: null, phase: null,
      gate: null, sealed: false,
      body: `ARCHITECT SERA:

The instability is no longer regional. The five systems are being rewritten from beneath.

ROVAN:

Then name what is doing it.

SERA:

We cannot.

FENRATH:

Cannot, or will not?

[SEVEN LINES REMOVED]

ILYEN:

The false routes originate beneath Crownward. They are not errors. They are attempts.

SELKA:

Attempts to do what?

FENRATH:

To be remembered.

ORRA:

A thing without roots cannot enter a living place unless the living place makes room for it.

VAEL:

Then we deny it room.

SERA:

That is the purpose of the proposed Articles.

ROVAN:

Articles are words.

SERA:

Articles are laws given form.

FENRATH:

And what will carry them?

[SECTION REMOVED]

SELKA:

No.

SERA:

There is no alternative.

SELKA:

There is always an alternative. You mean there is no alternative that preserves us.

SERA:

The five of you possess the necessary correspondences.

FENRATH:

Five?

SERA:

Water. Breath. Root. Blood. Memory.

FENRATH:

You have not named the path between them.

SERA:

The path is not a system.

FENRATH:

Everything believes that until the path closes.`,
    },
    {
      n: 'VI', idx: 6, title: `THE NIGHT BEFORE CONTINUANCE`,
      act: 'II',
      found: `Briarwood, inside a stone hollow grown over by an ancient root.`,
      type: `Personal letter never delivered.`,
      author: `Fenrath.`,
      region: `Briarwood`,
      proof: `Proof of the Shared Root`, phase: null,
      gate: null, sealed: false,
      body: `Intended recipient:
Ilyen Vey.

Ilyen,

You are asleep twelve paces from me.

I am writing because if I wake you, you will hear the fear in my voice, and if you hear it, you will decide courage requires answering it.

I do not want courage from you tonight.

I want selfishness.

I want Selka to refuse because rivers do not belong inside one body.

I want Vael to climb out through the smoke hole and never return.

I want Orra to remind us that sacrifice is sometimes only waste spoken beautifully.

I want Rovan to threaten the architects until they find another answer.

I want you to take every map we made and walk beyond its edge.

Tomorrow, you will each stand in a circle and they will call it Continuance.

I have read the concealed portion.

There is no continuation in it.

There is replacement.

The systems will persist.

You will not.

I have not told you because you would still enter the circles.

That is the cruelty of knowing each of you so well.

I have spent my life maintaining roads.

Tomorrow I will close five.

Forgive me for the route I have chosen instead.

—F

A later annotation by Ilyen reads:

He believed the choice was his alone because he could not bear the possibility that we might knowingly choose with him.

That was his first betrayal.

It was also the reason we lived.`,
    },
    {
      n: 'VII', idx: 7, title: `SIX CIRCLES, ONE CENTRE`,
      act: 'III',
      found: `Crownward Expanse, visible only after completing three Guardian Proofs.`,
      type: `Ritual transcription.`,
      author: `Unknown Architect.`,
      region: `Crownward Expanse`,
      proof: null, phase: null,
      gate: null, sealed: false,
      body: `The five correspondences are stable.

VEINS — ACCEPTED
BREATH — ACCEPTED
ROOTS — ACCEPTED
BLOOD — ACCEPTED
MEMORY — ACCEPTED

Unregistered presence detected at centre.

ARCHITECT SERA:

Warden, leave the design.

FENRATH:

No.

SERA:

You have no correspondence.

FENRATH:

I have all five.

SERA:

That is not possible.

FENRATH:

Selka taught me that water dies when one hand owns its direction.

Vael taught me that stillness can be a form of suffocation.

Orra taught me that what ends may still nourish what remains.

Rovan taught me that hunger is neither evil nor innocent.

Ilyen taught me that a path forgotten can become more dangerous than a path destroyed.

You measured their functions.

You did not measure what passed between us.

SERA:

The centre cannot bear the combined load.

FENRATH:

Then let it break.

SELKA:

Fenrath—

FENRATH:

Live.

The record becomes unreadable for forty-three lines.

The final intact notation states:

ARTICLE FORMED.

NUMBER OF LIVING VESSELS EXPECTED: FIVE.

NUMBER OF LIVING VESSELS OBSERVED: ONE.

NUMBER OF SURVIVORS: SIX.`,
    },
    {
      n: 'VIII', idx: 8, title: `WHAT WOKE AT THE GATE`,
      act: 'III',
      found: `Gate of First Ascent, beneath the western chain anchor.`,
      type: `Eyewitness testimony.`,
      author: `Rovan Hale.`,
      region: `Crownward Expanse`,
      proof: `Proof of the Red Cycle`, phase: null,
      gate: null, sealed: false,
      body: `We heard him before we saw him.

Every animal on the Floor made one sound through his throat.

Not together.

One after another.

Birth cries.

Mating calls.

Alarm.

Hunger.

Pain.

The last breath of prey.

The frustrated breath of a predator that has lost the trail.

Then the roots split the ritual floor.

A forelimb emerged where a man’s arm should have been.

Stone grew around bone.

Chains entered him without piercing skin because the boundary between metal and body had ceased to matter.

The extra hands came last.

Four human arms unfolded beneath the wolf-shape, reaching toward the circles where we had stood.

I thought they were trying to drag us back.

Then I understood.

They were pushing us away.

His natural eye opened first.

He knew us.

The second eye was not an eye.

It was the Gate looking through him.

Selka asked whether he was in pain.

All five rivers overflowed.

Vael asked whether he could breathe.

Every pressure tower in Windmere rang.

Orra placed her hand against his muzzle.

The roots beneath us flowered.

Ilyen asked whether he remembered his name.

For one moment, nothing on Floor 1 moved.

Then he answered:

“Fenrath.”

That is how we knew the binding had not taken everything.

That is how we began lying to ourselves that what remained was enough.`,
    },
    {
      n: 'IX', idx: 9, title: `THREE NIGHTS`,
      act: 'III',
      found: `Hearthvale, beneath the oldest lamp shrine.`,
      type: `Personal journal.`,
      author: `Ilyen Vey.`,
      region: `Old March`,
      proof: null, phase: null,
      gate: null, sealed: false,
      body: `The architects said the first stabilisation would require three nights.

We kept the lamps burning.

On the first night, Fenrath spoke clearly.

He asked for water, then laughed because he could feel every river.

He asked Rovan whether his hands were still his own.

Rovan said yes.

Neither of them looked at the four additional arms.

On the second night, Fenrath asked why the Dawnfields herd had changed direction.

No one had told him.

He could feel it through the Blood.

He began finishing Selka’s sentences.

Then Vael’s.

Then mine.

On the third night, he asked how long the reversal would take.

Architect Sera did not answer.

Fenrath asked again.

The Gate-eye opened.

Sera finally said there was no reversal procedure.

Rovan struck her.

Fenrath moved before any of us.

One chain crossed the chamber and stopped Rovan’s fist a finger-width from Sera’s throat.

He could already command the restraints.

He looked at us and said:

“Do not make the first thing I preserve be the life of the person who buried me.”

That night, Vael extinguished his lamp.

Selka relit it.

We have kept one burning ever since.

The current people of Hearthvale believe the lamps commemorate those lost on the roads.

They are not entirely wrong.`,
    },
    {
      n: 'X', idx: 10, title: `THE SECOND ARTICLE`,
      act: 'IV',
      found: `Sealed Archive, Floor 1.`,
      type: `Architect correspondence.`,
      author: `Architect Sera.`,
      region: `Crownward Expanse`,
      proof: null, phase: null,
      gate: null, sealed: false,
      body: `The First Article has exceeded projected stability.

Observed advantages of centralised binding:
- Reduced vessel loss
- Increased cross-system responsiveness
- Self-correcting regional adaptation
- Retention of decision-making capacity
- Improved resistance to lower-pressure influence

Observed disadvantages:
- Psychological continuity
- Moral objection
- Hostility toward replication
- Capacity for independent conditions
- Persistent identity

Recommendation:

Future Articles should retain less pre-binding identity.

The subject’s companions must not be permitted access to subsequent procedures.

The Warden believes his condition exceptional.

He must not learn that it is foundational.

A second hand has written beneath the recommendation:

You studied the shape of his suffering and called it an improvement.

The handwriting belongs to Ilyen Vey.`,
    },
    {
      n: 'XI', idx: 11, title: `ILYEN’S REDACTION`,
      act: 'IV',
      found: `Crownward Expanse, after restoring all five route memories.`,
      type: `Confession stored in route-memory.`,
      author: `Ilyen Vey.`,
      region: `Old March`,
      proof: `Proof of the Remembered Path`, phase: null,
      gate: null, sealed: false,
      body: `I removed him from history.

Not completely.

A complete erasure would have been kinder.

I left the beast.

I left the Guardian.

I left the warnings, the prayers, the early challenge accounts, and the name.

I removed the man.

The architects wanted all records destroyed.

I persuaded them that the population required a stable myth.

A beast born with the Floor would inspire obedience.

A man made into a lock would inspire questions.

I gave them their myth.

Then I buried the questions.

One in the river.

One in the wind towers.

One among the roots.

One where predator and prey share blood.

One in the paths that refuse forgetting.

The remaining records I placed where only someone walking the whole Floor would find them.

Fenrath knows what I did.

He has never forgiven me.

He has also never destroyed the archive.

I cannot decide which judgment is worse.

To whoever assembles this:

Do not absolve me because I preserved the truth in secret.

Truth hidden so thoroughly that it cannot prevent harm is often only guilt arranging itself beautifully.`,
    },
    {
      n: 'XII', idx: 12, title: `A HUNDRED BETTER CAGES`,
      act: 'IV',
      found: `Old March, carried by a Marching Dead officer who never attacks unless provoked.`,
      type: `Unsent letter.`,
      author: `Fenrath.`,
      region: `Briarwood`,
      proof: null, phase: null,
      gate: null, sealed: false,
      body: `Intended recipient:
Architect Sera.

I felt the second one wake.

You made the binding cleaner.

It screamed for less time.

Was that what you meant by mercy?

I felt the tenth.

It did not remember its mother by the first dawn.

You called that stability.

I felt the thirty-second attempt to tear itself apart.

I held my Floor together while it died three levels above me.

You recorded the failure.

Did you record its name?

I felt the hundredth lock close.

For one moment, the pressure beneath us ceased.

The Tower celebrated.

Every Guardian heard the same thing in the silence.

Not victory.

Breathing.

The thing beneath us had stopped pushing because it had learned the shape of the cage.

You believe one hundred Articles have imprisoned it.

I believe one hundred Articles have taught it where every weakness will eventually appear.

When the first Guardian falls and remains dead, it will begin at the smallest wound.

That will be me.

You made me first twice.`,
    },
    {
      n: 'XIII', idx: 13, title: `THE FIRST CHALLENGER`,
      act: 'V',
      found: `Gate of First Ascent, inside a damaged weapon lodged beneath the floor.`,
      type: `Survivor account.`,
      author: `Mara Venn, first recorded challenger.`,
      region: `Dawnfields`,
      proof: null, phase: `Phase 1`,
      gate: null, sealed: false,
      body: `We believed the creature guarded treasure.

That sounds foolish now, but there was no Guild then. No ascent doctrine. Only the Gate and the belief that anything sealed must contain something worth taking.

Five of us entered.

Fenrath spoke our names.

We had not given them.

Tomas attacked first.

Fenrath placed one paw on his chest and held him against the floor.

He could have crushed him.

Instead, he asked:

“Where does the river go when your village no longer needs it?”

Tomas called him a monster.

Fenrath broke his sword and threw him out of the arena.

He asked Enna what should happen to a forest that refused to let its dead trees fall.

She did not understand.

He asked Jorren whether killing every predator would make prey safe.

Jorren laughed.

Fenrath nearly killed him.

When he turned to me, he asked how a road survives after everyone who walked it is dead.

My mother was Selka Marr.

I knew enough to be afraid of the question.

I answered:

“Someone must walk it for a reason other than reaching the end.”

Fenrath released us.

The Gate remained closed.

He said:

“Return when five answers have become actions.”

That was the beginning of the Proofs.

We had arrived seeking a key.

He sent us back to learn what a door was protecting.`,
    },
    {
      n: 'XIV', idx: 14, title: `FIVE QUESTIONS MADE REAL`,
      act: 'V',
      found: `One fragment in each region; completed only after acquiring all five.`,
      type: `Fenrath’s design for the Proofs.`,
      author: `Fenrath.`,
      region: `Windmere Hills`,
      proof: null, phase: `Phase 1`,
      gate: null, sealed: false,
      body: `A spoken answer is weightless.

A vow made in safety has not yet encountered cost.

Let the challenger answer with the Floor.

For the Veins:

Give them water desired by three hands. Let them choose whether one settlement’s certainty is worth another’s thirst.

For the Breath:

Give them a storm that can be imprisoned. Let them learn that containing danger may allow it to grow.

For the Roots:

Give them a life whose ending feeds a thousand lives. Let them choose whether preserving one form is the same as preserving life.

For the Blood:

Give them predator, prey, hunger, fear, and those who demand that nature become convenient. Let them act without pretending death can be removed from the equation.

For the Memory:

Give them a road that offers a shorter lie. Let them choose whether arrival matters more than remembering how they arrived.

If they complete these things, the systems will loosen their hold upon me.

The architects will call this weakness.

They have always mistaken restraint for defect.

The challenger will believe the Proofs make the battle easier.

That is true.

The challenger may never understand that they make the battle possible for me.

When the Veins are quiet, I no longer hear every drowning.

When the Breath is quiet, I possess one moment without every creature’s last exhalation.

When the Roots are quiet, the dead cease passing through my bones.

When the Blood is quiet, hunger does not wear my teeth.

When Memory is quiet—

[THE REMAINDER HAS BEEN REMOVED BY FENRATH]`,
    },
    {
      n: 'XV', idx: 15, title: `THE ONE WHO REFUSED`,
      act: 'V',
      found: `Briarwood, beside a tree whose roots form the shape of a seated person.`,
      type: `Ascendant Guild deletion order with attached testimony.`,
      author: `Guildmaster Pell; testimony by Ascendant Ser Hadrin.`,
      region: `Old March`,
      proof: null, phase: null,
      gate: null, sealed: false,
      body: `TESTIMONY:

I completed all five Proofs.

I entered the arena.

Fenrath was smaller than I expected.

Not in body.

In posture.

Five systems had left him, and for the first time I saw how much of the beast was burden rather than shape.

He asked whether I understood what killing him would do.

I said the Guild had promised he would return.

He asked how long they had promised.

I had no answer.

He lowered his head.

The Gate opened a finger-width behind him.

I realised he was offering me the first strike.

I put down my weapon.

Fenrath said:

“Then leave.”

I asked whether refusing was the correct answer.

He said:

“There is no correct answer inside a machine that requires this question.”

I left the arena.

The Guild stripped my rank, removed my name from the ascent roll, and declared the attempt invalid.

I have never regretted refusing to kill him.

I regret that my refusal changed nothing.

GUILD ORDER:

This testimony is to be destroyed.

Refusal of Guardian engagement must not be presented as a legitimate progression outcome.

The ascent requires decisiveness.

A handwritten annotation reads:

The ascent requires obedience.`,
    },
    {
      n: 'XVI', idx: 16, title: `WHAT ENTERS WHEN HE LEAVES`,
      act: 'VI',
      found: `Appears throughout Floor 1 after Fenrath dies and the first corruption stage begins.`,
      type: `Floor-wide Guardian echo.`,
      author: `Fenrath.`,
      region: `Crownward Expanse`,
      proof: null, phase: `Phase 2`,
      gate: null, sealed: false,
      body: `Do not call it rot.

Rot belongs here.

Rot feeds roots.

Rot returns shape to soil.

Do not call it disease.

Disease is alive.

It follows need, opportunity, and resistance.

Do not call it darkness.

Darkness asks nothing of what it covers.

What enters through me is disagreement sharpened into hunger.

It will tell the river that downward was always a superstition.

It will tell the wolf that a herd is one body and can therefore be eaten forever.

It will tell roots that stone is flesh.

It will tell the dead that memory is permission.

It will tell you the Floor is changing.

It is not.

Change belongs to time.

This is replacement.

If you intend to restore me, do not wait for the signs to become undeniable.

When everyone agrees corruption has arrived, it has already taught the Floor too much.

I have held it long enough to know its first and most convincing lie:

That what has been rewritten was always this way.`,
    },
    {
      n: 'XVII', idx: 17, title: `THE FIRST FANG`,
      act: 'VI',
      found: `Revealed after triggering Phase 3 for the first time.`,
      type: `Direct Guardian memory.`,
      author: `Fenrath.`,
      region: `Crownward Gate`,
      proof: null, phase: `Phase 3`,
      gate: `Triggering The First Fang`, sealed: true,
      body: `There have been challengers stronger than you.

There have been challengers kinder than you.

There have been challengers who understood every Proof and still killed without hesitation.

There have been challengers who wept so violently their hands could not hold their weapons.

There have been liars.

There have been saints.

There have been children wearing armour built for dead parents.

There have been old soldiers who believed the next Floor would contain forgiveness.

Strength has never answered what I need to know.

Understanding has never answered it either.

The thing beneath the Tower does not care what you intended.

It enters through consequence.

It rewards every compromise made under pressure.

It learns through every wound you call necessary.

You crossed the Article untouched.

You crossed the beast untouched.

Now I will remove the space in which mistakes can be survived.

No armour.

No healing.

No endurance purchased with flesh.

No belief that suffering grants the right to continue.

If you pass the First Fang, I will know only one thing:

When the Tower offers you victory in exchange for becoming its next wound, you may possess the precision to refuse.

That is not hope.

I no longer trust hope.

It is evidence.

Evidence will have to be enough.`,
    },
    {
      n: 'XVIII', idx: 18, title: `THE FLOOR THAT LEARNED HIS NAME`,
      act: 'VI',
      found: `Awarded after defeating The First Fang.`,
      type: `Composite memory assembled from all five regional systems.`,
      author: `Selka Marr, Vael Ardin, Mother Orra, Rovan Hale, Ilyen Vey, and Fenrath.`,
      region: `All regions`,
      proof: null, phase: `Phase 3`,
      gate: `Defeating The First Fang`, sealed: true,
      body: `SELKA:

The rivers knew him first.

Not because he commanded them.

Because he listened long enough to notice when they were afraid.

VAEL:

The wind hated him.

He was heavy, stubborn, and always building things where air wanted emptiness.

It carried his voice anyway.

ORRA:

The forest accepted him slowly.

Forests distrust people who speak of preservation.

Too often they mean preventing anything from changing.

He learned better.

ROVAN:

Animals did not love him.

That is a lie people tell about gentle men.

Animals trusted that his hunger had limits.

That was rarer.

ILYEN:

The roads remember everyone.

They simply do not remember us equally.

Some lives pass across a place.

Some lives alter where passage remains possible.

FENRATH:

I believed I was the path between five systems.

I was wrong.

They were the path that kept me human.

When they died, each connection remained.

Selka’s rivers.

Vael’s towers.

Orra’s fungal gardens.

Rovan’s descendants.

Ilyen’s hidden lies.

For centuries I thought the Floor had taken their voices from me.

I understand now.

The Floor kept them because I could not.

I have forgotten Selka’s face.

I remember how she swore when floodwater entered her boots.

I have forgotten the colour of Vael’s eyes.

I remember he was incapable of whispering.

I have forgotten the first bread Orra gave me.

I remember that she fed the dead before herself.

I have forgotten whether Rovan ever forgave me.

I remember that he remained beside the Gate until age made standing impossible.

I have not forgotten Ilyen.

I tried.

The Floor would not permit it.

To the one who has assembled this record:

You know my name now.

Do not mistake that for knowing me.

A person is not the total of what survived them.

I was vain.

I was impatient.

I made choices for people I loved because I feared their courage.

I saved five lives and made that act the foundation of ninety-nine prisons.

I protected the Floor.

I have killed those who crossed it.

I created the Proofs because I wanted challengers to understand.

I weakened myself because some part of me wanted them to win.

I have called that strategy.

I have called it duty.

On honest days, I call it exhaustion.

When you severed me, you did not free me.

When you restored me, you did not forgive me.

You returned the lock to the wound.

Perhaps that is all a Guardian can be.

But if you continue upward, remember this:

Every Floor will tell you its Guardian stands between you and progress.

Every Gate will make violence feel like forward motion.

Every victory will open something.

Look at what it opens.

Look down before you climb.

And when the Tower asks for another life to become a law, remember that the first law had a name.

Fenrath.

The record ends.

After several seconds, a final line appears in Ilyen’s handwriting:

The Floor learned his name because the world above it chose to forget.

======================================================================`,
    },
  ],

  progression: {
    rules: [
      `Eighteen collectible records, discoverable across all regions of Floor 1.`,
      `Found through multiple media, not only notes.`,
      `May be discovered out of order; the archive gradually reconstructs chronology.`,
      `The final three entries are encounter- or consequence-gated.`,
      `Entry XVII requires triggering The First Fang.`,
      `Entry XVIII requires defeating The First Fang.`,
    ],
  },
};
