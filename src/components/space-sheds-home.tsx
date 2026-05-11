"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import {
  type ShedColour,
  type ShedConcept,
  type ShedShape,
  type ShedStyle,
  type ShedUpgrade,
} from "./builder-options";
import { PopularUses } from "./popular-uses";
import { ProcessSection } from "./process-section";
import { QuoteForm } from "./quote-form";
import { ReferenceGallery } from "./reference-gallery";
import { ShedBuilder } from "./shed-builder";
import { SiteHeader } from "./site-header";
import { StyleCards } from "./style-cards";

export function SpaceShedsHome() {
  const [style, setStyle] = useState<ShedStyle>("studio-shed");
  const [shape, setShape] = useState<ShedShape>("classic");
  const [colour, setColour] = useState<ShedColour>("sage");
  const [upgrades, setUpgrades] = useState<ShedUpgrade[]>([]);

  const concept = useMemo<ShedConcept>(
    () => ({ style, shape, colour, upgrades }),
    [style, shape, colour, upgrades],
  );

  function handleStartBuilding(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const builder = document.getElementById("builder");
    builder?.focus({ preventScroll: true });
    builder?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen bg-[#fbf5ec] text-[#24231f]">
      <SiteHeader />

      <section
        id="top"
        className="border-b border-[#24231f]/10 bg-[#fbf5ec]"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto grid w-full max-w-[1440px] gap-9 px-4 pt-10 pb-12 sm:px-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(420px,0.62fr)] lg:items-center lg:px-8 lg:pt-16 lg:pb-18">
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-[0.32em] text-[#59664f] uppercase">
              Space Sheds
            </p>
            <h1
              id="hero-heading"
              className="mt-4 max-w-[780px] text-[43px] leading-[1.02] font-semibold tracking-tight text-[#24231f] sm:text-[62px] lg:text-[82px]"
            >
              Design a shed that fits your space.
            </h1>
            <p className="mt-5 max-w-[650px] text-[17px] leading-8 text-[#4f4d46] sm:text-[19px]">
              Choose a style, shape, colour and optional upgrades, then send
              your selection through for a quote.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#builder"
                onClick={handleStartBuilding}
                className="inline-flex min-h-12 items-center justify-center bg-[#b8c7a3] px-5 font-mono text-[11px] font-semibold tracking-[0.18em] text-[#24231f] uppercase transition hover:bg-[#d7e2c0] focus:ring-2 focus:ring-[#6f8067] focus:ring-offset-2 focus:ring-offset-[#fbf5ec] focus:outline-none"
              >
                Start Building
              </a>
              <a
                href="#styles"
                className="inline-flex min-h-12 items-center justify-center border border-[#24231f]/25 px-5 font-mono text-[11px] font-semibold tracking-[0.18em] text-[#24231f] uppercase transition hover:border-[#24231f] hover:bg-[#f6dddd] focus:ring-2 focus:ring-[#6f8067]/40 focus:outline-none"
              >
                View Styles
              </a>
            </div>
            <p className="mt-8 max-w-[560px] text-[15px] leading-7 text-[#5f5b52]">
              Soft garden rooms and practical sheds for work, storage, hobbies
              and quiet space at home.
            </p>
          </div>

          <figure className="overflow-hidden border border-[#24231f]/14 bg-[#fffaf2] shadow-[0_34px_90px_-60px_rgba(36,35,31,0.65)]">
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/pods-hero.png"
                alt="Reference garden pods with glass doors and warm exterior finishes"
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="grid gap-3 border-t border-[#24231f]/10 bg-[#fffaf2] p-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <span className="text-[14px] leading-6 text-[#5f5b52]">
                A starting point for the glass-front garden pod style.
              </span>
              <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-[#59664f] uppercase">
                Reference style
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <ShedBuilder
        concept={concept}
        onStyleChange={setStyle}
        onShapeChange={setShape}
        onColourChange={setColour}
        onUpgradesChange={setUpgrades}
      />
      <StyleCards />
      <PopularUses />
      <ReferenceGallery />
      <ProcessSection />
      <QuoteForm concept={concept} />

      <footer className="border-t border-[#24231f]/10 bg-[#fbf5ec]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-6 text-[13px] leading-5 text-[#24231f]/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>(c) Space Sheds.</p>
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase sm:tracking-[0.2em]">
            Draft content pending final product details.
          </p>
        </div>
      </footer>
    </main>
  );
}
