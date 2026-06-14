import './Corven.css';

// A simple, friendly stick-figure guildmaster at his desk. Pure SVG + CSS;
// no animation loop, no canvas — zero render cost beyond a static draw.
export default function Corven({ line }) {
  return (
    <div className="corven">
      {line && (
        <div className="corven__bubble" key={line}>
          <p className="corven__line">{line}</p>
          <span className="corven__tail" aria-hidden="true" />
        </div>
      )}

      <svg className="corven__fig" viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" aria-label="Guildmaster Corven Hale">
        {/* desk */}
        <rect x="10" y="112" width="100" height="10" rx="2" className="corven__desk" />
        <rect x="16" y="122" width="6" height="16" className="corven__desk" />
        <rect x="98" y="122" width="6" height="16" className="corven__desk" />
        {/* a ledger on the desk */}
        <rect x="64" y="106" width="26" height="8" rx="1" className="corven__ledger" transform="rotate(-4 77 110)" />

        {/* body */}
        <g className="corven__body">
          {/* head */}
          <circle cx="52" cy="34" r="14" className="corven__skin" />
          {/* simple hair + beard (human, weathered guildmaster) */}
          <path d="M38 30 Q40 18 52 18 Q64 18 66 30 Q60 24 52 24 Q44 24 38 30 Z" className="corven__hair" />
          <path d="M40 40 Q52 56 64 40 Q60 50 52 50 Q44 50 40 40 Z" className="corven__hair" />
          {/* eyes */}
          <circle cx="47" cy="34" r="1.6" className="corven__ink" />
          <circle cx="57" cy="34" r="1.6" className="corven__ink" />
          {/* torso (tabard) */}
          <path d="M52 48 L52 92" className="corven__limb" />
          <path d="M40 96 L52 60 L64 96 L52 88 Z" className="corven__tabard" />
          {/* guild emblem on tabard */}
          <path d="M52 70 l3 5 -3 3 -3 -3 z" className="corven__emblem" />
          {/* arms — one resting on the desk */}
          <path d="M52 60 Q34 66 26 110" className="corven__limb" />
          <path d="M52 60 Q70 66 80 108" className="corven__limb" />
          {/* legs (behind desk, just hinted) */}
          <path d="M52 92 L44 112" className="corven__limb" />
          <path d="M52 92 L60 112" className="corven__limb" />
        </g>
      </svg>

      <span className="corven__name">Guildmaster Corven Hale</span>
    </div>
  );
}
