import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { StudioPreview } from "@/components/studios/studio-preview";
import { presetConfig, presets } from "@/components/studios/studio-data";
import InkReveal from "@/components/ui/ink-reveal";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { group, sites, type SiteId } from "@/lib/site-config";

// A signature studio, rendered live on the Studios door — the real product.
const doorStudioConfig = presetConfig(
  presets.find((preset) => preset.id === "creative") ?? presets[0],
);

export const metadata: Metadata = {
  title: "Kiwi Kiwi Group of Companies, Spare Space Studios, Rentals & Living",
};

type Door = {
  siteId: Exclude<SiteId, never>;
  name: string;
  body: string;
  light?: boolean;
};

const doors: Door[] = [
  {
    siteId: "studios",
    name: "Studios",
    body: "Design and buy your signature studio — customised, built, and rolled to your door within weeks.",
    light: true,
  },
  {
    siteId: "rentals",
    name: "Rentals",
    body: "Lifestyle studios on your property — gym, office, retreat — without the upfront cost.",
  },
  {
    siteId: "living",
    name: "Living",
    body: "Flooring, curtains, shelving and tiny-space furniture. Supply only, or fully installed.",
  },
];

export default function Home() {
  return (
    <main id="main-content" className="relative flex min-h-screen flex-col">
      {/* Cinematic opener — placeholder studio photo stands in until Paul
          supplies hero footage; swap mediaType to "video" + mediaSrc then. */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/assets/images/studios-real.jpg"
        bgImageSrc="/assets/images/studios-real.jpg"
        title="Spare Space"
        date="a Kiwi Kiwi family of spaces"
        scrollToExpand="Scroll to enter"
      >
        <p className="mx-auto max-w-[620px] text-center text-[17px] leading-8 text-mid sm:text-[19px]">
          Signature designs customised to your lifestyle needs. Built and
          delivered to your door within weeks.
        </p>
      </ScrollExpandMedia>

      <section className="mx-auto w-full max-w-[1280px] px-[clamp(1.25rem,6vw,5rem)] pt-16 pb-10 lg:pt-20">
        <p className="font-script text-[32px] leading-none text-accent-strong sm:text-[42px]">
          Lifestyle Spaces
        </p>
        <h1 className="mt-2 font-heading text-[clamp(3rem,6vw,4.5rem)] leading-[0.98] tracking-tight">
          Choose your space.
        </h1>
        <p className="mt-5 max-w-[52ch] text-[17px] leading-8 text-mid sm:text-[19px]">
          Three companies, one workshop. Buy a studio, rent one, or fit out the
          inside — every one built on the same nine-castor shell.
        </p>
      </section>

      {/* The Three Doors — a full-bleed triptych. Each brand is drenched in its
          own ground; the door you point at widens. */}
      <section className="three-doors w-full" aria-label="Choose a Spare Space brand">
        {doors.map((door) => (
          <DoorPanel key={door.siteId} {...door} />
        ))}
      </section>

      {/* Interactive flourish — wipe the ink to reveal the photo. Decorative;
          shows the plain photo on touch / reduced-motion. */}
      <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6">
        <div className="elev-2 shape-soft relative aspect-[21/9] w-full overflow-hidden border border-line">
          <Image
            src="/assets/images/studios-real.jpg"
            alt="Finished Spare Space studios in a landscaped backyard"
            fill
            sizes="(min-width: 1200px) 1200px, 100vw"
            className="object-cover"
          />
          <InkReveal />
        </div>
        <p className="mt-4 text-center font-script text-[22px] leading-none text-accent-strong">
          go on, wipe the ink away
        </p>
      </section>

      <footer className="relative flex flex-col items-center gap-1 px-4 pb-8 text-center text-[13px] leading-6 text-mid">
        <p>Our other brands: {group.otherBrands.join(" & ")}</p>
        <p>© 2026 {group.name}</p>
      </footer>
    </main>
  );
}

function DoorPanel({ siteId, name, body, light = false }: Door) {
  const site = sites[siteId];
  return (
    <Link
      href={`/${siteId}`}
      data-site={siteId}
      aria-label={`${site.name} — enter`}
      className={`group relative flex flex-col justify-between gap-8 overflow-hidden px-7 py-10 lg:px-9 lg:py-12 ${
        light ? "bg-cream-soft" : "section-dark"
      }`}
    >
      <div>
        <span className="font-heading text-[13px] tracking-tight text-mid">
          Spare Space
        </span>
        <p className="mt-0.5 font-heading text-[clamp(2.2rem,3.2vw,3rem)] leading-none tracking-tight">
          {name}
        </p>
      </div>

      {light ? (
        <div className="relative -mx-2">
          <StudioPreview config={doorStudioConfig} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[var(--ss-clay)]/50 to-transparent" />
        </div>
      ) : (
        <span className="pointer-events-none self-start text-accent-soft/70" aria-hidden="true">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="19" stroke="currentColor" strokeWidth="2.4" opacity="0.7" />
            <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.55">
              <path d="M26 26V9" />
              <path d="M26 26 12 34" />
              <path d="M26 26 40 34" />
            </g>
          </svg>
        </span>
      )}

      <div className="max-w-[360px]">
        <p className="text-[15px] leading-7 text-mid">{body}</p>
        <span className="mt-6 inline-flex flex-col gap-2.5 text-dark">
          <span
            aria-hidden="true"
            className="door-rule h-0.5 w-9 origin-left bg-current transition-transform duration-500 ease-out group-hover:scale-x-[2.6] group-focus-visible:scale-x-[2.6]"
          />
          <span className="inline-flex items-center gap-2.5 font-heading text-[17px] tracking-tight">
            Step into {name}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-500 ease-out group-hover:translate-x-1"
            >
              <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
      </div>
    </Link>
  );
}
