import { BASE_PRICE, formatAud } from "./studio-data";

/**
 * Proof strip — the site's real, specific facts set as oversized numerals
 * directly under the hero, so the value proposition reads as evidence rather
 * than another soft icon-and-sentence. The price is pulled from BASE_PRICE
 * (single source of truth) so it never drifts from the configurator.
 */
const proofPoints: { value: string; label: string }[] = [
  { value: `${formatAud(BASE_PRICE)}`, label: "Starting price, fully finished and delivered" },
  { value: "9 wheels", label: "Commercial castors with braking, moves with you" },
  { value: "Weeks", label: "From order to your backyard, not months" },
  { value: "Nationwide", label: "In-house across SEQ, delivered Australia-wide" },
];

export function StudiosProof() {
  return (
    <section
      aria-label="Spare Space Studios at a glance"
      className="border-b border-line bg-cream"
    >
      <dl className="mx-auto grid w-full max-w-[1280px] grid-cols-2 gap-y-9 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:gap-0 lg:px-8 lg:py-14">
        {proofPoints.map((point, index) => (
          <div
            key={point.value}
            className={`px-1 sm:px-2 lg:px-7 ${
              index % 2 === 1 ? "border-l border-line lg:border-l" : ""
            } ${index === 0 ? "lg:border-l-0" : "lg:border-l"}`}
          >
            <dt className="font-heading text-[34px] leading-[0.98] tracking-tight text-accent-strong sm:text-[46px] lg:text-[52px]">
              {point.value}
            </dt>
            <dd className="mt-2 max-w-[220px] text-[13px] leading-6 text-mid sm:text-[14px]">
              {point.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
