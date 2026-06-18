/* A CSS-rendered Spirebound coin face. Triple-encoded: distinct SHAPE,
   distinct COLOUR, distinct LETTER shorthand — never colour alone. */
import './CurrencyCoin.css';

export default function CurrencyCoin({ denom, size = 96, selected = false, onClick, interactive = true }) {
  const Tag = interactive ? 'button' : 'div';
  return (
    <Tag
      className={`coin coin--${denom.shapeKey} ${selected ? 'is-selected' : ''} ${denom.apex ? 'coin--apex' : ''}`}
      style={{ '--coin': denom.colorVar, '--core': denom.coreColorVar || 'transparent', width: size, height: size }}
      onClick={onClick}
      {...(interactive ? { 'aria-pressed': selected, type: 'button' } : { 'aria-hidden': 'true' })}
      title={interactive ? `${denom.name} (${denom.shorthand})` : undefined}
    >
      <span className="coin__face">
        {denom.apex && <span className="coin__core" aria-hidden="true" />}
        <span className="coin__letter">{denom.shorthand}</span>
      </span>
    </Tag>
  );
}
