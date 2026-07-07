import { Reveal } from "@/components/shared/reveal";

const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: "What sets Spare Space Studios apart from the others?",
    answer:
      "Not only are our studios completely moveable, allowing flexibility in their placement, but each custom studio is delivered already constructed, so there are no stressful flatpacks to navigate on your own, and no out-of-pocket expenses going to contractors.",
  },
  {
    question: "Can you buy a studio if you lease a property?",
    answer:
      "Your Spare Space Studios investment is not a fixed structure and can be moved by unlocking the brakes with an easy push. Consult your lease agreement.",
  },
  {
    question: "Can you resell a Spare Space studio?",
    answer:
      "If you lease and decide to move properties, yes, you can resell your studio investment.",
  },
  {
    question: "How are the studios moveable?",
    answer:
      "Each studio sits on 9 commercial castor wheels that offer 360-degree turning with braking. This means you can change the location of your studio to suit your scenic or practical needs.",
  },
  {
    question: "What's included?",
    answer:
      "Complete studio structure, cladding, trims, doors, windows, lighting and electrical wiring.",
  },
  {
    question: "How is shipping estimated?",
    answer:
      "Delivery is quoted separately. Upon completion of your online order, you'll be contacted to discuss a shipping price and logistics.",
  },
  {
    question: "Tight space, limited access?",
    answer:
      "We understand not everyone has space down the side of the house to move a studio through. In that case we perform a remote Google Earth site assessment and liaise with you on the best options, which may or may not include cranage.",
  },
  {
    question: "Do I need council approval?",
    answer:
      "Requirements vary by location and intended studio use. We recommend you enquire with your local council before ordering.",
  },
  {
    question: "Can I see one before I buy?",
    answer:
      "We have display units for you to visit in person, so you can visualise your new creative space. Get in touch to arrange a viewing.",
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
          {faqs.map((faq) => (
              <details key={faq.question} className="elev-1 group rounded-3xl border border-line bg-white px-6 transition">
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
          ))}
        </div>
      </div>
    </section>
  );
}
