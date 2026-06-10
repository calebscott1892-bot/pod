import { Reveal } from "@/components/shared/reveal";
import { business } from "@/lib/site-config";

const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: "What's included in the price?",
    answer:
      "Full studio shell, chosen cladding, doors, windows, and delivery to your property. Electrical and plumbing are not included.",
  },
  {
    question: "How long does delivery take?",
    answer: "13 weeks from order confirmation.",
  },
  {
    question: "Do I need council approval?",
    answer:
      "Requirements vary by location. We recommend checking with your local council before ordering. We can provide a specification sheet to assist.",
  },
  {
    question: "Can I see one before I buy?",
    answer: (
      <>
        We have display units — contact us to arrange a viewing:{" "}
        <a
          href={business.phoneHref}
          className="text-dark underline decoration-line underline-offset-4 transition hover:text-accent-strong"
        >
          {business.phone}
        </a>
        .
      </>
    ),
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards via Stripe. Finance options coming soon.",
  },
];

export function StudiosFaq() {
  return (
    <section id="faq" className="bg-cream" aria-labelledby="faq-heading">
      <div className="mx-auto w-full max-w-[860px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal className="text-center">
          <p className="font-heading text-[13px] tracking-[0.22em] text-accent-strong uppercase">
            Good to know
          </p>
          <h2
            id="faq-heading"
            className="mt-3 font-heading text-[34px] leading-[1.08] tracking-tight sm:text-[44px]"
          >
            Questions, answered.
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3.5">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 60}>
              <details className="group rounded-3xl border border-line bg-white px-6 transition open:shadow-[0_24px_60px_-50px_rgba(44,40,37,0.6)]">
                <summary className="faq-summary flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-2 font-heading text-[17px] tracking-tight text-dark sm:text-[19px]">
                  {faq.question}
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-mid transition group-open:rotate-45 group-open:border-accent-strong group-open:text-accent-strong">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <div className="pb-6 text-[15px] leading-7 text-mid">
                  {faq.answer}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
