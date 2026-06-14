import { useEffect, useRef, useState } from 'react';
import { FLOOR1 as F } from '../data/floor1.js';
import { slugify } from '../lib/slug.js';
import './Floor1.css';

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Fail-safe: if IntersectionObserver is unavailable, just show it.
    if (typeof IntersectionObserver === 'undefined') { el.classList.add('in'); return; }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { el.classList.add('in'); io.unobserve(el); } });
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    // Safety net: reveal after a beat even if the observer never fires.
    const t = setTimeout(() => el.classList.add('in'), 1200);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  return <div ref={ref} className={`f1reveal ${className}`}>{children}</div>;
}

function MapBlock() {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="f1map">
      {!failed ? (
        <a className="f1map__link" href="/images/floor1-map.png" target="_blank" rel="noopener noreferrer">
          <img
            className="f1map__img"
            src="/images/floor1-map.png"
            alt="Hand-drawn regional map of Floor 1, The Verdant Reach"
            loading="lazy"
            onError={() => setFailed(true)}
          />
          <span className="f1map__zoom">Open full map ⤢</span>
        </a>
      ) : (
        <div className="f1map__fallback" role="img" aria-label="Floor 1 map placeholder">
          <div className="f1map__fallback-inner">
            <span className="f1map__fallback-rune">✦</span>
            <p className="f1map__fallback-title">Map of Floor 1 — The Verdant Reach</p>
            <p className="f1map__fallback-note">
              Place the map image at <code>public/images/floor1-map.png</code> to display it here.
            </p>
          </div>
        </div>
      )}
      <figcaption className="f1map__cap">Map of Floor 1 — The Verdant Reach</figcaption>
    </figure>
  );
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="f1sec">
      <Reveal>
        {eyebrow && <p className="f1sec__eyebrow">{eyebrow}</p>}
        {title && <h2 className="f1sec__title">{title}</h2>}
      </Reveal>
      {children}
    </section>
  );
}

export default function Floor1Page({ navigate }) {
  return (
    <div className="f1">
      {/* Banner */}
      <header className="f1banner">
        <div className="f1banner__veil" aria-hidden="true" />
        <div className="f1banner__inner wrap">
          <button className="f1back" onClick={() => navigate('#/floors/1')}>← Floor 1 Console</button>
          <p className="f1banner__floor">Floor {F.numeral} · The Living World</p>
          <h1 className="f1banner__name">{F.name}</h1>
          <p className="f1banner__epigraph">“{F.epigraph}”</p>
        </div>
      </header>

      <div className="wrap f1body">
        <Section id="overview" eyebrow="The Floor" title="A world, not a tutorial">
          <Reveal><p className="f1lead">{F.overview}</p></Reveal>
        </Section>

        <Section id="layout" eyebrow="Geography" title="From Hearthvale to the Gate">
          <Reveal><p className="f1lead">{F.layout.intro}</p></Reveal>
          <div className="f1grid f1grid--layout">
            {F.layout.regions.map((r) => (
              <Reveal key={r.dir} className="f1card f1card--compass">
                <span className="f1card__dir">{r.dir}</span>
                <p className="f1card__text">{r.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal><p className="f1note">{F.layout.travel}</p></Reveal>
        </Section>

        <Section id="hearthvale" eyebrow="The Starting City" title="Hearthvale, City of First Light">
          <Reveal><p className="f1lead">{F.hearthvale.blurb}</p></Reveal>
          <Reveal className="f1chips">
            {F.hearthvale.locations.map((l) => <span key={l} className="f1chip">{l}</span>)}
          </Reveal>
        </Section>

        <Section id="danger" eyebrow="Survival" title="Danger & the tended roads">
          <div className="f1danger">
            {F.danger.tiers.map((t) => (
              <Reveal key={t.level} className="f1danger__tier" style={{ '--c': t.color }}>
                <div className="f1danger__head"><span className="f1danger__dot" /><span className="f1danger__level">{t.level}</span></div>
                <p className="f1danger__places">{t.places.join(' · ')}</p>
              </Reveal>
            ))}
          </div>
          <Reveal><p className="f1rule">{F.danger.rule}</p></Reveal>
          <Reveal><p className="f1note">{F.danger.roads}</p></Reveal>
          <Reveal><p className="f1rumor">{F.danger.rumor}</p></Reveal>
        </Section>

        <Section id="seasons" eyebrow="The Turning Year" title="Seasons, weather & migration">
          <div className="f1cols">
            <Reveal className="f1col">
              <h4 className="f1subh">Time scale</h4>
              <ul className="f1ulist">{F.seasons.scale.map((s) => <li key={s}>{s}</li>)}</ul>
              <h4 className="f1subh">Season phases</h4>
              <div className="f1phases">
                {F.seasons.phases.map((p) => (
                  <div key={p.day} className="f1phase"><span className="f1phase__day">{p.day}</span><span className="f1phase__name">{p.name}</span></div>
                ))}
              </div>
              <p className="f1note">{F.seasons.migration}</p>
            </Reveal>
            <Reveal className="f1col">
              <h4 className="f1subh">Weather</h4>
              <div className="f1chips">{F.weather.types.map((w) => <span key={w} className="f1chip">{w}</span>)}</div>
              <p className="f1note"><strong>Affects:</strong> {F.weather.affects.join(', ')}.</p>
              <p className="f1rule">{F.weather.note}</p>
            </Reveal>
          </div>
          <Reveal><p className="f1lead">{F.ecology}</p></Reveal>
        </Section>

        <Section id="guild" eyebrow="Institutions" title="The Ascendant Guild & the Plates">
          <div className="f1cols">
            <Reveal className="f1col">
              <h4 className="f1subh">Guild functions</h4>
              <div className="f1chips">{F.guild.functions.map((f) => <span key={f} className="f1chip">{f}</span>)}</div>
              <div className="f1quotecard">
                <p className="f1quote">“{F.guild.appraiser.quote}”</p>
                <p className="f1quote__by">— {F.guild.appraiser.name}, {F.guild.appraiser.role}</p>
              </div>
              <p className="f1note"><strong>Monster turn-ins:</strong> {F.guild.turnins.join(', ')}.</p>
            </Reveal>
            <Reveal className="f1col">
              <h4 className="f1subh">Adventurer Plates</h4>
              <p className="f1lead f1plates__floor">Floor 1: <strong>{F.plates.floor1}</strong></p>
              <p className="f1note">{F.plates.note}</p>
              <div className="f1ladder">
                {F.plates.fullLadder.map((p, i) => (
                  <span key={p} className={`f1ladder__step ${i <= 1 ? 'is-now' : ''}`}>{p}</span>
                ))}
              </div>
              <p className="f1note f1note--small">{F.plates.ladderNote}</p>
            </Reveal>
          </div>
        </Section>

        <Section id="professions" eyebrow="Crafts of the Reach" title="Professions & mentors">
          <Reveal><p className="f1note">{F.professions.starter}</p></Reveal>
          <Reveal className="f1chips">{F.professions.core.map((p) => <button key={p} className="f1chip f1chip--link" onClick={() => navigate('#/floors/1/professions/' + slugify(p))}>{p}</button>)}</Reveal>
          <div className="f1grid f1grid--mentors">
            {F.professions.mentors.map((m) => (
              <Reveal key={m.name} className="f1mentor">
                <span className="f1mentor__name">{m.name}</span>
                <span className="f1mentor__craft">{m.craft}</span>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section id="progression" eyebrow="The Climb" title="Levels & the cap">
          <div className="f1cols">
            <Reveal className="f1col">
              <p className="f1lead">Start at <strong>{F.progression.start}</strong>. The pre-Fenrath cap is <strong>{F.progression.cap}</strong>.</p>
              <div className="f1steps">
                {F.progression.steps.map((s) => (
                  <div key={s.lvl} className="f1step"><span className="f1step__lvl">{s.lvl}</span><span className="f1step__at">{s.at}</span></div>
                ))}
              </div>
            </Reveal>
            <Reveal className="f1col">
              <ul className="f1ulist f1ulist--notes">{F.progression.notes.map((n) => <li key={n}>{n}</li>)}</ul>
            </Reveal>
          </div>
        </Section>

        <Section id="npcs" eyebrow="The People" title="Named souls of Hearthvale">
          <Reveal className="f1chips">{F.npcs.hearthvale.map((n) => <button key={n} className="f1chip f1chip--npc f1chip--link" onClick={() => navigate('#/floors/1/npcs/' + slugify(n))}>{n}</button>)}</Reveal>
          <h4 className="f1subh">Lore hooks</h4>
          <div className="f1hooks">
            {F.npcs.hooks.map((h) => <Reveal key={h} className="f1hook">{h}</Reveal>)}
          </div>
        </Section>

        <Section id="quests" eyebrow="Tasks of the Reach" title="Quests">
          <Reveal><p className="f1lead"><strong>{F.quests.authored}.</strong> {F.quests.excludes}</p></Reveal>
          <Reveal className="f1chips">{F.quests.categories.map((c) => <span key={c} className="f1chip">{c}</span>)}</Reveal>
          <Reveal><p className="f1rule">{F.quests.msq}</p></Reveal>
        </Section>

        <Section id="proofs" eyebrow="The Gate's Conditions" title="The Five Guardian Proofs">
          <Reveal><p className="f1lead">{F.proofs.intro}</p></Reveal>
          <div className="f1grid f1grid--proofs">
            {F.proofs.list.map((p) => (
              <Reveal key={p.n} className="f1proof">
                <span className="f1proof__n">{p.n}</span>
                <h4 className="f1proof__name">{p.name}</h4>
                <span className="f1proof__region">{p.region}</span>
                <p className="f1proof__rep">{p.rep}</p>
              </Reveal>
            ))}
          </div>
          <div className="f1gates">
            {F.proofs.gates.map((g) => (
              <Reveal key={g.count} className="f1gate">
                <span className="f1gate__count">{g.count}</span>
                <pre className="f1gate__msg">{g.gate}</pre>
                <pre className="f1gate__fenrath">{g.fenrath}</pre>
              </Reveal>
            ))}
          </div>
          <Reveal><p className="f1note f1note--small">{F.proofs.proofNote}</p></Reveal>
        </Section>

        <Section id="tbd" eyebrow="Design Status" title="Still to be designed">
          <Reveal className="f1chips f1chips--tbd">
            {F.tbd.map((t) => <span key={t} className="f1chip f1chip--tbd">{t}</span>)}
          </Reveal>
        </Section>
      </div>

      <footer className="f1foot">
        <button className="f1back" onClick={() => navigate('#/floors/1')}>← Back to the Floor 1 Console</button>
      </footer>
    </div>
  );
}
