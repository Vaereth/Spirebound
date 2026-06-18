/* =====================================================================
   CURRENCY HELPERS — pure conversion + formatting for the Risen Light
   Coinage. Canon rules: irregular ladder, never a decimal point, prices
   shown as denomination breakdown high→low with EMPTY TIERS OMITTED.
   ===================================================================== */
import { DENOMINATIONS } from '../data/currency.js';

// high → low tiers
const TIERS = [...DENOMINATIONS].sort((a, b) => b.baseValue - a.baseValue);

// Break a Cinder total into { shorthand, name, count } tiers, omitting zeros.
export function breakdown(cinders) {
  let rem = Math.max(0, Math.floor(cinders));
  const out = [];
  for (const t of TIERS) {
    const n = Math.floor(rem / t.baseValue);
    if (n > 0) { out.push({ shorthand: t.shorthand, name: t.name, count: n }); rem -= n * t.baseValue; }
  }
  if (out.length === 0) out.push({ shorthand: 'C', name: 'Cinder', count: 0 });
  return out;
}

// "1B 7D 3E" — shorthand, empty tiers omitted, no pluralisation.
export function formatShort(cinders) {
  return breakdown(cinders).map((t) => `${t.count}${t.shorthand}`).join(' ');
}

// "One Beacon, seven Dawns, and three Embers" — full names for screen readers.
const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
function wordFor(n) { return n <= 12 ? WORDS[n] : String(n); }
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
export function formatSpoken(cinders) {
  const parts = breakdown(cinders).map((t, i) => {
    const plural = t.count === 1 ? t.name : t.name + 's';
    const w = i === 0 ? cap(wordFor(t.count)) : wordFor(t.count);
    return `${w} ${plural}`;
  });
  if (parts.length === 1) return parts[0];
  return parts.slice(0, -1).join(', ') + ', and ' + parts[parts.length - 1];
}

// total cinders for an amount in a given denomination
export function toCinders(amount, denomId) {
  const d = DENOMINATIONS.find((x) => x.id === denomId);
  return Math.floor((Number(amount) || 0) * (d ? d.baseValue : 1));
}

// equivalents of a Cinder total in every denomination (may be fractional)
export function equivalents(cinders) {
  return DENOMINATIONS.map((d) => ({ name: d.name, shorthand: d.shorthand, value: cinders / d.baseValue }));
}
