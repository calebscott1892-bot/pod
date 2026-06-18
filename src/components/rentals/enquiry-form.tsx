"use client";

import { useEffect, useState, useTransition } from "react";

import { sendEnquiry } from "@/app/rentals/actions";
import { Reveal } from "@/components/shared/reveal";
import { business, sites } from "@/lib/site-config";

import { lifestyleCategories } from "./categories";

const heardAboutOptions = [
  "Google search",
  "Instagram",
  "Facebook",
  "Word of mouth",
  "Saw a Spare Space studio in person",
  "Other",
];

/** Rough postcode bands for instant service-area feedback. */
function postcodeRegion(value: string): "qld" | "nsw" | "outside" | null {
  if (!/^\d{4}$/.test(value)) return null;
  const code = Number(value);
  if (code >= 4000 && code <= 4699) return "qld";
  if (code >= 2460 && code <= 2490) return "nsw";
  return "outside";
}

const regionHints: Record<"qld" | "nsw" | "outside", { text: string; inArea: boolean }> = {
  qld: { text: "Southeast QLD — you're in our delivery area.", inArea: true },
  nsw: { text: "Northern Rivers — you're in our delivery area.", inArea: true },
  outside: {
    text: "Outside our usual area — send through and we'll review your site individually.",
    inArea: false,
  },
};

export function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [intendedUse, setIntendedUse] = useState("");
  const [postcode, setPostcode] = useState("");
  const [, startTransition] = useTransition();

  // Pre-select the space the visitor came from — a category card click
  // (custom event) or a shared link with ?use=<category>.
  useEffect(() => {
    const applyFromQuery = window.setTimeout(() => {
      const fromQuery = new URLSearchParams(window.location.search).get("use");
      if (!fromQuery) return;
      const match = lifestyleCategories.find(
        (category) =>
          category.id === fromQuery.toLowerCase() ||
          category.name.toLowerCase() === fromQuery.toLowerCase(),
      );
      if (match) setIntendedUse(match.name);
    }, 0);

    const onIntendedUse = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (typeof detail === "string") setIntendedUse(detail);
    };
    window.addEventListener("ss:intended-use", onIntendedUse);
    return () => {
      window.clearTimeout(applyFromQuery);
      window.removeEventListener("ss:intended-use", onIntendedUse);
    };
  }, []);

  const region = postcodeRegion(postcode);
  const hint = region ? regionHints[region] : null;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Optimistic UI — confirm immediately, deliver in the background.
    setSubmitted(true);
    startTransition(() => {
      void sendEnquiry(data);
    });
  }

  return (
    <section id="enquire" className="relative overflow-hidden bg-cream" aria-labelledby="enquire-heading">
      <div
        aria-hidden="true"
        className="shape-blob absolute -bottom-40 -left-32 size-[420px] bg-accent-soft opacity-60"
      />

      <div className="relative mx-auto grid w-full max-w-[1280px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
        <Reveal>
          <p className="font-heading text-[13px] tracking-[0.22em] text-accent-strong uppercase">
            Make an enquiry
          </p>
          <h2
            id="enquire-heading"
            className="mt-3 font-heading text-[34px] leading-[1.08] tracking-tight sm:text-[44px]"
          >
            Let&apos;s find your space.
          </h2>
          <p className="mt-4 max-w-[440px] text-[16px] leading-8 text-mid">
            Tell us a little about your property and how you&apos;d use the
            studio. We&apos;ll come back to you within one business day — no
            pressure, no obligation.
          </p>

          <dl className="mt-8 space-y-4 text-[15px]">
            <div className="flex items-center gap-4">
              <dt className="sr-only">Phone</dt>
              <ContactIcon>
                <path d="M5 4.5C5 3.7 5.7 3 6.5 3h2.2c.7 0 1.3.5 1.5 1.2l.8 3a1.5 1.5 0 0 1-.7 1.7l-1.4.8a11.5 11.5 0 0 0 5.4 5.4l.8-1.4c.4-.6 1.1-.9 1.7-.7l3 .8c.7.2 1.2.8 1.2 1.5v2.2c0 .8-.7 1.5-1.5 1.5C11.6 19 5 12.4 5 4.5Z" />
              </ContactIcon>
              <dd>
                <a href={business.phoneHref} className="text-dark transition hover:text-accent-strong">
                  {business.phone}
                </a>
              </dd>
            </div>
            <div className="flex items-center gap-4">
              <dt className="sr-only">Email</dt>
              <ContactIcon>
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path d="m4 7 8 6 8-6" />
              </ContactIcon>
              <dd>
                <a
                  href={`mailto:${sites.rentals.email}`}
                  className="text-dark transition hover:text-accent-strong"
                >
                  {sites.rentals.email}
                </a>
              </dd>
            </div>
            <div className="flex items-center gap-4">
              <dt className="sr-only">Service area</dt>
              <ContactIcon>
                <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
                <circle cx="12" cy="10" r="2.5" />
              </ContactIcon>
              <dd className="text-mid">{business.serviceArea}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={100}>
          <div className="shape-soft border border-line bg-white p-5 shadow-[0_40px_100px_-70px_rgba(44,40,37,0.65)] sm:p-8">
            {submitted ? (
              <div
                role="status"
                aria-live="polite"
                className="flex min-h-[420px] flex-col items-center justify-center py-10 text-center"
              >
                <span className="grid size-16 place-items-center rounded-full bg-accent-soft text-accent-strong">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                    <path d="m7 15.5 5.5 5.5L23 9.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-6 font-heading text-[28px] tracking-tight">
                  Your enquiry is on its way.
                </h3>
                <p className="mt-3 max-w-[380px] text-[15px] leading-7 text-mid">
                  Thanks for reaching out — we&apos;ll reply within one
                  business day. If it&apos;s urgent, call{" "}
                  <a href={business.phoneHref} className="text-dark underline decoration-line underline-offset-4">
                    {business.phone}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" name="name" required autoComplete="name" />
                  <Field label="Email" name="email" type="email" required autoComplete="email" />
                  <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
                  <label className="grid content-start gap-2">
                    <span className="font-heading text-[13px] tracking-[0.16em] text-mid uppercase">
                      Postcode
                    </span>
                    <input
                      name="postcode"
                      required
                      autoComplete="postal-code"
                      inputMode="numeric"
                      pattern="[0-9]{4}"
                      title="Four-digit Australian postcode"
                      value={postcode}
                      onChange={(event) => setPostcode(event.target.value)}
                      className="min-h-13 rounded-2xl border border-line bg-cream-soft px-4 text-[15px] text-dark outline-none transition placeholder:text-mid/60 focus:border-accent-strong focus:ring-2 focus:ring-accent-soft"
                    />
                    <span aria-live="polite" className="-mt-0.5 min-h-4 text-[12px] leading-4">
                      {hint ? (
                        <span className={hint.inArea ? "text-accent-strong" : "text-mid"}>
                          {hint.inArea ? "✓ " : ""}
                          {hint.text}
                        </span>
                      ) : null}
                    </span>
                  </label>
                </div>

                <SelectField
                  label="Intended use"
                  name="intended-use"
                  required
                  value={intendedUse}
                  onChange={(event) => setIntendedUse(event.target.value)}
                >
                  <option value="">Choose a lifestyle space…</option>
                  {lifestyleCategories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                  <option value="Something else">Something else</option>
                </SelectField>

                <SelectField label="How did you hear about us?" name="heard-about">
                  <option value="">Choose an option…</option>
                  {heardAboutOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </SelectField>

                <label className="grid gap-2">
                  <span className="font-heading text-[13px] tracking-[0.16em] text-mid uppercase">
                    Message (optional)
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your block, access, timing — anything useful."
                    className="rounded-2xl border border-line bg-cream-soft px-4 py-3 text-[15px] leading-7 text-dark outline-none transition placeholder:text-mid/60 focus:border-accent-strong focus:ring-2 focus:ring-accent-soft"
                  />
                </label>

                {/* Honeypot — hidden from people, irresistible to bots. */}
                <div className="hidden" aria-hidden="true">
                  <label>
                    Website
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-dark px-8 font-heading text-[14px] tracking-[0.12em] text-cream uppercase transition hover:bg-accent-strong"
                >
                  Send my enquiry
                </button>
                <p className="text-center text-[13px] leading-6 text-mid">
                  Your details go straight to our team — never to a mailing
                  list.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-white text-accent-strong">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </span>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "numeric" | "text";
  pattern?: string;
  title?: string;
};

function Field({ label, name, type = "text", ...rest }: FieldProps) {
  return (
    <label className="grid gap-2">
      <span className="font-heading text-[13px] tracking-[0.16em] text-mid uppercase">
        {label}
      </span>
      <input
        name={name}
        type={type}
        {...rest}
        className="min-h-13 rounded-2xl border border-line bg-cream-soft px-4 text-[15px] text-dark outline-none transition placeholder:text-mid/60 focus:border-accent-strong focus:ring-2 focus:ring-accent-soft"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  required,
  value,
  onChange,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}) {
  const controlProps =
    value !== undefined ? { value, onChange } : { defaultValue: "" };

  return (
    <label className="grid gap-2">
      <span className="font-heading text-[13px] tracking-[0.16em] text-mid uppercase">
        {label}
      </span>
      <span className="relative">
        <select
          name={name}
          required={required}
          {...controlProps}
          className="min-h-13 w-full appearance-none rounded-2xl border border-line bg-cream-soft px-4 pr-11 text-[15px] text-dark outline-none transition focus:border-accent-strong focus:ring-2 focus:ring-accent-soft"
        >
          {children}
        </select>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-mid"
        >
          <path d="m3 6 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </label>
  );
}
