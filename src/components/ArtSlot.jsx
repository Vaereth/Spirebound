import { useState } from 'react';
import './ArtSlot.css';

// A reserved image slot. Renders the image if present; otherwise a tasteful
// labelled placeholder telling you (and artists) exactly what file to drop in.
//
// variant: 'dossier' | 'render' | 'splash' | 'portrait' | 'boss' | 'emblem'
export default function ArtSlot({ src, alt, label, path, variant = 'render', ratio }) {
  const [failed, setFailed] = useState(false);
  const cls = `art art--${variant}`;
  const styleRatio = ratio ? { aspectRatio: ratio } : undefined;

  if (!failed && src) {
    return (
      <figure className={cls} style={styleRatio}>
        <a className="art__link" href={src} target="_blank" rel="noopener noreferrer">
          <img className="art__img" src={src} alt={alt || label} loading="lazy" onError={() => setFailed(true)} />
          <span className="art__zoom">⤢</span>
        </a>
        {label && <figcaption className="art__cap">{label}</figcaption>}
      </figure>
    );
  }

  return (
    <figure className={`${cls} art--empty`} style={styleRatio} role="img" aria-label={`${label || 'Art'} — placeholder`}>
      <div className="art__placeholder">
        <span className="art__rune" aria-hidden="true">✦</span>
        <span className="art__label">{label || 'Art'}</span>
        {path && <span className="art__path">{path}</span>}
      </div>
    </figure>
  );
}
