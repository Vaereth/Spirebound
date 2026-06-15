import { useState } from 'react';
import { DEEP_LORE, FENRATH_STATS, FENRATH_GRADES, THREAT_GRADES, CORRUPT_GOD_GRADE } from '../data/canon.js';
import { StatPanel, StatBars } from './StatBlock.jsx';
import GradeBadge from './GradeBadge.jsx';
import { Page, Stack, DataSplit, CardMatrix } from './Layout.jsx';
import { StonePanel, GlassPanel, VellumPanel, PanelHeader } from './Surfaces.jsx';
import './DeepLore.css';

export default function DeepLorePage({ navigate }) {
  const [revealed, setRevealed] = useState(false);
  const D = DEEP_LORE;

  if (!revealed) {
    return (
      <Page className="dl" style={{ '--accent': 'var(--accent-blood)' }}>
        <div className="dl__topnav">
          <button className="dl__back" onClick={() => navigate('#/floors/1')}>← The Verdant Reach</button>
          <span className="dl__crumb">Restricted · <b>Sealed Archive</b></span>
        </div>
        <div className="dl__gate">
          <span className="dl__seal" aria-hidden="true">⛓</span>
          <h1 className="dl__gate-title">The Sealed Archive</h1>
          <p className="dl__gate-warn">
            Beyond this point lies endgame and ending-defining material: the truth beneath Floor 1,
            the Hundredfold Seal, the true corrupt god, the Seven Buried Elites, the proofless and
            flawless Guardian, and the First Blight.
          </p>
          <p className="dl__gate-warn dl__gate-warn--strong">These are deliberate spoilers. They are not meant for new climbers.</p>
          <div className="dl__gate-actions">
            <button className="dl__reveal" onClick={() => setRevealed(true)}>⚠ I understand — unseal the archive</button>
            <button className="dl__decline" onClick={() => navigate('#/floors/1')}>Take me back</button>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page variant="wide" className="dl dl--open" style={{ '--accent': 'var(--accent-blood)' }}>
      <div className="dl__topnav">
        <button className="dl__back" onClick={() => navigate('#/floors/1')}>← The Verdant Reach</button>
        <span className="dl__crumb">Restricted · <b>Sealed Archive — Unsealed</b></span>
        <button className="dl__back dl__back--reseal" onClick={() => setRevealed(false)}>⛓ Re-seal</button>
      </div>

      <header className="dl__head">
        <p className="dl__eyebrow">Restricted Records · Spoilers</p>
        <h1 className="dl__title">The Truth Beneath the First Step</h1>
        <p className="dl__sub">Floor 1 is not merely the first floor. It is the lid above the prison.</p>
      </header>

      <Stack gap="section">
        {/* Hundredfold Seal */}
        <section>
          <h2 className="dl__h">{D.seal.title}</h2>
          <p className="dl__p dl__p--lead">{D.seal.summary}</p>
          <CardMatrix min={240}>
            <StonePanel accent="var(--accent-blood)"><PanelHeader eyebrow="Every Guardian" title="Two Functions" accent="var(--accent-blood)" /><ul className="dl__list">{D.seal.functions.map((f) => <li key={f}>{f}</li>)}</ul></StonePanel>
            <GlassPanel accent="var(--accent-blood)"><PanelHeader eyebrow="Killing a Guardian" accent="var(--accent-blood)" /><ul className="dl__list">{D.seal.kill.map((f) => <li key={f}>{f}</li>)}</ul></GlassPanel>
            <GlassPanel accent="var(--accent-blood)"><PanelHeader eyebrow="Reviving a Guardian" accent="var(--accent-blood)" /><ul className="dl__list">{D.seal.revive.map((f) => <li key={f}>{f}</li>)}</ul></GlassPanel>
          </CardMatrix>
          <h3 className="dl__subh">Article States</h3>
          <CardMatrix min={200}>
            {D.seal.states.map((s) => (
              <GlassPanel key={s.s} accent="var(--accent-blood)"><span className="dl__state-k">{s.s}</span><p className="dl__p dl__p--dim">{s.d}</p></GlassPanel>
            ))}
          </CardMatrix>
        </section>

        {/* Corruption cause */}
        <section>
          <h2 className="dl__h">{D.corruptionCause.title}</h2>
          <DataSplit
            left={<VellumPanel sealed><PanelHeader eyebrow="Canon" title="The Cause" /><p className="dl__p">{D.corruptionCause.canon}</p></VellumPanel>}
            right={
              <GlassPanel accent="var(--accent-blood)">
                <PanelHeader eyebrow="Encroachment Sequence" accent="var(--accent-blood)" />
                <div className="dl__seq">{D.corruptionCause.sequence.map((s, i) => <span key={s} className="dl__seq-step">{i + 1}. {s}</span>)}</div>
                <p className="dl__p dl__quote">{D.corruptionCause.revivalRule}</p>
              </GlassPanel>
            }
          />
        </section>

        {/* Fenrath gated stats */}
        <section>
          <h2 className="dl__h">Fenrath — Beyond the Public Record</h2>
          <div className="dl__grades">
            {FENRATH_GRADES.restricted.map((g) => (
              <div key={g.state} className="dl__grade-row">
                <GradeBadge grade={g.grade} size="md" />
                <div><p className="dl__grade-state">{g.state}</p><p className="dl__grade-note">{g.note}</p></div>
              </div>
            ))}
          </div>
          <DataSplit
            left={
              <StonePanel accent="var(--accent-guardian)">
                <PanelHeader eyebrow={`Total ${FENRATH_STATS.proofless.total}`} title={FENRATH_STATS.proofless.label} accent="var(--accent-guardian)" />
                <StatBars stats={FENRATH_STATS.proofless.stats} total={FENRATH_STATS.proofless.total} maxScale={110} />
                <ul className="dl__list">{FENRATH_STATS.proofless.props.map((p) => <li key={p}>{p}</li>)}</ul>
              </StonePanel>
            }
            right={
              <GlassPanel accent="var(--accent-guardian)">
                <PanelHeader eyebrow="Flawless" title={FENRATH_STATS.flawless.label} accent="var(--accent-guardian)" />
                <p className="dl__p dl__p--dim dl__quote">{FENRATH_STATS.flawless.trigger}</p>
                <ul className="dl__list">{FENRATH_STATS.flawless.props.map((p) => <li key={p}>{p}</li>)}</ul>
              </GlassPanel>
            }
          />
        </section>

        {/* Seven Buried Elites */}
        <section>
          <h2 className="dl__h">The Seven Buried Elites</h2>
          <div className="dl__sssline"><GradeBadge grade="SSS" size="md" /><p className="dl__p">{D.sevenElites.intro} <b className="dl__warn">All seven are SSS Grade — engagement prohibited. The full seven-elite ritual sequence is a Calamity-Class Operation.</b></p></div>
          <CardMatrix min={300}>
            {D.sevenElites.list.map((e) => (
              <StonePanel key={e.name} accent="var(--accent-blood)">
                <PanelHeader eyebrow={`${e.concept} · ${e.level} · Total ${e.total}`} title={e.name} accent="var(--accent-blood)" />
                <p className="dl__p dl__quote">{e.identity}</p>
                <StatBars stats={e.stats} total={e.total} maxScale={110} />
              </StonePanel>
            ))}
          </CardMatrix>
          <p className="dl__p dl__quote">{D.sevenElites.consequence}</p>
        </section>

        {/* The corrupt god */}
        <section>
          <h2 className="dl__h">{D.corruptGod.title}</h2>
          <StonePanel accent="var(--accent-blood)">
            <div className="dl__godhead">
              <GradeBadge grade="Tower Class" size="lg" />
              <div>
                <p className="dl__p dl__p--dim">Final true name: {D.corruptGod.finalName}</p>
                <p className="dl__p dl__quote">{CORRUPT_GOD_GRADE.note}</p>
              </div>
            </div>
            <div className="dl__godtags">{D.corruptGod.classifications.map((c) => <span key={c} className="dl__tag">{c}</span>)}</div>
            <p className="dl__p">{D.corruptGod.summary}</p>
            <DataSplit
              left={<div><h4 className="dl__minihead">Stat Profile · Total {D.corruptGod.total}</h4><StatPanel stats={D.corruptGod.stats} total={D.corruptGod.total} accent="#9a2f23" maxScale={910} /></div>}
              right={<div><h4 className="dl__minihead">Notes</h4><ul className="dl__list">{D.corruptGod.statNotes.map((n) => <li key={n}>{n}</li>)}</ul></div>}
            />
          </StonePanel>
          <p className="dl__p dl__p--lead">{D.corruptGod.encounter}</p>
          <CardMatrix min={220}>
            {D.corruptGod.phases.map((p) => (
              <GlassPanel key={p.name} accent="var(--accent-blood)"><PanelHeader eyebrow="Phase" title={p.name} accent="var(--accent-blood)" /><p className="dl__p dl__p--dim">{p.d}</p></GlassPanel>
            ))}
          </CardMatrix>
          <GlassPanel accent="var(--accent-authority)" className="dl__reward">
            <PanelHeader eyebrow="Reward" title={D.corruptGod.reward.name} accent="var(--accent-authority)" />
            <div className="dl__godtags">{D.corruptGod.reward.props.map((p) => <span key={p} className="dl__tag">{p}</span>)}</div>
            <p className="dl__p dl__p--dim">{D.corruptGod.reward.note}</p>
          </GlassPanel>
        </section>

        {/* Floor 100 */}
        <section>
          <h2 className="dl__h">{D.floor100.title}</h2>
          <StonePanel accent="var(--accent-blood)">
            <div className="dl__godhead"><GradeBadge grade="Extinction Class" size="md" /><p className="dl__p">{D.floor100.summary} <span className="dl__p--dim">Provisional grade: Extinction Class (TBD until designed).</span></p></div>
          </StonePanel>
        </section>

        {/* Restricted threat classes */}
        <section>
          <h2 className="dl__h">Restricted Threat Classes</h2>
          <p className="dl__p dl__p--dim">Beyond the public E–SSS ladder. These appear only in restricted records.</p>
          <div className="dl__grades">
            {THREAT_GRADES.restricted.map((g) => (
              <div key={g.g} className="dl__grade-row"><GradeBadge grade={g.g} size="md" /><p className="dl__grade-note">{g.desc}</p></div>
            ))}
          </div>
        </section>

        <p className="dl__p dl__p--dim dl__tbd">Anything marked TBD is not yet canon and must not be invented.</p>
      </Stack>
    </Page>
  );
}
