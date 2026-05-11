import { conceptLabels, type ShedConcept } from "./builder-options";

type Props = {
  concept: ShedConcept;
  compact?: boolean;
};

export function BuilderSummary({ concept, compact = false }: Props) {
  const labels = conceptLabels(concept);

  return (
    <section
      className={`border border-[#24231f]/12 bg-[#fffaf2] ${
        compact ? "p-4" : "p-5"
      }`}
      aria-labelledby={compact ? undefined : "concept-summary-heading"}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] font-semibold tracking-[0.24em] text-[#59664f] uppercase">
            Your shed selection
          </p>
          {!compact ? (
            <h3
              id="concept-summary-heading"
              className="mt-2 text-[24px] leading-tight font-semibold tracking-tight"
            >
              Your current build
            </h3>
          ) : null}
        </div>
        <span className="border border-[#24231f]/10 bg-[#eaf0dc] px-3 py-2 font-mono text-[10px] font-semibold tracking-[0.16em] text-[#59664f] uppercase">
          Ready to send
        </span>
      </div>

      <dl className="mt-5 grid gap-px overflow-hidden border border-[#24231f]/10 bg-[#24231f]/10 text-[14px]">
        <SummaryRow label="Style" value={labels.style} />
        <SummaryRow label="Shape" value={labels.shape} />
        <SummaryRow label="Colour" value={labels.colour} />
        <SummaryRow
          label="Upgrades"
          value={
            labels.upgrades.length
              ? labels.upgrades.join(", ")
              : "No upgrades selected"
          }
        />
      </dl>

      <a
        href="#quote"
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center bg-[#24231f] px-5 text-center font-mono text-[11px] font-semibold tracking-[0.16em] text-[#fffaf2] uppercase transition hover:bg-[#59664f] focus:ring-2 focus:ring-[#6f8067] focus:outline-none"
      >
        Send this build for a quote
      </a>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 bg-[#fffaf2] px-3 py-3 sm:grid-cols-[104px_1fr]">
      <dt className="font-mono text-[10px] font-semibold tracking-[0.18em] text-[#59664f] uppercase">
        {label}
      </dt>
      <dd className="text-[#24231f]">{value}</dd>
    </div>
  );
}
