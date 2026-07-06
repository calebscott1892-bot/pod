"use client";

import { useEffect, useRef, useState, useTransition } from "react";

import { sendStudioOrder } from "@/app/studios/actions";
import { Reveal } from "@/components/shared/reveal";

import { StudioPreview } from "./studio-preview";
import type { ConfiguratorStep } from "./studios-shell";
import {
  BASE_PRICE,
  configTotal,
  formatAud,
  optionGroups,
  resolveConfig,
  type GroupId,
  type Option,
  type OptionGroup,
  type StudioConfig,
} from "./studio-data";

const steps: { id: ConfiguratorStep; label: string; groups: GroupId[] }[] = [
  { id: "structure", label: "Roof", groups: ["roof"] },
  { id: "openings", label: "Doors & windows", groups: ["door", "hardware", "window"] },
  { id: "colours", label: "Wall & trim", groups: ["wall", "trim"] },
  { id: "extras", label: "Lighting & extras", groups: ["electrics", "wallLight", "hookup", "balcony", "gardenShed"] },
  { id: "review", label: "Review & order", groups: [] },
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
  const stepIndex = steps.findIndex((s) => s.id === step);
  const sectionRef = useRef<HTMLElement>(null);
  const [barVisible, setBarVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setBarVisible(entry.isIntersecting);
      },
      { rootMargin: "-25% 0px -10% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function update(groupId: GroupId, optionId: string) {
    onConfigChange({ ...config, [groupId]: optionId });
  }

  const activeGroups = optionGroups.filter((g) =>
    steps[stepIndex]?.groups.includes(g.id),
  );

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
            Build &amp; order online
          </p>
          <h2
            id="configurator-heading"
            className="mt-3 font-heading text-[34px] leading-[1.08] tracking-tight sm:text-[44px]"
          >
            Design your studio.
          </h2>
          <p className="mt-4 text-[16px] leading-7 text-mid">
            Follow the steps, roof, doors, windows, wall and trim colour,
            lighting and extras, and watch your studio and your price update as
            you go.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
          <aside className="order-first lg:order-last lg:sticky lg:top-24">
            <Reveal>
              <div className="shape-soft border border-line bg-white p-5 shadow-[0_36px_90px_-65px_rgba(44,40,37,0.6)]">
                <StudioPreview config={config} />
                <p className="mt-2 text-center text-[13px] leading-6 text-mid">
                  Live preview, {resolved?.roof.name}, {resolved?.wall.name.toLowerCase()} wall
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
              <dl className="mt-4 space-y-2 text-[14px]">
                <SummaryRow label="Base build" value={formatAud(BASE_PRICE)} />
                {optionGroups.map((group) => {
                  const option = resolved?.[group.id];
                  if (!option) return null;
                  if (option.price === 0 && (group.id === "balcony" || group.id === "gardenShed")) {
                    return null;
                  }
                  return (
                    <SummaryRow
                      key={group.id}
                      label={option.name}
                      value={priceLabel(option.price)}
                    />
                  );
                })}
              </dl>
              <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
                <span className="font-heading text-[14px] tracking-[0.14em] text-mid uppercase">
                  Total
                </span>
                <AnimatedPrice value={total} className="font-heading text-[30px] tracking-tight text-dark" />
              </div>
              <p className="mt-2 text-[12px] leading-5 text-mid">
                Indicative, delivery quoted separately, price confirmed on order.
              </p>
              {step === "review" ? null : (
                <button
                  type="button"
                  onClick={() => {
                    onStepChange("review");
                    document.getElementById("configurator")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="mt-5 inline-flex min-h-13 w-full items-center justify-center rounded-full bg-dark px-7 font-heading text-[14px] tracking-[0.1em] text-cream uppercase transition hover:bg-accent-strong"
                >
                  Review &amp; order, {formatAud(total)}
                </button>
              )}
              <CopyDesignLink config={config} />
            </div>
          </aside>

          <div>
            <nav className="flex flex-wrap gap-2.5" aria-label="Configurator steps">
              {steps.map((item, index) => {
                const active = item.id === step;
                const complete = index < stepIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-current={active ? "step" : undefined}
                    onClick={() => onStepChange(item.id)}
                    className={`inline-flex min-h-12 items-center gap-2.5 rounded-full border px-5 font-heading text-[12px] tracking-[0.1em] uppercase transition ${
                      active
                        ? "border-dark bg-dark text-cream"
                        : complete
                          ? "border-accent-strong/40 bg-accent-soft text-dark"
                          : "border-line bg-white text-mid hover:border-dark/40 hover:text-dark"
                    }`}
                  >
                    <span className={`grid size-6 place-items-center rounded-full text-[12px] ${active ? "bg-cream text-dark" : "bg-dark/10 text-dark"}`}>
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
            </nav>

            <div className="shape-soft mt-5 border border-line bg-white p-5 sm:p-7">
              {step === "review" ? (
                <ReviewOrder config={config} total={total} />
              ) : (
                <div className="space-y-9">
                  {activeGroups.map((group) => (
                    <GroupPicker
                      key={group.id}
                      group={group}
                      selectedId={config[group.id]}
                      onSelect={(optionId) => update(group.id, optionId)}
                    />
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  disabled={stepIndex === 0}
                  onClick={() => onStepChange(steps[stepIndex - 1]?.id ?? "structure")}
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
                    Next: {steps[stepIndex + 1].label}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile running-total bar */}
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
            <AnimatedPrice value={total} className="font-heading text-[22px] leading-tight tracking-tight text-dark" />
          </div>
          <button
            type="button"
            onClick={() => {
              onStepChange("review");
              document.getElementById("configurator")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex min-h-12 items-center rounded-full bg-dark px-6 font-heading text-[12px] tracking-[0.1em] text-cream uppercase transition hover:bg-accent-strong"
          >
            Review &amp; order
          </button>
        </div>
      </div>
    </section>
  );
}

function GroupPicker({
  group,
  selectedId,
  onSelect,
}: {
  group: OptionGroup;
  selectedId: string;
  onSelect: (optionId: string) => void;
}) {
  return (
    <fieldset>
      <legend className="font-heading text-[20px] tracking-tight">{group.name}</legend>
      {group.detail ? (
        <p className="mt-1 text-[14px] leading-6 text-mid">{group.detail}</p>
      ) : null}

      {group.layout === "swatches" ? (
        <div className="mt-4 flex flex-wrap gap-4">
          {group.options.map((option) => (
            <SwatchButton
              key={option.id}
              option={option}
              selected={option.id === selectedId}
              onSelect={() => onSelect(option.id)}
            />
          ))}
        </div>
      ) : group.bandBy === "kind" ? (
        <div className="mt-4 space-y-5">
          {bandOptions(group.options).map((band) => (
            <div key={band.kind}>
              <p className="font-heading text-[12px] tracking-[0.16em] text-mid uppercase">
                {band.kind}
              </p>
              <div className="mt-2 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {band.options.map((option) => (
                  <OptionCard
                    key={option.id}
                    option={option}
                    selected={option.id === selectedId}
                    onSelect={() => onSelect(option.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {group.options.map((option) => (
            <OptionCard
              key={option.id}
              option={option}
              selected={option.id === selectedId}
              onSelect={() => onSelect(option.id)}
            />
          ))}
        </div>
      )}
    </fieldset>
  );
}

function bandOptions(options: Option[]) {
  const order: string[] = [];
  const map = new Map<string, Option[]>();
  for (const option of options) {
    const kind = option.kind ?? "Options";
    if (!map.has(kind)) {
      map.set(kind, []);
      order.push(kind);
    }
    map.get(kind)!.push(option);
  }
  return order.map((kind) => ({ kind, options: map.get(kind)! }));
}

function OptionCard({
  option,
  selected,
  onSelect,
}: {
  option: Option;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-accent-strong bg-accent-soft/60 shadow-[0_18px_40px_-32px_rgba(44,40,37,0.5)]"
          : "border-line bg-cream-soft hover:-translate-y-0.5 hover:border-accent-strong/50"
      }`}
    >
      {option.swatch ? (
        <span
          aria-hidden="true"
          className="mt-0.5 size-6 shrink-0 rounded-full border border-dark/15"
          style={{ backgroundColor: option.swatch }}
        />
      ) : null}
      <span className="min-w-0">
        <span className="block font-heading text-[15px] leading-tight tracking-tight">
          {option.name}
        </span>
        {option.detail ? (
          <span className="mt-0.5 block text-[12px] leading-4 text-mid">
            {option.detail}
          </span>
        ) : null}
        <span
          className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 font-heading text-[11px] tracking-[0.06em] uppercase ${
            option.price === 0 ? "bg-dark/5 text-mid" : "bg-dark text-cream"
          }`}
        >
          {priceLabel(option.price)}
        </span>
      </span>
    </button>
  );
}

function SwatchButton({
  option,
  selected,
  onSelect,
}: {
  option: Option;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
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
      <span className={`text-center text-[12px] leading-4 ${selected ? "font-heading text-dark" : "text-mid"}`}>
        {option.name}
      </span>
      {option.price > 0 ? (
        <span className="text-[11px] text-mid">+{formatAud(option.price)}</span>
      ) : null}
    </button>
  );
}

function ReviewOrder({ config, total }: { config: StudioConfig; total: number }) {
  const resolved = resolveConfig(config);
  const [submitted, setSubmitted] = useState(false);
  const [, startTransition] = useTransition();

  if (!resolved) return null;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(true);
    startTransition(() => {
      void sendStudioOrder(data);
    });
  }

  if (submitted) {
    return (
      <div role="status" aria-live="polite" className="flex min-h-[360px] flex-col items-center justify-center py-8 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-accent-soft text-accent-strong">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
            <path d="m7 15.5 5.5 5.5L23 9.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-6 font-heading text-[26px] tracking-tight">
          Order request received.
        </h3>
        <p className="mt-3 max-w-[420px] text-[15px] leading-7 text-mid">
          Thanks, we&apos;ve got your build. Our team will confirm the price
          and delivery, then send you a secure payment link to complete your
          order.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-heading text-[24px] tracking-tight">Review &amp; order.</h3>
      <dl className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line text-[14px] sm:grid-cols-2">
        {optionGroups.map((group) => {
          const option = resolved[group.id];
          if (option.price === 0 && (group.id === "balcony" || group.id === "gardenShed")) {
            return null;
          }
          return (
            <div key={group.id} className="bg-white px-4 py-3">
              <dt className="font-heading text-[11px] tracking-[0.14em] text-mid uppercase">
                {group.name}
              </dt>
              <dd className="mt-1 flex items-baseline justify-between gap-3">
                <span className="text-dark">{option.name}</span>
                <span className="text-[12px] text-mid">{priceLabel(option.price)}</span>
              </dd>
            </div>
          );
        })}
      </dl>

      <div className="mt-5 flex items-baseline justify-between rounded-2xl bg-accent-soft/50 px-5 py-4">
        <span className="font-heading text-[14px] tracking-[0.14em] text-mid uppercase">
          Total
        </span>
        <span className="font-heading text-[26px] tracking-tight text-dark">
          {formatAud(total)}
        </span>
      </div>
      <p className="mt-2 text-[13px] leading-6 text-mid">
        Includes the base build and your options. Delivery is quoted
        separately and confirmed after you order.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
        {optionGroups.map((group) => (
          <input key={group.id} type="hidden" name={`opt-${group.id}`} value={config[group.id]} />
        ))}
        <div className="grid gap-5 sm:grid-cols-2">
          <OrderField label="Name" name="name" required autoComplete="name" />
          <OrderField label="Email" name="email" type="email" required autoComplete="email" />
          <OrderField label="Phone" name="phone" type="tel" autoComplete="tel" />
          <OrderField label="Postcode" name="postcode" autoComplete="postal-code" inputMode="numeric" />
        </div>
        <label className="grid gap-2">
          <span className="font-heading text-[13px] tracking-[0.16em] text-mid uppercase">
            Anything else? (optional)
          </span>
          <textarea
            name="message"
            rows={3}
            placeholder="Site access, timing, questions…"
            className="rounded-2xl border border-line bg-cream-soft px-4 py-3 text-[15px] leading-7 text-dark outline-none transition placeholder:text-mid focus:border-accent-strong focus:ring-2 focus:ring-accent-soft"
          />
        </label>
        <div className="hidden" aria-hidden="true">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <button
          type="submit"
          className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-dark px-8 font-heading text-[14px] tracking-[0.1em] text-cream uppercase transition hover:bg-accent-strong"
        >
          Place order request, {formatAud(total)}
        </button>
        <p className="text-center text-[12px] leading-5 text-mid">
          No payment taken now, we confirm price and delivery, then send a
          secure payment link.
        </p>
      </form>
    </div>
  );
}

function OrderField({
  label,
  name,
  type = "text",
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "numeric" | "text";
}) {
  return (
    <label className="grid gap-2">
      <span className="font-heading text-[13px] tracking-[0.16em] text-mid uppercase">
        {label}
      </span>
      <input
        name={name}
        type={type}
        {...rest}
        className="min-h-13 rounded-2xl border border-line bg-cream-soft px-4 text-[15px] text-dark outline-none transition placeholder:text-mid focus:border-accent-strong focus:ring-2 focus:ring-accent-soft"
      />
    </label>
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

function AnimatedPrice({ value, className }: { value: number; className?: string }) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const from = prevRef.current;
    if (from === value) return;
    prevRef.current = value;
    const start = performance.now();
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 420;
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

function CopyDesignLink({ config }: { config: StudioConfig }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  async function copy() {
    const params = new URLSearchParams(config as Record<string, string>);
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
        <path d="M6.2 8.8a3 3 0 0 0 4.2 0l2.4-2.4a3 3 0 1 0-4.2-4.2l-1 1M8.8 6.2a3 3 0 0 0-4.2 0L2.2 8.6a3 3 0 1 0 4.2 4.2l1-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      {state === "copied" ? "Link copied, share your design" : state === "error" ? "Copy blocked, try again" : "Copy design link"}
    </button>
  );
}
