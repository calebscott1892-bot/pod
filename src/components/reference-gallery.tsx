import Image from "next/image";

export function ReferenceGallery() {
  return (
    <section
      id="gallery"
      className="border-b border-[#24231f]/10 bg-[#fbf5ec]"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.45fr_1fr] lg:px-8 lg:py-20">
        <div>
          <p className="font-mono text-[11px] font-semibold tracking-[0.32em] text-[#59664f] uppercase">
            Reference style
          </p>
          <h2
            id="gallery-heading"
            className="mt-3 text-[34px] leading-tight font-semibold tracking-tight sm:text-[46px]"
          >
            Glass-front garden pod direction.
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-[#5f5b52]">
            A starting point for the visual style: garden outlook, soft
            exterior finishes and a brighter front.
          </p>
        </div>

        <figure className="overflow-hidden border border-[#24231f]/14 bg-[#fffaf2] shadow-[0_28px_80px_-58px_rgba(36,35,31,0.55)]">
          <div className="relative aspect-[16/10]">
            <Image
              src="/images/pods-hero.png"
              alt="Reference photo of modular garden pods with glass doors"
              fill
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <figcaption className="flex flex-col gap-2 border-t border-[#24231f]/10 bg-[#fffaf2] px-5 py-4 text-[14px] leading-6 text-[#5f5b52] sm:flex-row sm:items-center sm:justify-between">
            <span>Final project gallery to be added.</span>
            <span className="font-mono text-[10px] tracking-[0.24em] text-[#24231f]/45 uppercase">
              Reference style
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
