/**
 * A thin baseline carrying nine castor wheels — seats a proof strip on its
 * wheels, echoing the studio's mobility. Inherits the current accent via
 * `text-accent-strong` on the caller.
 */
export function CastorRail({ className = "" }: { className?: string }) {
  const wheels = Array.from({ length: 9 }, (_, i) => 40 + (i * 1120) / 8);
  return (
    <svg
      viewBox="0 0 1200 26"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={`h-5 w-full text-accent-strong ${className}`}
    >
      <line x1="24" y1="15" x2="1176" y2="15" stroke="var(--ss-line)" strokeWidth="2" />
      {wheels.map((cx) => (
        <g key={cx} stroke="currentColor">
          <circle cx={cx} cy="15" r="6.5" fill="none" strokeWidth="2" opacity="0.85" />
          <g strokeWidth="1.2" strokeLinecap="round" opacity="0.55">
            <path d={`M${cx} 15 V9.5`} />
            <path d={`M${cx} 15 L${cx - 4.2} 17.5`} />
            <path d={`M${cx} 15 L${cx + 4.2} 17.5`} />
          </g>
        </g>
      ))}
    </svg>
  );
}
