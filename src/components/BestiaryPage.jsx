import Bestiary from './Bestiary.jsx';
import { Page } from './Layout.jsx';

export default function BestiaryPage({ navigate }) {
  return (
    <Page variant="wide" style={{ paddingTop: 'var(--sp-3)', paddingBottom: 'var(--sp-5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', padding: 'var(--sp-2) 0 var(--sp-3)', flexWrap: 'wrap' }}>
        <button onClick={() => navigate('#/floors/1')} style={{ cursor: 'pointer', fontFamily: 'var(--font-util)', fontSize: '0.8rem', color: 'var(--bone-dim)', background: 'var(--surface-2)', border: 'var(--edge)', borderRadius: '40px', padding: '0.5rem 1rem' }}>← Floor 1</button>
        <span style={{ fontFamily: 'var(--font-util)', fontSize: '0.78rem', color: 'var(--bone-dim)' }}>The Verdant Reach · <b style={{ color: 'var(--bone)' }}>Bestiary</b></span>
      </div>
      <Bestiary navigate={navigate} />
    </Page>
  );
}
