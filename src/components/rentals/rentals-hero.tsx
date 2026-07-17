import { StudioPreview } from "@/components/studios/studio-preview";
import { defaultConfig } from "@/components/studios/studio-data";
import { SectionMark } from "@/components/shared/section-mark";

// A rental studio in Rentals blue — rolls in on its castors as the hero.
const heroConfig = {
  ...defaultConfig,
  roof: "skillion-right",
  trim: "blue",
  wall: "white",
};

export function RentalsHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-80px)] items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Video placeholder, swap for a muted, looping <video> when supplied. */}
      <div className="video-placeholder" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:px-8 lg:py-20">
        <div>
          <SectionMark>rented, not bought</SectionMark>
          <h1
            id="hero-heading"
            className="mt-5 max-w-[560px] font-heading text-[46px] leading-[1.02] tracking-tight text-dark sm:text-[64px] lg:text-[74px]"
          >
            Your backyard,
            <span className="mt-1 block font-script text-[52px] leading-[1.1] text-accent-strong sm:text-[72px] lg:text-[84px]">
              transformed.
            </span>
          </h1>
          <p className="mt-6 max-w-[520px] text-[17px] leading-8 text-mid sm:text-[19px]">
            Premium lifestyle studios, delivered and installed across the
            Sunshine Coast and Northern Rivers. Rented, not bought, and it rolls
            in on nine castors, no slab and no permits.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#spaces"
              className="inline-flex min-h-13 items-center rounded-full bg-dark px-8 font-heading text-[15px] tracking-tight text-cream transition hover:bg-accent-strong"
            >
              Explore spaces
            </a>
            <a
              href="#enquire"
              className="link-draw inline-flex min-h-12 items-center font-heading text-[15px] tracking-tight text-dark"
            >
              Make an enquiry
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="shape-soft border border-line bg-white/85 p-4 shadow-[0_44px_100px_-60px_rgba(44,40,37,0.6)] backdrop-blur sm:p-6">
            <StudioPreview config={heroConfig} roll />
          </div>
          <p className="mt-3 text-center font-heading text-[12px] tracking-[0.14em] text-mid uppercase">
            Rolls in, rolls out. No slab, no permits.
          </p>
        </div>
      </div>
    </section>
  );
}
