import { CastorRail } from "@/components/shared/castor-rail";

import { BASE_PRICE, formatAud } from "./studio-data";

/**
 * Proof strip — the site's real, specific facts set as oversized numerals
 * directly under the hero, so the value proposition reads as evidence rather
 * than another soft icon-and-sentence. Labels are flat plain-truths, and the
 * whole strip is seated on a nine-castor baseline so "9 wheels" literally sits
 * on wheels. Price is pulled from BASE_PRICE so it never drifts.
 */
const proofPoints: { value: string; label: string }[] = [
  { value: `${formatAud(BASE_PRICE)}`, label: "It starts here. Fully finished, delivered to your door." },
  { value: "9 wheels", label: "So it rolls where you want it. Then brakes and stays." },
  { value: "Weeks", label: "Built and delivered in weeks. Not months." },
  { value: "Nationwide", label: "We deliver Australia-wide. In-house across SEQ." },
];

export function StudiosProof() {
  return (
    <section
      aria-label="Spare Space Studios at a glance"
      className="border-b border-line bg-cream"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <dl className="grid grid-cols-2 gap-y-9 lg:grid-cols-4 lg:gap-0">
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
              <dd className="mt-2 max-w-[230px] text-[13px] leading-6 text-mid sm:text-[14px]">
                {point.label}
              </dd>
            </div>
          ))}
        </dl>

        <CastorRail className="mt-9 text-accent-strong" />
      </div>
    </section>
  );
}
