import { Reveal } from "@/components/shared/reveal";

export function LivingOffering() {
  return (
    <section id="offering" className="section-dark" aria-labelledby="offering-heading">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal className="max-w-[680px]">
          <h2
            id="offering-heading"
            className="mt-3 font-heading text-sect leading-[1.04] tracking-tight"
          >
            Two ways to work with us.
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-mid">
            Whether you&apos;re fitting out a Spare Space studio or any compact
            room, take the products and do it yourself, or have our team handle
            the lot.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            {
              title: "Supply only",
              body: "Choose your flooring, window furnishings, shelving and furniture and we deliver, ready for you or your trades to install.",
              points: ["Delivered to your door", "Trade-friendly pricing", "Expert product advice"],
            },
            {
              title: "Supply & install",
              body: "We measure, supply and install the full fit-out, so your space is finished and functional without lifting a finger.",
              points: ["On-site measure & quote", "Professional installation", "One team, start to finish"],
            },
          ].map((card) => (
            <article key={card.title} className="shape-soft h-full border border-line bg-white/[0.06] p-8">
                <h3 className="font-heading text-[24px] tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-mid">{card.body}</p>
                <ul className="mt-5 space-y-2.5">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-[15px] text-dark">
                      <span className="chip-on-dark grid size-6 shrink-0 place-items-center rounded-full text-accent-soft">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="m2 6.5 2.7 2.7L10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const categories: { name: string; line: string; icon: keyof typeof icons }[] = [
  { name: "Flooring", line: "Vinyl plank, laminate and carpet tiles built for compact spaces.", icon: "flooring" },
  { name: "Curtains & blinds", line: "Block-out and sheer window furnishings, made to measure.", icon: "curtains" },
  { name: "Shelving & storage", line: "Wall shelving, cabinetry and clever storage that earns its space.", icon: "shelving" },
  { name: "Tiny-space furniture", line: "Sofas, desks and beds scaled and chosen for small footprints.", icon: "furniture" },
];

export function LivingFitout() {
  return (
    <section id="fitout" className="bg-cream-soft" aria-labelledby="fitout-heading">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal className="max-w-[680px]">
          <h2
            id="fitout-heading"
            className="mt-3 font-heading text-sect leading-[1.04] tracking-tight"
          >
            Everything to finish the room.
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-mid">
            A curated fit-out range, product photography is on its way; the
            categories are ready to fill.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <article key={category.name} className="group">
                <div className="shape-soft elev-2 elev-hover relative grid aspect-[4/3] place-items-center overflow-hidden border border-line bg-white text-accent-strong transition duration-300 group-hover:-translate-y-1">
                  <CategoryIcon icon={category.icon} />
                </div>
                <h3 className="mt-4 font-heading text-[20px] tracking-tight">
                  {category.name}
                </h3>
                <p className="mt-1 text-[14px] leading-6 text-mid">
                  {category.line}
                </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryIcon({ icon }: { icon: keyof typeof icons }) {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[icon]}
    </svg>
  );
}

const icons = {
  flooring: (
    <>
      <path d="M6 14h36M6 24h36M6 34h36" />
      <path d="M14 14v10M28 14v10M20 24v10M34 24v10M8 34v6M40 14v-4" opacity="0.5" />
    </>
  ),
  curtains: (
    <>
      <rect x="8" y="8" width="32" height="32" rx="2" />
      <path d="M14 8c1 10-1 20 1 30M20 8c-1 12 1 22-1 30M28 8c1 10-1 20 1 30M34 8c-1 12 1 22-1 30" />
    </>
  ),
  shelving: (
    <>
      <path d="M10 10v28M38 10v28M10 19h28M10 29h28" />
      <rect x="14" y="12" width="6" height="6" opacity="0.5" />
      <rect x="24" y="21" width="8" height="7" opacity="0.5" />
    </>
  ),
  furniture: (
    <>
      <path d="M8 26v8M40 26v8" />
      <path d="M8 30c0-4 2-6 6-6h20c4 0 6 2 6 6" />
      <rect x="10" y="26" width="28" height="8" rx="2" />
      <path d="M14 24v-6c0-2 1-3 3-3h14c2 0 3 1 3 3v6" />
    </>
  ),
};
