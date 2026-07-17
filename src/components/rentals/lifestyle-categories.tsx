"use client";

import { Reveal } from "@/components/shared/reveal";

import { lifestyleCategories, type LifestyleCategory } from "./categories";
import { CategoryScene } from "./category-scene";

// Indicative entry rate (long-term weekly). Full pricing varies by door,
// window and hire length, see the enquiry for a quote.
const rentalFromWeekly = "$140";
const rentalDeliveryFrom = "$250";

// A designed mosaic, not a uniform grid: the rhythm comes from the frame
// shapes (arch, oblong, soft) alternating across a calm portrait grid — every
// room scene is drawn to the same 300×330 portrait, so it fills each tile edge
// to edge. Point at one and its lights come on (see .cs-dusk).
const layout: Record<string, { shape: string }> = {
  "home-office": { shape: "shape-soft" },
  "home-gym": { shape: "shape-arch" },
  "wellness-retreat": { shape: "shape-oblong" },
  "creative-studio": { shape: "shape-oblong" },
  "craft-hobby": { shape: "shape-soft" },
  "pool-cabana": { shape: "shape-arch" },
};
const order = ["home-office", "home-gym", "wellness-retreat", "creative-studio", "craft-hobby", "pool-cabana"];
const ordered: LifestyleCategory[] = order
  .map((id) => lifestyleCategories.find((c) => c.id === id))
  .filter((c): c is LifestyleCategory => Boolean(c));

/** Tells the enquiry form which space the visitor was looking at. */
function announceIntendedUse(name: string) {
  window.dispatchEvent(new CustomEvent("ss:intended-use", { detail: name }));
}

export function LifestyleCategories() {
  return (
    <section id="spaces" className="bg-cream" aria-labelledby="spaces-heading">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal className="max-w-[680px]">
          <h2
            id="spaces-heading"
            className="font-heading text-sect leading-[1.04] tracking-tight"
          >
            Six ways to use your spare space.
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-mid">
            Every studio is the same considered build underneath, it&apos;s the
            way you live in it that changes. Point at a room to see it after
            dark, lights on.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((category) => {
            const l = layout[category.id];
            return (
              <article key={category.id} className="group cs-card">
                <div
                  className={`${l.shape} aspect-[4/4.4] elev-2 elev-hover relative overflow-hidden border border-line transition duration-300`}
                >
                  <CategoryScene category={category} />
                </div>
                <h3 className="mt-4 font-heading text-[20px] tracking-tight">
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
                  className="link-draw mt-2 inline-flex min-h-11 items-center gap-1.5 font-heading text-[15px] tracking-tight text-accent-strong"
                >
                  Enquire about this space
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h9.5M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </article>
            );
          })}
        </div>

        <p className="mt-8 max-w-[720px] text-[14px] leading-6 text-mid">
          Indicative long-term weekly rate. Rates vary by door, window and hire
          length, with short and long-term hire available, send an enquiry for a
          full quote. Delivery from {rentalDeliveryFrom}.
        </p>
      </div>
    </section>
  );
}
