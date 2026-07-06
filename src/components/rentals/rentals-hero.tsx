import Image from "next/image";

import { Drift } from "@/components/shared/drift";

export function RentalsHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-80px)] items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Video placeholder, swap for a muted, looping <video> when supplied. */}
      <div className="video-placeholder" aria-hidden="true" />

      {/* Floating lifestyle chips, drifting on scroll. Wide screens only. */}
      <div className="pointer-events-none absolute inset-0 hidden 2xl:block" aria-hidden="true">
        <Drift speed={0.14} className="absolute top-[14%] left-[3.5%]">
          <div className="shape-arch relative aspect-[3/3.7] w-56 -rotate-3 overflow-hidden border border-line shadow-[0_36px_80px_-50px_rgba(44,40,37,0.55)]">
            <Image
              src="/assets/images/studios-real.jpg"
              alt=""
              fill
              sizes="224px"
              className="object-cover"
            />
          </div>
          <p className="shape-soft mt-4 ml-6 w-max -rotate-2 border border-line bg-white/85 px-4 py-2 font-heading text-[11px] tracking-[0.14em] text-dark uppercase backdrop-blur">
            Installed · Southeast QLD
          </p>
        </Drift>
        <Drift speed={-0.09} className="absolute right-[4%] bottom-[18%]">
          <div
            className="shape-oblong aspect-[4/2.6] w-60 rotate-2 border border-line shadow-[0_30px_70px_-50px_rgba(44,40,37,0.5)]"
            style={{
              background:
                "linear-gradient(150deg, #f9efe6 8%, #efd2bb 56%, #e2ae8d 100%)",
            }}
          />
          <p className="shape-soft mt-4 ml-10 w-max rotate-1 border border-line bg-white/85 px-4 py-2 font-script text-[19px] text-accent-strong backdrop-blur">
            your sanctuary, steps away
          </p>
        </Drift>
      </div>

      <div className="relative mx-auto w-full max-w-[1280px] px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="font-heading text-[13px] tracking-[0.3em] text-accent-strong uppercase">
          Spare Space Rentals
        </p>
        <h1
          id="hero-heading"
          className="mx-auto mt-6 max-w-[860px] font-heading text-[52px] leading-[1.02] tracking-tight text-dark sm:text-[76px] lg:text-[92px]"
        >
          Your backyard,
          <span className="mt-2 block font-script text-[58px] leading-[1.1] text-accent-strong sm:text-[86px] lg:text-[104px]">
            transformed.
          </span>
        </h1>
        <p className="mx-auto mt-7 max-w-[620px] text-[17px] leading-8 text-mid sm:text-[19px]">
          Premium lifestyle studios, delivered and installed in the Northern
          Rivers and Sunshine Coast. Designed for the way you actually live.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#spaces"
            className="inline-flex min-h-13 items-center rounded-full bg-dark px-8 font-heading text-[14px] tracking-[0.12em] text-cream uppercase transition hover:bg-accent-strong"
          >
            Explore spaces
          </a>
          <a
            href="#enquire"
            className="inline-flex min-h-13 items-center rounded-full border border-dark/30 bg-white/40 px-8 font-heading text-[14px] tracking-[0.12em] text-dark uppercase backdrop-blur transition hover:border-dark hover:bg-white/70"
          >
            Make an enquiry
          </a>
        </div>

        <a
          href="#spaces"
          aria-label="Scroll to lifestyle spaces"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-mid transition hover:text-dark sm:block"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            aria-hidden="true"
            className="animate-bounce"
          >
            <path
              d="m6 10 7 7 7-7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
