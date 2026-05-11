"use client";

import { conceptLabels, type ShedConcept } from "./builder-options";

type Props = {
  concept: ShedConcept;
};

export function QuoteForm({ concept }: Props) {
  const labels = conceptLabels(concept);
  const upgradesText = labels.upgrades.length
    ? labels.upgrades.join(", ")
    : "No upgrades selected";

  return (
    <section
      id="quote"
      className="bg-[#fbf5ec]"
      aria-labelledby="quote-heading"
    >
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.5fr_1fr] lg:px-8 lg:py-20">
        <div>
          <p className="font-mono text-[11px] font-semibold tracking-[0.32em] text-[#59664f] uppercase">
            Quote
          </p>
          <h2
            id="quote-heading"
            className="mt-3 text-[34px] leading-tight font-semibold tracking-tight sm:text-[46px]"
          >
            Send this build for a quote.
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-[#5f5b52]">
            Tell us how you want to use the space. Finish and inclusions can be
            confirmed after enquiry.
          </p>
        </div>

        <form
          className="grid gap-5 border border-[#24231f]/12 bg-[#fffaf2] p-5 sm:p-6"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="border border-[#24231f]/10 bg-[#fbf5ec] p-4 shadow-[0_18px_50px_-42px_rgba(36,35,31,0.45)]">
            <p className="font-mono text-[10px] font-semibold tracking-[0.24em] text-[#59664f] uppercase">
              Your current shed selection
            </p>
            <dl className="mt-4 grid gap-px overflow-hidden border border-[#24231f]/10 bg-[#24231f]/10 text-[14px] sm:grid-cols-2">
              <ConceptRow label="Style" value={labels.style} />
              <ConceptRow label="Shape" value={labels.shape} />
              <ConceptRow label="Colour" value={labels.colour} />
              <ConceptRow label="Upgrades" value={upgradesText} />
            </dl>
          </div>

          <input type="hidden" name="selected-style" value={labels.style} />
          <input type="hidden" name="selected-shape" value={labels.shape} />
          <input type="hidden" name="selected-colour" value={labels.colour} />
          <input
            type="hidden"
            name="selected-upgrades"
            value={upgradesText}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="quote-name" name="name" label="Name" autoComplete="name" />
            <Field
              id="quote-email"
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
            />
            <Field
              id="quote-phone"
              name="phone"
              label="Phone"
              type="tel"
              autoComplete="tel"
            />
            <ReadOnlyField
              id="quote-style"
              name="preferred-style"
              label="Preferred style"
              value={labels.style}
            />
          </div>

          <Field
            id="quote-use"
            name="intended-use"
            label="Intended use"
            placeholder="Home office, studio, storage..."
          />

          <label className="flex flex-col gap-2 font-mono text-[10px] font-semibold tracking-[0.24em] text-[#24231f]/75 uppercase">
            Message
            <textarea
              id="quote-message"
              name="message"
              rows={5}
              placeholder="Share anything useful about your site, timing, access or how you want the shed to feel."
              className="font-sans rounded-none border border-[#24231f]/18 bg-[#fbf5ec] px-3 py-3 text-[15px] font-normal tracking-normal text-[#24231f] normal-case outline-none transition focus:border-[#6f8067] focus:ring-2 focus:ring-[#6f8067]/25"
            />
          </label>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center bg-[#b8c7a3] px-5 font-mono text-[11px] font-semibold tracking-[0.16em] text-[#24231f] uppercase transition hover:bg-[#d7e2c0] focus:ring-2 focus:ring-[#6f8067] focus:outline-none sm:w-auto"
            >
              Request My Shed Quote
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ConceptRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#fffaf2] px-3 py-3">
      <dt className="font-mono text-[10px] font-semibold tracking-[0.18em] text-[#59664f] uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-[#24231f]">{value}</dd>
    </div>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  placeholder,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2 font-mono text-[10px] font-semibold tracking-[0.24em] text-[#24231f]/75 uppercase">
      {label}
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="font-sans min-h-12 rounded-none border border-[#24231f]/18 bg-[#fbf5ec] px-3 text-[15px] font-normal tracking-normal text-[#24231f] normal-case outline-none transition placeholder:text-[#24231f]/38 focus:border-[#6f8067] focus:ring-2 focus:ring-[#6f8067]/25"
      />
    </label>
  );
}

function ReadOnlyField({
  id,
  name,
  label,
  value,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
}) {
  return (
    <label className="flex flex-col gap-2 font-mono text-[10px] font-semibold tracking-[0.24em] text-[#24231f]/75 uppercase">
      {label}
      <input
        id={id}
        name={name}
        value={value}
        readOnly
        className="font-sans min-h-12 rounded-none border border-[#24231f]/18 bg-[#f8eadf] px-3 text-[15px] font-normal tracking-normal text-[#24231f] normal-case outline-none"
      />
    </label>
  );
}
