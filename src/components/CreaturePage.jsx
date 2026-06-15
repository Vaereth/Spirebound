import { useState } from 'react';
import { BESTIARY, MIGRATION_CLASSES } from '../data/bestiary.js';
import { slugify } from '../lib/slug.js';
import { StatBars } from './StatBlock.jsx';
import GradeBadge, { gradeColor } from './GradeBadge.jsx';
import ArtSlot from './ArtSlot.jsx';
import { Page, Stack, DataSplit, CardMatrix } from './Layout.jsx';
import { GlassPanel, VellumPanel, PanelHeader } from './Surfaces.jsx';
import { Tabs, QuickFacts } from './UIKit.jsx';
import { pushRecent } from '../lib/userContext.js';
import './CreaturePage.css';

const ZONE_ACCENT = {
  'Dawnfields': '#9ab36a', 'Silverrun': '#5fa3c4', 'Windmere Hills': '#8fa4b5', 'Briarwood': '#5c8a55',
  'The Old March': '#a8694a', 'Crownward Expanse': '#9b7fb0', 'Caves and Underground': '#7d7468',
  'Spring': '#7cc08a', 'Summer': '#e0b24e', 'Autumn': '#c87b41', 'Winter': '#9cc2d6', 'Rare Weather': '#b59ad6',
};

function P({ children }) { return <p className="cr__p">{children}</p>; }

export default function CreaturePage({ id, navigate }) {
  const idx = BESTIARY.findIndex((x) => String(x.id) === String(id));
  const c = BESTIARY[idx];
  const [tab, setTab] = useState('overview');

  if (!c) {
    return (
      <Page className="cr">
        <button className="cr__back" onClick={() => navigate('#/floors/1/bestiary')}>← Bestiary</button>
        <GlassPanel className="cr__notfound"><p>No such creature in the Guild records.</p></GlassPanel>
      </Page>
    );
  }

  const accent = ZONE_ACCENT[c.zone] || 'var(--rune)';
  pushRecent({ label: c.name, route: '#/floors/1/bestiary/' + c.id, kind: 'creature' });
  const prev = BESTIARY[(idx - 1 + BESTIARY.length) % BESTIARY.length];
  const next = BESTIARY[(idx + 1) % BESTIARY.length];
  const others = BESTIARY.filter((x) => x.zone === c.zone && x.id !== c.id).slice(0, 6);

  const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'ecology', label: 'Ecology' },
    { id: 'behaviour', label: 'Behaviour' },
    { id: 'migration', label: 'Migration' },
  ];

  return (
    <Page variant="wide" className="cr" style={{ '--accent': accent }}>
      {/* breadcrumb + prev/next */}
      <div className="cr__topnav">
        <button className="cr__back" onClick={() => navigate('#/floors/1/bestiary')}>← Bestiary</button>
        <span className="cr__crumb">The Verdant Reach · Bestiary · <b>{c.name}</b></span>
        <div className="cr__pager">
          <button className="cr__pagebtn" onClick={() => navigate('#/floors/1/bestiary/' + prev.id)} title={prev.name}>← {prev.name}</button>
          <button className="cr__pagebtn" onClick={() => navigate('#/floors/1/bestiary/' + next.id)} title={next.name}>{next.name} →</button>
        </div>
      </div>

      {/* INSPECT HERO — art 40% + identity 60% */}
      <DataSplit
        className="cr__hero"
        left={
          <div className="cr__art">
            <ArtSlot variant="dossier" label="Field Dossier" path={`images/bestiary/${slugify(c.name)}-dossier.png`}
              src={`/images/bestiary/${slugify(c.name)}-dossier.png`} alt={`${c.name} field dossier`} />
          </div>
        }
        right={
          <div className="cr__identity">
            <p className="cr__eyebrow">{c.zone} · Species {String(c.id).padStart(2, '0')}</p>
            <h1 className="cr__name">{c.name}</h1>
            <p className="cr__class">{c.classification}</p>

            <div className="cr__gradeline">
              <GradeBadge grade={c.grade} size="lg" />
              {c.escalation && <span className="cr__escal"><b>Escalates →</b> {c.escalation}</span>}
            </div>

            <QuickFacts cols={4} className="cr__facts" facts={[
              { k: 'Level', v: c.level ?? '—' },
              { k: 'Total', v: c.total ?? '—' },
              { k: 'Region', v: c.region },
              { k: 'Migration', v: c.migration },
            ]} />

            {c.stats && (
              <GlassPanel accent={accent} className="cr__stats">
                <PanelHeader eyebrow="Attribute Profile" accent={accent} />
                <StatBars stats={c.stats} total={c.total} maxScale={Math.max(30, ...Object.values(c.stats))} />
              </GlassPanel>
            )}

            <div className="cr__advisory">
              <span className="cr__advisory-k">Guild Advisory</span>
              <p>{c.fieldguide?.[0] || c.classification}</p>
            </div>
          </div>
        }
      />

      {/* TABBED BODY — no more 7 stacked panels */}
      <div className="cr__tabsrow">
        <Tabs tabs={TABS} value={tab} onChange={setTab} accent={accent} />
      </div>

      <div className="cr__tabbody">
        {tab === 'overview' && (
          <DataSplit
            left={
              <VellumPanel>
                <PanelHeader eyebrow="Ascendant Guild" title="Field Guide" />
                {c.fieldguide.map((line, i) => (
                  <p key={i} className={i === 0 ? 'cr__lead' : 'cr__quote'}>{line}</p>
                ))}
              </VellumPanel>
            }
            right={
              <Stack gap="default">
                <GlassPanel accent={accent}><PanelHeader eyebrow="Visual Identity" accent={accent} /><P>{c.visual}</P></GlassPanel>
                <GlassPanel accent={accent}><PanelHeader eyebrow="World Presence" accent={accent} /><P>{c.world}</P></GlassPanel>
              </Stack>
            }
          />
        )}
        {tab === 'ecology' && (
          <CardMatrix min={300}>
            <GlassPanel accent={accent}><PanelHeader eyebrow="Seasonal Presence" accent={accent} /><P>{c.seasonal}</P></GlassPanel>
            <GlassPanel accent={accent}><PanelHeader eyebrow="Sound" accent={accent} /><P>{c.sound}</P></GlassPanel>
            <GlassPanel accent={accent}><PanelHeader eyebrow="Smell & Traces" accent={accent} /><P>{c.traces}</P></GlassPanel>
            <GlassPanel accent={accent}><PanelHeader eyebrow="World Presence" accent={accent} /><P>{c.world}</P></GlassPanel>
          </CardMatrix>
        )}
        {tab === 'behaviour' && (
          <DataSplit
            left={<GlassPanel accent={accent}><PanelHeader eyebrow="Behavioural States" accent={accent} /><P>{c.behaviour}</P></GlassPanel>}
            right={<GlassPanel accent={accent}><PanelHeader eyebrow="Movement & Temperament" accent={accent} /><P>{c.movement}</P></GlassPanel>}
          />
        )}
        {tab === 'migration' && (
          <DataSplit
            left={<GlassPanel accent={accent}><PanelHeader eyebrow="Migration Pattern" accent={accent} />
              <P>{c.seasonal}</P>
              <p className="cr__p cr__p--dim">{MIGRATION_CLASSES[c.migration] || c.migration}</p></GlassPanel>}
            right={
              <GlassPanel accent={accent}>
                <PanelHeader eyebrow="Threat Assessment" accent={accent} />
                <div className="cr__threatblock">
                  <GradeBadge grade={c.grade} size="lg" />
                  {c.escalation && <p className="cr__p"><b style={{ color: gradeColor('A') }}>Escalation — </b>{c.escalation}</p>}
                  <p className="cr__p"><b style={{ color: accent }}>Field Risk — </b>{c.classification}.</p>
                </div>
              </GlassPanel>
            }
          />
        )}
      </div>

      {/* expanded-entry note + related */}
      <div className="cr__coming">
        <span className="cr__coming-h">Expanded Entry — Coming</span>
        <span className="cr__coming-t">Combat profile, drops, ecology role, and lore to be added.</span>
      </div>

      {others.length > 0 && (
        <section className="cr__related">
          <h2 className="cr__related-h">Others of {c.zone}</h2>
          <div className="cr__relrow">
            {others.map((o) => (
              <button key={o.id} className="cr__relchip" onClick={() => navigate('#/floors/1/bestiary/' + o.id)}>
                <GradeBadge grade={o.grade} size="sm" /> {o.name}
              </button>
            ))}
          </div>
        </section>
      )}
    </Page>
  );
}
