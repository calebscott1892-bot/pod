import type { Metadata } from "next";
import Link from "next/link";

import { BrandMark } from "@/components/shared/brand-mark";
import { group, sites, type SiteId } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kiwi Kiwi Group of Companies — Spare Space Studios, Rentals & Living",
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
    body: "Design and buy your own signature studio — customised, built and delivered to your door within weeks.",
  },
  {
    siteId: "rentals",
    heading: "Rent A Space",
    body: "Flexible lifestyle studios on your property — gyms, offices, retreats — without the upfront cost.",
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
      <div className="video-placeholder" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <p className="font-script text-[30px] leading-none text-accent-strong sm:text-[38px]">
          Lifestyle Spaces
        </p>
        <h1 className="mt-3 font-heading text-[46px] leading-[1.02] tracking-tight sm:text-[64px]">
          Spare Space
        </h1>
        <p className="mt-5 max-w-[580px] text-[17px] leading-8 text-mid sm:text-[19px]">
          Signature designs customised to your lifestyle needs. Built and
          delivered to your door within weeks.
        </p>

        <div className="mt-12 grid w-full gap-5 md:grid-cols-3">
          {gateways.map((gateway) => (
            <GatewayCard key={gateway.siteId} {...gateway} />
          ))}
        </div>
      </div>

      <footer className="relative flex flex-col items-center gap-1 px-4 pb-8 text-center text-[13px] leading-6 text-mid">
        <p>
          Our other brands: {group.otherBrands.join(" & ")}
        </p>
        <p>© 2026 {group.name}</p>
      </footer>
    </main>
  );
}

function GatewayCard({ siteId, heading, body }: Gateway) {
  const site = sites[siteId];

  return (
    <Link
      href={`/${siteId}`}
      data-site={siteId}
      className="group shape-soft relative flex flex-col items-center overflow-hidden border border-line bg-white/70 px-7 py-10 text-center shadow-[0_30px_80px_-60px_rgba(44,40,37,0.5)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-accent-strong/40 hover:shadow-[0_40px_90px_-55px_rgba(44,40,37,0.55)]"
    >
      <span
        aria-hidden="true"
        className="shape-blob absolute -top-16 -right-14 size-44 bg-accent-soft opacity-70 transition duration-500 group-hover:scale-110"
      />
      <span className="relative grid h-24 place-items-center">
        <BrandMark site={site} size="lg" priority />
      </span>
      <h2 className="relative mt-6 font-heading text-[24px] tracking-tight">
        {heading}
      </h2>
      <p className="relative mt-3 max-w-[340px] text-[15px] leading-7 text-mid">
        {body}
      </p>
      <span className="relative mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-dark px-6 font-heading text-[12px] tracking-[0.12em] text-cream uppercase transition group-hover:bg-accent-strong">
        Explore {site.name}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
