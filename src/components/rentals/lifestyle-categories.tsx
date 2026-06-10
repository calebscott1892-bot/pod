import { Reveal } from "@/components/shared/reveal";

import { lifestyleCategories, type LifestyleCategory } from "./categories";

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
            Every studio is the same considered build underneath — it&apos;s
            the way you live in it that changes. Photography is on its way;
            until then, picture yours.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {lifestyleCategories.map((category, index) => (
            <Reveal key={category.id} delay={(index % 3) * 80}>
              <article className="group transition duration-300 hover:-translate-y-1.5">
                <div
                  className={`${category.shape} relative aspect-[4/4.4] overflow-hidden border border-line shadow-[0_30px_70px_-55px_rgba(44,40,37,0.55)] transition duration-300 group-hover:shadow-[0_40px_85px_-50px_rgba(44,40,37,0.6)]`}
                  style={{ background: category.gradient }}
                >
                  <div className="absolute inset-0 grid place-items-center text-dark/30 transition duration-500 group-hover:scale-110 group-hover:text-dark/40">
                    <CategoryIcon icon={category.icon} />
                  </div>
                </div>
                <h3 className="mt-5 font-heading text-[23px] tracking-tight">
                  {category.name}
                </h3>
                <p className="mt-1 text-[15px] leading-7 text-mid">
                  {category.line}
                </p>
                <a
                  href="#enquire"
                  className="mt-2 inline-flex min-h-11 items-center gap-1.5 font-heading text-[13px] tracking-[0.14em] text-accent-strong uppercase transition hover:gap-2.5"
                >
                  Enquire about this space
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h9.5M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryIcon({ icon }: { icon: LifestyleCategory["icon"] }) {
  return (
    <svg
      width="76"
      height="76"
      viewBox="0 0 56 56"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[icon]}
    </svg>
  );
}

const iconPaths: Record<LifestyleCategory["icon"], React.ReactNode> = {
  gym: (
    <>
      <rect x="6" y="22" width="6" height="12" rx="2" />
      <rect x="44" y="22" width="6" height="12" rx="2" />
      <rect x="12" y="18" width="6" height="20" rx="2" />
      <rect x="38" y="18" width="6" height="20" rx="2" />
      <path d="M18 28h20" />
    </>
  ),
  office: (
    <>
      <rect x="10" y="12" width="36" height="22" rx="3" />
      <path d="M28 34v8M18 46h20M14 28h0" />
      <path d="M16 20h12M16 25h8" />
    </>
  ),
  creative: (
    <>
      <rect x="12" y="10" width="32" height="26" rx="3" />
      <path d="M28 36v10M20 50l8-4 8 4" />
      <path d="M18 30c4-8 8 2 12-6 3-5 6-2 8-6" />
    </>
  ),
  craft: (
    <>
      <circle cx="20" cy="22" r="8" />
      <path d="M20 14v16M12 22h16" />
      <path d="M34 14l10 10-14 18-8-2-2-8 14-18Z" />
    </>
  ),
  wellness: (
    <>
      <path d="M28 12c4 5 4 11 0 16-4-5-4-11 0-16Z" />
      <path d="M14 24c6 1 10 5 11 11-6-1-10-5-11-11ZM42 24c-6 1-10 5-11 11 6-1 10-5 11-11Z" />
      <path d="M16 42c8 4 16 4 24 0" />
    </>
  ),
  cabana: (
    <>
      <path d="M28 10c-10 0-18 6-18 14h36c0-8-8-14-18-14Z" />
      <path d="M28 10v34M16 44h24" />
      <path d="M10 24c3 3 6 3 9 0M37 24c3 3 6 3 9 0M19 24c3 3 6 3 9 0M28 24c3 3 6 3 9 0" />
    </>
  ),
};
