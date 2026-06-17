"use client";

import { Reveal } from "@/components/shared/reveal";

import { StudioPreview } from "./studio-preview";
import { formatAud, studioStyles, type StudioConfig, type StudioStyle } from "./studio-data";

type Props = {
  selectedStyleId: string;
  onChoose: (config: StudioConfig) => void;
};

export function StyleGrid({ selectedStyleId, onChoose }: Props) {
  return (
    <section id="styles" className="bg-cream" aria-labelledby="styles-heading">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal className="max-w-[680px]">
          <p className="font-heading text-[13px] tracking-[0.22em] text-accent-strong uppercase">
            Seven signature styles
          </p>
          <h2
            id="styles-heading"
            className="mt-3 font-heading text-[34px] leading-[1.08] tracking-tight sm:text-[44px]"
          >
            Pick your starting point.
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-mid">
            Every style shares the same premium one-size shell — what changes
            is how it&apos;s finished and how you&apos;ll live in it. Each
            preview shows a signature finish; you can change every detail next.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {studioStyles.map((style, index) => (
            <Reveal
              key={style.id}
              delay={(index % 3) * 80}
              className={index === studioStyles.length - 1 ? "sm:col-span-2 lg:col-span-3" : undefined}
            >
              <StyleCard
                style={style}
                wide={index === studioStyles.length - 1}
                selected={style.id === selectedStyleId}
                onChoose={onChoose}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StyleCard({
  style,
  wide,
  selected,
  onChoose,
}: {
  style: StudioStyle;
  wide: boolean;
  selected: boolean;
  onChoose: (config: StudioConfig) => void;
}) {
  const config: StudioConfig = { styleId: style.id, ...style.signature };

  const media = (
    <div
      className={`${wide ? "shape-oblong" : "shape-soft"} relative overflow-hidden border border-line bg-cream-soft shadow-[0_30px_70px_-55px_rgba(44,40,37,0.55)]`}
    >
      <StudioPreview config={config} />
      {selected ? (
        <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-dark px-4 py-2 font-heading text-[11px] tracking-[0.14em] text-cream uppercase">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="m2 6.5 2.7 2.7L10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          In your design
        </span>
      ) : null}
    </div>
  );

  const body = (
    <div className={wide ? "flex flex-col items-start lg:justify-center" : undefined}>
      <h3 className="mt-5 font-heading text-[24px] tracking-tight lg:mt-0">
        {style.name}
      </h3>
      <p className="mt-1 text-[15px] leading-7 text-mid">{style.line}</p>
      <p className="mt-3 font-heading text-[18px] tracking-tight text-dark">
        From {formatAud(style.basePrice)}
      </p>
      <button
        type="button"
        onClick={() => onChoose(config)}
        className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-full bg-dark px-6 font-heading text-[13px] tracking-[0.12em] text-cream uppercase transition hover:bg-accent-strong"
      >
        Customise &amp; buy
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 7h9.5M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );

  if (wide) {
    return (
      <article className="group grid gap-6 transition duration-300 hover:-translate-y-1.5 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
        {media}
        {body}
      </article>
    );
  }

  return (
    <article className="group transition duration-300 hover:-translate-y-1.5">
      {media}
      {body}
    </article>
  );
}
