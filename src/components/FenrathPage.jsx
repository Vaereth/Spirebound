import { useState } from 'react';
import { FLOOR1 as F } from '../data/floor1.js';
import { FENRATH_STATS, FENRATH_GRADES, FENRATH_ENCOUNTER } from '../data/canon.js';
import { StatPanel } from './StatBlock.jsx';
import GradeBadge from './GradeBadge.jsx';
import ArtSlot from './ArtSlot.jsx';
import './FenrathPage.css';

export default function FenrathPage({ navigate }) {
  const fn = F.fenrath;
  const E = FENRATH_ENCOUNTER;
  const [showFang, setShowFang] = useState(false);
  return (
    <div className="fen">
      <div className="fen__vignette" aria-hidden="true" />
      <div className="fen__nav">
        <button className="fen__back" onClick={() => navigate('#/floors/1')}>← The Verdant Reach</button>
        <span className="fen__crumb">Floor 1 · The First Guardian</span>
      </div>

      <header className="fen__banner">
        <p className="fen__eyebrow">Guardian of the First Gate</p>
        <h1 className="fen__name">Fenrath</h1>
        <p className="fen__sub">The First Guardian — the warden of the Gate of First Ascent</p>
        <div className="fen__titles">
          {fn.titles.map((t) => <span key={t} className="fen__title">{t}</span>)}
        </div>
      </header>

      <div className="fen__body">
        <div style={{ '--accent': '#9a2f23' }}>
          <ArtSlot
            variant="boss"
            label="Guardian Art"
            path="images/bosses/fenrath.png"
            src="/images/bosses/fenrath.png"
            alt="Fenrath, the First Guardian"
          />
        </div>

        <div className="fen__grid2">
          <section className="fen__sec">
            <h2 className="fen__h">The Barrier</h2>
            <p className="fen__p">{fn.public}</p>
          </section>

          <section className="fen__sec">
            <h2 className="fen__h">The Arena</h2>
            <p className="fen__p">{fn.arena}</p>
          </section>
        </div>

        <section className="fen__sec fen__sec--truth">
          <h2 className="fen__h fen__h--truth">What the Guild Will Only Whisper</h2>
          <p className="fen__p">{fn.guardianRole}</p>
        </section>

        <section className="fen__sec">
          <h2 className="fen__h">Standard Stat Chart</h2>
          <p className="fen__p">{FENRATH_STATS.base.note}</p>
          <div style={{ marginTop: 'var(--sp-3)', '--accent': '#c2702f' }}>
            <StatPanel stats={FENRATH_STATS.base.stats} total={FENRATH_STATS.base.total} accent="#c2702f" maxScale={100} rank="Floor Guardian" />
          </div>
        </section>

        <section className="fen__sec">
          <h2 className="fen__h">Guild Threat Grade by Proof State</h2>
          <div className="fen__grades">
            {FENRATH_GRADES.public.map((g) => (
              <div key={g.state} className="fen__grade">
                <GradeBadge grade={g.grade} size="md" />
                <div>
                  <p className="fen__grade-state">{g.state}</p>
                  <p className="fen__grade-note">{g.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="fen__p fen__p--dim" style={{ marginTop: 'var(--sp-2)', fontStyle: 'italic' }}>
            Further states — the proofless Guardian and the no-hit First Fang — are recorded only in the Sealed Archive.
          </p>
        </section>

        <section className="fen__sec">
          <h2 className="fen__h">The Gate's Conditions</h2>
          <p className="fen__p fen__p--dim">{F.proofs.intro}</p>
          <div className="fen__gates">
            {F.proofs.gates.map((g) => (
              <div key={g.count} className="fen__gate">
                <span className="fen__gatecount">{g.count}</span>
                <pre className="fen__gatemsg">{g.gate}</pre>
                <pre className="fen__gatevoice">{g.fenrath}</pre>
              </div>
            ))}
          </div>
        </section>

        {/* Phase structure */}
        <section className="fen__sec">
          <h2 className="fen__h">The Three Phases</h2>
          <p className="fen__p fen__p--dim">{E.attributeNote}</p>
          <div className="fen__phases">
            {E.phases.map((p) => (
              <div key={p.id} className={`fen__phase ${p.status === 'drafting' ? 'fen__phase--wip' : ''}`}>
                <div className="fen__phase-head">
                  <h3 className="fen__phase-name">{p.name}</h3>
                  <span className="fen__phase-hp">{p.health}</span>
                  {p.status === 'drafting' && <span className="fen__wip">In progress</span>}
                </div>
                <p className="fen__p">{p.identity}</p>
                {p.movement && <p className="fen__p fen__p--dim">{p.movement}</p>}
                {p.purpose && <p className="fen__p"><b>Teaches —</b> {p.purpose.join(' · ')}.</p>}
                {p.gains && <p className="fen__p"><b>He gains —</b> {p.gains.join(' · ')}.</p>}
                {p.transition && <p className="fen__p"><b>Transition —</b> {p.transition}</p>}
                {p.note && <p className="fen__p fen__p--dim" style={{ fontStyle: 'italic' }}>{p.note}</p>}
                {p.lines && <div className="fen__lines">{p.lines.map((l) => <p key={l} className="fen__voice">{l}</p>)}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* Hidden Phase 3 — spoiler reveal */}
        <section className="fen__sec">
          <h2 className="fen__h">A Third Phase Is Whispered Of</h2>
          {!showFang ? (
            <div className="fen__spoilergate">
              <p className="fen__p">There is a hidden phase — one most climbers will never see, and one you may not wish spoiled. Reveal it only if you want to know.</p>
              <button className="fen__reveal" onClick={() => setShowFang(true)}>⚠ Reveal the hidden phase — spoilers</button>
            </div>
          ) : (
            <div className="fen__fang">
              <div className="fen__phase-head">
                <h3 className="fen__phase-name fen__phase-name--fang">{E.phase3.name}</h3>
                <span className="fen__wip">In progress</span>
                <button className="fen__hide" onClick={() => setShowFang(false)}>Hide</button>
              </div>
              <p className="fen__p"><b>Trigger —</b> {E.phase3.trigger}</p>
              <div className="fen__lines">{E.phase3.lines.map((l) => <p key={l} className="fen__voice">{l}</p>)}</div>
              <p className="fen__p fen__p--truth"><b>{E.phase3.coreRule}</b></p>
              <div className="fen__grid2">
                <div>
                  <p className="fen__sub-h">Defensive restriction</p>
                  <ul className="fen__list">{E.phase3.restriction.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
                <div>
                  <p className="fen__sub-h">Any non-perfect contact</p>
                  <ul className="fen__list">{E.phase3.onContact.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              </div>
              <p className="fen__p"><b>Bypasses —</b> {E.phase3.bypasses.join(' · ')}.</p>
              <p className="fen__p"><b>Phase health —</b> {E.phase3.health} <b style={{ marginLeft: '1rem' }}>Duration —</b> {E.phase3.duration}</p>
              <p className="fen__p fen__p--truth" style={{ fontStyle: 'italic' }}>“{E.phase3.thematic}”</p>
              <p className="fen__p fen__p--dim" style={{ fontStyle: 'italic' }}>{E.phase3.note}</p>
            </div>
          )}
        </section>

        {/* The Five Proofs */}
        <section className="fen__sec">
          <h2 className="fen__h">The Five Guardian Proofs</h2>
          <p className="fen__p fen__p--dim">Each Proof teaches one living function of Floor 1, demands a real ecological decision, and temporarily separates that function from Fenrath — changing the fight mechanically and statistically. Completed Proofs are chosen before entry, not auto-invoked.</p>
          <div className="fen__proofs">
            {E.proofs.map((p) => (
              <div key={p.name} className="fen__proof">
                <h3 className="fen__proof-name">{p.name}</h3>
                <span className="fen__proof-fn">{p.fn} · {p.region}</span>
                <p className="fen__p" style={{ fontStyle: 'italic' }}>“{p.lesson}”</p>
                <p className="fen__p"><b>Trial —</b> {p.trial}</p>
                <p className="fen__p"><b>Suppresses —</b> {p.suppresses.join(', ')}.</p>
                <p className="fen__p fen__p--dim"><b>Stat cost —</b> {p.reductions}</p>
                <p className="fen__voice">{p.line}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Proof bands */}
        <section className="fen__sec">
          <h2 className="fen__h">Proof-Count Challenge Bands</h2>
          <p className="fen__p fen__p--dim">{E.proofChoice}</p>
          <div className="fen__bands">
            {E.proofBands.map((b) => (
              <div key={b.n} className="fen__band">
                <span className="fen__band-n">{b.n}</span>
                <span className="fen__band-total">Total {b.total}</span>
                <span className="fen__band-d">{b.d}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Phase 1 global mechanics */}
        <section className="fen__sec">
          <h2 className="fen__h">Phase 1 — Global Mechanics</h2>
          <div className="fen__grid2">
            <div><p className="fen__sub-h">The Five Guardian Channels</p><p className="fen__p">{E.globals.channels}</p></div>
            <div><p className="fen__sub-h">Guardian Pressure</p><p className="fen__p">{E.globals.pressure}</p></div>
            <div><p className="fen__sub-h">Committed Attacks</p><p className="fen__p">{E.globals.committed}</p></div>
            <div><p className="fen__sub-h">Stagger Structure</p><p className="fen__p">{E.globals.stagger}</p></div>
          </div>
        </section>

        {/* Phase 1 core abilities */}
        <section className="fen__sec">
          <h2 className="fen__h">Phase 1 — Core Abilities</h2>
          <p className="fen__p fen__p--dim">Base Powers use Adventurer as the baseline; difficulty scales them dynamically.</p>
          <div className="fen__moves">
            {E.abilities.map((a) => (
              <div key={a.name} className="fen__move">
                <div className="fen__move-head">
                  <h3 className="fen__move-name">{a.name}</h3>
                  <span className="fen__move-type">{a.type}</span>
                </div>
                <div className="fen__move-stats">
                  <span><b>Wind-up</b> {a.windup}</span>
                  <span><b>Power</b> {a.power}</span>
                  <span><b>Cooldown</b> {a.cd}</span>
                </div>
                <p className="fen__p"><b>Effects —</b> {a.effects}</p>
                <p className="fen__p fen__p--dim"><b>Counterplay —</b> {a.counter}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Active channel abilities */}
        <section className="fen__sec">
          <h2 className="fen__h">Active Guardian Channels</h2>
          <p className="fen__p fen__p--dim">These exist only while the matching Proof is NOT invoked.</p>
          <div className="fen__moves">
            {E.channels.map((ch) => (
              <div key={ch.name} className="fen__move">
                <h3 className="fen__move-name">{ch.name}</h3>
                <div className="fen__move-stats"><span><b>Power</b> {ch.power}</span><span><b>Cooldown</b> {ch.cd}</span></div>
                <p className="fen__p">{ch.effect}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="fen__sec">
          <h2 className="fen__h">Telegraph Honesty</h2>
          <p className="fen__p">{E.telegraphRules}</p>
        </section>

        <div className="fen__foot">
          <button className="fen__back" onClick={() => navigate('#/floors/1')}>← Return to the Reach</button>
        </div>
      </div>
    </div>
  );
}
