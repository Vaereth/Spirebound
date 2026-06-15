import { useState } from 'react';
import { CAST } from '../data/cast.js';
import { EluvainKit, FeiyanKit, StatRadar } from './Cast.jsx';
import ArtSlot from './ArtSlot.jsx';
import HeroLevel1Sheet from './HeroStats.jsx';
import { Page, Stack, DataSplit, EditorialSplit, CardMatrix } from './Layout.jsx';
import { GlassPanel, VellumPanel, StonePanel, PanelHeader } from './Surfaces.jsx';
import { Tabs, QuickFacts } from './UIKit.jsx';
import { pushRecent } from '../lib/userContext.js';
import './Cast.css';
import './HeroPage.css';

export default function HeroPage({ id, navigate }) {
  const c = CAST.find((x) => x.id === id);
  const [tab, setTab] = useState('kit');
  if (!c) {
    return (
      <Page className="chr"><button className="chr__back" onClick={() => navigate('#/climbers')}>← The Climbers</button>
        <GlassPanel><p style={{ color: 'var(--bone-dim)' }}>No such climber.</p></GlassPanel></Page>
    );
  }
  pushRecent({ label: c.name, route: '#/heroes/' + c.id, kind: 'climber' });
  const other = CAST.find((x) => x.id !== c.id);

  const TABS = [
    { id: 'kit', label: 'Kit & Signature' },
    { id: 'identity', label: 'Combat Identity' },
    { id: 'lore', label: 'Overview & Lore' },
  ];

  return (
    <Page variant="wide" className="chr" style={{ '--accent': c.accent }}>
      <div className="chr__topnav">
        <button className="chr__back" onClick={() => navigate('#/climbers')}>← The Climbers</button>
        <span className="chr__crumb">The Climbers · <b>{c.name}</b></span>
        {other && <button className="chr__back chr__back--next" onClick={() => navigate('#/heroes/' + other.id)}>{other.name} →</button>}
      </div>

      {/* PARTY-MENU HERO — art 45% + identity 55% */}
      <div className="chr__hero">
        <DataSplit
          left={
            <div className="chr__art">
              <span className="chr__emblem" aria-hidden="true" style={{ '--a': c.accent }}>{c.name[0]}</span>
              <ArtSlot variant="splash" label="Key Art / Splash" path={`images/heroes/${c.id}-splash.png`}
                src={`/images/heroes/${c.id}-splash.png`} alt={`${c.name} key art`} />
            </div>
          }
          right={
            <div className="chr__identity">
              <p className="chr__eyebrow">Climber {String(c.order).padStart(2, '0')}{c.isDefault ? ' · Default' : ''}</p>
              <h1 className="chr__name">{c.name}</h1>
              {c.epithet && <p className="chr__epithet">{c.epithet}</p>}
              {c.tagline && <p className="chr__quote">“{c.tagline}”</p>}

              <div className="chr__rolechips">
                {c.identity?.role && <span className="chr__role">{c.identity.role}</span>}
                {c.identity?.damage && <span className="chr__chip">Damage · {c.identity.damage}</span>}
                {c.identity?.skillCeiling && <span className="chr__chip">Ceiling · {c.identity.skillCeiling}</span>}
              </div>

              {c.weapons?.[0] && (
                <div className="chr__weapon">
                  <span className="chr__weapon-k">Primary Weapon</span>
                  <span className="chr__weapon-v">{c.weapons[0].name}</span>
                  <span className="chr__weapon-n">{c.weapons[0].notes?.slice(0, 3).join(' · ')}</span>
                </div>
              )}

              {c.stats && (
                <GlassPanel accent={c.accent} className="chr__profile">
                  <PanelHeader eyebrow="Base Template Profile" accent={c.accent} />
                  <DataSplit
                    left={
                      <QuickFacts cols={1} facts={[
                        c.identity?.difficulty && { k: 'Difficulty', v: c.identity.difficulty },
                        c.identity?.health && { k: 'Base Health', v: c.identity.health },
                        c.identity?.defense && { k: 'Base Guard', v: c.identity.defense },
                        c.identity?.mobility && { k: 'Base Movement', v: c.identity.mobility },
                      ].filter(Boolean)}
                      />
                    }
                    right={<div className="chr__radar"><StatRadar stats={c.stats} accent={c.accent} /></div>}
                  />
                </GlassPanel>
              )}
            </div>
          }
        />
      </div>

      {/* tabbed depth */}
      <div className="chr__tabsrow"><Tabs tabs={TABS} value={tab} onChange={setTab} accent={c.accent} /></div>

      {tab === 'kit' && (
        <section className="chr__kit">
          <h2 className="chr__sech">Kit &amp; Signature</h2>
          {c.id === 'eluvain' ? <EluvainKit c={c} /> : <FeiyanKit c={c} />}
        </section>
      )}

      {tab === 'identity' && (
        <Stack gap="default">
          <CardMatrix min={280}>
            {c.coreFantasy && <GlassPanel accent={c.accent}><PanelHeader eyebrow="Core Fantasy" accent={c.accent} /><p className="chr__p">{c.coreFantasy}</p></GlassPanel>}
            {c.weapons && (
              <GlassPanel accent={c.accent}><PanelHeader eyebrow="Weapons" accent={c.accent} />
                {c.weapons.map((w) => (
                  <div key={w.name} className="chr__field"><span className="chr__field-h">{w.name} · {w.hand}</span><p className="chr__field-t">{w.notes.join(' · ')}</p></div>
                ))}
              </GlassPanel>
            )}
            {c.appearance && <GlassPanel accent={c.accent}><PanelHeader eyebrow="Appearance" accent={c.accent} /><p className="chr__p chr__p--dim">{c.appearance.join(' · ')}</p></GlassPanel>}
          </CardMatrix>
          <GlassPanel accent={c.accent}><HeroLevel1Sheet /></GlassPanel>
        </Stack>
      )}

      {tab === 'lore' && (
        <EditorialSplit
          aside={
            <VellumPanel>
              <PanelHeader eyebrow="Status" title="Expanded Entry" />
              <p className="chr__p chr__p--dim">Backstory, the wish, talent trees, and full ability frame data to be added.</p>
            </VellumPanel>
          }
        >
          <VellumPanel>
            <PanelHeader eyebrow="The Climber" title="Overview" />
            {c.overview && <p className="chr__lead">{c.overview}</p>}
          </VellumPanel>
        </EditorialSplit>
      )}
    </Page>
  );
}
