/**
 * Decorative, colorful African-inspired motif (kente/mudcloth-style
 * geometric diamonds + triangles) used as a subtle background accent on
 * the homepage — kept within the brand palette (navy/gold/green) and low
 * opacity so it reads as texture, not noise.
 */
export function AfricanPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 120"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="none" strokeWidth="2">
        {Array.from({ length: 10 }).map((_, i) => (
          <path
            key={i}
            d={`M${i * 40} 10 L${i * 40 + 20} 60 L${i * 40} 110`}
            stroke={i % 3 === 0 ? "var(--color-gold)" : i % 3 === 1 ? "var(--color-green)" : "var(--color-navy)"}
          />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <circle
            key={`c-${i}`}
            cx={20 + i * 40}
            cy={60}
            r="4"
            fill={i % 2 === 0 ? "var(--color-gold)" : "var(--color-green)"}
          />
        ))}
      </g>
    </svg>
  );
}

/** Small rounded blob cluster (kids/craft motif) used as a colorful corner accent. */
export function AfricanBlobAccent({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <circle cx="70" cy="60" r="55" fill="var(--color-gold)" opacity="0.18" />
      <circle cx="140" cy="120" r="40" fill="var(--color-green)" opacity="0.16" />
      <circle cx="90" cy="150" r="26" fill="var(--color-navy)" opacity="0.1" />
    </svg>
  );
}

/** Bold, fully-saturated radiating sunburst — a nod to Adinkra sun symbols
 *  (Adinkrahene), used sparingly as a colorful focal accent rather than
 *  low-opacity texture. Kept strictly within the brand palette. */
export function AfricanSunBurst({ className = "" }: { className?: string }) {
  const colors = ["var(--color-gold)", "var(--color-green)", "var(--color-gold-dark)"];
  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true">
      <g transform="translate(120,120)">
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <rect
              key={i}
              x="-3.5"
              y="-108"
              width="7"
              height="46"
              rx="3.5"
              fill={colors[i % colors.length]}
              opacity="0.9"
              transform={`rotate(${angle})`}
            />
          );
        })}
        <circle r="46" fill="var(--color-navy)" />
        <circle r="46" fill="none" stroke="var(--color-gold)" strokeWidth="3" />
      </g>
    </svg>
  );
}

/** Kente-inspired horizontal stripe band — saturated, full-opacity color
 *  blocks (not texture) for use as a slim section divider. */
export function KenteStripe({ className = "" }: { className?: string }) {
  const blocks = [
    "var(--color-gold)",
    "var(--color-navy)",
    "var(--color-green)",
    "var(--color-gold-dark)",
    "var(--color-navy)",
    "var(--color-gold)",
  ];
  return (
    <div className={`flex w-full overflow-hidden ${className}`} aria-hidden="true">
      {blocks.map((c, i) => (
        <span key={i} className="h-full flex-1" style={{ backgroundColor: c }} />
      ))}
    </div>
  );
}

/** Circular "adire/mudcloth" badge — a decorative ring of dots and a
 *  diamond core, for use behind icons or stat numbers. */
export function AfricanMedallion({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <circle cx="60" cy="60" r="56" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeDasharray="4 6" />
      <rect x="42" y="42" width="36" height="36" rx="6" fill="var(--color-gold)" opacity="0.15" transform="rotate(45 60 60)" />
    </svg>
  );
}
