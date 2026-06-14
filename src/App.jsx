import { useEffect, useState } from 'react';
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
import TopBar from './components/TopBar.jsx';
import Breadcrumbs from './components/Breadcrumbs.jsx';
import CommandPalette from './components/CommandPalette.jsx';
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

// Everything that isn't the home view. Returns null when we ARE home.
function RouteView({ route, navigate }) {
  const [seg0, seg1, seg2, seg3] = route.parts;

  if (seg0 === 'heroes' && seg1) return <HeroPage id={seg1} navigate={navigate} />;

  if (seg0 === 'systems') return <GameSystemsPage navigate={navigate} />;
  if (seg0 === 'truth') return (<><Truth /><Footer /></>);
  if (seg0 === 'climbers') return (<><Cast navigate={navigate} /><Footer /></>);

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
  const [searchOpen, setSearchOpen] = useState(false);

  // Global "/" to open search (ignore when typing in a field).
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target?.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea' || e.target?.isContentEditable;
      if (e.key === '/' && !typing && !searchOpen) { e.preventDefault(); setSearchOpen(true); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen]);

  // The Tower hero + main hub mount ONCE and persist for the whole session.
  return (
    <>
      <TopBar navigate={navigate} route={route} onOpenSearch={() => setSearchOpen(true)} />
      <Breadcrumbs route={route} navigate={navigate} />

      <div style={{ display: isHome ? 'block' : 'none' }}>
        <Hero />
        <MainHub navigate={navigate} />
        <Footer />
      </div>

      {!isHome && <RouteView route={route} navigate={navigate} />}

      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} navigate={navigate} />
    </>
  );
}
