import { NAMED_RARES, REGIONAL_ELITES } from '../data/canon.js';
import { StatBars } from './StatBlock.jsx';
import GradeBadge from './GradeBadge.jsx';
import { Page, Stack, CardMatrix } from './Layout.jsx';
import { GlassPanel, StonePanel, PanelHeader } from './Surfaces.jsx';
import './SystemsPage.css';

export default function SystemsPage({ navigate }) {
  return (
    <Page variant="wide" className="rare" style={{ '--accent': '#c98a4a' }}>
      <div className="rare__topnav">
        <button className="rare__back" onClick={() => navigate('#/floors/1')}>← Floor 1</button>
        <span className="rare__crumb">The Verdant Reach · <b>Named Rares &amp; Elites</b></span>
        <button className="rare__cta" onClick={() => navigate('#/systems')}>Core Game Systems →</button>
      </div>
      <header className="rare__head">
        <p className="rare__eyebrow">Ascendant Guild Records · Floor 1</p>
        <h1 className="rare__title">Named Rares &amp; Regional Elites</h1>
        <p className="rare__lead">The individually-authored threats of the Verdant Reach. For the universal six-attribute system, see Core Game Systems.</p>
      </header>

      <Stack gap="section">
        <section id="named-rares">
          <h2 className="rare__h">Floor 1 Named Rares</h2>
          <p className="rare__p rare__p--dim">Unique, conditional, individually authored individuals — shown separately from regional elites.</p>
          <CardMatrix min={300}>
            {NAMED_RARES.map((r) => (
              <StonePanel key={r.name} accent="var(--accent-authority)">
                <PanelHeader eyebrow={`${r.species} · ${r.rank} · L${r.level}`} title={r.name} accent="var(--accent-authority)"
                  right={r.grade ? <GradeBadge grade={r.grade} size="sm" /> : null} />
                {r.identity && <p className="rare__p rare__quote">{r.identity}</p>}
                <StatBars stats={r.stats} total={r.total} maxScale={Math.max(40, ...Object.values(r.stats))} />
                <div className="rare__facts">
                  {r.spawn && <p><b>Spawn:</b> {r.spawn}</p>}
                  {r.combat && <p><b>Combat:</b> {r.combat}</p>}
                  {r.consequence && <p><b>If slain:</b> {r.consequence}</p>}
                  {r.respawn && <p><b>Respawn:</b> {r.respawn}</p>}
                </div>
              </StonePanel>
            ))}
          </CardMatrix>
        </section>

        <section id="regional-elites">
          <h2 className="rare__h">Regional Elites</h2>
          <CardMatrix min={280}>
            {REGIONAL_ELITES.map((e) => (
              <GlassPanel key={e.name} accent="var(--accent-authority)">
                <PanelHeader eyebrow={`Level ${e.level}`} title={e.name} accent="var(--accent-authority)"
                  right={e.grade ? <GradeBadge grade={e.grade} size="sm" /> : null} />
                <p className="rare__p rare__quote">{e.identity}</p>
                <StatBars stats={e.stats} total={e.total} maxScale={Math.max(50, ...Object.values(e.stats))} />
              </GlassPanel>
            ))}
          </CardMatrix>
        </section>

        <p className="rare__p rare__p--dim rare__foot">A higher total does not automatically win. Mechanics, terrain, flight, groups, special rules, and executes all matter.</p>
      </Stack>
    </Page>
  );
}
