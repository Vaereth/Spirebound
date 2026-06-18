import { useState } from 'react';
import {
  DENOMINATIONS, CONVERSION_LADDER, PRICES, STELLAR, TRUST_LAYERS, HUNDRED_FLOORS,
  MONEY_LAYERS, LEDGER_NOTE, ECONOMY_FLOWS, ECONOMY_PRINCIPLE, ECONOMY_SURFACES,
  TRUST, FORGOTTEN, TAXES, REFERENCE, CROSSLINKS, VERIFICATION_LADDER,
} from '../data/currency.js';
import { formatShort, formatSpoken } from '../lib/currency.js';
import { Page, Stack, DataSplit, CardMatrix, StickyContents, MasterDetail } from './Layout.jsx';
import { GlassPanel, StonePanel, VellumPanel, PanelHeader, Divider } from './Surfaces.jsx';
import SectionRail, { useSectionSpy } from './SectionRail.jsx';
import { Tabs, QuickFacts, CompareTable, SpoilerGate } from './UIKit.jsx';
import CurrencyCoin from './CurrencyCoin.jsx';
import CurrencyConverter from './CurrencyConverter.jsx';
import './CurrencyPage.css';

const ACCENT = 'var(--accent-authority)';
const SECTIONS = [
  { id: 'denominations', label: 'The Five Coins' },
  { id: 'convert', label: 'Conversion' },
  { id: 'buy', label: 'What It Buys' },
  { id: 'stellar', label: 'The Stellar' },
  { id: 'trust', label: 'Why It’s Trusted' },
  { id: 'floors', label: 'One Hundred Floors' },
  { id: 'ledger', label: 'Coin · Vault · Ledger' },
  { id: 'economy', label: 'Living Economy' },
  { id: 'standing', label: 'Monetary Trust' },
  { id: 'taxes', label: 'Taxes & Services' },
  { id: 'reference', label: 'Economic Reference' },
];

export default function CurrencyPage({ navigate }) {
  const { active, setRef, go } = useSectionSpy(SECTIONS.map((s) => s.id));
  const [selId, setSelId] = useState('stellar');
  const sel = DENOMINATIONS.find((d) => d.id === selId) || DENOMINATIONS[0];
  const [revealForgotten, setRevealForgotten] = useState(false);
  const [openRef, setOpenRef] = useState(null);

  return (
    <Page variant="wide" className="cur">
      {/* ===== HERO ===== */}
      <StonePanel className="cur__hero" accent={ACCENT}>
        <div className="cur__heroinner">
          <span className="cur__eyebrow">The Ascendant Guild Standard</span>
          <h1 className="cur__title">The Risen Light Coinage</h1>
          <p className="cur__tagline">One currency. One standard. One hundred Floors.</p>
          <p className="cur__intro">
            Recognised across all one hundred Floors, the Risen Light Coinage binds local mints to a single
            Ascendant Guild standard. Every coin carries material value, authorised weight and purity, and —
            at its highest denominations — a regulated magical seal.
          </p>
          <div className="cur__herocoins" role="img" aria-label="The five denominations, Cinder through Stellar">
            {DENOMINATIONS.map((d) => (
              <div key={d.id} className="cur__herocoin">
                <CurrencyCoin denom={d} size={64} interactive={false} />
                <span className="cur__herocoin-name">{d.name}</span>
                <span className="cur__herocoin-sh">{d.shorthand}</span>
              </div>
            ))}
          </div>
          <div className="cur__ladder" aria-label="Conversion ladder">
            {CONVERSION_LADDER.map((l, i) => (
              <span key={i} className="cur__ladderstep"><b>{l.from}</b><span className="cur__ladderarrow">→</span>{l.to}</span>
            ))}
          </div>
          <blockquote className="cur__principle">
            <span>You can buy a sandwich anywhere.</span>
            <span>You cannot buy the market.</span>
          </blockquote>
        </div>
      </StonePanel>

      <StickyContents className="cur__layout" rail={<SectionRail sections={SECTIONS} active={active} onGo={go} accent={ACCENT} title="The Coinage" />}>
        <Stack gap="section">

          {/* ===== DENOMINATIONS ===== */}
          <section id="denominations" ref={setRef('denominations')}>
            <SecHead n="01" title="The Five Coins" sub="Select a coin to read its full record. Each is triple-encoded — shape, colour, and letter — never colour alone." />
            <div className="cur__coinrow" role="tablist" aria-label="Denominations">
              {DENOMINATIONS.map((d) => (
                <div key={d.id} className="cur__coinpick">
                  <CurrencyCoin denom={d} size={84} selected={selId === d.id} onClick={() => setSelId(d.id)} />
                  <span className="cur__coinpick-name">{d.name}</span>
                  <span className="cur__coinpick-role">{d.role.split('·')[0].trim()}</span>
                </div>
              ))}
            </div>
            <GlassPanel accent={sel.apex ? 'var(--accent-air)' : ACCENT} className="cur__detail">
              <DataSplit
                left={
                  <div className="cur__detailcoin">
                    <CurrencyCoin denom={sel} size={140} interactive={false} />
                    <span className="cur__detailsh">{sel.shorthand}</span>
                  </div>
                }
                right={
                  <div>
                    <PanelHeader eyebrow={sel.role} title={sel.name} accent={sel.apex ? 'var(--accent-air)' : ACCENT} />
                    <p className="cur__flavour">{sel.flavour}</p>
                    <QuickFacts cols={2} facts={[
                      { k: 'Value', v: sel.conversionText },
                      { k: 'Material', v: sel.material },
                      { k: 'Colour', v: sel.colourLabel },
                      { k: 'Silhouette', v: sel.silhouette },
                      { k: 'Shorthand', v: sel.shorthand },
                      { k: 'Anti-counterfeit', v: sel.verification },
                    ]} />
                  </div>
                }
              />
            </GlassPanel>
          </section>

          {/* ===== CONVERSION ===== */}
          <section id="convert" ref={setRef('convert')}>
            <SecHead n="02" title="Conversion" sub="The interface handles conversion automatically — you never manually exchange smaller coins before buying. This tool mirrors that." />
            <DataSplit
              left={
                <StonePanel accent={ACCENT} className="cur__ladderpanel">
                  <PanelHeader eyebrow="The Ladder" title="Guild Standard" accent={ACCENT} />
                  <div className="cur__laddergrid">
                    {CONVERSION_LADDER.map((l, i) => (
                      <div key={i} className="cur__ladderrow"><span>{l.from}</span><span className="cur__ladderarrow">=</span><b>{l.to}</b></div>
                    ))}
                  </div>
                  <Divider />
                  <p className="cur__minihead">In base units</p>
                  <div className="cur__baselist">
                    {DENOMINATIONS.map((d) => (
                      <div key={d.id} className="cur__baserow"><span>1 {d.name}</span><b>{d.baseValue.toLocaleString()} C</b></div>
                    ))}
                  </div>
                </StonePanel>
              }
              right={
                <GlassPanel accent={ACCENT}>
                  <PanelHeader eyebrow="Converter" title="Count Any Sum" accent={ACCENT} />
                  <CurrencyConverter />
                </GlassPanel>
              }
            />
          </section>

          {/* ===== WHAT IT BUYS ===== */}
          <section id="buy" ref={setRef('buy')}>
            <SecHead n="03" title="What It Buys" sub={PRICES.note} />
            <CardMatrix min={300}>
              {PRICES.groups.map((g) => (
                <GlassPanel key={g.group} accent={ACCENT} className="cur__pricecard">
                  <PanelHeader eyebrow="Basket" title={g.group} accent={ACCENT} />
                  <div className="cur__pricelist">
                    {g.items.map((it) => (
                      <div key={it.label} className="cur__pricerow">
                        <span className="cur__priceitem">{it.label}</span>
                        <span className="cur__priceval" title={`${formatSpoken(it.cinders)} · ${it.cinders.toLocaleString()} Cinders`}>{formatShort(it.cinders)}</span>
                      </div>
                    ))}
                  </div>
                </GlassPanel>
              ))}
            </CardMatrix>
            <StonePanel accent={ACCENT} className="cur__reasons">
              <p className="cur__minihead">Prices are not eternally fixed — they move with</p>
              <div className="cur__chips">{PRICES.reasons.map((r) => <span key={r} className="cur__chip">{r}</span>)}</div>
            </StonePanel>
          </section>

          {/* ===== STELLAR ===== */}
          <section id="stellar" ref={setRef('stellar')}>
            <SecHead n="04" title="The Stellar" sub="The apex coin — and the bridge between physical wealth and recorded credit." />
            <StonePanel accent="var(--accent-air)" className="cur__stellar">
              <DataSplit
                left={
                  <div className="cur__stellarcoin">
                    <CurrencyCoin denom={DENOMINATIONS[4]} size={170} interactive={false} />
                  </div>
                }
                right={
                  <div>
                    <PanelHeader eyebrow="Fortune · Credit-bridge" title="One Stellar" accent="var(--accent-air)" />
                    <QuickFacts cols={1} facts={[
                      { k: 'Outer body', v: STELLAR.bodyMaterial },
                      { k: 'Sealed core', v: STELLAR.coreMaterial },
                      { k: 'Verification', v: STELLAR.verification },
                      { k: 'Role', v: STELLAR.role },
                    ]} />
                    <Divider />
                    <div className="cur__power">
                      {STELLAR.power.map((p) => <p key={p} className="cur__powerline">{p}</p>)}
                    </div>
                    <p className="cur__practice">{STELLAR.practice}</p>
                  </div>
                }
              />
              <div className="cur__warn">
                {STELLAR.carryWarning.map((w) => <span key={w}>{w}</span>)}
              </div>
              <p className="cur__unresolved">{STELLAR.unresolved}</p>
            </StonePanel>
          </section>

          {/* ===== TRUST LAYERS ===== */}
          <section id="trust" ref={setRef('trust')}>
            <SecHead n="05" title="Why the Currency Is Trusted" sub="Three layers, rising with each denomination." />
            <div className="cur__trustlayers">
              {TRUST_LAYERS.map((l, i) => (
                <div key={l.title} className="cur__trustlayer">
                  <span className="cur__trustnum">{i + 1}</span>
                  <div><h3 className="cur__trusttitle">{l.title}</h3><p className="cur__p">{l.body}</p></div>
                </div>
              ))}
            </div>
            <h3 className="cur__subh">Anti-counterfeit progression</h3>
            <div className="cur__verifladder">
              {VERIFICATION_LADDER.map((v, i) => (
                <div key={v.shorthand} className="cur__verifstep" style={{ '--i': i }}>
                  <span className="cur__verifname">{v.name}</span>
                  <span className="cur__verifmethod">{v.verification}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ===== 100 FLOORS ===== */}
          <section id="floors" ref={setRef('floors')}>
            <SecHead n="06" title="One Currency Across One Hundred Floors" />
            <StonePanel accent={ACCENT} className="cur__floorstmt">
              <p className="cur__bigstatement">{HUNDRED_FLOORS.statement}</p>
            </StonePanel>
            <DataSplit
              left={
                <GlassPanel accent={ACCENT}>
                  <PanelHeader eyebrow="How it holds" title="Universal Face Value" accent={ACCENT} />
                  <ul className="cur__list">{HUNDRED_FLOORS.points.map((p) => <li key={p}>{p}</li>)}</ul>
                  <blockquote className="cur__antitriv">{HUNDRED_FLOORS.principle}</blockquote>
                </GlassPanel>
              }
              right={
                <GlassPanel accent={ACCENT}>
                  <PanelHeader eyebrow="Equipment markets" title="Progression Bands" accent={ACCENT} />
                  <div className="cur__segments">
                    {HUNDRED_FLOORS.segments.map((s) => <span key={s} className="cur__segment">{s}</span>)}
                  </div>
                  <ul className="cur__list cur__list--tight">{HUNDRED_FLOORS.segmentNotes.map((n) => <li key={n}>{n}</li>)}</ul>
                </GlassPanel>
              }
            />
          </section>

          {/* ===== COIN / VAULT / LEDGER ===== */}
          <section id="ledger" ref={setRef('ledger')}>
            <SecHead n="07" title="Coin, Vault & Ledger" sub="Three layers of money — physical, stored, and recorded." />
            <CardMatrix min={260}>
              {MONEY_LAYERS.map((m) => (
                <GlassPanel key={m.id} accent={ACCENT} className="cur__moneylayer">
                  <PanelHeader eyebrow="Layer" title={m.title} accent={ACCENT} />
                  <ul className="cur__list">{m.points.map((p) => <li key={p}>{p}</li>)}</ul>
                </GlassPanel>
              ))}
            </CardMatrix>
            <StonePanel accent={ACCENT} className="cur__ledgernote"><p className="cur__p">{LEDGER_NOTE}</p></StonePanel>
          </section>

          {/* ===== LIVING ECONOMY ===== */}
          <section id="economy" ref={setRef('economy')}>
            <SecHead n="08" title="A Living Economy" sub={ECONOMY_PRINCIPLE} />
            <CardMatrix min={280}>
              {ECONOMY_FLOWS.map((f) => (
                <GlassPanel key={f.trigger} accent={ACCENT} className="cur__flow">
                  <span className="cur__flowtrigger">{f.trigger}</span>
                  <div className="cur__flowchain">
                    {f.chain.map((c, i) => (
                      <span key={c} className="cur__flowstep"><span className="cur__flowarrow" aria-hidden="true">↓</span>{c}</span>
                    ))}
                  </div>
                </GlassPanel>
              ))}
            </CardMatrix>
            <div className="cur__surfaces">
              <p className="cur__minihead">You can always see why, through</p>
              <div className="cur__chips">{ECONOMY_SURFACES.map((s) => <span key={s} className="cur__chip">{s}</span>)}</div>
            </div>
          </section>

          {/* ===== MONETARY TRUST ===== */}
          <section id="standing" ref={setRef('standing')}>
            <SecHead n="09" title="Monetary Trust & Consequences" sub="The economy judges the coin — and the person presenting it." />
            <CardMatrix min={260}>
              <GlassPanel accent="var(--accent-floor1)" className="cur__trustcol">
                <PanelHeader eyebrow="Builds trust" title="Honest Standing" accent="var(--accent-floor1)" />
                <ul className="cur__list">{TRUST.positive.map((p) => <li key={p}>{p}</li>)}</ul>
              </GlassPanel>
              <GlassPanel accent="var(--accent-blood)" className="cur__trustcol">
                <PanelHeader eyebrow="Erodes trust" title="Suspicion" accent="var(--accent-blood)" />
                <ul className="cur__list">{TRUST.negative.map((p) => <li key={p}>{p}</li>)}</ul>
              </GlassPanel>
              <GlassPanel accent="var(--accent-guardian)" className="cur__trustcol">
                <PanelHeader eyebrow="Possible outcomes" title="Consequences" accent="var(--accent-guardian)" />
                <ul className="cur__list">{TRUST.consequences.map((p) => <li key={p}>{p}</li>)}</ul>
              </GlassPanel>
            </CardMatrix>

            <SpoilerGate accent="var(--accent-blood)" open={revealForgotten} onReveal={() => setRevealForgotten(true)} onHide={() => setRevealForgotten(false)}
              title="Beyond Lawful Markets" warning="A faint thread of the criminal economy. Reveal only if you don't mind a small spoiler.">
              <VellumPanel className="cur__forgotten">
                {(revealForgotten ? [FORGOTTEN.revealed.body] : FORGOTTEN.safe).map((line, i) => <p key={i} className="cur__p">{line}</p>)}
                {revealForgotten && <p className="cur__forgottenname">— {FORGOTTEN.revealed.name}</p>}
              </VellumPanel>
            </SpoilerGate>
            {!revealForgotten && (
              <StonePanel accent="var(--accent-guardian)" className="cur__forgottensafe">
                {FORGOTTEN.safe.map((l) => <p key={l} className="cur__p">{l}</p>)}
              </StonePanel>
            )}
          </section>

          {/* ===== TAXES ===== */}
          <section id="taxes" ref={setRef('taxes')}>
            <SecHead n="10" title="Taxes & Public Services" sub="Embedded, transparent, and never filed by hand." />
            <DataSplit
              left={
                <GlassPanel accent={ACCENT}>
                  <PanelHeader eyebrow="How tax works" title="Built Into the Price" accent={ACCENT} />
                  <ul className="cur__list">{TAXES.traits.map((t) => <li key={t}>{t}</li>)}</ul>
                  <Divider />
                  <p className="cur__minihead">Provisional rates</p>
                  <CompareTable accent={ACCENT} firstHeader="Transaction" cols={['Rate']} rows={TAXES.provisionalRates.map((r) => ({ k: r.k, v: [r.v] }))} />
                  <p className="cur__unresolved">{TAXES.provisionalNote}</p>
                </GlassPanel>
              }
              right={
                <StonePanel accent={ACCENT} className="cur__where">
                  <PanelHeader eyebrow="Where the coin goes" title="Hearthvale Services" accent={ACCENT} />
                  <div className="cur__chips">{TAXES.funds.map((f) => <span key={f} className="cur__chip">{f}</span>)}</div>
                </StonePanel>
              }
            />
          </section>

          {/* ===== DEEP REFERENCE ===== */}
          <section id="reference" ref={setRef('reference')}>
            <SecHead n="11" title="Economic Reference" sub="Deeper rules for players, lore readers, and developers." />
            <div className="cur__accordion">
              {REFERENCE.map((r) => (
                <div key={r.id} className={`cur__acc ${openRef === r.id ? 'is-open' : ''}`}>
                  <button className="cur__acchead" aria-expanded={openRef === r.id} onClick={() => setOpenRef(openRef === r.id ? null : r.id)}>
                    <span>{r.title}</span>
                    <span className="cur__accmark" aria-hidden="true">{openRef === r.id ? '−' : '+'}</span>
                  </button>
                  {openRef === r.id && <div className="cur__accbody"><p className="cur__p">{r.body}</p></div>}
                </div>
              ))}
            </div>

            <div className="cur__crosslinks">
              <p className="cur__minihead">Related</p>
              <div className="cur__chips">
                {CROSSLINKS.map((c) => (
                  <button key={c.route} className="cur__crosslink" onClick={() => navigate(c.route)}>{c.label} →</button>
                ))}
              </div>
            </div>
          </section>

        </Stack>
      </StickyContents>
    </Page>
  );
}

function SecHead({ n, title, sub }) {
  return (
    <header className="cur__sechead">
      <span className="cur__secn">{n}</span>
      <div><h2 className="cur__h">{title}</h2>{sub && <p className="cur__p cur__p--dim">{sub}</p>}</div>
    </header>
  );
}
