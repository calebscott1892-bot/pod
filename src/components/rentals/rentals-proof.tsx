import { CastorRail } from "@/components/shared/castor-rail";

/**
 * Rentals proof strip — the real rental facts as oversized numerals under the
 * hero, seated on the nine-castor rail. Flat plain-truths labels; per-brand
 * accent (rentals blue) via text-accent-strong.
 */
const proofPoints: { value: string; label: string }[] = [
  { value: "$140/wk", label: "From, long-term. Short-term hire too." },
  { value: "$0 upfront", label: "Rent the space. Skip the big purchase." },
  { value: "From $250", label: "Delivery quoted up front. No surprises." },
  { value: "East coast", label: "Sunshine Coast to the Northern Rivers, installed." },
];

export function RentalsProof() {
  return (
    <section
      aria-label="Spare Space Rentals at a glance"
      className="section-dark"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-0">
          {proofPoints.map((point, index) => (
            <div
              key={point.value}
              className={`px-1 sm:px-2 lg:px-7 ${
                index % 2 === 1 ? "border-l border-line lg:border-l" : ""
              } ${index === 0 ? "lg:border-l-0" : "lg:border-l"}`}
            >
              {/* Only the lead value carries the blue accent (large-text AA on
                  teal); the rest are cream so one number visibly leads. */}
              <dt
                className={`font-heading text-[40px] leading-[0.96] tracking-tight sm:text-[52px] lg:text-[62px] ${
                  index === 0 ? "text-accent" : "text-cream"
                }`}
              >
                {point.value}
              </dt>
              <dd className="mt-2 max-w-[230px] text-[13px] leading-6 text-mid sm:text-[14px]">
                {point.label}
              </dd>
            </div>
          ))}
        </dl>

        <CastorRail className="mt-10 text-accent" />
      </div>
    </section>
  );
}
