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

function BackBar({ navigate }) {
  return (
    <div className="entry__nav" style={{ position: 'sticky', top: 0, zIndex: 30, display: 'flex', gap: '0.8rem', alignItems: 'center', padding: '0.75rem max(1.5rem,4vw)', background: 'color-mix(in srgb, var(--ink) 86%, transparent)', backdropFilter: 'blur(10px)', borderBottom: 'var(--edge)' }}>
      <button className="entry__back" onClick={() => navigate('#/')}>← Home</button>
    </div>
  );
}

// Everything that isn't the home view. Returns null when we ARE home.
function RouteView({ route, navigate }) {
  const [seg0, seg1, seg2, seg3] = route.parts;

  if (seg0 === 'heroes' && seg1) return <HeroPage id={seg1} navigate={navigate} />;

  if (seg0 === 'systems') return <GameSystemsPage navigate={navigate} />;
  if (seg0 === 'truth') return (<><BackBar navigate={navigate} /><Truth /><Footer /></>);
  if (seg0 === 'climbers') return (<><BackBar navigate={navigate} /><Cast navigate={navigate} /><Footer /></>);

  if (seg0 === 'floors' && seg1 === '1') {
    if (seg2 === 'world') return <Floor1Page navigate={navigate} />;
    if (seg2 === 'regions') return <RegionsPage navigate={navigate} />;
    if (seg2 === 'fenrath') return <FenrathPage navigate={navigate} />;
    if (seg2 === 'systems') return <SystemsPage navigate={navigate} />;
    if (seg2 === 'sealed') return <DeepLorePage navigate={navigate} />;
    if (seg2 === 'bestiary' && seg3) return <CreaturePage id={seg3} navigate={navigate} />;
    if (seg2 === 'bestiary') return <BestiaryPage navigate={navigate} />;
    if (seg2 === 'npcs' && seg3) return <NpcPage slug={seg3} navigate={navigate} />;
    if (seg2 === 'professions' && seg3) return <ProfessionPage slug={seg3} navigate={navigate} />;
    return <Floor1Hub navigate={navigate} />;
  }

  if (seg0 === 'floors' && !seg1) return (<><Floors navigate={navigate} /><Footer /></>);

  return null; // home
}

export default function App() {
  const { route, navigate } = useHashRoute();
  const isHome = route.path === '/';

  // The Tower hero + main hub mount ONCE and persist for the whole session.
  // On non-home routes we just hide them (display:none) instead of unmounting,
  // so returning home is instant — no rebuilding the 3D scene. The hero's own
  // IntersectionObserver pauses its render loop while it's hidden.
  return (
    <>
      <div style={{ display: isHome ? 'block' : 'none' }}>
        <Hero />
        <MainHub navigate={navigate} />
        <Footer />
      </div>

      {!isHome && <RouteView route={route} navigate={navigate} />}
    </>
  );
}
