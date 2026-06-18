import { useState, useMemo } from 'react';
import { DENOMINATIONS } from '../data/currency.js';
import { toCinders, formatShort, formatSpoken, equivalents } from '../lib/currency.js';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [denom, setDenom] = useState('beacon');
  const [showCinders, setShowCinders] = useState(false);

  const cinders = useMemo(() => toCinders(amount, denom), [amount, denom]);
  const eqs = useMemo(() => equivalents(cinders), [cinders]);

  return (
    <div className="cur-conv">
      <div className="cur-conv__controls">
        <label className="cur-conv__field">
          <span className="cur-conv__label">Amount</span>
          <input className="cur-conv__input" type="number" min="0" step="1" value={amount}
            onChange={(e) => setAmount(e.target.value)} aria-label="Amount to convert" />
        </label>
        <label className="cur-conv__field">
          <span className="cur-conv__label">Denomination</span>
          <select className="cur-conv__select" value={denom} onChange={(e) => setDenom(e.target.value)} aria-label="Source denomination">
            {DENOMINATIONS.map((d) => <option key={d.id} value={d.id}>{d.name} ({d.shorthand})</option>)}
          </select>
        </label>
      </div>

      <div className="cur-conv__result" aria-live="polite">
        <span className="cur-conv__resultlabel">Standard breakdown</span>
        <span className="cur-conv__resultval">{formatShort(cinders)}</span>
        <span className="cur-conv__sr">{formatSpoken(cinders)}</span>
        {showCinders && <span className="cur-conv__total">{cinders.toLocaleString()} Cinders total</span>}
      </div>

      <button className="cur-conv__toggle" onClick={() => setShowCinders((v) => !v)} aria-pressed={showCinders}>
        {showCinders ? '✓ ' : ''}Show total in Cinders
      </button>

      <div className="cur-conv__equiv">
        {eqs.map((e) => (
          <div key={e.shorthand} className="cur-conv__eqrow">
            <span className="cur-conv__eqname">{e.name}</span>
            <span className="cur-conv__eqval">{e.value % 1 === 0 ? e.value.toLocaleString() : e.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
