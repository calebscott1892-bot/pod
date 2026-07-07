type Props = {
  /** Flip vertically for the bottom edge of a soft section. */
  flip?: boolean;
  className?: string;
};

/**
 * Section divider drawn as a shallow studio roofline — a low, off-centre rake
 * in straight segments, so every cream-to-cream boundary reads as a roof
 * rather than a generic wave. Flip mirrors it for a section's bottom edge.
 */
export function Curve({ flip = false, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-8 w-full sm:h-12 ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path
        d="M0 46 L840 22 L1440 34 V64 H0 Z"
        fill="var(--ss-cream-soft)"
      />
    </svg>
  );
}
