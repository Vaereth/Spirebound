import { useEffect, useRef } from 'react';
import { SpireScene } from './SpireScene.js';
import './Hero.css';

export default function Hero() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const overlayRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const scene = new SpireScene(canvasRef.current);
    sceneRef.current = scene;
    scene.start();

    const onScroll = () => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const t = total > 0 ? Math.min(Math.max(-rect.top, 0), total) / total : 0;
      scene.setScroll(t);
      if (overlayRef.current) overlayRef.current.style.setProperty('--climb', t.toFixed(3));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Pause the (expensive) 3D render loop whenever the hero isn't on screen.
    const vis = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) scene.resume(); else scene.pause(); },
      { threshold: 0.01 }
    );
    if (heroRef.current) vis.observe(heroRef.current);

    // Also pause when the tab is hidden.
    const onVisibility = () => { document.hidden ? scene.pause() : scene.resume(); };
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

        <a className="hero__scroll" href="#truth">Begin the ascent ↓</a>
      </div>
    </section>
  );
}
