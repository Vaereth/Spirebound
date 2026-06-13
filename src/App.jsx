import Hero from './components/Hero.jsx';
import Truth from './components/Truth.jsx';
import Cast from './components/Cast.jsx';
import Floors from './components/Floors.jsx';
import Floor1Page from './components/Floor1Page.jsx';
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
  const [seg0, seg1] = route.parts;

  // #/floors/1 → dedicated Floor 1 page
  if (seg0 === 'floors' && seg1 === '1') {
    return <Floor1Page navigate={navigate} />;
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

  // default: the full main site (root, or any unknown hash)
  return (
    <>
      <Hero />
      <Truth />
      <Cast />
      <Floors navigate={navigate} />
      <Footer />
    </>
  );
}
