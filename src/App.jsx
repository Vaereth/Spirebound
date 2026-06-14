import Hero from './components/Hero.jsx';
import Truth from './components/Truth.jsx';
import Cast from './components/Cast.jsx';
import MainHub from './components/MainHub.jsx';
import GameSystemsPage from './components/GameSystemsPage.jsx';
import Floors from './components/Floors.jsx';
import Floor1Hub from './components/Floor1Hub.jsx';
import Floor1Page from './components/Floor1Page.jsx';
import RegionsPage from './components/RegionsPage.jsx';
import BestiaryPage from './components/BestiaryPage.jsx';
import HeroPage from './components/HeroPage.jsx';
import CreaturePage from './components/CreaturePage.jsx';
import NpcPage from './components/NpcPage.jsx';
import ProfessionPage from './components/ProfessionPage.jsx';
import FenrathPage from './components/FenrathPage.jsx';
import SystemsPage from './components/SystemsPage.jsx';
import DeepLorePage from './components/DeepLorePage.jsx';
import { useHashRoute } from './hooks/useHashRoute.js';
import './styles/tokens.css';
import './styles/global.css';

function Footer() {
  return (
    <footer style={{
      textAlign: 'center', padding: '4rem 1rem', color: 'var(--bone-dim)',
      fontFamily: 'var(--font-util)', fontSize: '0.8rem', letterSpacing: '0.2em',
      textTransform: 'uppercase', borderTop: 'var(--edge)'
    }}>
      Spirebound · Design Bible · Work in progress
    </footer>
  );
}

export default function App() {
  const { route, navigate } = useHashRoute();
  const [seg0, seg1, seg2, seg3] = route.parts;

  // ---- Hero pages: #/heroes/eluvain ----
  if (seg0 === 'heroes' && seg1) {
    return <HeroPage id={seg1} navigate={navigate} />;
  }

  // ---- Top-level game domains ----
  if (seg0 === 'systems') {
    return <GameSystemsPage navigate={navigate} />;
  }
  if (seg0 === 'truth') {
    return (
      <>
        <div className="entry__nav" style={{ position: 'sticky', top: 0, zIndex: 30, display: 'flex', gap: '0.8rem', alignItems: 'center', padding: '0.75rem max(1.5rem,4vw)', background: 'color-mix(in srgb, var(--ink) 86%, transparent)', backdropFilter: 'blur(10px)', borderBottom: 'var(--edge)' }}>
          <button className="entry__back" onClick={() => navigate('#/')}>← Home</button>
        </div>
        <Truth />
        <Footer />
      </>
    );
  }
  if (seg0 === 'climbers') {
    return (
      <>
        <div className="entry__nav" style={{ position: 'sticky', top: 0, zIndex: 30, display: 'flex', gap: '0.8rem', alignItems: 'center', padding: '0.75rem max(1.5rem,4vw)', background: 'color-mix(in srgb, var(--ink) 86%, transparent)', backdropFilter: 'blur(10px)', borderBottom: 'var(--edge)' }}>
          <button className="entry__back" onClick={() => navigate('#/')}>← Home</button>
        </div>
        <Cast navigate={navigate} />
        <Footer />
      </>
    );
  }

  // ---- Floor 1 sub-routes ----
  if (seg0 === 'floors' && seg1 === '1') {
    // #/floors/1/world → the lighter lore page
    if (seg2 === 'world') return <Floor1Page navigate={navigate} />;
    // #/floors/1/regions
    if (seg2 === 'regions') return <RegionsPage navigate={navigate} />;
    // #/floors/1/fenrath
    if (seg2 === 'fenrath') return <FenrathPage navigate={navigate} />;
    // #/floors/1/systems
    if (seg2 === 'systems') return <SystemsPage navigate={navigate} />;
    // #/floors/1/sealed → gated deep lore
    if (seg2 === 'sealed') return <DeepLorePage navigate={navigate} />;
    // #/floors/1/bestiary/:id → creature; #/floors/1/bestiary → list
    if (seg2 === 'bestiary' && seg3) return <CreaturePage id={seg3} navigate={navigate} />;
    if (seg2 === 'bestiary') return <BestiaryPage navigate={navigate} />;
    // #/floors/1/npcs/:slug
    if (seg2 === 'npcs' && seg3) return <NpcPage slug={seg3} navigate={navigate} />;
    // #/floors/1/professions/:slug
    if (seg2 === 'professions' && seg3) return <ProfessionPage slug={seg3} navigate={navigate} />;
    // #/floors/1 → the SAO-style hub console
    return <Floor1Hub navigate={navigate} />;
  }

  // #/floors → the Ascent overview on its own
  if (seg0 === 'floors' && !seg1) {
    return (
      <>
        <Floors navigate={navigate} />
        <Footer />
      </>
    );
  }

  // default: the Tower hero, then the navigable hub console
  return (
    <>
      <Hero />
      <MainHub navigate={navigate} />
      <Footer />
    </>
  );
}
