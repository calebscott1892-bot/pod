import Image from "next/image";
import Link from "next/link";

import InkReveal from "@/components/ui/ink-reveal";

export default function LabPage() {
  return (
    <main className="mx-auto w-full max-w-[1100px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="font-heading text-[13px] tracking-[0.22em] text-accent-strong uppercase">
        Component lab
      </p>
      <h1 className="mt-3 max-w-[720px] font-heading text-[38px] leading-[1.06] tracking-tight sm:text-[52px]">
        Motion &amp; media, ready for Paul&apos;s assets.
      </h1>
      <p className="mt-5 max-w-[640px] text-[16px] leading-8 text-mid">
        A private sandbox, wired with a placeholder photo so the interactions
        are real now and Paul&apos;s photography and video drop straight in
        later. Not linked from the live site.
      </p>

      {/* Ink reveal ------------------------------------------------------ */}
      <section className="mt-16">
        <h2 className="font-heading text-[26px] tracking-tight sm:text-[32px]">
          Ink reveal
        </h2>
        <p className="mt-3 max-w-[640px] text-[15px] leading-7 text-mid">
          Move your cursor across the image to wipe the ink away and reveal what
          is underneath. A natural fit for a &ldquo;reveal the finished
          studio&rdquo; moment. On touch or reduced-motion it simply shows the
          image, so nothing is ever hidden.
        </p>

        <div className="elev-2 shape-soft relative mt-6 aspect-[16/9] w-full overflow-hidden border border-line">
          <Image
            src="/assets/images/studios-real.jpg"
            alt="A finished Spare Space studio in a landscaped backyard"
            fill
            sizes="(min-width: 1100px) 1040px, 100vw"
            className="object-cover"
          />
          <InkReveal />
        </div>
      </section>

      {/* Scroll-to-expand hero ------------------------------------------ */}
      <section className="mt-16">
        <h2 className="font-heading text-[26px] tracking-tight sm:text-[32px]">
          Scroll-to-expand hero
        </h2>
        <p className="mt-3 max-w-[640px] text-[15px] leading-7 text-mid">
          A cinematic opener: a small framed card that grows to fill the screen
          as you scroll, then releases into the page. Built for a hero video of
          a studio being delivered or lived in. It takes over scroll, so it
          lives on its own page.
        </p>
        <Link
          href="/lab/scroll-hero"
          className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-dark px-7 font-heading text-[13px] tracking-[0.12em] text-cream uppercase transition hover:bg-accent-strong"
        >
          Open the demo
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h9.5M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>
    </main>
  );
}
