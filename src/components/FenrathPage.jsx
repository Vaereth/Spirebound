import { useState, useMemo, useEffect } from 'react';
import { FENRATH_ENCOUNTER } from '../data/canon.js';
import { FENRATH_LORE } from '../data/fenrathLore.js';
import { buildFenrathMoves, MOVE_FILTERS, moveMatchesFilter } from '../lib/fenrathMoves.js';
import { Page, Stack, DataSplit, CardMatrix, StickyContents, MasterDetail, EditorialSplit } from './Layout.jsx';
import { GlassPanel, StonePanel, VellumPanel, PanelHeader, Divider } from './Surfaces.jsx';
import SectionRail, { useSectionSpy } from './SectionRail.jsx';
import { Tabs, QuickFacts, CompareTable, SpoilerGate, Segmented } from './UIKit.jsx';
import { StatBars } from './StatBlock.jsx';
import GradeBadge, { gradeColor } from './GradeBadge.jsx';
import ArtSlot from './ArtSlot.jsx';
import { getPref, setPref } from '../lib/userContext.js';
import LoreBook from './LoreBook.jsx';
import './FenrathPage.css';

const ATTR_ORDER = ['vitality', 'might', 'guard', 'arcana', 'ward', 'mobility'];
const SECTIONS = [
  { id: 'dossier', label: 'Public Dossier' },
  { id: 'proofs', label: 'Proof Configuration' },
  { id: 'phases', label: 'Encounter Phases' },
  { id: 'moves', label: 'Move Archive' },
  { id: 'systems', label: 'Combat Systems' },
  { id: 'difficulty', label: 'Difficulty' },
  { id: 'man', label: 'The Man Before' },
  { id: 'wayfarers', label: 'The Wayfarers' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'lore', label: 'Lore Collection' },
  { id: 'dialogue', label: 'Dialogue' },
  { id: 'recognition', label: 'Challenge Recognition' },
  { id: 'truth', label: 'Restricted Truth' },
];

function gradeForProofs(n) { return n <= 2 ? 'SS' : 'S'; }
function difficultyEstimate(n) {
  return [
    'Proofless — extreme, regional systems fully active',
    'One Proof — brutal challenge route',
    'Two Proofs — extreme challenge route',
    'Three Proofs — guild-recognised minimum; hard but learnable',
    'Four Proofs — highly prepared route, one system active',
    'Five Proofs — complete standard route',
  ][n];
}

// geometry mini-diagram (text-described for accessibility)
function GeometryDiagram({ shape, label }) {
  const common = { fill: 'none', stroke: 'var(--accent-guardian)', strokeWidth: 2 };
  return (
    <figure className="fen2__geo" role="img" aria-label={`Attack geometry: ${label}`}>
      <svg viewBox="0 0 120 80" width="100%" height="96">
        <rect x="0" y="0" width="120" height="80" fill="rgba(0,0,0,0.18)" />
        <circle cx="60" cy="68" r="4" fill="var(--accent-guardian)" />
        {shape === 'circle' && <circle cx="60" cy="40" r="26" {...common} opacity="0.8" />}
        {shape === 'arc' && <path d="M20 50 A 44 44 0 0 1 100 50" {...common} />}
        {shape === 'line' && <rect x="54" y="6" width="12" height="56" {...common} opacity="0.85" />}
        {shape === 'tether' && <><line x1="60" y1="64" x2="34" y2="20" {...common} /><circle cx="34" cy="20" r="6" {...common} /></>}
        {shape === 'field' && <rect x="14" y="14" width="92" height="50" rx="8" {...common} strokeDasharray="5 5" opacity="0.8" />}
        {shape === 'point' && <circle cx="60" cy="30" r="8" {...common} />}
      </svg>
      <figcaption className="fen2__geocap">{label}</figcaption>
    </figure>
  );
}

export default function FenrathPage({ navigate }) {
  const E = FENRATH_ENCOUNTER;
  const L = FENRATH_LORE;
  const { active, setRef, go } = useSectionSpy(SECTIONS.map((s) => s.id));

  // ---- proof selector ----
  const [invoked, setInvoked] = useState({});
  const toggleProof = (name) => setInvoked((p) => ({ ...p, [name]: !p[name] }));
  const invokedList = E.proofs.filter((p) => invoked[p.name]);
  const invokedCount = invokedList.length;
  const liveStats = useMemo(() => {
    const s = { ...pick(E.stats.proofless) };
    invokedList.forEach((p) => { for (const k in p.delta) s[k] -= p.delta[k]; });
    return s;
  }, [invokedCount]);
  const liveTotal = ATTR_ORDER.reduce((a, k) => a + liveStats[k], 0);
  const liveStability = E.stabilityByProof[invokedCount]?.s || '—';
  const activeChannels = E.channelsP1.filter((_, i) => !invoked[E.proofs[i].name]);
  const liveDialogue = invokedCount === 0 ? E.dialogue.find((d) => d.when === 'Zero Proofs')
    : invokedCount >= 5 ? E.dialogue.find((d) => d.when === 'Five Proofs')
    : invokedCount >= 3 ? E.dialogue.find((d) => d.when === 'Three or four Proofs')
    : E.dialogue.find((d) => d.when === 'One or two Proofs');

  // ---- phases ----
  const [phase, setPhase] = useState('p1');
  const [showFang, setShowFang] = useState(false);

  // ---- move archive (enriched + filtered) ----
  const allMoves = useMemo(() => buildFenrathMoves(), []);
  const [moveFilter, setMoveFilter] = useState(() => getPref('fenMoveFilter', 'Phase 1'));
  useEffect(() => setPref('fenMoveFilter', moveFilter), [moveFilter]);
  const filteredMoves = allMoves.filter((m) => moveMatchesFilter(m, moveFilter));
  const isP3Filter = moveFilter === 'Phase 3' || moveFilter === 'Execution';
  const [selMoveId, setSelMoveId] = useState(null);
  const selMove = filteredMoves.find((m) => m.id === selMoveId) || filteredMoves[0];

  // ---- difficulty ----
  const [diffMode, setDiffMode] = useState('compare');
  const [diffTier, setDiffTier] = useState(1);

  // ---- gated narrative ----
  const [showMan, setShowMan] = useState(false);
  const [showTruth, setShowTruth] = useState(false);
  const [loreAll, setLoreAll] = useState(false);

  // ---- lore collection ----
  const [loreAct, setLoreAct] = useState('I');
  const [selRecordIdx, setSelRecordIdx] = useState(1);

  // ---- dialogue category ----
  const dialogueGroups = useMemo(() => {
    const g = E.dialogue.map((d) => ({ when: d.when, lines: d.lines }));
    if (showFang) (E.dialogueP3 || []).forEach((d) => g.push({ when: d.when, lines: d.lines, fang: true }));
    return g;
  }, [showFang]);
  const [dialKey, setDialKey] = useState(0);

  return (
    <Page variant="wide" className="fen2">
      <div className="fen2__crumb">
        <button className="fen2__back" onClick={() => navigate('#/floors/1')}>← The Verdant Reach</button>
        <span className="fen2__crumbtxt">Floor 1 · Guardian Dossier</span>
      </div>

      {/* ===== GUARDIAN HERO ===== */}
      <StonePanel className="fen2__hero" accent="var(--accent-guardian)">
        <DataSplit
          left={<div className="fen2__heroart"><ArtSlot variant="render" label="Fenrath — Boss Art" path="images/bosses/fenrath.png" src="/images/bosses/fenrath.png" alt="Fenrath, First Guardian" /></div>}
          right={
            <div className="fen2__heroinfo">
              <span className="fen2__eyebrow">The First Article · Guardian Beast</span>
              <h1 className="fen2__name">Fenrath</h1>
              <p className="fen2__subtitle">{E.identity.title} of the Verdant Reach</p>
              <div className="fen2__gradeline">
                <GradeBadge grade={gradeForProofs(invokedCount)} size="md" />
                <span className="fen2__gradenote">Scales to <b style={{ color: gradeColor('SSS') }}>SSS</b> at the Proofless First Fang</span>
              </div>
              <QuickFacts cols={2} className="fen2__herofacts" facts={[
                { k: 'Guardian Article', v: E.identity.article },
                { k: 'Classification', v: E.identity.publicClass },
                { k: 'Proof state', v: `${invokedCount} / 5 invoked` },
                { k: 'Phases', v: '2 + 1 hidden' },
              ]} />
              <div className="fen2__channels" aria-label="Five Guardian channels">
                {E.functions.map((f) => <span key={f} className="fen2__channel">{f}</span>)}
              </div>
              <p className="fen2__heroline">“The way above is open. So is the wound below.”</p>
            </div>
          }
        />
      </StonePanel>

      <StickyContents className="fen2__layout" rail={<SectionRail sections={SECTIONS} active={active} onGo={go} accent="var(--accent-guardian)" title="Guardian Dossier" />}>
        <Stack gap="section">

          {/* ---------- PUBLIC DOSSIER ---------- */}
          <section id="dossier" ref={setRef('dossier')}>
            <SecHead n="01" title="Public Dossier" sub="What the Ascendant Guild teaches climbers. Restricted classification stays sealed below." />
            <CardMatrix min={280}>
              <GlassPanel accent="var(--accent-guardian)">
                <PanelHeader eyebrow="Classification" title="The First Article" accent="var(--accent-guardian)" />
                <p className="fen2__p fen2__p--dim">{E.attributeNote}</p>
                <Divider />
                <ul className="fen2__roles">{E.identity.role.map((r) => <li key={r}>{r}</li>)}</ul>
              </GlassPanel>
              <GlassPanel accent="var(--accent-guardian)">
                <PanelHeader eyebrow="Threat Grade by State" accent="var(--accent-guardian)" />
                <div className="fen2__grades">
                  {E.grades.map((g) => (
                    <div key={g.state} className="fen2__graderow">
                      <span className="fen2__gradechip" style={{ '--g': gradeColor(g.grade) }}>{g.grade}</span>
                      <span>{g.state}</span>
                    </div>
                  ))}
                </div>
              </GlassPanel>
              <GlassPanel accent="var(--accent-guardian)">
                <PanelHeader eyebrow="Canonical Attributes" title="Two Profiles" accent="var(--accent-guardian)" />
                <CompareTable accent="var(--accent-guardian)" firstHeader="Attribute" cols={['Proofless', 'Five-Proof']}
                  rows={ATTR_ORDER.map((k) => ({ k: k[0].toUpperCase() + k.slice(1), v: [E.stats.proofless[k], E.stats.fiveProof[k]] })).concat([{ k: 'Total', v: [E.stats.proofless.total ?? 473, E.stats.fiveProof.total ?? 360] }])} />
              </GlassPanel>
            </CardMatrix>
          </section>

          {/* ---------- PROOF CONFIGURATION ---------- */}
          <section id="proofs" ref={setRef('proofs')}>
            <SecHead n="02" title="Proof Configuration" sub="Invoke completed Proofs before entry to reshape the fight. Toggle them to see the live profile." />
            <DataSplit
              left={
                <div className="fen2__proofcontrols">
                  <Segmented accent="var(--accent-guardian)" items={E.proofs.map((p) => ({ id: p.name, label: p.fn, on: !!invoked[p.name] }))} onToggle={toggleProof} />
                  <div className="fen2__proofcards">
                    {E.proofs.map((p) => (
                      <button key={p.name} className={`fen2__proofcard ${invoked[p.name] ? 'is-on' : ''}`} onClick={() => toggleProof(p.name)}>
                        <div className="fen2__proofcard-top">
                          <span className="fen2__proofcard-name">{p.name}</span>
                          <span className="fen2__proofcard-fn">{p.fn}</span>
                        </div>
                        <span className="fen2__proofcard-region">{p.region} · {p.trial}</span>
                        <p className="fen2__lesson">“{p.lesson}”</p>
                        <p className="fen2__p"><b>Suppresses —</b> {p.suppresses.join(', ')}.</p>
                        <p className="fen2__p fen2__p--dim">{p.reductions}</p>
                        <span className={`fen2__proofcard-state ${invoked[p.name] ? 'is-on' : ''}`}>{invoked[p.name] ? '◆ Invoked — function suppressed' : '◇ Active — function live'}</span>
                      </button>
                    ))}
                  </div>
                </div>
              }
              right={
                <GlassPanel accent="var(--accent-guardian)" className="fen2__live" style={{ position: 'sticky', top: 'var(--rail-top)' }}>
                  <PanelHeader eyebrow="Live Encounter Profile" title={`${invokedCount} / 5 Proofs Invoked`} accent="var(--accent-guardian)" right={<GradeBadge grade={gradeForProofs(invokedCount)} size="sm" />} />
                  <StatBars stats={liveStats} total={liveTotal} maxScale={110} />
                  <div className="fen2__livefacts">
                    <QuickFacts cols={2} facts={[
                      { k: 'Total', v: liveTotal },
                      { k: 'Guardian Stability', v: liveStability },
                      { k: 'Active channels', v: `${activeChannels.length} / 5` },
                      { k: 'Threat Grade', v: gradeForProofs(invokedCount) },
                    ]} />
                  </div>
                  <Divider />
                  <p className="fen2__p fen2__p--dim" style={{ marginBottom: '0.4rem' }}>{difficultyEstimate(invokedCount)}</p>
                  {activeChannels.length > 0 && <p className="fen2__p"><b>Active —</b> {activeChannels.map((c) => c.name.split(' — ')[0]).join(' · ')}.</p>}
                  {liveDialogue && <div className="fen2__livevoice">{liveDialogue.lines.map((l) => <p key={l} className="fen2__voice">{l}</p>)}</div>}
                </GlassPanel>
              }
            />
            <h3 className="fen2__subh">Proof-Count Challenge Bands</h3>
            <CompareTable accent="var(--accent-guardian)" firstHeader="Proofs" cols={['Total', 'Route']} rows={E.proofBands.map((b) => ({ k: b.n, v: [b.total, b.d] }))} />
          </section>

          {/* ---------- PHASES ---------- */}
          <section id="phases" ref={setRef('phases')}>
            <SecHead n="03" title="Encounter Phases" />
            <div className="fen2__healthbar">
              <span className="fen2__hb fen2__hb--p1" style={{ flex: 35 }}>Phase 1 · 0.35H</span>
              <span className="fen2__hb fen2__hb--p2" style={{ flex: 65 }}>Phase 2 · 0.65H</span>
              <span className="fen2__hb fen2__hb--p3" style={{ flex: 22 }}>P3 · +0.22H</span>
            </div>
            <Tabs accent="var(--accent-guardian)" value={phase} onChange={setPhase} tabs={[{ id: 'p1', label: 'Phase 1' }, { id: 'p2', label: 'Phase 2' }, { id: 'p3', label: 'Sealed Phase 3' }]} />
            {phase !== 'p3' && (() => {
              const p = E.phases.find((x) => x.id === phase);
              return (
                <StonePanel accent="var(--accent-guardian)" className="fen2__phasepanel">
                  <div className="fen2__phasehead"><h3 className="fen2__phasename">{p.name}</h3><span className="fen2__phasehp">{p.health}</span></div>
                  <p className="fen2__p">{p.identity}</p>
                  {p.globals && <p className="fen2__p"><b>Systems —</b> {p.globals.join(' · ')}.</p>}
                  {p.transition && <p className="fen2__p"><b>Transition —</b> {p.transition}</p>}
                  <div className="fen2__lines">{p.lines.map((l) => <p key={l} className="fen2__voice">{l}</p>)}</div>
                </StonePanel>
              );
            })()}
            {phase === 'p3' && (
              <SpoilerGate accent="var(--accent-blood)" open={showFang} onReveal={() => setShowFang(true)} onHide={() => setShowFang(false)}
                title="A Third Phase Is Whispered Of" warning="A hidden phase most climbers will never see. Reveal only if you do not mind being spoiled.">
                <StonePanel accent="var(--accent-blood)" className="fen2__phasepanel fen2__phasepanel--fang">
                  <div className="fen2__phasehead"><h3 className="fen2__phasename fen2__phasename--fang">{E.phase3.name}</h3><span className="fen2__phasehp">{E.phase3.health}</span></div>
                  <p className="fen2__p"><b>Trigger —</b> {E.phase3.trigger}</p>
                  <div className="fen2__lines">{E.phase3.lines.map((l) => <p key={l} className="fen2__voice fen2__voice--fang">{l}</p>)}</div>
                  <p className="fen2__p fen2__p--fang"><b>{E.phase3.coreRule}</b></p>
                  <CardMatrix min={240}>
                    <div><p className="fen2__minihead">Invalidating contact</p><ul className="fen2__list">{E.phase3.invalidating.map((x) => <li key={x}>{x}</li>)}</ul></div>
                    <div><p className="fen2__minihead">On non-perfect contact</p><ul className="fen2__list">{E.phase3.onContact.map((x) => <li key={x}>{x}</li>)}</ul></div>
                  </CardMatrix>
                  <p className="fen2__p"><b>Bypasses —</b> {E.phase3.bypasses.join(' · ')}.</p>
                  <h4 className="fen2__minihead" style={{ marginTop: '1rem' }}>Perfect-Response Windows</h4>
                  <CompareTable accent="var(--accent-blood)" firstHeader="Difficulty" cols={['Dodge', 'Parry']} rows={E.phase3.windows.map((w) => ({ k: w.d, v: [w.dodge, w.parry] }))} />
                  <p className="fen2__p fen2__p--dim">{E.phase3.windowNote} &nbsp;·&nbsp; <b>Checkpoint —</b> {E.phase3.checkpoint}</p>
                  <p className="fen2__voice fen2__voice--fang">“{E.phase3.thematic}”</p>
                </StonePanel>
              </SpoilerGate>
            )}
          </section>

          {/* ---------- MOVE ARCHIVE (master-detail + filters + geometry) ---------- */}
          <section id="moves" ref={setRef('moves')}>
            <SecHead n="04" title="Move Archive" sub="Filter the 30 catalogued moves; select any move for its full combat record. Base Powers use Adventurer as baseline." />
            <div className="fen2__movefilters" role="tablist" aria-label="Move filters">
              {MOVE_FILTERS.map((f) => (
                <button key={f} role="tab" aria-selected={moveFilter === f} className={`fen2__chip ${moveFilter === f ? 'is-on' : ''}`}
                  onClick={() => { setMoveFilter(f); setSelMoveId(null); }}>{f}</button>
              ))}
            </div>
            {isP3Filter && !showFang ? (
              <SpoilerGate accent="var(--accent-blood)" open={false} onReveal={() => setShowFang(true)} warning="Phase 3 / Execution moves are spoiler content." />
            ) : (
              <MasterDetail className="fen2__moves"
                master={
                  <div className="fen2__movelist" role="listbox" aria-label="Moves">
                    {filteredMoves.map((m) => (
                      <button key={m.id} role="option" aria-selected={selMove?.id === m.id}
                        className={`fen2__moverow ${selMove?.id === m.id ? 'is-on' : ''}`} onClick={() => setSelMoveId(m.id)}>
                        <span className={`fen2__moveshape fen2__moveshape--${m.geometry.shape}`} aria-hidden="true" />
                        <span className="fen2__movemeta">
                          <span className="fen2__movename">{m.name}</span>
                          <span className="fen2__movetype">{m.phase} · {m.damageType} · {m.basePower.match(/\d+/)?.[0] || '—'} BP</span>
                        </span>
                        <span className="fen2__movetel">{m.telegraphTime}</span>
                      </button>
                    ))}
                    {filteredMoves.length === 0 && <p className="fen2__p fen2__p--dim" style={{ padding: 'var(--sp-2)' }}>No moves match this filter.</p>}
                  </div>
                }
                detail={selMove && (
                  <GlassPanel accent={selMove.phase === 'Phase 3' ? 'var(--accent-blood)' : 'var(--accent-guardian)'} className="fen2__movedetail">
                    <PanelHeader eyebrow={`${selMove.category} · ${selMove.phase}`} title={selMove.name}
                      accent={selMove.phase === 'Phase 3' ? 'var(--accent-blood)' : 'var(--accent-guardian)'}
                      right={<span className="fen2__dmgtag">{selMove.damageType}</span>} />
                    <DataSplit
                      left={<GeometryDiagram shape={selMove.geometry.shape} label={selMove.geometry.label} />}
                      right={
                        <QuickFacts cols={2} facts={[
                          { k: 'Base Power', v: selMove.basePower },
                          { k: 'Telegraph', v: selMove.telegraphTime },
                          { k: 'Active window', v: selMove.activeWindow },
                          { k: 'Recovery', v: selMove.recovery },
                          { k: 'Cooldown', v: selMove.cooldown },
                          { k: 'Stagger', v: selMove.stagger },
                        ]} />
                      }
                    />
                    <Divider />
                    <div className="fen2__movefields">
                      <Field k="Body telegraph" v={selMove.bodyTelegraph} />
                      <Field k="World telegraph" v={selMove.worldTelegraph} />
                      <Field k="Assisted indicator" v={selMove.assistedIndicator} />
                      <Field k="Tracking-lock" v={selMove.trackingLock} />
                      <Field k="Status" v={selMove.status} />
                      <Field k="Counterplay" v={selMove.counterplay} />
                      <Field k="Perfect parry" v={selMove.perfectParry} />
                      <Field k="Difficulty" v={selMove.difficultyAvailability} />
                      <Field k="Proof / channel" v={selMove.proofInteraction} />
                    </div>
                  </GlassPanel>
                )}
              />
            )}
            <p className="fen2__p fen2__p--dim" style={{ marginTop: 'var(--sp-2)' }}><b>Adapted from Phase 1:</b> {E.adaptedP2.join(' · ')}.</p>
          </section>

          {/* ---------- COMBAT SYSTEMS ---------- */}
          <section id="systems" ref={setRef('systems')}>
            <SecHead n="05" title="Combat Systems" />
            <CardMatrix min={300}>
              <SysCard title="Guardian Stability" body={E.globals.stability} />
              <SysCard title="Stagger" body={E.globals.stagger} />
              <SysCard title="Pursuit (Phase 2)" body={E.globals.pursuit} />
              <SysCard title="Channel Disruption" body={E.globals.channelDisrupt} />
              <SysCard title="Phase Transitions" body={E.globals.transitions} />
              <SysCard title="Combo Legality" body={E.globals.legality} />
            </CardMatrix>
            <p className="fen2__p fen2__p--dim" style={{ marginTop: 'var(--sp-2)' }}>{E.telegraphRules}</p>
          </section>

          {/* ---------- DIFFICULTY ---------- */}
          <section id="difficulty" ref={setRef('difficulty')}>
            <SecHead n="06" title="Difficulty Integration" sub="His attributes never change — these derived values do." />
            <div className="fen2__diffmode">
              <Tabs accent="var(--accent-guardian)" value={diffMode} onChange={setDiffMode} tabs={[{ id: 'compare', label: 'Compare All' }, { id: 'single', label: 'Single Tier' }]} />
              {diffMode === 'single' && <Segmented accent="var(--accent-guardian)" items={E.difficultyTable.cols.map((c, i) => ({ id: String(i), label: c, on: diffTier === i }))} onToggle={(id) => setDiffTier(Number(id))} />}
            </div>
            {diffMode === 'compare' ? (
              <CompareTable accent="var(--accent-guardian)" firstHeader="System" cols={E.difficultyTable.cols} rows={E.difficultyTable.rows.map((r) => ({ k: r.k, v: r.v }))} />
            ) : (
              <CardMatrix min={200} className="fen2__difftier">
                {E.difficultyTable.rows.map((r) => (
                  <GlassPanel key={r.k} accent="var(--accent-guardian)" className="fen2__difftile">
                    <span className="fen2__difftile-k">{r.k}</span><span className="fen2__difftile-v">{r.v[diffTier]}</span>
                  </GlassPanel>
                ))}
              </CardMatrix>
            )}
            <CardMatrix min={280} style={{ marginTop: 'var(--sp-3)' }}>
              <GlassPanel accent="var(--accent-guardian)">
                <PanelHeader eyebrow="Stability by Proof Count" title="Adventurer" accent="var(--accent-guardian)" />
                <QuickFacts cols={3} facts={E.stabilityByProof.map((x) => ({ k: x.p, v: x.s }))} />
              </GlassPanel>
              <GlassPanel accent="var(--accent-guardian)">
                <PanelHeader eyebrow="Stagger Thresholds" title="P1 / P2 / P3" accent="var(--accent-guardian)" />
                <QuickFacts cols={1} facts={E.staggerThresholds.rows.map((x) => ({ k: x.d, v: x.v }))} />
              </GlassPanel>
            </CardMatrix>
          </section>

          {/* ---------- THE MAN BEFORE THE GUARDIAN ---------- */}
          <section id="man" ref={setRef('man')}>
            <SecHead n="07" title="The Man Before the Guardian" sub="Reconstructed from Ilyen Vey's concealed archive. Spoils Fenrath's origin." />
            <SpoilerGate accent="var(--accent-authority)" open={showMan} onReveal={() => setShowMan(true)} onHide={() => setShowMan(false)}
              title="A History the Guild Removed" warning="The public record calls him a beast born with the Floor. This is what was taken out.">
              <VellumPanel className="fen2__vellum">
                <PanelHeader eyebrow={L.summary.role} title="Warden of Ways" />
                <p className="fen2__lore fen2__lore--lead">{L.summary.intro}</p>
                <blockquote className="fen2__belief">“{L.summary.belief}”</blockquote>
                {L.summary.beats.map((b, i) => <p key={i} className="fen2__lore">{b}</p>)}
              </VellumPanel>
            </SpoilerGate>
          </section>

          {/* ---------- THE WAYFARERS ---------- */}
          <section id="wayfarers" ref={setRef('wayfarers')}>
            <SecHead n="08" title="The Wayfarers of the First Accord" sub="Fenrath and the five specialists who became the living foundation of the five Guardian functions." />
            <CardMatrix min={260}>
              {L.characters.map((c) => (
                <VellumPanel key={c.id} className="fen2__wayfarer">
                  <div className="fen2__wfhead">
                    <div className="fen2__wfsigil" aria-hidden="true">{c.function.split(' ').pop()[0]}</div>
                    <div><h3 className="fen2__wfname">{c.name}</h3><span className="fen2__wffn">{c.function} · {c.role}</span></div>
                  </div>
                  <p className="fen2__lore">{c.belief}</p>
                  <div className="fen2__wfmeta">
                    <span><b>Fate —</b> {c.fate}</span>
                    {c.proof !== '—' && <span><b>Proof —</b> {c.proof}</span>}
                  </div>
                </VellumPanel>
              ))}
            </CardMatrix>
          </section>

          {/* ---------- TIMELINE ---------- */}
          <section id="timeline" ref={setRef('timeline')}>
            <SecHead n="09" title="Historical Timeline" sub="From the First Accord to the unresolved future. Each event ties to records in the collection." />
            <ol className="fen2__timeline">
              {L.timeline.map((t) => (
                <li key={t.n} className="fen2__tlitem">
                  <span className="fen2__tldot" aria-hidden="true" />
                  <div className="fen2__tlbody">
                    <span className="fen2__tln">{String(t.n).padStart(2, '0')}</span>
                    <h3 className="fen2__tltitle">{t.title}</h3>
                    <p className="fen2__lore">{t.desc}</p>
                    {t.records.length > 0 && (
                      <div className="fen2__tlrecs">
                        {t.records.map((ri) => {
                          const r = L.records.find((x) => x.idx === ri);
                          if (!r) return null;
                          return <button key={ri} className="fen2__tlrec" onClick={() => { go('lore'); setLoreAct(r.act); setSelRecordIdx(ri); }}>{r.n}. {r.title}</button>;
                        })}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ---------- LORE COLLECTION (master-detail) ---------- */}
          <section id="lore" ref={setRef('lore')}>
            <header className="fen2__sechead fen2__sechead--compact">
              <span className="fen2__secn">10</span>
              <h2 className="fen2__h">The Lore Collection</h2>
            </header>
            <LoreBook
              records={L.records}
              acts={L.acts}
              act={loreAct}
              setAct={(id) => { setLoreAct(id); const first = L.records.find((r) => r.act === id); if (first) setSelRecordIdx(first.idx); }}
              selIdx={selRecordIdx}
              setSelIdx={setSelRecordIdx}
              loreAll={loreAll}
              setLoreAll={setLoreAll}
            />
          </section>

          {/* ---------- DIALOGUE ---------- */}
          <section id="dialogue" ref={setRef('dialogue')}>
            <SecHead n="11" title="The First Guardian Speaks" sub="Dialogue grouped by encounter state." />
            <DataSplit
              left={
                <div className="fen2__dialcats" role="tablist">
                  {dialogueGroups.map((d, i) => (
                    <button key={d.when} role="tab" aria-selected={dialKey === i} className={`fen2__dialcat ${dialKey === i ? 'is-on' : ''} ${d.fang ? 'is-fang' : ''}`} onClick={() => setDialKey(i)}>{d.when}</button>
                  ))}
                  {!showFang && <button className="fen2__dialcat is-locked" onClick={() => setShowFang(true)}>⛓ Phase 3 lines…</button>}
                </div>
              }
              right={
                <VellumPanel className="fen2__vellum">
                  <PanelHeader eyebrow="State" title={dialogueGroups[dialKey]?.when || '—'} />
                  <div className="fen2__lines">{(dialogueGroups[dialKey]?.lines || []).map((l) => <p key={l} className={`fen2__voice ${dialogueGroups[dialKey]?.fang ? 'fen2__voice--fang' : ''}`}>{l}</p>)}</div>
                </VellumPanel>
              }
            />
          </section>

          {/* ---------- CHALLENGE RECOGNITION ---------- */}
          <section id="recognition" ref={setRef('recognition')}>
            <SecHead n="12" title="Challenge Recognition" sub="What the encounter records. Reward names remain TBD." />
            <CardMatrix min={240}>
              {E.achievements.map((a) => (
                <GlassPanel key={a} accent="var(--accent-authority)" className="fen2__achcard">
                  <span className="fen2__achmark" aria-hidden="true">✦</span>
                  <p className="fen2__p">{a}</p>
                </GlassPanel>
              ))}
            </CardMatrix>
          </section>

          {/* ---------- RESTRICTED TRUTH ---------- */}
          <section id="truth" ref={setRef('truth')}>
            <SecHead n="13" title="Restricted Truth" sub="Sealed Guild records. Endgame spoilers." />
            <SpoilerGate accent="var(--accent-blood)" open={showTruth} onReveal={() => setShowTruth(true)} onHide={() => setShowTruth(false)}
              title="Beyond Public Knowledge" warning="These truths reframe Floor 1 and the Tower itself. Reveal only if you accept major spoilers.">
              <StonePanel accent="var(--accent-blood)" className="fen2__truth">
                <PanelHeader eyebrow="Restricted" title="What the Guild Will Not Teach" accent="var(--accent-blood)" />
                <ul className="fen2__truthlist">
                  <li>Fenrath is a living Article of the Hundredfold Seal — not a beast born with the Floor.</li>
                  <li>A Guardian's death weakens the Hundredfold Seal.</li>
                  <li>Corruption actively enters Floor 1 through a Severed Article.</li>
                  <li>Fenrath was the prototype from which later Guardians were refined.</li>
                  <li>The true corrupt god is imprisoned beneath Floor 1.</li>
                  <li>The Floor 100 Guardian is <b>not</b> that god — its final identity remains unresolved and is not invented here.</li>
                </ul>
              </StonePanel>
            </SpoilerGate>
          </section>

          <div className="fen2__foot">
            <button className="fen2__back" onClick={() => navigate('#/floors/1')}>← Return to the Reach</button>
          </div>
        </Stack>
      </StickyContents>
    </Page>
  );
}

/* ---- helpers ---- */
function SecHead({ n, title, sub }) {
  return (
    <header className="fen2__sechead">
      <span className="fen2__secn">{n}</span>
      <div><h2 className="fen2__h">{title}</h2>{sub && <p className="fen2__p fen2__p--dim">{sub}</p>}</div>
    </header>
  );
}
function SysCard({ title, body }) {
  return (
    <GlassPanel accent="var(--accent-guardian)">
      <PanelHeader eyebrow="System" title={title} accent="var(--accent-guardian)" />
      <p className="fen2__p">{body}</p>
    </GlassPanel>
  );
}
function Field({ k, v }) {
  return <div className="fen2__field"><span className="fen2__fieldk">{k}</span><span className="fen2__fieldv">{v}</span></div>;
}
function pick(s) {
  return { vitality: s.vitality, might: s.might, guard: s.guard, arcana: s.arcana, ward: s.ward, mobility: s.mobility };
}
