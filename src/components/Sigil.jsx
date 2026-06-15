/* The Spirebound sigil — an ascending spire crowned with a rune.
   Thin engraved line-art; inherits currentColor. */
export default function Sigil({ size = 22, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* spire body */}
      <path d="M12 2 L16 9 L14.5 21 L9.5 21 L8 9 Z" />
      {/* ascent rungs */}
      <path d="M9.1 12 H14.9 M9.4 15.5 H14.6 M9.7 18.5 H14.3" opacity="0.7" />
      {/* crowning rune */}
      <circle cx="12" cy="4.4" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}
