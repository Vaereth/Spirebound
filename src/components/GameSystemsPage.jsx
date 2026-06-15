import { useState } from 'react';
import { ATTRIBUTES, CLASSIFICATIONS, PLAYER_PROGRESSION, LEVEL_BANDS, RANK_SYSTEM, HERO_STATS_EXPLAINER, DIFFICULTY } from '../data/canon.js';
import { Page, Stack, StickyContents, DataSplit, CardMatrix } from './Layout.jsx';
import { GlassPanel, VellumPanel, StonePanel, PanelHeader } from './Surfaces.jsx';
import { Tabs, QuickFacts, CompareTable, Segmented } from './UIKit.jsx';
import SectionRail, { useSectionSpy } from './SectionRail.jsx';
import './GameSystemsPage.css';

const SECTIONS = [
  { id: 'attributes', label: 'Attributes' },
  { id: 'progression', label: 'Progression' },
  { id: 'ranks', label: 'Levels & Ranks' },
  { id: 'classes', label: 'Classifications' },
  { id: 'difficulty', label: 'Difficulty' },
];

export default function GameSystemsPage({ navigate }) {
  const { active, setRef, go } = useSectionSpy(SECTIONS.map((s) => s.id));
  const [diffMode, setDiffMode] = useState('compare');
  const [diffTier, setDiffTier] = useState(1);

  const diffCols = DIFFICULTY.tiers.map((t) => t.name);
  const diffRows = [
    { k: 'Damage', v: DIFFICULTY.tiers.map((t) => t.dmg) },
    { k: 'Health', v: DIFFICULTY.tiers.map((t) => t.hp) },
    { k: 'Stagger', v: DIFFICULTY.tiers.map((t) => t.stag) },
  ];
  const tier = DIFFICULTY.tiers[diffTier];

  return (
    <Page variant="wide" className="sys">
      <div className="sys__topnav">
        <button className="sys__back" onClick={() => navigate('#/')}>← Archive</button>
        <span className="sys__crumb"><b>Stats &amp; Systems</b></span>
        <button className="sys__cta" onClick={() => navigate('#/systems/combat')}>⚔ Combat Mathematics →</button>
      </div>

      <header className="sys__head">
        <p className="sys__eyebrow">Core Game Systems</p>
        <h1 className="sys__title">Stats &amp; Systems</h1>
        <p className="sys__lead">Every combat-capable being in the Spire — hero, beast, guardian, or god — shares one language of power.</p>
      </header>

      <StickyContents rail={<SectionRail sections={SECTIONS} active={active} onGo={go} title="Systems" />}>
        <Stack gap="section">
          {/* ATTRIBUTES */}
          <section id="attributes" ref={setRef('attributes')}>
            <h2 className="sys__h">The Six Universal Attributes</h2>
            <CardMatrix min={240}>
              {ATTRIBUTES.map((a) => (
                <GlassPanel key={a.key} accent="var(--accent-interface)">
                  <PanelHeader eyebrow="Attribute" title={a.name} />
                  <p className="sys__p">{a.desc}</p>
                </GlassPanel>
              ))}
            </CardMatrix>
          </section>

          {/* PROGRESSION */}
          <section id="progression" ref={setRef('progression')}>
            <h2 className="sys__h">Player Attribute Progression</h2>
            <p className="sys__p sys__p--lead">{PLAYER_PROGRESSION.intro}</p>
            <DataSplit
              left={
                <GlassPanel accent="var(--accent-interface)">
                  <PanelHeader eyebrow="Points by Level" />
                  <CompareTable firstHeader="Level" cols={['Points']} rows={PLAYER_PROGRESSION.table.map((r) => ({ k: r.lvl, v: [r.pts] }))} />
                  <p className="sys__p sys__p--dim">{PLAYER_PROGRESSION.finalTotal}</p>
                </GlassPanel>
              }
              right={
                <Stack gap="default">
                  <GlassPanel accent="var(--accent-interface)">
                    <PanelHeader eyebrow="The Character Sheet" />
                    <ul className="sys__list">{PLAYER_PROGRESSION.sheet.map((s) => <li key={s}>{s}</li>)}</ul>
                    {PLAYER_PROGRESSION.formulas.map((f) => <p key={f} className="sys__p sys__p--mono">{f}</p>)}
                  </GlassPanel>
                  <GlassPanel accent="var(--accent-interface)">
                    <PanelHeader eyebrow="Soft Caps" />
                    <CompareTable firstHeader="Band" cols={['Effect']} rows={PLAYER_PROGRESSION.softCaps.map((s) => ({ k: s.band, v: [s.effect] }))} />
                    <p className="sys__p sys__p--dim">{PLAYER_PROGRESSION.note}</p>
                  </GlassPanel>
                </Stack>
              }
            />
            <VellumPanel className="sys__explainer">
              <PanelHeader eyebrow={HERO_STATS_EXPLAINER.title} title="How Hero Stats Work" />
              <DataSplit
                left={<ul className="sys__list">{HERO_STATS_EXPLAINER.points.map((p) => <li key={p}>{p}</li>)}</ul>}
                right={<p className="sys__p">{HERO_STATS_EXPLAINER.sheet}</p>}
              />
            </VellumPanel>
          </section>

          {/* RANKS */}
          <section id="ranks" ref={setRef('ranks')}>
            <h2 className="sys__h">Level Bands &amp; Creature Ranks</h2>
            <CardMatrix min={280}>
              <GlassPanel accent="var(--accent-floor1)">
                <PanelHeader eyebrow="Floor 1" title="Level Bands" accent="var(--accent-floor1)" />
                {LEVEL_BANDS.map((b) => (
                  <div key={b.lvl} className="sys__band"><span className="sys__band-k">{b.lvl}</span><span className="sys__band-d">{b.desc}</span></div>
                ))}
              </GlassPanel>
              <GlassPanel accent="var(--accent-interface)">
                <PanelHeader eyebrow="Ecological" title="Ranks" />
                <p className="sys__p sys__p--dim">{RANK_SYSTEM.ecological.join(' → ')}</p>
                {RANK_SYSTEM.defs.map((r) => (
                  <div key={r.rank} className="sys__rank"><span className="sys__rank-k">{r.rank}</span><span className="sys__rank-d">{r.d}</span></div>
                ))}
              </GlassPanel>
              <GlassPanel accent="var(--accent-authority)">
                <PanelHeader eyebrow="Named Rares" title="Respawn Types" accent="var(--accent-authority)" />
                {RANK_SYSTEM.respawn.map((r) => (
                  <div key={r.type} className="sys__rank"><span className="sys__rank-k">{r.type}</span><span className="sys__rank-d">{r.d}</span></div>
                ))}
              </GlassPanel>
            </CardMatrix>
          </section>

          {/* CLASSIFICATIONS */}
          <section id="classes" ref={setRef('classes')}>
            <h2 className="sys__h">Supporting Classifications</h2>
            <CardMatrix min={240}>
              {Object.entries(CLASSIFICATIONS).map(([k, vals]) => (
                <GlassPanel key={k} accent="var(--accent-interface)">
                  <PanelHeader eyebrow="Classification" title={k} />
                  <div className="sys__tags">{vals.map((v) => <span key={v} className="sys__tag">{v}</span>)}</div>
                </GlassPanel>
              ))}
            </CardMatrix>
          </section>

          {/* DIFFICULTY — selector + compare-all */}
          <section id="difficulty" ref={setRef('difficulty')}>
            <h2 className="sys__h">Difficulty</h2>
            <p className="sys__p sys__p--lead">{DIFFICULTY.intro}</p>
            <p className="sys__ladder">{DIFFICULTY.ladder}</p>

            <div className="sys__diffmode">
              <Tabs value={diffMode} onChange={setDiffMode} tabs={[{ id: 'compare', label: 'Compare All' }, { id: 'single', label: 'Single Tier' }]} />
              {diffMode === 'single' && (
                <Segmented items={diffCols.map((c, i) => ({ id: String(i), label: c, on: diffTier === i }))} onToggle={(id) => setDiffTier(Number(id))} />
              )}
            </div>

            {diffMode === 'compare' ? (
              <CompareTable firstHeader="System" cols={diffCols} rows={diffRows} />
            ) : (
              <GlassPanel accent={diffTier === 4 ? 'var(--accent-blood)' : 'var(--accent-interface)'} className="sys__difftier">
                <PanelHeader eyebrow={`DMG ${tier.dmg} · HP ${tier.hp} · Stagger ${tier.stag}`} title={tier.name}
                  accent={diffTier === 4 ? 'var(--accent-blood)' : 'var(--accent-interface)'} />
                <p className="sys__p">{tier.purpose}</p>
                <ul className="sys__list">{tier.rules.map((r) => <li key={r}>{r}</li>)}</ul>
              </GlassPanel>
            )}

            {/* The Unbroken Oath — solemn Guardian Stone treatment */}
            <StonePanel accent="var(--accent-blood)" className="sys__oath">
              <PanelHeader eyebrow="The Unbroken Oath" title="One Life" accent="var(--accent-blood)" />
              <DataSplit
                left={<div><h4 className="sys__minihead">The One-Life Rule</h4><p className="sys__p">{DIFFICULTY.oath.rule}</p></div>}
                right={<div><h4 className="sys__minihead">The Memorial System</h4><p className="sys__p">{DIFFICULTY.oath.memorial}</p></div>}
              />
            </StonePanel>

            <h3 className="sys__subh">Mechanic Layers</h3>
            <CardMatrix min={240}>
              {DIFFICULTY.layers.map((l) => (
                <GlassPanel key={l.name} accent="var(--accent-interface)">
                  <PanelHeader eyebrow={l.when} title={l.name} />
                  <p className="sys__p sys__p--dim">{l.ex}</p>
                </GlassPanel>
              ))}
            </CardMatrix>
            <GlassPanel accent="var(--accent-interface)" className="sys__saferule">
              <PanelHeader eyebrow="Encounter Design" title="The Safe-Combination Rule" />
              <p className="sys__p">{DIFFICULTY.safeRule}</p>
            </GlassPanel>
            <p className="sys__p sys__p--dim sys__tbd">Provisional — to be revisited after Fenrath's full encounter is complete. {DIFFICULTY.tbd}</p>
          </section>
        </Stack>
      </StickyContents>
    </Page>
  );
}
