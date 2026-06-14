import { useState, useEffect, useRef } from 'react';
import { FLOOR1 as F } from '../data/floor1.js';
import { FENRATH_ENCOUNTER } from '../data/canon.js';
import { StatPanel } from './StatBlock.jsx';
import GradeBadge, { gradeColor } from './GradeBadge.jsx';
import ArtSlot from './ArtSlot.jsx';
import './FenrathPage.css';

const SECTIONS = [
  { id: 'dossier', label: 'Dossier' },
  { id: 'proofs', label: 'The Proofs' },
  { id: 'phases', label: 'Phases' },
  { id: 'systems', label: 'Combat Systems' },
  { id: 'moves', label: 'Move Lists' },
  { id: 'difficulty', label: 'Difficulty' },
  { id: 'voice', label: 'Voice & Records' },
];

function pick(s) {
  return { vitality: s.vitality, might: s.might, guard: s.guard, arcana: s.arcana, ward: s.ward, mobility: s.mobility };
}

function MoveGrid({ moves, fang }) {
  return (
    <div className="fdoss__moves">
      {moves.map((m) => (
        <div key={m.name} className={`fdoss__move ${fang ? 'fdoss__move--fang' : ''}`}>
          <div className="fdoss__move-head">
            <h4 className="fdoss__move-name">{m.name}</h4>
            <span className="fdoss__move-type">{m.type}</span>
          </div>
          <div className="fdoss__move-stats">
            {m.tel && m.tel !== '—' && <span><b>Tel</b> {m.tel}</span>}
            <span><b>Power</b> {m.power}</span>
            {m.rec && m.rec !== '—' && <span><b>Rec</b> {m.rec}</span>}
            {m.cd && <span><b>CD</b> {m.cd}</span>}
          </div>
          <p className="fdoss__p">{m.fx}</p>
        </div>
      ))}
    </div>
  );
}

export default function FenrathPage({ navigate }) {
  const E = FENRATH_ENCOUNTER;
  const [showFang, setShowFang] = useState(false);
  const [active, setActive] = useState('dossier');
  const [moveTab, setMoveTab] = useState('p1');
  const refs = useRef({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    Object.values(refs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const go = (id) => { const el = refs.current[id]; if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const setRef = (id) => (el) => { refs.current[id] = el; };

  return (
    <div className="fdoss">
      <div className="fdoss__topnav">
        <button className="fdoss__back" onClick={() => navigate('#/floors/1')}>← The Verdant Reach</button>
        <span className="fdoss__crumb">Floor 1 · Guardian Dossier</span>
      </div>

      <header className="fdoss__banner">
        <div className="fdoss__bannerart">
          <ArtSlot variant="render" label="Fenrath — Boss Art" path="images/bosses/fenrath.png" src="/images/bosses/fenrath.png" alt="Fenrath, First Guardian" />
        </div>
        <div className="fdoss__bannerinfo">
          <p className="fdoss__eyebrow">The First Article · Guardian Beast</p>
          <h1 className="fdoss__name">Fenrath</h1>
          <p className="fdoss__title">{E.identity.title} of the Verdant Reach</p>
          <div className="fdoss__gradeline">
            <GradeBadge grade="S" size="md" />
            <span className="fdoss__gradenote">Standard encounter · scales to <b style={{ color: gradeColor('SSS') }}>SSS</b> at the Proofless First Fang</span>
          </div>
          <div className="fdoss__roles">
            {E.identity.role.map((r) => <span key={r} className="fdoss__role">{r}</span>)}
          </div>
        </div>
      </header>

      <nav className="fdoss__rail">
        {SECTIONS.map((s) => (
          <button key={s.id} className={`fdoss__railbtn ${active === s.id ? 'is-on' : ''}`} onClick={() => go(s.id)}>{s.label}</button>
        ))}
      </nav>

      <div className="fdoss__body">
        <section id="dossier" ref={setRef('dossier')} className="fdoss__sec">
          <h2 className="fdoss__h">Guardian Dossier</h2>
          <div className="fdoss__grid2">
            <div className="fdoss__card">
              <h3 className="fdoss__cardh">Classification</h3>
              <dl className="fdoss__dl">
                <div><dt>Public</dt><dd>{E.identity.publicClass}</dd></div>
                <div><dt>Guardian Article</dt><dd>{E.identity.article}</dd></div>
                <div><dt>Regulates</dt><dd>{E.functions.join(' · ')}</dd></div>
              </dl>
              <p className="fdoss__p fdoss__p--dim">{E.attributeNote}</p>
            </div>
            <div className="fdoss__card">
              <h3 className="fdoss__cardh">Threat Grade by State</h3>
              <div className="fdoss__grades">
                {E.grades.map((g) => (
                  <div key={g.state} className="fdoss__graderow">
                    <span className="fdoss__gradechip" style={{ '--g': gradeColor(g.grade) }}>{g.grade}</span>
                    <span>{g.state}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h3 className="fdoss__subh">Canonical Attributes</h3>
          <p className="fdoss__p fdoss__p--dim">Two reference profiles: full-power (no Proofs) and fully suppressed (five Proofs). Invoking Proofs slides him between these.</p>
          <div className="fdoss__grid2">
            <div className="fdoss__statcard fdoss__statcard--danger">
              <div className="fdoss__statlabel">{E.stats.proofless.label}</div>
              <StatPanel stats={pick(E.stats.proofless)} total={E.stats.proofless.total} accent="#c2483a" maxScale={110} rank="Floor Guardian" />
              <p className="fdoss__mult">Outgoing: physical {E.multipliers.proofless.phys} · magical {E.multipliers.proofless.mag}</p>
            </div>
            <div className="fdoss__statcard">
              <div className="fdoss__statlabel">{E.stats.fiveProof.label}</div>
              <StatPanel stats={pick(E.stats.fiveProof)} total={E.stats.fiveProof.total} accent="#c2702f" maxScale={110} rank="Floor Guardian" />
              <p className="fdoss__mult">Outgoing: physical {E.multipliers.fiveProof.phys} · magical {E.multipliers.fiveProof.mag}</p>
            </div>
          </div>
        </section>

        <section id="proofs" ref={setRef('proofs')} className="fdoss__sec">
          <h2 className="fdoss__h">The Five Guardian Proofs</h2>
          <p className="fdoss__p fdoss__p--dim">Each Proof teaches one living function of Floor 1, demands a real ecological decision, and temporarily separates that function from Fenrath — changing the fight mechanically and statistically. Completed Proofs are chosen before entry, not auto-invoked.</p>
          <div className="fdoss__proofs">
            {E.proofs.map((p) => (
              <div key={p.name} className="fdoss__proof">
                <div className="fdoss__proof-top">
                  <h3 className="fdoss__proof-name">{p.name}</h3>
                  <span className="fdoss__proof-fn">{p.fn}</span>
                </div>
                <span className="fdoss__proof-region">{p.region} · {p.trial}</span>
                <p className="fdoss__p fdoss__lesson">&ldquo;{p.lesson}&rdquo;</p>
                <p className="fdoss__p"><b>Suppresses —</b> {p.suppresses.join(', ')}.</p>
                <p className="fdoss__p fdoss__p--dim"><b>Stat cost —</b> {p.reductions}</p>
                <p className="fdoss__voice">{p.line}</p>
              </div>
            ))}
          </div>

          <h3 className="fdoss__subh">Proof-Count Challenge Bands</h3>
          <p className="fdoss__p fdoss__p--dim">{E.proofChoice}</p>
          <div className="fdoss__bands">
            {E.proofBands.map((b) => (
              <div key={b.n} className="fdoss__band">
                <span className="fdoss__band-n">{b.n}</span>
                <span className="fdoss__band-total">Total {b.total}</span>
                <span className="fdoss__band-d">{b.d}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="phases" ref={setRef('phases')} className="fdoss__sec">
          <h2 className="fdoss__h">Encounter Phases</h2>
          <div className="fdoss__healthbar">
            <span className="fdoss__hb fdoss__hb--p1" style={{ flex: 35 }}>Phase 1 · 0.35H</span>
            <span className="fdoss__hb fdoss__hb--p2" style={{ flex: 65 }}>Phase 2 · 0.65H</span>
            <span className="fdoss__hb fdoss__hb--p3" style={{ flex: 22 }}>P3 · +0.22H</span>
          </div>

          {E.phases.map((p) => (
            <div key={p.id} className="fdoss__phase">
              <div className="fdoss__phase-head">
                <h3 className="fdoss__phase-name">{p.name}</h3>
                <span className="fdoss__phase-hp">{p.health}</span>
              </div>
              <p className="fdoss__p">{p.identity}</p>
              {p.globals && <p className="fdoss__p"><b>Systems —</b> {p.globals.join(' · ')}.</p>}
              {p.transition && <p className="fdoss__p"><b>Transition —</b> {p.transition}</p>}
              <div className="fdoss__lines">{p.lines.map((l) => <p key={l} className="fdoss__voice">{l}</p>)}</div>
            </div>
          ))}

          <div className="fdoss__phase fdoss__phase--hidden">
            {!showFang ? (
              <div className="fdoss__gate">
                <h3 className="fdoss__phase-name">A Third Phase Is Whispered Of</h3>
                <p className="fdoss__p">There is a hidden phase most climbers will never see. Reveal it only if you do not mind being spoiled.</p>
                <button className="fdoss__reveal" onClick={() => setShowFang(true)}>⚠ Reveal the hidden phase — spoilers</button>
              </div>
            ) : (
              <div className="fdoss__fang">
                <div className="fdoss__phase-head">
                  <h3 className="fdoss__phase-name fdoss__phase-name--fang">{E.phase3.name}</h3>
                  <button className="fdoss__hide" onClick={() => setShowFang(false)}>Hide</button>
                </div>
                <p className="fdoss__p"><b>Trigger —</b> {E.phase3.trigger}</p>
                <div className="fdoss__lines">{E.phase3.lines.map((l) => <p key={l} className="fdoss__voice">{l}</p>)}</div>
                <p className="fdoss__p fdoss__p--fang"><b>{E.phase3.coreRule}</b></p>
                <div className="fdoss__grid2">
                  <div><p className="fdoss__cardh">Invalidating contact</p><ul className="fdoss__list">{E.phase3.invalidating.map((x) => <li key={x}>{x}</li>)}</ul></div>
                  <div><p className="fdoss__cardh">On any non-perfect contact</p><ul className="fdoss__list">{E.phase3.onContact.map((x) => <li key={x}>{x}</li>)}</ul></div>
                </div>
                <p className="fdoss__p"><b>Bypasses —</b> {E.phase3.bypasses.join(' · ')}.</p>
                <p className="fdoss__p"><b>Phase health —</b> {E.phase3.health} &nbsp; <b>Duration —</b> {E.phase3.duration}</p>
                <h4 className="fdoss__cardh" style={{ marginTop: '1rem' }}>Perfect-Response Windows</h4>
                <div className="fdoss__wintable">
                  {E.phase3.windows.map((w) => (
                    <div key={w.d} className="fdoss__winrow"><span>{w.d}</span><span>Dodge {w.dodge}</span><span>Parry {w.parry}</span></div>
                  ))}
                </div>
                <p className="fdoss__p fdoss__p--dim">{E.phase3.windowNote}</p>
                <p className="fdoss__p fdoss__p--dim"><b>Checkpoint —</b> {E.phase3.checkpoint}</p>
                <p className="fdoss__voice fdoss__voice--fang">&ldquo;{E.phase3.thematic}&rdquo;</p>
              </div>
            )}
          </div>
        </section>

        <section id="systems" ref={setRef('systems')} className="fdoss__sec">
          <h2 className="fdoss__h">Combat Systems</h2>
          <div className="fdoss__grid2">
            <div className="fdoss__card"><h3 className="fdoss__cardh">Guardian Stability</h3><p className="fdoss__p">{E.globals.stability}</p></div>
            <div className="fdoss__card"><h3 className="fdoss__cardh">Stagger</h3><p className="fdoss__p">{E.globals.stagger}</p></div>
            <div className="fdoss__card"><h3 className="fdoss__cardh">Pursuit (Phase 2)</h3><p className="fdoss__p">{E.globals.pursuit}</p></div>
            <div className="fdoss__card"><h3 className="fdoss__cardh">Channel Disruption</h3><p className="fdoss__p">{E.globals.channelDisrupt}</p></div>
            <div className="fdoss__card"><h3 className="fdoss__cardh">Phase Transitions</h3><p className="fdoss__p">{E.globals.transitions}</p></div>
            <div className="fdoss__card"><h3 className="fdoss__cardh">Combo Legality</h3><p className="fdoss__p">{E.globals.legality}</p></div>
          </div>
          <p className="fdoss__p fdoss__p--dim" style={{ marginTop: 'var(--sp-2)' }}>{E.telegraphRules}</p>
        </section>

        <section id="moves" ref={setRef('moves')} className="fdoss__sec">
          <h2 className="fdoss__h">Move Lists</h2>
          <p className="fdoss__p fdoss__p--dim">Base Powers use Adventurer as the baseline; difficulty scales them dynamically.</p>
          <div className="fdoss__tabs">
            <button className={`fdoss__tab ${moveTab === 'p1' ? 'is-on' : ''}`} onClick={() => setMoveTab('p1')}>Phase 1 ({E.movesP1.length})</button>
            <button className={`fdoss__tab ${moveTab === 'ch' ? 'is-on' : ''}`} onClick={() => setMoveTab('ch')}>Channels ({E.channelsP1.length})</button>
            <button className={`fdoss__tab ${moveTab === 'p2' ? 'is-on' : ''}`} onClick={() => setMoveTab('p2')}>Phase 2 ({E.movesP2.length})</button>
            <button className={`fdoss__tab ${moveTab === 'p3' ? 'is-on' : ''}`} onClick={() => setMoveTab('p3')}>Phase 3 ({E.movesP3.length})</button>
          </div>

          {moveTab === 'p1' && <MoveGrid moves={E.movesP1} />}
          {moveTab === 'ch' && (
            <>
              <p className="fdoss__p fdoss__p--dim">Active only while the matching Proof is NOT invoked.</p>
              <div className="fdoss__moves">{E.channelsP1.map((c) => (
                <div key={c.name} className="fdoss__move">
                  <h4 className="fdoss__move-name">{c.name}</h4>
                  <div className="fdoss__move-stats"><span><b>Power</b> {c.power}</span><span><b>CD</b> {c.cd}</span></div>
                  <p className="fdoss__p">{c.fx}</p>
                </div>
              ))}</div>
            </>
          )}
          {moveTab === 'p2' && (
            <>
              <MoveGrid moves={E.movesP2} />
              <p className="fdoss__p fdoss__p--dim" style={{ marginTop: 'var(--sp-2)' }}><b>Adapted from Phase 1:</b> {E.adaptedP2.join(' · ')}.</p>
            </>
          )}
          {moveTab === 'p3' && (
            !showFang ? (
              <div className="fdoss__gate fdoss__gate--inline">
                <p className="fdoss__p">Phase 3 moves are spoiler content.</p>
                <button className="fdoss__reveal" onClick={() => setShowFang(true)}>⚠ Reveal Phase 3 moves</button>
              </div>
            ) : (
              <>
                <MoveGrid moves={E.movesP3} fang />
                <p className="fdoss__p fdoss__p--dim" style={{ marginTop: 'var(--sp-2)' }}>{E.p3Extra}</p>
              </>
            )
          )}
        </section>

        <section id="difficulty" ref={setRef('difficulty')} className="fdoss__sec">
          <h2 className="fdoss__h">Difficulty Integration</h2>
          <p className="fdoss__p fdoss__p--dim">His attributes never change. These derived values do.</p>
          <div className="fdoss__difftable">
            <table className="fdoss__table">
              <thead><tr><th>System</th>{E.difficultyTable.cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>
                {E.difficultyTable.rows.map((r) => (
                  <tr key={r.k}><td className="fdoss__table-k">{r.k}</td>{r.v.map((v, i) => <td key={i}>{v}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="fdoss__grid2" style={{ marginTop: 'var(--sp-3)' }}>
            <div className="fdoss__card">
              <h3 className="fdoss__cardh">Stability by Proof Count (Adventurer)</h3>
              <div className="fdoss__minirows">{E.stabilityByProof.map((x) => <div key={x.p} className="fdoss__minirow"><span>{x.p}</span><b>{x.s}</b></div>)}</div>
            </div>
            <div className="fdoss__card">
              <h3 className="fdoss__cardh">Stagger Thresholds (P1 / P2 / P3)</h3>
              <div className="fdoss__minirows">{E.staggerThresholds.rows.map((x) => <div key={x.d} className="fdoss__minirow"><span>{x.d}</span><b>{x.v}</b></div>)}</div>
            </div>
          </div>
        </section>

        <section id="voice" ref={setRef('voice')} className="fdoss__sec">
          <h2 className="fdoss__h">Voice &amp; Records</h2>
          <h3 className="fdoss__subh">Dialogue by Approach</h3>
          <div className="fdoss__dialogue">
            {E.dialogue.map((d) => (
              <div key={d.when} className="fdoss__dline">
                <span className="fdoss__dwhen">{d.when}</span>
                <div>{d.lines.map((l) => <p key={l} className="fdoss__voice">{l}</p>)}</div>
              </div>
            ))}
          </div>
          {showFang && (
            <>
              <h3 className="fdoss__subh">Phase 3 Voice</h3>
              <div className="fdoss__dialogue">
                {E.dialogueP3.map((d) => (
                  <div key={d.when} className="fdoss__dline">
                    <span className="fdoss__dwhen">{d.when}</span>
                    <div>{d.lines.map((l) => <p key={l} className="fdoss__voice fdoss__voice--fang">{l}</p>)}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          <h3 className="fdoss__subh">Challenge Recognition</h3>
          <p className="fdoss__p fdoss__p--dim">Achievement directions (reward names TBD):</p>
          <div className="fdoss__achievements">{E.achievements.map((a) => <span key={a} className="fdoss__ach">{a}</span>)}</div>
          <p className="fdoss__p fdoss__p--dim" style={{ marginTop: 'var(--sp-3)', fontStyle: 'italic' }}>
            Still to come: {E.tbd.join(' · ')}.
          </p>
        </section>

        <div className="fdoss__foot">
          <button className="fdoss__back" onClick={() => navigate('#/floors/1')}>← Return to the Reach</button>
        </div>
      </div>
    </div>
  );
}
