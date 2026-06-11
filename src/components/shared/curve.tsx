type Props = {
  /** Flip vertically for the bottom edge of a soft section. */
  flip?: boolean;
  className?: string;
};

/**
 * Organic wave divider between cream and cream-soft sections — the soft
 * shape language of the brand applied to section boundaries.
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
        d="M0 34C240 10 480 58 720 34 960 10 1200 58 1440 34V64H0Z"
        fill="var(--ss-cream-soft)"
      />
    </svg>
  );
}
