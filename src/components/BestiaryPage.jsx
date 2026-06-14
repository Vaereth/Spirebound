import Bestiary from './Bestiary.jsx';
import './EntryPage.css';

export default function BestiaryPage({ navigate }) {
  return (
    <div className="entry" style={{ '--accent': '#5E9C68' }}>
      <div className="entry__nav">
        <button className="entry__back" onClick={() => navigate('#/floors/1')}>← Floor 1</button>
        <span className="entry__crumb">The Verdant Reach · <b>Bestiary</b></span>
        <button className="entry__back" onClick={() => navigate('#/floors/1/systems')} style={{ marginLeft: 'auto' }}>Stats &amp; Systems →</button>
      </div>
      <div className="entry__body" style={{ paddingTop: 'var(--sp-4)' }}>
        <Bestiary navigate={navigate} />
      </div>
    </div>
  );
}
