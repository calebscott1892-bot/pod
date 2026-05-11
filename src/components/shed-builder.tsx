"use client";

import { useMemo, useState } from "react";

import {
  colourOptions,
  conceptLabels,
  shapeOptions,
  styleOptions,
  upgradeOptions,
  type ShedColour,
  type ShedConcept,
  type ShedShape,
  type ShedStyle,
  type ShedUpgrade,
} from "./builder-options";
import {
  builderSteps,
  BuilderStepper,
  type BuilderStep,
} from "./builder-stepper";
import { BuilderSummary } from "./builder-summary";
import { ShedPreview } from "./shed-preview";

type Props = {
  concept: ShedConcept;
  onStyleChange: (style: ShedStyle) => void;
  onShapeChange: (shape: ShedShape) => void;
  onColourChange: (colour: ShedColour) => void;
  onUpgradesChange: (upgrades: ShedUpgrade[]) => void;
};

const stepCopy: Record<
  BuilderStep,
  { heading: string; body: string; nextLabel?: string }
> = {
  style: {
    heading: "Choose the closest starting point.",
    body: "Pick the style that best matches how you want to use the space. You can refine the look and inclusions as you move through.",
    nextLabel: "Next: Shape",
  },
  shape: {
    heading: "Set the shape and frontage.",
    body: "Keep the form simple, work into a corner, or make the garden-facing side brighter with more glass.",
    nextLabel: "Next: Colour",
  },
  colour: {
    heading: "Choose your finish direction.",
    body: "Select the palette that feels closest to your home and garden. Finish and inclusions can be confirmed after enquiry.",
    nextLabel: "Next: Upgrades",
  },
  upgrades: {
    heading: "Add options you would like to discuss.",
    body: "Upgrades start off. Add only the items that suit how the shed will be used.",
    nextLabel: "Review Build",
  },
  review: {
    heading: "Review your shed selection.",
    body: "Check the build, then send it through for a quote.",
  },
};

export function ShedBuilder({
  concept,
  onStyleChange,
  onShapeChange,
  onColourChange,
  onUpgradesChange,
}: Props) {
  const [activeStep, setActiveStep] = useState<BuilderStep>("style");

  const activeIndex = useMemo(
    () => builderSteps.findIndex((step) => step.id === activeStep),
    [activeStep],
  );
  const labels = conceptLabels(concept);

  function toggleUpgrade(id: ShedUpgrade) {
    onUpgradesChange(
      concept.upgrades.includes(id)
        ? concept.upgrades.filter((upgrade) => upgrade !== id)
        : [...concept.upgrades, id],
    );
  }

  function goToStep(index: number) {
    const step = builderSteps[index];
    if (step) {
      setActiveStep(step.id);
    }
  }

  function renderActiveStep() {
    switch (activeStep) {
      case "style":
        return (
          <div className="grid gap-3 md:grid-cols-3">
            {styleOptions.map((option) => {
              const selected = option.id === concept.style;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onStyleChange(option.id)}
                  className={`min-h-40 border p-4 text-left transition duration-200 focus:ring-2 focus:ring-[#6f8067] focus:outline-none ${
                    selected
                      ? "border-[#59664f] bg-[#d7e2c0] shadow-[0_18px_48px_-36px_rgba(36,35,31,0.55)]"
                      : "border-[#24231f]/12 bg-[#fffaf2] hover:-translate-y-0.5 hover:border-[#6f8067]/45 hover:bg-[#fbf5ec]"
                  }`}
                >
                  <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-[#59664f] uppercase">
                    Style
                  </span>
                  <span className="mt-4 block text-[23px] leading-tight font-semibold tracking-tight">
                    {option.label}
                  </span>
                  <span className="mt-3 block text-[14px] leading-6 text-[#5f5b52]">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
        );
      case "shape":
        return (
          <div className="grid gap-3 md:grid-cols-3">
            {shapeOptions.map((option) => {
              const selected = option.id === concept.shape;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => onShapeChange(option.id)}
                  className={`min-h-36 border p-4 text-left transition duration-200 focus:ring-2 focus:ring-[#6f8067] focus:outline-none ${
                    selected
                      ? "border-[#59664f] bg-[#f6dddd] shadow-[0_18px_48px_-36px_rgba(36,35,31,0.45)]"
                      : "border-[#24231f]/12 bg-[#fffaf2] hover:-translate-y-0.5 hover:border-[#6f8067]/45 hover:bg-[#fbf5ec]"
                  }`}
                >
                  <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-[#59664f] uppercase">
                    Shape
                  </span>
                  <span className="mt-4 block text-[22px] leading-tight font-semibold tracking-tight">
                    {option.label}
                  </span>
                  <span className="mt-3 block text-[14px] leading-6 text-[#5f5b52]">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
        );
      case "colour":
        return (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {colourOptions.map((option) => {
              const selected = option.id === concept.colour;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  aria-label={`Choose ${option.label}`}
                  onClick={() => onColourChange(option.id)}
                  className={`border p-3 text-left transition duration-200 focus:ring-2 focus:ring-[#6f8067] focus:outline-none ${
                    selected
                      ? "border-[#59664f] bg-[#fffaf2] shadow-[0_18px_45px_-30px_rgba(36,35,31,0.55)]"
                      : "border-[#24231f]/12 bg-[#fffaf2] hover:-translate-y-0.5 hover:border-[#6f8067]/45"
                  }`}
                >
                  <span
                    className={`block h-20 w-full border ${
                      selected ? "border-[#24231f]" : "border-[#24231f]/14"
                    }`}
                    style={{ backgroundColor: option.swatch }}
                  />
                  <span className="mt-3 block text-[15px] font-semibold">
                    {option.label}
                  </span>
                  <span className="mt-1 block text-[12px] leading-4 text-[#5f5b52]">
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
        );
      case "upgrades":
        return (
          <div className="grid gap-3 md:grid-cols-2">
            {upgradeOptions.map((option) => {
              const selected = concept.upgrades.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleUpgrade(option.id)}
                  className={`flex min-h-24 items-start gap-4 border px-4 py-4 text-left transition duration-200 focus:ring-2 focus:ring-[#6f8067] focus:outline-none ${
                    selected
                      ? "border-[#59664f] bg-[#eaf0dc] shadow-[0_18px_48px_-38px_rgba(36,35,31,0.45)]"
                      : "border-[#24231f]/12 bg-[#fffaf2] hover:-translate-y-0.5 hover:border-[#6f8067]/45 hover:bg-[#fbf5ec]"
                  }`}
                >
                  <span
                    className={`mt-1 grid size-6 shrink-0 place-items-center border ${
                      selected
                        ? "border-[#24231f] bg-[#24231f]"
                        : "border-[#24231f]/28 bg-[#fffaf2]"
                    }`}
                    aria-hidden="true"
                  >
                    {selected ? (
                      <svg
                        width="13"
                        height="10"
                        viewBox="0 0 13 10"
                        fill="none"
                      >
                        <path
                          d="M1 5 4.5 8.5 12 1"
                          stroke="#fffaf2"
                          strokeWidth="1.8"
                          strokeLinecap="square"
                        />
                      </svg>
                    ) : null}
                  </span>
                  <span>
                    <span className="block text-[16px] font-semibold">
                      {option.label}
                    </span>
                    <span className="mt-1 block text-[13px] leading-5 text-[#5f5b52]">
                      {option.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        );
      case "review":
        return (
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1fr]">
            <div className="border border-[#24231f]/12 bg-[#fffaf2] p-5 shadow-[0_20px_55px_-44px_rgba(36,35,31,0.45)]">
              <p className="font-mono text-[10px] font-semibold tracking-[0.24em] text-[#59664f] uppercase">
                Your current build
              </p>
              <h3 className="mt-3 text-[28px] leading-tight font-semibold tracking-tight">
                {labels.style}, {labels.shape.toLowerCase()} shape
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-[#5f5b52]">
                Finished in {labels.colour.toLowerCase()} with{" "}
                {labels.upgrades.length
                  ? `${labels.upgrades.length} optional upgrade${
                      labels.upgrades.length === 1 ? "" : "s"
                    }`
                  : "no upgrades selected"}
                .
              </p>
            </div>
            <BuilderSummary concept={concept} compact />
          </div>
        );
    }
  }

  const copy = stepCopy[activeStep];
  const atFirstStep = activeIndex === 0;
  const atLastStep = activeIndex === builderSteps.length - 1;

  return (
    <section
      id="builder"
      tabIndex={-1}
      className="border-b border-[#24231f]/10 bg-[#f8eadf] focus:outline-none"
      aria-labelledby="builder-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(440px,0.58fr)] lg:items-start">
          <div className="order-2 lg:order-1">
            <div className="mb-5">
              <p className="font-mono text-[11px] font-semibold tracking-[0.32em] text-[#59664f] uppercase">
                Build Your Shed
              </p>
              <h2
                id="builder-heading"
                className="mt-3 max-w-[760px] text-[34px] leading-tight font-semibold tracking-tight sm:text-[48px]"
              >
                Choose it, customise it, send it through.
              </h2>
              <p className="mt-4 max-w-[680px] text-[16px] leading-7 text-[#5f5b52]">
                Move through each step and keep an eye on your current build as
                it updates.
              </p>
            </div>

            <BuilderStepper
              activeStep={activeStep}
              onStepChange={setActiveStep}
            />

            <div className="mt-4 border border-[#24231f]/12 bg-[#fbf5ec] p-4 sm:p-6">
              <div className="max-w-[720px]">
                <p className="font-mono text-[11px] font-semibold tracking-[0.24em] text-[#59664f] uppercase">
                  Step {activeIndex + 1} of {builderSteps.length}
                </p>
                <h3 className="mt-3 text-[27px] leading-tight font-semibold tracking-tight sm:text-[34px]">
                  {copy.heading}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#5f5b52]">
                  {copy.body}
                </p>
              </div>

              <div className="mt-6" aria-live="polite">
                {renderActiveStep()}
              </div>

              <div className="mt-7 flex flex-col gap-3 border-t border-[#24231f]/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  disabled={atFirstStep}
                  onClick={() => goToStep(activeIndex - 1)}
                  className="inline-flex min-h-12 items-center justify-center border border-[#24231f]/20 px-5 font-mono text-[11px] font-semibold tracking-[0.16em] text-[#24231f] uppercase transition enabled:hover:border-[#24231f] enabled:hover:bg-[#fffaf2] disabled:cursor-not-allowed disabled:opacity-35 focus:ring-2 focus:ring-[#6f8067] focus:outline-none"
                >
                  Previous
                </button>

                {atLastStep ? (
                  <a
                    href="#quote"
                    className="inline-flex min-h-12 items-center justify-center bg-[#24231f] px-5 text-center font-mono text-[11px] font-semibold tracking-[0.16em] text-[#fffaf2] uppercase transition hover:bg-[#59664f] focus:ring-2 focus:ring-[#6f8067] focus:outline-none"
                  >
                    Send this build for a quote
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => goToStep(activeIndex + 1)}
                    className="inline-flex min-h-12 items-center justify-center bg-[#b8c7a3] px-5 font-mono text-[11px] font-semibold tracking-[0.16em] text-[#24231f] uppercase transition hover:bg-[#d7e2c0] focus:ring-2 focus:ring-[#6f8067] focus:outline-none"
                  >
                    {copy.nextLabel}
                  </button>
                )}
              </div>
            </div>
          </div>

          <aside className="order-1 lg:sticky lg:top-24 lg:order-2 lg:self-start">
            <ShedPreview
              style={concept.style}
              shape={concept.shape}
              colour={concept.colour}
              upgrades={concept.upgrades}
            />
            <div className="mt-4 hidden lg:block">
              <BuilderSummary concept={concept} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
