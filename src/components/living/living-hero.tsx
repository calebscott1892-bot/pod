const tags = ["Flooring", "Curtains & blinds", "Shelving", "Tiny-space furniture"];

export function LivingHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-80px)] items-center overflow-hidden border-b border-line"
      aria-labelledby="living-hero-heading"
    >
      <div className="video-placeholder" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-[680px]">
          <p className="font-heading text-[13px] tracking-[0.3em] text-accent-strong uppercase">
            Spare Space Living
          </p>
          <h1
            id="living-hero-heading"
            className="mt-5 font-heading text-[46px] leading-[1.04] tracking-tight text-dark sm:text-[62px] lg:text-[72px]"
          >
            Fit out your space, start to finish.
          </h1>
          <p className="mt-6 max-w-[560px] text-[17px] leading-8 text-mid sm:text-[19px]">
            Flooring, curtains, shelving and tiny-space furniture, chosen for
            compact living. Supply only, or supply and install by our team.
          </p>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {tags.map((tag) => (
              <li
                key={tag}
                className="inline-flex min-h-10 items-center rounded-full border border-line bg-white/70 px-4 font-heading text-[12px] tracking-[0.1em] text-dark uppercase backdrop-blur"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#fitout"
              className="inline-flex min-h-13 items-center rounded-full bg-dark px-8 font-heading text-[14px] tracking-[0.12em] text-cream uppercase transition hover:bg-accent-strong"
            >
              See the range
            </a>
            <a
              href="#enquire"
              className="inline-flex min-h-13 items-center rounded-full border border-dark/30 bg-white/40 px-8 font-heading text-[14px] tracking-[0.12em] text-dark uppercase backdrop-blur transition hover:border-dark hover:bg-white/70"
            >
              Enquire
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
