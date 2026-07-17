import { StudioPreview } from "./studio-preview";
import { defaultConfig } from "./studio-data";
import { SectionMark } from "@/components/shared/section-mark";

const heroConfig = {
  ...defaultConfig,
  roof: "a-frame",
  door: "french-blue",
  hardware: "brushed-chrome",
  window: "large",
  trim: "blue",
  wall: "white",
};

export function StudiosHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line"
      aria-labelledby="hero-heading"
    >
      {/* Video placeholder, swap for a muted, looping <video> when supplied. */}
      <div className="video-placeholder" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:px-8 lg:py-24">
        <div>
          <SectionMark>rolls right to you</SectionMark>
          <h1
            id="hero-heading"
            className="mt-5 max-w-[560px] font-heading text-[44px] leading-[1.04] tracking-tight text-dark sm:text-[58px] lg:text-[66px]"
          >
            Signature studios, customised and delivered.
          </h1>
          <p className="mt-6 max-w-[520px] text-[17px] leading-8 text-mid sm:text-[19px]">
            Choose a style, then make it yours: roof, doors, windows, wall and
            trim colour. Built and delivered to your door within weeks.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#configurator"
              className="inline-flex min-h-13 items-center rounded-full bg-dark px-8 font-heading text-[15px] tracking-tight text-cream transition hover:bg-accent-strong"
            >
              Design yours
            </a>
            <a
              href="#styles"
              className="link-draw inline-flex min-h-12 items-center font-heading text-[15px] tracking-tight text-dark"
            >
              Browse styles
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="shape-soft border border-line bg-white/85 p-4 shadow-[0_44px_100px_-60px_rgba(44,40,37,0.6)] backdrop-blur sm:p-6">
            <StudioPreview config={heroConfig} roll />
          </div>
          <p className="mt-3 text-center font-heading text-[12px] tracking-[0.14em] text-mid uppercase">
            Rolls in on nine castors. Every option updates it live.
          </p>
        </div>
      </div>
    </section>
  );
}
