"use client";

import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/shared/reveal";
import { business } from "@/lib/site-config";

import type { ConfiguratorStep } from "./studios-shell";
import { StudioPreview } from "./studio-preview";
import {
  claddingOptions,
  configTotal,
  doorOptions,
  formatAud,
  resolveConfig,
  studioStyles,
  windowOptions,
  type ComponentOption,
  type StudioConfig,
} from "./studio-data";

const steps: { id: ConfiguratorStep; label: string }[] = [
  { id: "style", label: "Style" },
  { id: "customise", label: "Customise" },
  { id: "review", label: "Review & order" },
];

type Props = {
  config: StudioConfig;
  onConfigChange: (config: StudioConfig) => void;
  step: ConfiguratorStep;
  onStepChange: (step: ConfiguratorStep) => void;
};

export function Configurator({ config, onConfigChange, step, onStepChange }: Props) {
  const resolved = resolveConfig(config);
  const total = configTotal(config);
  const stepIndex = steps.findIndex((item) => item.id === step);
  const sectionRef = useRef<HTMLElement>(null);
  const [barVisible, setBarVisible] = useState(false);

  // The mobile total bar only shows while the configurator is on screen.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setBarVisible(entry.isIntersecting);
        }
      },
      { rootMargin: "-25% 0px -10% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function update(partial: Partial<StudioConfig>) {
    onConfigChange({ ...config, ...partial });
  }

  return (
    <section
      ref={sectionRef}
      id="configurator"
      className="scroll-mt-24 bg-cream-soft"
      aria-labelledby="configurator-heading"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal className="max-w-[680px]">
          <p className="font-heading text-[13px] tracking-[0.22em] text-accent-strong uppercase">
            Build &amp; buy online
          </p>
          <h2
            id="configurator-heading"
            className="mt-3 font-heading text-[34px] leading-[1.08] tracking-tight sm:text-[44px]"
          >
            Design your studio.
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-mid">
            Three steps: pick a style, choose your windows, doors and
            cladding, then order with secure checkout. Watch your studio — and
            your price — update as you go.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
          <aside className="order-first lg:order-last lg:sticky lg:top-24">
            <Reveal>
              <div className="shape-soft border border-line bg-white p-5 shadow-[0_36px_90px_-65px_rgba(44,40,37,0.6)]">
                <StudioPreview config={config} />
                <p className="mt-2 text-center text-[13px] leading-6 text-mid">
                  Live preview — {resolved?.style.name} in{" "}
                  {resolved?.cladding.name.toLowerCase()}
                </p>
              </div>
            </Reveal>

            <div
              id="studio-summary"
              className="shape-soft mt-5 scroll-mt-28 border border-line bg-white p-6 shadow-[0_36px_90px_-65px_rgba(44,40,37,0.6)]"
            >
              <p className="font-heading text-[13px] tracking-[0.18em] text-accent-strong uppercase">
                Your studio
              </p>
              <dl className="mt-4 space-y-2.5 text-[15px]">
                <SummaryRow
                  label={`Base — ${resolved?.style.name ?? ""}`}
                  value={formatAud(resolved?.style.basePrice ?? 0)}
                />
                <SummaryRow
                  label={resolved?.windows.name ?? "Windows"}
                  value={priceLabel(resolved?.windows.price ?? 0)}
                />
                <SummaryRow
                  label={resolved?.doors.name ?? "Doors"}
                  value={priceLabel(resolved?.doors.price ?? 0)}
                />
                <SummaryRow
                  label={`Cladding — ${resolved?.cladding.name ?? ""}`}
                  value={priceLabel(resolved?.cladding.price ?? 0)}
                />
              </dl>
              <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
                <span className="font-heading text-[14px] tracking-[0.14em] text-mid uppercase">
                  Total
                </span>
                <AnimatedPrice
                  value={total}
                  className="font-heading text-[30px] tracking-tight text-dark"
                />
              </div>
              <CheckoutButton config={config} total={total} />
              <CopyDesignLink config={config} />
            </div>
          </aside>

          <div>
            <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Configurator steps">
              {steps.map((item, index) => {
                const active = item.id === step;
                const complete = index < stepIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => onStepChange(item.id)}
                    className={`inline-flex min-h-12 items-center gap-2.5 rounded-full border px-5 font-heading text-[13px] tracking-[0.1em] uppercase transition ${
                      active
                        ? "border-dark bg-dark text-cream"
                        : complete
                          ? "border-accent-strong/40 bg-accent-soft text-dark"
                          : "border-line bg-white text-mid hover:border-dark/40 hover:text-dark"
                    }`}
                  >
                    <span
                      className={`grid size-6 place-items-center rounded-full text-[12px] ${
                        active ? "bg-cream text-dark" : "bg-dark/10 text-dark"
                      }`}
                    >
                      {complete ? (
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="m2 6.5 2.7 2.7L10 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </span>
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="shape-soft mt-5 border border-line bg-white p-5 sm:p-7">
              {step === "style" ? (
                <StepStyle config={config} onUpdate={update} />
              ) : null}
              {step === "customise" ? (
                <StepCustomise config={config} onUpdate={update} />
              ) : null}
              {step === "review" ? <StepReview config={config} /> : null}

              <div className="mt-8 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  disabled={stepIndex === 0}
                  onClick={() => onStepChange(steps[stepIndex - 1]?.id ?? "style")}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-line px-6 font-heading text-[13px] tracking-[0.12em] text-dark uppercase transition enabled:hover:border-dark disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Back
                </button>
                {stepIndex < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => onStepChange(steps[stepIndex + 1].id)}
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-dark px-6 font-heading text-[13px] tracking-[0.12em] text-cream uppercase transition hover:bg-accent-strong"
                  >
                    {step === "style" ? "Next: customise" : "Next: review & order"}
                  </button>
                ) : (
                  <CheckoutButton config={config} total={total} compact />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: running total pinned to the thumb zone while configuring. */}
      <div
        aria-hidden={!barVisible}
        inert={!barVisible || undefined}
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 md:hidden ${
          barVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[640px] items-center justify-between gap-4">
          <div>
            <p className="font-heading text-[11px] tracking-[0.14em] text-mid uppercase">
              Your studio
            </p>
            <AnimatedPrice
              value={total}
              className="font-heading text-[22px] leading-tight tracking-tight text-dark"
            />
          </div>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("studio-summary")
                ?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
            className="inline-flex min-h-12 items-center rounded-full bg-dark px-6 font-heading text-[12px] tracking-[0.1em] text-cream uppercase transition hover:bg-accent-strong"
          >
            Review &amp; order
          </button>
        </div>
      </div>
    </section>
  );
}

function StepStyle({
  config,
  onUpdate,
}: {
  config: StudioConfig;
  onUpdate: (partial: Partial<StudioConfig>) => void;
}) {
  return (
    <fieldset>
      <legend className="font-heading text-[24px] tracking-tight">
        Choose your base style.
      </legend>
      <p className="mt-2 text-[15px] leading-7 text-mid">
        All seven share the same one-size shell — pick the fit-out direction.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {studioStyles.map((style) => {
          const selected = style.id === config.styleId;
          return (
            <button
              key={style.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onUpdate({ styleId: style.id })}
              className={`flex min-h-20 items-center gap-4 rounded-2xl border p-4 text-left transition ${
                selected
                  ? "border-accent-strong bg-accent-soft/60 shadow-[0_18px_40px_-32px_rgba(44,40,37,0.5)]"
                  : "border-line bg-cream-soft hover:-translate-y-0.5 hover:border-accent-strong/50"
              }`}
            >
              <span
                aria-hidden="true"
                className="size-12 shrink-0 rounded-xl border border-dark/10"
                style={{ background: style.gradient }}
              />
              <span>
                <span className="block font-heading text-[17px] tracking-tight">
                  {style.name}
                </span>
                <span className="mt-0.5 block text-[13px] text-mid">
                  From {formatAud(style.basePrice)}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function StepCustomise({
  config,
  onUpdate,
}: {
  config: StudioConfig;
  onUpdate: (partial: Partial<StudioConfig>) => void;
}) {
  return (
    <div className="space-y-9">
      <OptionGroup
        legend="Windows"
        options={windowOptions}
        selectedId={config.windowId}
        onSelect={(id) => onUpdate({ windowId: id })}
        columns="sm:grid-cols-2"
      />
      <OptionGroup
        legend="Doors"
        options={doorOptions}
        selectedId={config.doorId}
        onSelect={(id) => onUpdate({ doorId: id })}
        columns="sm:grid-cols-3"
      />

      <fieldset>
        <legend className="font-heading text-[20px] tracking-tight">
          Cladding &amp; trim
        </legend>
        <p className="mt-1 text-[14px] leading-6 text-mid">
          All five colours included as standard.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          {claddingOptions.map((option) => {
            const selected = option.id === config.claddingId;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onUpdate({ claddingId: option.id })}
                className="group flex w-20 flex-col items-center gap-2"
              >
                <span
                  aria-hidden="true"
                  className={`size-14 rounded-full border transition ${
                    selected
                      ? "border-dark ring-2 ring-accent-strong ring-offset-2 ring-offset-white"
                      : "border-dark/15 group-hover:border-dark/40"
                  }`}
                  style={{ backgroundColor: option.swatch }}
                />
                <span
                  className={`text-center text-[12px] leading-4 ${
                    selected ? "font-heading text-dark" : "text-mid"
                  }`}
                >
                  {option.name}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

function OptionGroup({
  legend,
  options,
  selectedId,
  onSelect,
  columns,
}: {
  legend: string;
  options: ComponentOption[];
  selectedId: string;
  onSelect: (id: string) => void;
  columns: string;
}) {
  return (
    <fieldset>
      <legend className="font-heading text-[20px] tracking-tight">{legend}</legend>
      <div className={`mt-4 grid gap-3 ${columns}`}>
        {options.map((option) => {
          const selected = option.id === selectedId;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(option.id)}
              className={`rounded-2xl border p-4 text-left transition ${
                selected
                  ? "border-accent-strong bg-accent-soft/60 shadow-[0_18px_40px_-32px_rgba(44,40,37,0.5)]"
                  : "border-line bg-cream-soft hover:-translate-y-0.5 hover:border-accent-strong/50"
              }`}
            >
              <span className="block font-heading text-[16px] tracking-tight">
                {option.name}
              </span>
              <span className="mt-1 block text-[13px] leading-5 text-mid">
                {option.detail}
              </span>
              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1 font-heading text-[12px] tracking-[0.08em] uppercase ${
                  option.price === 0
                    ? "bg-dark/5 text-mid"
                    : "bg-dark text-cream"
                }`}
              >
                {priceLabel(option.price)}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function StepReview({ config }: { config: StudioConfig }) {
  const resolved = resolveConfig(config);
  if (!resolved) return null;

  return (
    <div>
      <h3 className="font-heading text-[24px] tracking-tight">
        Review your design.
      </h3>
      <dl className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line text-[15px] sm:grid-cols-2">
        <ReviewRow label="Style" value={resolved.style.name} price={formatAud(resolved.style.basePrice)} />
        <ReviewRow label="Windows" value={resolved.windows.name} price={priceLabel(resolved.windows.price)} />
        <ReviewRow label="Doors" value={resolved.doors.name} price={priceLabel(resolved.doors.price)} />
        <ReviewRow label="Cladding & trim" value={resolved.cladding.name} price={priceLabel(resolved.cladding.price)} />
      </dl>
      <div className="mt-5 rounded-2xl bg-accent-soft/50 p-5 text-[14px] leading-7 text-dark">
        <p className="font-heading tracking-[0.08em] uppercase">Included in your price</p>
        <p className="mt-1 text-mid">
          Full studio shell, your chosen cladding, doors and windows, plus
          delivery to your property. Electrical and plumbing are arranged
          separately. 13-week build from order confirmation.
        </p>
      </div>
    </div>
  );
}

function ReviewRow({ label, value, price }: { label: string; value: string; price: string }) {
  return (
    <div className="bg-white px-4 py-3.5">
      <dt className="font-heading text-[12px] tracking-[0.16em] text-mid uppercase">{label}</dt>
      <dd className="mt-1 flex items-baseline justify-between gap-3">
        <span className="text-dark">{value}</span>
        <span className="text-[13px] text-mid">{price}</span>
      </dd>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-mid">{label}</dt>
      <dd className="shrink-0 text-dark">{value}</dd>
    </div>
  );
}

function priceLabel(price: number): string {
  return price === 0 ? "Included" : `+${formatAud(price)}`;
}

/** Tweens between totals so price changes read as motion, not a jump. */
function AnimatedPrice({ value, className }: { value: number; className?: string }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const from = prevRef.current;
    if (from === value) return;
    prevRef.current = value;

    const start = performance.now();
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 0
      : 420;
    let frame = 0;
    const tick = (now: number) => {
      const t = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <span className={className}>{formatAud(display)}</span>;
}

/** Builds a shareable URL for the current design and copies it. */
function CopyDesignLink({ config }: { config: StudioConfig }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  async function copy() {
    const params = new URLSearchParams({
      style: config.styleId,
      windows: config.windowId,
      doors: config.doorId,
      cladding: config.claddingId,
    });
    const url = `${window.location.origin}/studios?${params.toString()}#configurator`;
    try {
      await navigator.clipboard.writeText(url);
      setState("copied");
    } catch {
      setState("error");
    }
    window.setTimeout(() => setState("idle"), 2400);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-line bg-cream-soft px-5 font-heading text-[12px] tracking-[0.1em] text-dark uppercase transition hover:border-accent-strong hover:text-accent-strong"
    >
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
        <path
          d="M6.2 8.8a3 3 0 0 0 4.2 0l2.4-2.4a3 3 0 1 0-4.2-4.2l-1 1M8.8 6.2a3 3 0 0 0-4.2 0L2.2 8.6a3 3 0 1 0 4.2 4.2l1-1"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      {state === "copied"
        ? "Link copied — share your design"
        : state === "error"
          ? "Copy blocked — try again"
          : "Copy design link"}
    </button>
  );
}

function CheckoutButton({
  config,
  total,
  compact,
}: {
  config: StudioConfig;
  total: number;
  compact?: boolean;
}) {
  const [state, setState] = useState<"idle" | "loading" | "unconfigured" | "error">("idle");

  async function startCheckout() {
    setState("loading");
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const data = (await response.json()) as {
        url?: string;
        configured?: boolean;
      };
      if (data.url) {
        window.location.assign(data.url);
        return;
      }
      setState(data.configured === false ? "unconfigured" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className={compact ? "sm:text-right" : "mt-5"}>
      <button
        type="button"
        onClick={startCheckout}
        disabled={state === "loading"}
        className={`inline-flex min-h-13 items-center justify-center rounded-full bg-dark px-7 font-heading text-[14px] tracking-[0.1em] text-cream uppercase transition hover:bg-accent-strong disabled:cursor-wait disabled:opacity-70 ${
          compact ? "" : "w-full"
        }`}
      >
        {state === "loading" ? "Preparing secure checkout…" : `Order now — ${formatAud(total)}`}
      </button>
      {!compact ? (
        <p className="mt-3 text-center text-[12px] leading-5 text-mid">
          Secure card payment via Stripe · 13-week build from order
        </p>
      ) : null}
      {state === "unconfigured" ? (
        <p className="mt-3 rounded-2xl bg-accent-soft/60 p-4 text-left text-[13px] leading-6 text-dark">
          Online checkout launches shortly — Stripe connection pending. To
          order today, call{" "}
          <a href={business.phoneHref} className="underline decoration-line underline-offset-4">
            {business.phone}
          </a>{" "}
          and quote your design.
        </p>
      ) : null}
      {state === "error" ? (
        <p className="mt-3 rounded-2xl bg-accent-soft/60 p-4 text-left text-[13px] leading-6 text-dark">
          Something went wrong starting checkout. Please try again, or call{" "}
          <a href={business.phoneHref} className="underline decoration-line underline-offset-4">
            {business.phone}
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
