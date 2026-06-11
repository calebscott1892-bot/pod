import type { Metadata } from "next";
import Link from "next/link";

import { StudioPreview } from "@/components/studios/studio-preview";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 text-center"
    >
      <div className="video-placeholder" aria-hidden="true" />

      <div className="relative w-full max-w-[420px] opacity-90" aria-hidden="true">
        <StudioPreview
          config={{
            styleId: "office",
            windowId: "standard",
            doorId: "barn",
            claddingId: "charcoal",
          }}
        />
      </div>

      <p className="relative font-script text-[32px] leading-none text-accent-strong sm:text-[38px]">
        Hmm, nothing here yet
      </p>
      <h1 className="relative mt-3 font-heading text-[38px] leading-[1.05] tracking-tight sm:text-[50px]">
        This space hasn&apos;t been built.
      </h1>
      <p className="relative mx-auto mt-4 max-w-[440px] text-[16px] leading-7 text-mid">
        The page you&apos;re after doesn&apos;t exist — but plenty of
        beautiful spaces do.
      </p>

      <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/rentals"
          className="inline-flex min-h-13 items-center rounded-full bg-dark px-7 font-heading text-[13px] tracking-[0.12em] text-cream uppercase transition hover:bg-accent-strong"
        >
          Rent a space
        </Link>
        <Link
          href="/studios"
          className="inline-flex min-h-13 items-center rounded-full border border-dark/30 bg-white/40 px-7 font-heading text-[13px] tracking-[0.12em] text-dark uppercase backdrop-blur transition hover:border-dark hover:bg-white/70"
        >
          Design a studio
        </Link>
        <Link
          href="/"
          className="font-heading text-[13px] tracking-[0.12em] text-mid uppercase underline decoration-line underline-offset-4 transition hover:text-dark"
        >
          Home
        </Link>
      </div>
    </main>
  );
}
