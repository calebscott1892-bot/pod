"use client";

import { Reveal } from "@/components/shared/reveal";

import { lifestyleCategories } from "./categories";
import { CategoryScene } from "./category-scene";

// Indicative entry rate (long-term weekly). Full pricing varies by door,
// window and hire length, see the enquiry for a quote.
const rentalFromWeekly = "$140";
const rentalDeliveryFrom = "$250";

/** Tells the enquiry form which space the visitor was looking at. */
function announceIntendedUse(name: string) {
  window.dispatchEvent(new CustomEvent("ss:intended-use", { detail: name }));
}

export function LifestyleCategories() {
  return (
    <section id="spaces" className="bg-cream" aria-labelledby="spaces-heading">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal className="max-w-[680px]">
          <p className="font-heading text-[13px] tracking-[0.22em] text-accent-strong uppercase">
            Lifestyle spaces
          </p>
          <h2
            id="spaces-heading"
            className="mt-3 font-heading text-[34px] leading-[1.08] tracking-tight sm:text-[44px]"
          >
            Six ways to use your spare space.
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-mid">
            Every studio is the same considered build underneath, it&apos;s
            the way you live in it that changes. Photography is on its way;
            until then, picture yours.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {lifestyleCategories.map((category) => (
            <article key={category.id} className="group transition duration-300 hover:-translate-y-1.5">
                <div
                  className={`${category.shape} relative aspect-[4/4.4] overflow-hidden border border-line shadow-[0_30px_70px_-55px_rgba(44,40,37,0.55)] transition duration-300 group-hover:shadow-[0_40px_85px_-50px_rgba(44,40,37,0.6)]`}
                >
                  <div className="absolute inset-0 transition duration-500 group-hover:scale-[1.04]">
                    <CategoryScene category={category} />
                  </div>
                </div>
                <h3 className="mt-5 font-heading text-[23px] tracking-tight">
                  {category.name}
                </h3>
                <p className="mt-1 text-[15px] leading-7 text-mid">
                  {category.line}
                </p>
                <p className="mt-2 font-heading text-[16px] tracking-tight text-dark">
                  From {rentalFromWeekly}
                  <span className="text-[13px] font-normal text-mid"> / week</span>
                </p>
                <a
                  href="#enquire"
                  onClick={() => announceIntendedUse(category.name)}
                  className="mt-2 inline-flex min-h-11 items-center gap-1.5 font-heading text-[13px] tracking-[0.14em] text-accent-strong uppercase transition hover:gap-2.5"
                >
                  Enquire about this space
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h9.5M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-[720px] text-[14px] leading-6 text-mid">
          Indicative long-term weekly rate. Rates vary by door, window and hire
          length, with short and long-term hire available, send an enquiry for
          a full quote. Delivery from {rentalDeliveryFrom}.
        </p>
      </div>
    </section>
  );
}
