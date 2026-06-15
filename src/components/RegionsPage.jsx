import { useState } from 'react';
import { FLOOR1 as F } from '../data/floor1.js';
import { Page, MasterDetail, Stack, CardMatrix } from './Layout.jsx';
import { WorldPanel, GlassPanel, PanelHeader } from './Surfaces.jsx';
import { QuickFacts } from './UIKit.jsx';
import './RegionsPage.css';

// Per-region material identity (directive §14): terrain motif + accent.
const REGION_MOTIF = {
  'The Dawnfields':     { motif: 'fields',  glyph: '🌾', tone: 'Warm gold · wide skies · wheat & roads' },
  'Silverrun':          { motif: 'water',   glyph: '≈',  tone: 'Layered water · blue-white channels · wetland' },
  'Windmere Hills':     { motif: 'air',     glyph: '☁',  tone: 'Air lines · mountain silhouettes · verticality' },
  'Briarwood':          { motif: 'roots',   glyph: '❦',  tone: 'Root patterns · dark green · fungal glow' },
  'The Old March':      { motif: 'ruins',   glyph: '⚔',  tone: 'Desaturated earth · broken banners · ruins' },
  'Crownward Expanse':  { motif: 'stone',   glyph: '◈',  tone: 'Pale stone · rune lines · obelisks' },
};

export default function RegionsPage({ navigate }) {
  const regions = F.regions;
  const [sel, setSel] = useState(0);
  const r = regions[sel];
  const motif = REGION_MOTIF[r.name] || { glyph: '✦', tone: '' };

  return (
    <Page variant="wide" className="reg" style={{ '--accent': r.accent }}>
      <div className="reg__topnav">
        <button className="reg__back" onClick={() => navigate('#/floors/1')}>← Floor 1</button>
        <span className="reg__crumb">The Verdant Reach · <b>Regions</b></span>
      </div>

      <header className="reg__head">
        <p className="reg__eyebrow">Geography of the Reach</p>
        <h1 className="reg__title">The Six Lands</h1>
        <p className="reg__lead">{F.layout.intro}</p>
      </header>

      {/* master-detail: region list + selected region */}
      <MasterDetail
        className="reg__md"
        master={
          <div className="reg__list" role="listbox" aria-label="Regions">
            {regions.map((rg, i) => {
              const m = REGION_MOTIF[rg.name] || { glyph: '✦' };
              return (
                <button key={rg.name} role="option" aria-selected={sel === i}
                  className={`reg__listitem ${sel === i ? 'is-on' : ''}`} style={{ '--accent': rg.accent }}
                  onClick={() => setSel(i)}>
                  <span className="reg__listglyph">{m.glyph}</span>
                  <span className="reg__listname">{rg.name}</span>
                  <span className="reg__listdir">{F.layout.regions[i]?.dir}</span>
                </button>
              );
            })}
          </div>
        }
        detail={
          <Stack gap="default">
            <WorldPanel accent={r.accent} className={`reg__hero reg__hero--${motif.motif}`}>
              <div className="reg__heroband" aria-hidden="true"><span className="reg__heroglyph">{motif.glyph}</span></div>
              <div className="reg__heroinfo">
                <span className="reg__heroeyebrow">{motif.tone}</span>
                <h2 className="reg__heroname">{r.name}</h2>
                <p className="reg__heroterrain">{r.terrain}</p>
              </div>
            </WorldPanel>

            <CardMatrix min={260}>
              <GlassPanel accent={r.accent}><PanelHeader eyebrow="Gameplay" accent={r.accent} /><p className="reg__p">{r.play}</p></GlassPanel>
              <GlassPanel accent={r.accent}><PanelHeader eyebrow="Themes" accent={r.accent} /><p className="reg__p">{r.themes}</p></GlassPanel>
            </CardMatrix>

            <GlassPanel accent={r.accent}>
              <PanelHeader eyebrow="Position in the Reach" accent={r.accent} />
              <p className="reg__p">{F.layout.regions[sel]?.text}</p>
            </GlassPanel>
          </Stack>
        }
      />

      <GlassPanel className="reg__travel">
        <PanelHeader eyebrow="West → East" title="Travel Across the Reach" />
        <p className="reg__p">{F.layout.travel}</p>
      </GlassPanel>
    </Page>
  );
}
