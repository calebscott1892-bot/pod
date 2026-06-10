import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { business, sites } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Spare Space — Rent or Own a Premium Lifestyle Studio",
};

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <div className="video-placeholder" aria-hidden="true" />

      <div className="relative mx-auto flex w-full max-w-[1100px] flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <p className="font-script text-[30px] leading-none text-accent-strong sm:text-[38px]">
          Lifestyle spaces
        </p>
        <h1 className="mt-3 font-heading text-[52px] leading-[1.02] tracking-tight sm:text-[72px]">
          Spare Space
        </h1>
        <p className="mt-5 max-w-[560px] text-[17px] leading-8 text-mid sm:text-[19px]">
          Premium modular studios for work, wellness and living — delivered
          from the Northern Rivers to the Sunshine Coast.
        </p>

        <div className="mt-12 grid w-full gap-5 sm:grid-cols-2">
          <GatewayCard
            siteId="rentals"
            heading="Rent a space"
            body="Flexible lifestyle studios on your property — gyms, offices, retreats — without the upfront cost."
            action="Explore Spare Space Rentals"
          />
          <GatewayCard
            siteId="studios"
            heading="Own your studio"
            body="Seven signature designs, customised to your taste and delivered to your door in 13 weeks."
            action="Explore Spare Space Studios"
          />
        </div>
      </div>

      <footer className="relative px-4 pb-8 text-center text-[13px] leading-6 text-mid">
        © 2026 {business.legalName} · ABN {business.abn}
      </footer>
    </main>
  );
}

function GatewayCard({
  siteId,
  heading,
  body,
  action,
}: {
  siteId: "rentals" | "studios";
  heading: string;
  body: string;
  action: string;
}) {
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
      <Image
        src={site.logo}
        alt={site.logoAlt}
        width={300}
        height={224}
        className="relative h-24 w-auto"
        priority
      />
      <h2 className="relative mt-6 font-heading text-[26px] tracking-tight">
        {heading}
      </h2>
      <p className="relative mt-3 max-w-[340px] text-[15px] leading-7 text-mid">
        {body}
      </p>
      <span className="relative mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-dark px-6 font-heading text-[13px] tracking-[0.12em] text-cream uppercase transition group-hover:bg-accent-strong">
        {action}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
