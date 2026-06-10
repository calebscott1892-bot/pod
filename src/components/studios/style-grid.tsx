"use client";

import { Reveal } from "@/components/shared/reveal";

import { formatAud, studioStyles, type StudioStyle } from "./studio-data";

type Props = {
  selectedStyleId: string;
  onChoose: (styleId: string) => void;
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
            is how it&apos;s finished and how you&apos;ll live in it. Studio
            photography is in production; gradients hold the space for now.
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
  onChoose: (styleId: string) => void;
}) {
  const media = (
    <div
      className={`${wide ? "shape-oblong lg:aspect-auto lg:h-full lg:min-h-[280px]" : "shape-arch"} relative aspect-[4/3.4] overflow-hidden border border-line shadow-[0_30px_70px_-55px_rgba(44,40,37,0.55)]`}
      style={{ background: style.gradient }}
    >
      <div className="absolute inset-0 grid place-items-center text-dark/30">
        <StyleIcon icon={style.icon} />
      </div>
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
        onClick={() => onChoose(style.id)}
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

function StyleIcon({ icon }: { icon: StudioStyle["icon"] }) {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 56 56"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[icon]}
    </svg>
  );
}

const iconPaths: Record<StudioStyle["icon"], React.ReactNode> = {
  gym: (
    <>
      <rect x="6" y="22" width="6" height="12" rx="2" />
      <rect x="44" y="22" width="6" height="12" rx="2" />
      <rect x="12" y="18" width="6" height="20" rx="2" />
      <rect x="38" y="18" width="6" height="20" rx="2" />
      <path d="M18 28h20" />
    </>
  ),
  office: (
    <>
      <rect x="10" y="12" width="36" height="22" rx="3" />
      <path d="M28 34v8M18 46h20" />
      <path d="M16 20h12M16 25h8" />
    </>
  ),
  creative: (
    <>
      <circle cx="28" cy="24" r="13" />
      <circle cx="28" cy="24" r="4" />
      <path d="M28 37v9M20 50l8-4 8 4" />
    </>
  ),
  craft: (
    <>
      <circle cx="20" cy="22" r="8" />
      <path d="M20 14v16M12 22h16" />
      <path d="M34 14l10 10-14 18-8-2-2-8 14-18Z" />
    </>
  ),
  wellness: (
    <>
      <path d="M28 12c4 5 4 11 0 16-4-5-4-11 0-16Z" />
      <path d="M14 24c6 1 10 5 11 11-6-1-10-5-11-11ZM42 24c-6 1-10 5-11 11 6-1 10-5 11-11Z" />
      <path d="M16 42c8 4 16 4 24 0" />
    </>
  ),
  cabana: (
    <>
      <path d="M28 10c-10 0-18 6-18 14h36c0-8-8-14-18-14Z" />
      <path d="M28 10v34M16 44h24" />
      <path d="M10 24c3 3 6 3 9 0M37 24c3 3 6 3 9 0M19 24c3 3 6 3 9 0M28 24c3 3 6 3 9 0" />
    </>
  ),
  business: (
    <>
      <rect x="10" y="18" width="36" height="26" rx="4" />
      <path d="M21 18v-4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4" />
      <path d="M10 30h36M25 30v4h6v-4" />
    </>
  ),
};
