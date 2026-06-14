import { FLOOR1 as F } from '../data/floor1.js';
import './FenrathPage.css';

export default function FenrathPage({ navigate }) {
  const fn = F.fenrath;
  return (
    <div className="fen">
      <div className="fen__vignette" aria-hidden="true" />
      <div className="fen__nav">
        <button className="fen__back" onClick={() => navigate('#/floors/1')}>← The Verdant Reach</button>
        <span className="fen__crumb">Floor 1 · The First Guardian</span>
      </div>

      <header className="fen__banner">
        <p className="fen__eyebrow">Guardian of the First Gate</p>
        <h1 className="fen__name">Fenrath</h1>
        <p className="fen__sub">The First Guardian — the warden of the Gate of First Ascent</p>
        <div className="fen__titles">
          {fn.titles.map((t) => <span key={t} className="fen__title">{t}</span>)}
        </div>
      </header>

      <div className="fen__body">
        <section className="fen__sec">
          <h2 className="fen__h">The Barrier</h2>
          <p className="fen__p">{fn.public}</p>
        </section>

        <section className="fen__sec">
          <h2 className="fen__h">The Arena</h2>
          <p className="fen__p">{fn.arena}</p>
        </section>

        <section className="fen__sec fen__sec--truth">
          <h2 className="fen__h fen__h--truth">What the Guild Will Only Whisper</h2>
          <p className="fen__p">{fn.guardianRole}</p>
        </section>

        <section className="fen__sec">
          <h2 className="fen__h">The Gate's Conditions</h2>
          <p className="fen__p fen__p--dim">{F.proofs.intro}</p>
          <div className="fen__gates">
            {F.proofs.gates.map((g) => (
              <div key={g.count} className="fen__gate">
                <span className="fen__gatecount">{g.count}</span>
                <pre className="fen__gatemsg">{g.gate}</pre>
                <pre className="fen__gatevoice">{g.fenrath}</pre>
              </div>
            ))}
          </div>
        </section>

        <div className="fen__coming">
          <p className="fen__coming-h">The Hunt — Coming</p>
          <p className="fen__coming-t">Full attack list, phase transitions, the proofless challenge, and what comes after his death remain sealed. To be unsealed when the time is right.</p>
        </div>

        <div className="fen__foot">
          <button className="fen__back" onClick={() => navigate('#/floors/1')}>← Return to the Reach</button>
        </div>
      </div>
    </div>
  );
}
