import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";
import { business, sites } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "Order received | Spare Space Studios" },
  robots: { index: false },
};

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;
  const orderRef = sessionId ? sessionId.slice(-8).toUpperCase() : null;

  return (
    <>
      <SiteHeader site={sites.studios} />
      <main id="main-content" className="relative flex flex-1 items-center overflow-hidden">
        <div className="video-placeholder" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-[720px] px-4 py-20 text-center sm:px-6">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-accent-soft text-accent-strong">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <path d="m9 19 6.5 6.5L27 11.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="mt-6 font-script text-[32px] leading-none text-accent-strong">
            Thank you
          </p>
          <h1 className="mt-2 font-heading text-[40px] leading-[1.05] tracking-tight sm:text-[54px]">
            Your studio is on its way.
          </h1>
          {orderRef ? (
            <p className="mt-4 font-heading text-[14px] tracking-[0.18em] text-mid uppercase">
              Order reference · {orderRef}
            </p>
          ) : null}
          <p className="mx-auto mt-5 max-w-[520px] text-[16px] leading-8 text-mid">
            Your payment receipt is in your inbox. Here&apos;s what happens
            next: we&apos;ll call within one business day to confirm your
            design, then assess your property via Google Earth and lock in
            delivery. Your studio arrives in around 13 weeks.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/studios"
              className="inline-flex min-h-13 items-center rounded-full bg-dark px-8 font-heading text-[14px] tracking-[0.12em] text-cream uppercase transition hover:bg-accent-strong"
            >
              Back to Spare Space Studios
            </Link>
            <a
              href={business.phoneHref}
              className="inline-flex min-h-13 items-center rounded-full border border-dark/30 bg-white/40 px-8 font-heading text-[14px] tracking-[0.12em] text-dark uppercase backdrop-blur transition hover:border-dark hover:bg-white/70"
            >
              Call {business.phone}
            </a>
          </div>
        </div>
      </main>
      <SiteFooter site={sites.studios} />
    </>
  );
}
