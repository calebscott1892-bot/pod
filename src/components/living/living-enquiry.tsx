"use client";

import { useState } from "react";

import { sendLivingEnquiry } from "@/app/living/actions";
import { Reveal } from "@/components/shared/reveal";
import { sites } from "@/lib/site-config";

const supplyOptions = ["Supply only", "Supply & install", "Not sure yet"];
const interestOptions = [
  "Flooring",
  "Curtains & blinds",
  "Shelving & storage",
  "Tiny-space furniture",
  "A full fit-out",
];

export function LivingEnquiry() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    try {
      const result = await sendLivingEnquiry(data);
      setStatus(result.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="enquire" className="bg-cream" aria-labelledby="living-enquire-heading">
      <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8 lg:py-24">
        <Reveal>
          <p className="font-heading text-[13px] tracking-[0.22em] text-accent-strong uppercase">
            Enquire
          </p>
          <h2
            id="living-enquire-heading"
            className="mt-3 font-heading text-[34px] leading-[1.08] tracking-tight sm:text-[44px]"
          >
            Tell us about your space.
          </h2>
          <p className="mt-4 max-w-[440px] text-[16px] leading-8 text-mid">
            Send a few details and what you&apos;re after. We&apos;ll come back
            with product options and a quote, supply only or fully installed.
          </p>
          <p className="mt-6 text-[15px] leading-7 text-mid">
            Or email{" "}
            <a
              href={`mailto:${sites.living.email}`}
              className="text-dark underline decoration-line underline-offset-4 transition hover:text-accent-strong"
            >
              {sites.living.email}
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="shape-soft border border-line bg-white p-5 shadow-[0_40px_100px_-70px_rgba(44,40,37,0.65)] sm:p-8">
            {status === "sent" ? (
              <div
                role="status"
                aria-live="polite"
                className="flex min-h-[380px] flex-col items-center justify-center py-10 text-center"
              >
                <span className="grid size-16 place-items-center rounded-full bg-accent-soft text-accent-strong">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                    <path d="m7 15.5 5.5 5.5L23 9.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-6 font-heading text-[28px] tracking-tight">
                  Thanks, enquiry received.
                </h3>
                <p className="mt-3 max-w-[380px] text-[15px] leading-7 text-mid">
                  We&apos;ll be in touch with options and a quote for your
                  fit-out shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" name="name" required autoComplete="name" />
                  <Field label="Email" name="email" type="email" required autoComplete="email" />
                  <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
                  <Field label="Postcode" name="postcode" autoComplete="postal-code" inputMode="numeric" />
                </div>

                <SelectField label="Service" name="supply-type">
                  <option value="">Choose one…</option>
                  {supplyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </SelectField>

                <SelectField label="I'm interested in" name="interest">
                  <option value="">Choose one…</option>
                  {interestOptions.map((option) => (
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
                    placeholder="Tell us about the room, sizes, timing, anything useful."
                    className="rounded-2xl border border-line bg-cream-soft px-4 py-3 text-[15px] leading-7 text-dark outline-none transition placeholder:text-mid focus:border-accent-strong focus:ring-2 focus:ring-accent-soft"
                  />
                </label>

                <div className="hidden" aria-hidden="true">
                  <label>
                    Website
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                {status === "error" ? (
                  <p
                    role="alert"
                    className="rounded-2xl border border-[#e0b7a6] bg-[#fbeae3] px-4 py-3 text-[14px] leading-6 text-[#8f3115]"
                  >
                    Sorry, something went wrong sending your enquiry. Please try
                    again, or email us at{" "}
                    <a
                      href={`mailto:${sites.living.email}`}
                      className="font-medium underline underline-offset-2"
                    >
                      {sites.living.email}
                    </a>
                    .
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                  className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-dark px-8 font-heading text-[14px] tracking-[0.12em] text-cream uppercase transition hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send enquiry"}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "numeric" | "text";
}) {
  return (
    <label className="grid gap-2">
      <span className="font-heading text-[13px] tracking-[0.16em] text-mid uppercase">
        {label}
      </span>
      <input
        name={name}
        type={type}
        {...rest}
        className="min-h-13 rounded-2xl border border-line bg-cream-soft px-4 text-[15px] text-dark outline-none transition placeholder:text-mid focus:border-accent-strong focus:ring-2 focus:ring-accent-soft"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-heading text-[13px] tracking-[0.16em] text-mid uppercase">
        {label}
      </span>
      <span className="relative">
        <select
          name={name}
          defaultValue=""
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
