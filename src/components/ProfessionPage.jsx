import { FLOOR1 as F } from '../data/floor1.js';
import { slugify } from '../lib/slug.js';
import ArtSlot from './ArtSlot.jsx';
import { Page, EditorialSplit } from './Layout.jsx';
import { VellumPanel, GlassPanel, PanelHeader } from './Surfaces.jsx';
import './DossierPage.css';

export default function ProfessionPage({ slug, navigate }) {
  const name = F.professions.core.find((p) => slugify(p) === slug);
  if (!name) {
    return (
      <Page className="dos"><button className="dos__back" onClick={() => navigate('#/floors/1')}>← Floor 1</button>
        <GlassPanel><p style={{ color: 'var(--bone-dim)' }}>No such profession in the Guild records.</p></GlassPanel></Page>
    );
  }
  const mentor = F.professions.mentors.find((m) => slugify(m.craft) === slug || m.craft.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(m.craft.toLowerCase()));
  const others = F.professions.core.filter((p) => p !== name).slice(0, 10);

  return (
    <Page variant="wide" className="dos" style={{ '--accent': 'var(--accent-interface)' }}>
      <div className="dos__topnav">
        <button className="dos__back" onClick={() => navigate('#/floors/1')}>← Floor 1</button>
        <span className="dos__crumb">The Verdant Reach · Professions · <b>{name}</b></span>
      </div>
      <header className="dos__head">
        <p className="dos__eyebrow">Craft of the Reach</p>
        <h1 className="dos__title">{name}</h1>
        {mentor && <p className="dos__sub">Mentor in Hearthvale: {mentor.name}</p>}
      </header>

      <EditorialSplit
        flip
        aside={
          <div className="dos__art">
            <ArtSlot variant="portrait" label="Craft" path={`images/professions/${slug}.png`} src={`/images/professions/${slug}.png`} alt={`${name}`} />
          </div>
        }
      >
        <GlassPanel accent="var(--accent-interface)">
          <PanelHeader eyebrow="Starter Access" />
          <p className="dos__p">{F.professions.starter}</p>
          {mentor && (<><PanelHeader eyebrow="Mentor" /><p className="dos__p"><b>{mentor.name}</b> teaches {mentor.craft} in Hearthvale.</p></>)}
          <div className="dos__coming">
            <span className="dos__coming-h">Expanded Entry — Coming</span>
            <span className="dos__coming-t">Recipes, gathering nodes, tiers, station upgrades, and profession quests to be added.</span>
          </div>
        </GlassPanel>
      </EditorialSplit>

      <section className="dos__related">
        <h2 className="dos__related-h">Other Professions</h2>
        <div className="dos__relrow">
          {others.map((p) => <button key={p} className="dos__relchip" onClick={() => navigate('#/floors/1/professions/' + slugify(p))}>{p}</button>)}
        </div>
      </section>
    </Page>
  );
}
