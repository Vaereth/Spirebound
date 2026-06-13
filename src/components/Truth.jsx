import { useEffect, useRef } from 'react';
import './Truth.css';

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? [];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.18 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

const TRUTHS = [
  { n: 'I', title: 'A Lie', body: 'Some climbers were never meant to reach the top. They are fuel — and the wish was only ever bait to bring them up.' },
  { n: 'II', title: 'A Price', body: 'For some, the wish is real. It works exactly as promised. The cost is simply more than any sane soul would pay if they knew it.' },
  { n: 'III', title: 'A Mirror', body: 'And for others, the Spire grants precisely what was asked — and that is the horror. You receive your wish, whole and unflinching.' },
];

export default function Truth() {
  const ref = useReveal();
  return (
    <section id="truth" className="truth" ref={ref}>
      <div className="wrap truth__inner">
        <p className="eyebrow reveal">The promise at the summit</p>
        <h2 className="truth__head reveal">
          The wish is a lie.
          <span className="truth__head-sub"> Or so you tell yourself, the higher you climb.</span>
        </h2>
        <p className="truth__lead reveal">
          Every climber is told the same thing: reach the top of the Spire and it will grant you anything.
          The truth is not one answer but three — and which one you find depends on what you came to wish for.
        </p>

        <div className="truth__grid">
          {TRUTHS.map((t) => (
            <article className="truth__card reveal" key={t.n}>
              <span className="truth__num">{t.n}</span>
              <h3 className="truth__card-title">{t.title}</h3>
              <p className="truth__card-body">{t.body}</p>
            </article>
          ))}
        </div>

        <p className="truth__close reveal">
          And beneath all three, the deepest cut: <span>you have climbed before.</span> So have the others.
          The Spire remembers, even when its climbers cannot.
        </p>
      </div>
    </section>
  );
}
