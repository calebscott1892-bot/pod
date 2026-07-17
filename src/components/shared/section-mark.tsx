import type { ReactNode } from "react";

/**
 * Section waypoint — the brand cadence that replaces the tracked-uppercase
 * eyebrow. A small castor wheel (the site's signature) beside a handwritten
 * Harold lead. `currentColor` rides the brand accent on cream; on a
 * `.section-dark` band the caller passes `text-cream` (or any tone) and the
 * wheel + script flip together. Kept to the VOICE tier — heroes, journeys, one
 * commerce beat, the enquiry — never stamped on evidence sections.
 */
export function SectionMark({
  children,
  className = "text-accent-strong",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-2.5 font-script text-[24px] leading-none sm:text-[28px] ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden="true"
        className="shrink-0 translate-y-[1px]"
      >
        <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.6" opacity="0.85" />
        <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6">
          <path d="M9 9V3.5" />
          <path d="M9 9 4.24 11.75" />
          <path d="M9 9 13.76 11.75" />
        </g>
      </svg>
      {children}
    </p>
  );
}
