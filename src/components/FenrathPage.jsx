import { useState, useMemo } from 'react';
import { FENRATH_ENCOUNTER } from '../data/canon.js';
import { Page, Stack, DataSplit, CardMatrix, StickyContents, MasterDetail, EditorialSplit } from './Layout.jsx';
import { GlassPanel, StonePanel, VellumPanel, PanelHeader, Divider } from './Surfaces.jsx';
import SectionRail, { useSectionSpy } from './SectionRail.jsx';
import { Tabs, QuickFacts, CompareTable, SpoilerGate, Segmented } from './UIKit.jsx';
import { StatBars } from './StatBlock.jsx';
import GradeBadge, { gradeColor } from './GradeBadge.jsx';
import ArtSlot from './ArtSlot.jsx';
import './FenrathPage.css';

const ATTR_ORDER = ['vitality', 'might', 'guard', 'arcana', 'ward', 'mobility'];
const SECTIONS = [
  { id: 'dossier', label: 'Dossier' },
  { id: 'proofs', label: 'Proof Selector' },
  { id: 'phases', label: 'Phases' },
  { id: 'moves', label: 'Move Lists' },
  { id: 'systems', label: 'Combat Systems' },
  { id: 'difficulty', label: 'Difficulty' },
  { id: 'voice', label: 'Voice & Records' },
];

// live grade by invoked proof count (canon)
function gradeForProofs(n) {
  if (n === 0) return 'SS';        // proofless
  if (n <= 2) return 'SS';
  return 'S';
}
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

export default function FenrathPage({ navigate }) {
  const E = FENRATH_ENCOUNTER;
  const { active, setRef, go } = useSectionSpy(SECTIONS.map((s) => s.id));

  // ---- interactive proof selector ----
  const [invoked, setInvoked] = useState({}); // {proofName: true}
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

  // ---- phase selector ----
  const [phase, setPhase] = useState('p1');
  const [showFang, setShowFang] = useState(false);

  // ---- move master-detail ----
  const [moveTab, setMoveTab] = useState('p1');
  const moveSets = { p1: E.movesP1, ch: E.channelsP1, p2: E.movesP2, p3: E.movesP3 };
  const currentMoves = moveSets[moveTab];
  const [selMove, setSelMove] = useState(0);
  const move = currentMoves[Math.min(selMove, currentMoves.length - 1)];

  // ---- difficulty ----
  const [diffMode, setDiffMode] = useState('compare'); // single | compare
  const [diffTier, setDiffTier] = useState(1); // index into cols

  return (
    <Page variant="wide" className="fen2">
      {/* breadcrumb */}
      <div className="fen2__crumb">
        <button className="fen2__back" onClick={() => navigate('#/floors/1')}>← The Verdant Reach</button>
        <span className="fen2__crumbtxt">Floor 1 · Guardian Dossier</span>
      </div>

      {/* ===== GUARDIAN HERO (Guardian Stone) ===== */}
      <StonePanel className="fen2__hero" accent="var(--accent-guardian)">
        <DataSplit
          left={
            <div className="fen2__heroart">
              <ArtSlot variant="render" label="Fenrath — Boss Art" path="images/bosses/fenrath.png" src="/images/bosses/fenrath.png" alt="Fenrath, First Guardian" />
            </div>
          }
          right={
            <div className="fen2__heroinfo">
              <span className="fen2__eyebrow">The First Article · Guardian Beast</span>
              <h1 className="fen2__name">Fenrath</h1>
              <p className="fen2__subtitle">{E.identity.title} of the Verdant Reach</p>
              <div className="fen2__gradeline">
                <GradeBadge grade="S" size="md" />
                <span className="fen2__gradenote">Scales to <b style={{ color: gradeColor('SSS') }}>SSS</b> at the Proofless First Fang</span>
              </div>
              <QuickFacts cols={2} className="fen2__herofacts" facts={[
                { k: 'Guardian Article', v: E.identity.article },
                { k: 'Classification', v: E.identity.publicClass },
                { k: 'Regulates', v: '5 living functions' },
                { k: 'Phases', v: '2 + 1 hidden' },
              ]} />
              <div className="fen2__channels" aria-label="Five Guardian channels">
                {E.functions.map((f) => <span key={f} className="fen2__channel">{f}</span>)}
              </div>
            </div>
          }
        />
      </StonePanel>

      {/* ===== STICKY CONTENTS: rail + body ===== */}
      <StickyContents
        className="fen2__layout"
        rail={<SectionRail sections={SECTIONS} active={active} onGo={go} accent="var(--accent-guardian)" title="Guardian Dossier" />}
      >
        <Stack gap="section">

          {/* ---------- DOSSIER ---------- */}
          <section id="dossier" ref={setRef('dossier')}>
            <SecHead n="01" title="Guardian Dossier" />
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
            </CardMatrix>
          </section>

          {/* ---------- INTERACTIVE PROOF SELECTOR ---------- */}
          <section id="proofs" ref={setRef('proofs')}>
            <SecHead n="02" title="The Five Guardian Proofs" sub="Invoke completed Proofs before entry to reshape the fight. Toggle them to see the live profile." />
            <DataSplit
              left={
                <div className="fen2__proofcontrols">
                  <Segmented
                    accent="var(--accent-guardian)"
                    items={E.proofs.map((p) => ({ id: p.name, label: p.fn, on: !!invoked[p.name] }))}
                    onToggle={toggleProof}
                  />
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
                  <PanelHeader eyebrow="Live Encounter Profile" title={`${invokedCount} / 5 Proofs Invoked`} accent="var(--accent-guardian)"
                    right={<GradeBadge grade={gradeForProofs(invokedCount)} size="sm" />} />
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
                  {activeChannels.length > 0 && (
                    <p className="fen2__p"><b>Active —</b> {activeChannels.map((c) => c.name.split(' — ')[0]).join(' · ')}.</p>
                  )}
                  {liveDialogue && (
                    <div className="fen2__livevoice">
                      {liveDialogue.lines.map((l) => <p key={l} className="fen2__voice">{l}</p>)}
                    </div>
                  )}
                </GlassPanel>
              }
            />

            <h3 className="fen2__subh">Proof-Count Challenge Bands</h3>
            <CompareTable
              accent="var(--accent-guardian)"
              firstHeader="Proofs"
              cols={['Total', 'Route']}
              rows={E.proofBands.map((b) => ({ k: b.n, v: [b.total, b.d] }))}
            />
          </section>

          {/* ---------- PHASES ---------- */}
          <section id="phases" ref={setRef('phases')}>
            <SecHead n="03" title="Encounter Phases" />
            <div className="fen2__healthbar">
              <span className="fen2__hb fen2__hb--p1" style={{ flex: 35 }}>Phase 1 · 0.35H</span>
              <span className="fen2__hb fen2__hb--p2" style={{ flex: 65 }}>Phase 2 · 0.65H</span>
              <span className="fen2__hb fen2__hb--p3" style={{ flex: 22 }}>P3 · +0.22H</span>
            </div>
            <Tabs accent="var(--accent-guardian)" value={phase} onChange={setPhase}
              tabs={[{ id: 'p1', label: 'Phase 1' }, { id: 'p2', label: 'Phase 2' }, { id: 'p3', label: 'Hidden Phase 3' }]} />

            {phase !== 'p3' && (() => {
              const p = E.phases.find((x) => x.id === phase);
              return (
                <StonePanel accent="var(--accent-guardian)" className="fen2__phasepanel">
                  <div className="fen2__phasehead">
                    <h3 className="fen2__phasename">{p.name}</h3>
                    <span className="fen2__phasehp">{p.health}</span>
                  </div>
                  <p className="fen2__p">{p.identity}</p>
                  {p.globals && <p className="fen2__p"><b>Systems —</b> {p.globals.join(' · ')}.</p>}
                  {p.transition && <p className="fen2__p"><b>Transition —</b> {p.transition}</p>}
                  <div className="fen2__lines">{p.lines.map((l) => <p key={l} className="fen2__voice">{l}</p>)}</div>
                </StonePanel>
              );
            })()}

            {phase === 'p3' && (
              <SpoilerGate accent="var(--accent-blood)" open={showFang} onReveal={() => setShowFang(true)} onHide={() => setShowFang(false)}
                title="A Third Phase Is Whispered Of"
                warning="A hidden phase most climbers will never see. Reveal only if you do not mind being spoiled.">
                <StonePanel accent="var(--accent-blood)" className="fen2__phasepanel fen2__phasepanel--fang">
                  <div className="fen2__phasehead">
                    <h3 className="fen2__phasename fen2__phasename--fang">{E.phase3.name}</h3>
                    <span className="fen2__phasehp">{E.phase3.health}</span>
                  </div>
                  <p className="fen2__p"><b>Trigger —</b> {E.phase3.trigger}</p>
                  <div className="fen2__lines">{E.phase3.lines.map((l) => <p key={l} className="fen2__voice fen2__voice--fang">{l}</p>)}</div>
                  <p className="fen2__p fen2__p--fang"><b>{E.phase3.coreRule}</b></p>
                  <CardMatrix min={240}>
                    <div><p className="fen2__minihead">Invalidating contact</p><ul className="fen2__list">{E.phase3.invalidating.map((x) => <li key={x}>{x}</li>)}</ul></div>
                    <div><p className="fen2__minihead">On non-perfect contact</p><ul className="fen2__list">{E.phase3.onContact.map((x) => <li key={x}>{x}</li>)}</ul></div>
                  </CardMatrix>
                  <p className="fen2__p"><b>Bypasses —</b> {E.phase3.bypasses.join(' · ')}.</p>
                  <h4 className="fen2__minihead" style={{ marginTop: '1rem' }}>Perfect-Response Windows</h4>
                  <CompareTable accent="var(--accent-blood)" firstHeader="Difficulty" cols={['Dodge', 'Parry']}
                    rows={E.phase3.windows.map((w) => ({ k: w.d, v: [w.dodge, w.parry] }))} />
                  <p className="fen2__p fen2__p--dim">{E.phase3.windowNote} &nbsp;·&nbsp; <b>Checkpoint —</b> {E.phase3.checkpoint}</p>
                  <p className="fen2__voice fen2__voice--fang">“{E.phase3.thematic}”</p>
                </StonePanel>
              </SpoilerGate>
            )}
          </section>

          {/* ---------- MOVE LISTS (master-detail) ---------- */}
          <section id="moves" ref={setRef('moves')}>
            <SecHead n="04" title="Move Lists" sub="Base Powers use Adventurer as the baseline; difficulty scales them dynamically." />
            <Tabs accent="var(--accent-guardian)" value={moveTab}
              onChange={(t) => { setMoveTab(t); setSelMove(0); }}
              tabs={[
                { id: 'p1', label: 'Phase 1', badge: E.movesP1.length },
                { id: 'ch', label: 'Channels', badge: E.channelsP1.length },
                { id: 'p2', label: 'Phase 2', badge: E.movesP2.length },
                { id: 'p3', label: 'Phase 3', badge: E.movesP3.length },
              ]} />

            {moveTab === 'p3' && !showFang ? (
              <SpoilerGate accent="var(--accent-blood)" open={false} onReveal={() => setShowFang(true)}
                warning="Phase 3 moves are spoiler content." />
            ) : (
              <MasterDetail
                className="fen2__moves"
                master={
                  <div className="fen2__movelist" role="listbox" aria-label="Moves">
                    {currentMoves.map((m, i) => (
                      <button key={m.name} role="option" aria-selected={selMove === i}
                        className={`fen2__moverow ${selMove === i ? 'is-on' : ''}`} onClick={() => setSelMove(i)}>
                        <span className="fen2__movename">{m.name}</span>
                        <span className="fen2__movetype">{m.type || 'Channel'}</span>
                      </button>
                    ))}
                  </div>
                }
                detail={
                  <GlassPanel accent={moveTab === 'p3' ? 'var(--accent-blood)' : 'var(--accent-guardian)'} className="fen2__movedetail">
                    <PanelHeader eyebrow={move.type || 'Guardian Channel'} title={move.name}
                      accent={moveTab === 'p3' ? 'var(--accent-blood)' : 'var(--accent-guardian)'} />
                    <QuickFacts cols={4} facts={[
                      { k: 'Telegraph', v: move.tel || '—' },
                      { k: 'Power', v: move.power },
                      { k: 'Recovery', v: move.rec || '—' },
                      { k: 'Cooldown', v: move.cd },
                    ]} />
                    <p className="fen2__p" style={{ marginTop: 'var(--sp-2)' }}><b>Effects —</b> {move.fx}</p>
                  </GlassPanel>
                }
              />
            )}
            {moveTab === 'p2' && (
              <p className="fen2__p fen2__p--dim" style={{ marginTop: 'var(--sp-2)' }}><b>Adapted from Phase 1:</b> {E.adaptedP2.join(' · ')}.</p>
            )}
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
              <Tabs accent="var(--accent-guardian)" value={diffMode} onChange={setDiffMode}
                tabs={[{ id: 'compare', label: 'Compare All' }, { id: 'single', label: 'Single Tier' }]} />
              {diffMode === 'single' && (
                <Segmented accent="var(--accent-guardian)"
                  items={E.difficultyTable.cols.map((c, i) => ({ id: String(i), label: c, on: diffTier === i }))}
                  onToggle={(id) => setDiffTier(Number(id))} />
              )}
            </div>

            {diffMode === 'compare' ? (
              <CompareTable accent="var(--accent-guardian)" firstHeader="System"
                cols={E.difficultyTable.cols}
                rows={E.difficultyTable.rows.map((r) => ({ k: r.k, v: r.v }))} />
            ) : (
              <CardMatrix min={200} className="fen2__difftier">
                {E.difficultyTable.rows.map((r) => (
                  <GlassPanel key={r.k} accent="var(--accent-guardian)" className="fen2__difftile">
                    <span className="fen2__difftile-k">{r.k}</span>
                    <span className="fen2__difftile-v">{r.v[diffTier]}</span>
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

          {/* ---------- VOICE & RECORDS ---------- */}
          <section id="voice" ref={setRef('voice')}>
            <SecHead n="07" title="Voice & Records" />
            <EditorialSplit
              aside={
                <VellumPanel>
                  <PanelHeader eyebrow="Challenge Recognition" title="Achievements" />
                  <p className="fen2__p fen2__p--dim" style={{ fontSize: '0.84rem' }}>Reward names TBD.</p>
                  <div className="fen2__achievements">{E.achievements.map((a) => <span key={a} className="fen2__ach">{a}</span>)}</div>
                </VellumPanel>
              }
            >
              <VellumPanel>
                <PanelHeader eyebrow="The First Guardian Speaks" title="Dialogue by Approach" />
                <div className="fen2__dialogue">
                  {E.dialogue.map((d) => (
                    <div key={d.when} className="fen2__dline">
                      <span className="fen2__dwhen">{d.when}</span>
                      <div>{d.lines.map((l) => <p key={l} className="fen2__voice">{l}</p>)}</div>
                    </div>
                  ))}
                  {showFang && E.dialogueP3.map((d) => (
                    <div key={d.when} className="fen2__dline">
                      <span className="fen2__dwhen fen2__dwhen--fang">{d.when}</span>
                      <div>{d.lines.map((l) => <p key={l} className="fen2__voice fen2__voice--fang">{l}</p>)}</div>
                    </div>
                  ))}
                </div>
              </VellumPanel>
            </EditorialSplit>
            <p className="fen2__p fen2__p--dim" style={{ marginTop: 'var(--sp-3)', fontStyle: 'italic' }}>
              Still to come: {E.tbd.join(' · ')}.
            </p>
          </section>

          <div className="fen2__foot">
            <button className="fen2__back" onClick={() => navigate('#/floors/1')}>← Return to the Reach</button>
          </div>
        </Stack>
      </StickyContents>
    </Page>
  );
}

/* ---- small local helpers ---- */
function SecHead({ n, title, sub }) {
  return (
    <header className="fen2__sechead">
      <span className="fen2__secn">{n}</span>
      <div>
        <h2 className="fen2__h">{title}</h2>
        {sub && <p className="fen2__p fen2__p--dim">{sub}</p>}
      </div>
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
function pick(s) {
  return { vitality: s.vitality, might: s.might, guard: s.guard, arcana: s.arcana, ward: s.ward, mobility: s.mobility };
}
