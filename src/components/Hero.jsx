import { useEffect, useRef } from 'react';
import { SpireScene } from './SpireScene.js';
import { getPref, setPref } from '../lib/userContext.js';
import './Hero.css';

export default function Hero() {
  const seenIntro = getPref('seenIntro', false);
  const skipToArchive = () => {
    setPref('seenIntro', true);
    const hub = document.querySelector('.mhub');
    if (hub) hub.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const overlayRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const scene = new SpireScene(canvasRef.current);
    sceneRef.current = scene;
    scene.start();

    let ticking = false;
    const applyScroll = () => {
      ticking = false;
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const t = total > 0 ? Math.min(Math.max(-rect.top, 0), total) / total : 0;
      scene.setScroll(t);
      if (overlayRef.current) overlayRef.current.style.setProperty('--climb', t.toFixed(3));
    };
    // Coalesce scroll events to one update per frame (was firing synchronously
    // on every scroll event, writing to the 3D scene + a CSS var each time).
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(applyScroll); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    applyScroll();

    // Pause the (expensive) 3D render loop whenever the hero isn't on screen.
    const vis = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          scene.resume();
          // If we were hidden (display:none) and layout changed, re-fit.
          if (typeof scene._onResize === 'function') scene._onResize();
        } else {
          scene.pause();
        }
      },
      { threshold: 0.01 }
    );
    if (heroRef.current) vis.observe(heroRef.current);

    // Pause/resume on tab visibility — but only resume if the hero is actually
    // on-screen. offsetParent is null when an ancestor is display:none (i.e. we
    // navigated to another route), so we don't wake the 3D loop on other pages.
    const onVisibility = () => {
      if (document.hidden) { scene.pause(); return; }
      const el = heroRef.current;
      if (el && el.offsetParent !== null) scene.resume();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      vis.disconnect();
      scene.dispose();
    };
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero__sticky">
        <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
        <div className="hero__vignette" aria-hidden="true" />

        <div className="hero__overlay" ref={overlayRef} style={{ '--climb': 0 }}>
          <p className="hero__lore">They say the Spire grants any wish — to whoever reaches the top.</p>
          <h1 className="hero__title">
            <span className="hero__title-bright">SPIREBOUND</span>
            <span className="hero__title-gold" aria-hidden="true">SPIREBOUND</span>
          </h1>
          <p className="hero__tagline">Climb high enough, and you begin to remember what you climbed to forget.</p>
        </div>

        <div className="hero__foreground" aria-hidden="true" />

        <button className="hero__skip" onClick={skipToArchive}>
          {seenIntro ? 'Enter the Archive →' : 'Skip Introduction →'}
        </button>
        <a className="hero__scroll" href="#truth" onClick={() => setPref('seenIntro', true)}>Begin the ascent ↓</a>
      </div>
    </section>
  );
}
