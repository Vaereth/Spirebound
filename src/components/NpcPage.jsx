import { FLOOR1 as F } from '../data/floor1.js';
import { slugify } from '../lib/slug.js';
import ArtSlot from './ArtSlot.jsx';
import { Page, EditorialSplit } from './Layout.jsx';
import { VellumPanel, GlassPanel, PanelHeader } from './Surfaces.jsx';
import { pushRecent } from '../lib/userContext.js';
import './DossierPage.css';

function npcRecord(slug) {
  const name = F.npcs.hearthvale.find((n) => slugify(n) === slug);
  if (!name) return null;
  const hooks = (F.npcs.hooks || []).filter((h) => {
    const first = name.split(' ')[0].toLowerCase();
    return h.toLowerCase().includes(name.toLowerCase()) || h.toLowerCase().includes(first);
  });
  return { name, hooks };
}

export default function NpcPage({ slug, navigate }) {
  const rec = npcRecord(slug);
  if (!rec) {
    return (
      <Page className="dos"><button className="dos__back" onClick={() => navigate('#/floors/1')}>← Floor 1</button>
        <GlassPanel><p style={{ color: 'var(--bone-dim)' }}>No such name in the Hearthvale records.</p></GlassPanel></Page>
    );
  }
  pushRecent({ label: rec.name, route: '#/floors/1/npcs/' + slug, kind: 'npc' });
  const others = F.npcs.hearthvale.filter((n) => n !== rec.name).slice(0, 8);

  return (
    <Page variant="wide" className="dos" style={{ '--accent': 'var(--accent-authority)' }}>
      <div className="dos__topnav">
        <button className="dos__back" onClick={() => navigate('#/floors/1')}>← Floor 1</button>
        <span className="dos__crumb">The Verdant Reach · Hearthvale · <b>{rec.name}</b></span>
      </div>
      <header className="dos__head">
        <p className="dos__eyebrow">Named Soul of Hearthvale</p>
        <h1 className="dos__title">{rec.name}</h1>
        <p className="dos__sub">City of First Light</p>
      </header>

      <EditorialSplit
        flip
        aside={
          <div className="dos__art">
            <ArtSlot variant="portrait" label="Portrait" path={`images/npcs/${slugify(rec.name)}.png`} src={`/images/npcs/${slugify(rec.name)}.png`} alt={`${rec.name} portrait`} />
          </div>
        }
      >
        <VellumPanel>
          {rec.hooks.length > 0 ? (
            <>
              <PanelHeader eyebrow="The Guild Notes" title="What is Known" />
              {rec.hooks.map((h) => <p key={h} className="dos__p">{h}</p>)}
            </>
          ) : (
            <p className="dos__p dos__p--dim">A known figure of Hearthvale. Their full story is not yet recorded here.</p>
          )}
          <div className="dos__coming">
            <span className="dos__coming-h">Expanded Entry — Coming</span>
            <span className="dos__coming-t">Role, personality, questlines, relationships, and dialogue to be added.</span>
          </div>
        </VellumPanel>
      </EditorialSplit>

      {others.length > 0 && (
        <section className="dos__related">
          <h2 className="dos__related-h">Other Souls of Hearthvale</h2>
          <div className="dos__relrow">
            {others.map((n) => <button key={n} className="dos__relchip" onClick={() => navigate('#/floors/1/npcs/' + slugify(n))}>{n}</button>)}
          </div>
        </section>
      )}
    </Page>
  );
}
