import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { BrandMark } from "@/components/shared/brand-mark";
import { StudioPreview } from "@/components/studios/studio-preview";
import { presetConfig, presets } from "@/components/studios/studio-data";
import InkReveal from "@/components/ui/ink-reveal";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { group, sites, type SiteId } from "@/lib/site-config";

// A signature studio, rendered live on the featured gateway card, the actual
// configurable product, not a stand-in image.
const gatewayStudioConfig = presetConfig(
  presets.find((preset) => preset.id === "creative") ?? presets[0],
);

export const metadata: Metadata = {
  title: "Kiwi Kiwi Group of Companies, Spare Space Studios, Rentals & Living",
};

type Gateway = {
  siteId: Exclude<SiteId, never>;
  heading: string;
  body: string;
};

const gateways: Gateway[] = [
  {
    siteId: "studios",
    heading: "Own Your Studio",
    body: "Design and buy your own signature studio, customised, built and delivered to your door within weeks.",
  },
  {
    siteId: "rentals",
    heading: "Rent A Space",
    body: "Flexible lifestyle studios on your property, gyms, offices, retreats, without the upfront cost.",
  },
  {
    siteId: "living",
    heading: "Fit Out Your Space",
    body: "Flooring, curtains, shelving and tiny-space furniture. Supply only, or supply and install.",
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
        date="Kiwi Kiwi Group"
        scrollToExpand="Scroll to enter"
      >
        <p className="mx-auto max-w-[620px] text-center text-[17px] leading-8 text-mid sm:text-[19px]">
          Signature designs customised to your lifestyle needs. Built and
          delivered to your door within weeks.
        </p>
      </ScrollExpandMedia>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-14 text-center sm:px-6 lg:py-20">
        <p className="font-script text-[30px] leading-none text-accent-strong sm:text-[38px]">
          Lifestyle Spaces
        </p>
        <h1 className="mt-3 font-heading text-[40px] leading-[1.02] tracking-tight sm:text-[56px]">
          Choose your space.
        </h1>

        <div className="mt-12 grid w-full gap-5 text-left md:grid-cols-2 md:grid-rows-2">
          <GatewayCard
            {...gateways[0]}
            featured
            preview={<StudioPreview config={gatewayStudioConfig} />}
          />
          <GatewayCard {...gateways[1]} />
          <GatewayCard {...gateways[2]} />
        </div>
      </section>

      {/* Interactive flourish — wipe the ink to reveal the photo. Decorative;
          shows the plain photo on touch / reduced-motion. */}
      <section className="mx-auto w-full max-w-[1200px] px-4 pb-20 sm:px-6">
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
        <p className="mt-4 text-center font-heading text-[12px] tracking-[0.16em] text-mid uppercase">
          Move to reveal, real studios in real backyards
        </p>
      </section>

      <footer className="relative flex flex-col items-center gap-1 px-4 pb-8 text-center text-[13px] leading-6 text-mid">
        <p>Our other brands: {group.otherBrands.join(" & ")}</p>
        <p>© 2026 {group.name}</p>
      </footer>
    </main>
  );
}

function GatewayCard({
  siteId,
  heading,
  body,
  featured = false,
  preview,
}: Gateway & { featured?: boolean; preview?: ReactNode }) {
  const site = sites[siteId];

  return (
    <Link
      href={`/${siteId}`}
      data-site={siteId}
      className={`group shape-soft flex flex-col overflow-hidden border border-line bg-white/70 text-left shadow-[0_30px_80px_-60px_rgba(44,40,37,0.5)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent-strong/40 hover:shadow-[0_40px_90px_-55px_rgba(44,40,37,0.55)] ${
        featured ? "justify-between p-8 md:row-span-2 md:p-10" : "p-7"
      }`}
    >
      <BrandMark site={site} size={featured ? "lg" : "md"} priority={featured} />
      {preview ? (
        <div className="shape-soft my-7 overflow-hidden border border-line bg-cream-soft shadow-[0_20px_50px_-45px_rgba(44,40,37,0.6)] transition duration-500 group-hover:-translate-y-0.5">
          {preview}
        </div>
      ) : null}
      <div className={featured ? "" : "mt-6"}>
        <h2 className={`font-heading tracking-tight ${featured ? "text-[30px]" : "text-[22px]"}`}>
          {heading}
        </h2>
        <p className="mt-2 max-w-[420px] text-[15px] leading-7 text-mid">
          {body}
        </p>
        <span className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-dark px-6 font-heading text-[12px] tracking-[0.12em] text-cream uppercase transition group-hover:bg-accent-strong">
          Explore {site.name}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
