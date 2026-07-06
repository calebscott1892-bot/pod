"use client";

import { Reveal } from "@/components/shared/reveal";

import { StudioPreview } from "./studio-preview";
import {
  configTotal,
  formatAud,
  presetConfig,
  presets,
  type Preset,
  type StudioConfig,
} from "./studio-data";

type Props = {
  selectedPresetId: string | null;
  onChoose: (presetId: string, config: StudioConfig) => void;
};

export function StyleGrid({ selectedPresetId, onChoose }: Props) {
  return (
    <section id="styles" className="bg-cream" aria-labelledby="styles-heading">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal className="max-w-[700px]">
          <p className="font-heading text-[13px] tracking-[0.22em] text-accent-strong uppercase">
            Signature designs
          </p>
          <h2
            id="styles-heading"
            className="mt-3 font-heading text-[34px] leading-[1.08] tracking-tight sm:text-[44px]"
          >
            Choose your style.
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-mid">
            All spaces are the same one-size shell. Each preview shows a
            signature finish, customisable at every step — pick a style, doors,
            windows, wall and trim colour, and watch your studio and price
            update as you go.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {presets.map((preset, index) => (
            <Reveal key={preset.id} delay={(index % 3) * 70}>
              <PresetCard
                preset={preset}
                selected={preset.id === selectedPresetId}
                onChoose={onChoose}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PresetCard({
  preset,
  selected,
  onChoose,
}: {
  preset: Preset;
  selected: boolean;
  onChoose: (presetId: string, config: StudioConfig) => void;
}) {
  const config = presetConfig(preset);
  const from = configTotal(config);

  return (
    <article className="group transition duration-300 hover:-translate-y-1.5">
      <div className="shape-soft relative overflow-hidden border border-line bg-cream-soft shadow-[0_30px_70px_-55px_rgba(44,40,37,0.55)]">
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
      <h3 className="mt-5 font-heading text-[23px] tracking-tight">
        {preset.name}
      </h3>
      <p className="mt-1 text-[15px] leading-7 text-mid">{preset.line}</p>
      <p className="mt-3 font-heading text-[18px] tracking-tight text-dark">
        From {formatAud(from)}
      </p>
      <button
        type="button"
        onClick={() => onChoose(preset.id, config)}
        className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-full bg-dark px-6 font-heading text-[13px] tracking-[0.12em] text-cream uppercase transition hover:bg-accent-strong"
      >
        Customise &amp; buy
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 7h9.5M8 3.5 11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </article>
  );
}
