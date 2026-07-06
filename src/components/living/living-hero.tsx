export function LivingHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-80px)] items-center overflow-hidden"
      aria-labelledby="living-hero-heading"
    >
      <div className="video-placeholder" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="font-heading text-[13px] tracking-[0.3em] text-accent-strong uppercase">
          Spare Space Living
        </p>
        <h1
          id="living-hero-heading"
          className="mx-auto mt-6 max-w-[860px] font-heading text-[52px] leading-[1.02] tracking-tight text-dark sm:text-[76px] lg:text-[88px]"
        >
          Finish your space,
          <span className="mt-2 block font-script text-[56px] leading-[1.1] text-accent-strong sm:text-[82px] lg:text-[96px]">
            beautifully.
          </span>
        </h1>
        <p className="mx-auto mt-7 max-w-[620px] text-[17px] leading-8 text-mid sm:text-[19px]">
          Flooring, curtains, shelving and tiny-space furniture — chosen for
          compact living. Supply only, or supply and install by our team.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
    </section>
  );
}
