"use client";

import Link from "next/link";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

/**
 * Scroll-to-expand hero demo. Placeholder image stands in for the hero video
 * Paul will supply — swap mediaType to "video" and point mediaSrc at the file
 * (or a YouTube URL) to preview the footage version.
 */
export default function ScrollHeroLabPage() {
  return (
    <>
      <Link
        href="/lab"
        className="fixed top-5 left-5 z-50 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/40 bg-black/30 px-5 font-heading text-[12px] tracking-[0.14em] text-cream uppercase backdrop-blur transition hover:bg-black/50"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M12 7H2.5M6 3.5 2.5 7 6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Lab
      </Link>

      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/assets/images/studios-real.jpg"
        bgImageSrc="/assets/images/studios-real.jpg"
        title="Signature Studios"
        date="Spare Space"
        scrollToExpand="Scroll to expand"
      >
        <div className="mx-auto max-w-[720px] text-center">
          <h3 className="font-heading text-[30px] leading-[1.1] tracking-tight sm:text-[40px]">
            Delivered to your door, within weeks.
          </h3>
          <p className="mt-5 text-[16px] leading-8 text-mid">
            Once Paul supplies a hero video, this opener plays it full-bleed as
            you scroll, then hands you into the rest of the page. Until then this
            is the placeholder studio photo, standing in for the footage.
          </p>
        </div>
      </ScrollExpandMedia>
    </>
  );
}
