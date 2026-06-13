import { useEffect, useRef, useState } from 'react';
import { CAST, RESERVED_SLOTS } from '../data/cast.js';
import './Cast.css';

// --- tiny SVG radar for the 5 stat axes ---
function StatRadar({ stats, accent }) {
  const axes = [
    { key: 'health',   label: 'VIT' },
    { key: 'defense',  label: 'DEF' },
    { key: 'mobility', label: 'MOB' },
    { key: 'damage',   label: 'DMG' },
    { key: 'ceiling',  label: 'SKILL' },
  ];
  const N = axes.length, R = 58, cx = 72, cy = 72;
  const pt = (i, r) => {
    const a = (Math.PI * 2 * i) / N - Math.PI / 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const ring = (rr) => axes.map((_, i) => pt(i, rr).join(',')).join(' ');
  const shape = axes.map((ax, i) => pt(i, (stats[ax.key] / 5) * R).join(',')).join(' ');

  return (
    <svg className="radar" viewBox="0 0 144 150" aria-hidden="true">
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon key={f} points={ring(R * f)} className="radar__grid" />
      ))}
      {axes.map((_, i) => {
        const [x, y] = pt(i, R);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} className="radar__spoke" />;
      })}
      <polygon points={shape} className="radar__shape"
        style={{ fill: accent + '33', stroke: accent }} />
      {axes.map((ax, i) => {
        const [x, y] = pt(i, R + 14);
        return <text key={ax.key} x={x} y={y} className="radar__label">{ax.label}</text>;
      })}
    </svg>
  );
}

function Stat({ label, value }) {
  return (
    <div className="kv"><span className="kv__k">{label}</span><span className="kv__v">{value}</span></div>
  );
}

function SignatureBanner({ c, lines, sub, extra }) {
  const s = c.signature;
  return (
    <div className="sig" style={{ '--accent': c.accent }}>
      <div className="sig__frame">
        <div className="sig__top">
          <span className="sig__eyebrow">Signature Ability</span>
          <span className="sig__tag">Ultimate</span>
        </div>
        <h4 className="sig__name">{s.name}</h4>
        <p className="sig__activation">{s.activation}</p>
        <div className="sig__effects">
          {lines.map((d) => <span className="sig__effect" key={d}>{d}</span>)}
        </div>
        {sub}
        {extra}

        {s.drawback && (
          <div className="sig__drawback">
            <span className="sig__drawback-tag">Drawback · {s.drawback.name}</span>
            <p>{s.drawback.text}</p>
          </div>
        )}

        {s.flowScaling && <FlowScaling fs={s.flowScaling} />}

        {s.visualIdentity && (
          <>
            <h5 className="sig__subhead">Visual Identity</h5>
            <div className="sig__effects">
              {s.visualIdentity.map((v) => <span className="sig__effect" key={v}>{v}</span>)}
            </div>
          </>
        )}

        {s.visualEssence && <p className="sig__essence">{s.visualEssence}</p>}

        <p className="sig__theme">“{s.theme}”</p>
      </div>
    </div>
  );
}

function FlowScaling({ fs }) {
  return (
    <div className="fscale">
      <h5 className="sig__subhead">Flow Scaling — inherits her tier at activation</h5>
      <p className="kit__note">{fs.intro}</p>
      <div className="fscale__tiers">
        {fs.byTier.map((t) => (
          <div className="fscale__row" key={t.at}>
            <span className="fscale__at">{t.at}<small>hits</small></span>
            <span className="fscale__effect">{t.effect}</span>
          </div>
        ))}
      </div>
      <p className="kit__note fscale__balance"><strong>Risk &amp; reward — </strong>{fs.balance}</p>
      <div className="fscale__cols">
        <div>
          <span className="fscale__label">Flow Lock</span>
          <ul className="bullets">{fs.lock.map((l) => <li key={l}>{l}</li>)}</ul>
        </div>
        <div>
          <span className="fscale__label">Luan Ascendant (200)</span>
          <p className="kit__note">{fs.luanInteraction}</p>
        </div>
      </div>
      <span className="fscale__label">Visual Escalation by Tier</span>
      <div className="fscale__esc">
        {fs.visualEscalation.map((v) => (
          <div className="fscale__esc-row" key={v.tier}>
            <span className="fscale__esc-tier">{v.tier}</span>
            <span className="fscale__esc-notes">{v.notes}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EluvainKit({ c }) {
  const rs = c.runeSystem;
  return (
    <div className="kit kit--single">
      <div className="kit__col">
        <h4 className="kit__h">The Rune System</h4>
        <p className="kit__note">{rs.queue}</p>
        {rs.slotExamples && (
          <ul className="bullets" style={{ marginBottom: 'var(--sp-3)' }}>
            {rs.slotExamples.map((e) => <li key={e}>{e}</li>)}
          </ul>
        )}
        <ul className="runes">
          {rs.runes.map((r) => (
            <li key={r.name} className="rune">
              <span className="rune__name">{r.name}</span>
              <span className="rune__theme">{r.theme}</span>
              <span className="rune__gen">{r.gen}</span>
            </li>
          ))}
        </ul>
      </div>
      <SignatureBanner c={c} lines={c.signature.duringFreeze}
        sub={(
          <div className="sig__phase">
            <p><strong>Plan</strong> — {c.signature.planning}</p>
            <p><strong>Execute</strong> — {c.signature.execution}</p>
          </div>
        )}
        extra={c.signature.queueable && (
          <>
            <h5 className="sig__subhead">Queueable Inputs</h5>
            <div className="sig__effects">
              {c.signature.queueable.map((q) => <span className="sig__effect" key={q}>{q}</span>)}
            </div>
          </>
        )} />
    </div>
  );
}

function FeiyanKit({ c }) {
  const fs = c.flowSystem;
  const am = c.aerialMomentum;
  return (
    <div className="kit kit--single">
      <div className="kit__col">
        <h4 className="kit__h">The Flow System</h4>
        <p className="kit__note">{fs.rule}</p>
        <div className="flow__examples">
          <span className="flow__ex flow__ex--ok">Valid&nbsp; {fs.validExample}</span>
          <span className="flow__ex flow__ex--no">Broken&nbsp; {fs.brokenExample}</span>
        </div>
        <p className="kit__note"><em>{fs.counting}</em></p>
        <div className="flow">
          {fs.thresholds.map((th) => (
            <div key={th.at} className="flow__row">
              <span className="flow__at">{th.at}<small>hits</small></span>
              <span className="flow__name">{th.name}</span>
              <span className="flow__bonus">{th.bonus}</span>
            </div>
          ))}
        </div>
        <div className="flow__stack">
          <span className="flow__stack-label">Bonuses stack</span>
          <span className="flow__stack-chain">Damage → Crit Chance → Crit Damage → Additional Hits</span>
        </div>

        <div className="flow__aux">
          <h4 className="kit__h">Aerial Momentum <span className="kit__h-aside">— a system entirely separate from Flow</span></h4>
          <p className="kit__note">{am.intro}</p>
          <ul className="bullets">
            {am.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </div>
      <SignatureBanner c={c} lines={c.signature.effects}
        sub={(
          <>
            <div className="sig__phase">
              <p><strong>Charge</strong> — {c.signature.charge}</p>
            </div>
            <h5 className="sig__subhead">Attack Pattern</h5>
            <ul className="bullets">
              {c.signature.attackPattern.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </>
        )} />
    </div>
  );
}

function ClimberCard({ c, open, onToggle }) {
  return (
    <article className={`climber ${open ? 'is-open' : ''}`} style={{ '--accent': c.accent }}>
      <button className="climber__head" onClick={onToggle} aria-expanded={open}>
        <div className="climber__portrait" aria-hidden="true">
          <span className="climber__initial">{c.name[0]}</span>
        </div>
        <div className="climber__intro">
          <p className="climber__order">Climber {String(c.order).padStart(2, '0')}{c.isDefault ? ' · Default' : ''}</p>
          <h3 className="climber__name">{c.name}</h3>
          <p className="climber__epithet">{c.epithet}</p>
          <p className="climber__role">{c.identity.role}</p>
        </div>
        <div className="climber__radarwrap"><StatRadar stats={c.stats} accent={c.accent} /></div>
        <span className="climber__chev" aria-hidden="true">{open ? '–' : '+'}</span>
      </button>

      <p className="climber__fantasy">{c.coreFantasy}</p>

      <div className="climber__body">
        <div className="climber__cols">
          <div>
            <h4 className="kit__h">Identity</h4>
            <Stat label="Difficulty" value={c.identity.difficulty} />
            <Stat label="Health" value={c.identity.health} />
            <Stat label="Defense" value={c.identity.defense} />
            <Stat label="Mobility" value={c.identity.mobility} />
            <Stat label="Damage" value={c.identity.damage} />
            <Stat label="Skill Ceiling" value={c.identity.skillCeiling} />
          </div>
          <div>
            <h4 className="kit__h">Weapons</h4>
            {c.weapons.map((w) => (
              <div key={w.name} className="weapon">
                <p className="weapon__name">{w.name} <span>· {w.hand}</span></p>
                <p className="weapon__notes">{w.notes.join(' · ')}</p>
              </div>
            ))}
            <h4 className="kit__h" style={{ marginTop: '1.2rem' }}>Appearance</h4>
            <p className="kit__note">{c.appearance.join(' · ')}</p>
          </div>
        </div>
        {c.id === 'eluvain' ? <EluvainKit c={c} /> : <FeiyanKit c={c} />}
      </div>
    </article>
  );
}

export default function Cast() {
  const [openId, setOpenId] = useState('eluvain');
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? [];
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="cast" className="cast" ref={ref}>
      <div className="wrap">
        <p className="eyebrow reveal">The climbers</p>
        <h2 className="cast__head reveal">Six will climb. Two are remembered.</h2>
        <p className="cast__lead reveal">
          Each climber carries a different wish and a wholly different way of fighting.
          Where one wins by knowing, another wins by never stopping. Two are revealed; four remain in the mist.
        </p>

        <div className="cast__list">
          {CAST.map((c) => (
            <div className="reveal" key={c.id}>
              <ClimberCard c={c} open={openId === c.id} onToggle={() => setOpenId(openId === c.id ? null : c.id)} />
            </div>
          ))}

          {Array.from({ length: RESERVED_SLOTS }).map((_, i) => (
            <div className="reveal" key={`reserved-${i}`}>
              <article className="climber climber--reserved">
                <div className="climber__head climber__head--reserved">
                  <div className="climber__portrait climber__portrait--locked" aria-hidden="true">
                    <span className="climber__initial">?</span>
                  </div>
                  <div className="climber__intro">
                    <p className="climber__order">Climber {String(CAST.length + i + 1).padStart(2, '0')}</p>
                    <h3 className="climber__name climber__name--locked">Unrevealed</h3>
                    <p className="climber__epithet">Still in the mist</p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
