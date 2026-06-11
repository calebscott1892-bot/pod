import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";

const livingChips = ["Work", "Retreat", "Hobby", "Storage", "Property value"];

export function LifestyleStrip() {
  return (
    <section className="bg-cream-soft" aria-labelledby="strip-heading">
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-8 lg:py-24">
        <Reveal>
          <div className="shape-arch relative aspect-[4/3] overflow-hidden border border-line shadow-[0_40px_90px_-60px_rgba(44,40,37,0.6)]">
            <Image
              src="/assets/images/studios-real.jpg"
              alt="Two Spare Space studios — charcoal and warm white with black-framed glass sliding doors — installed in a Queensland backyard"
              fill
              sizes="(min-width: 1024px) 620px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="font-script text-[30px] leading-none text-accent-strong sm:text-[36px]">
            Already living
          </p>
          <h2
            id="strip-heading"
            className="mt-3 font-heading text-[34px] leading-[1.08] tracking-tight sm:text-[44px]"
          >
            Real studios, in real backyards.
          </h2>
          <p className="mt-5 max-w-[520px] text-[16px] leading-8 text-mid">
            These aren&apos;t renders. Our studios are already working hard
            across Southeast Queensland — as gyms before sunrise, offices by
            day and retreats by the weekend. Portable lifestyle spaces that
            add flexibility, function and value to your property.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {livingChips.map((chip) => (
              <li
                key={chip}
                className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-5 font-heading text-[13px] tracking-[0.12em] text-dark uppercase"
              >
                {chip}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
