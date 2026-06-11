"use client";

import { useEffect, useRef } from "react";

/**
 * Pinned scroll journey — the studio assembles as the visitor scrolls:
 * shell → options cycling past → delivered on site → lights on.
 *
 * Scroll progress drives --journey (0–1) plus data-stage / data-clad /
 * data-door on the track; globals.css turns those into the animation.
 * The server renders the finished studio (stage 3), so visitors without
 * JavaScript — and reduced-motion visitors, for whom CSS unpins the
 * section — see the complete story as a single frame.
 */

const combos = [
  { clad: "cream", door: "sliding" },
  { clad: "coastal", door: "french" },
  { clad: "charcoal", door: "barn" },
  { clad: "warm-white", door: "sliding" },
  { clad: "sage", door: "french" },
];

const captions = [
  {
    title: "One premium shell",
    body: "Engineered, insulated and weather-tight — the same considered build under every signature style.",
  },
  {
    title: "Made yours in minutes",
    body: "Cladding, doors and windows roll past — your combination takes minutes to lock in.",
  },
  {
    title: "Delivered and installed",
    body: "Our in-house team places your studio with care — crane lift included where access needs it.",
  },
  {
    title: "Move straight in",
    body: "Lights on. Thirteen weeks from order to opening the door.",
  },
];

export function StudioJourney() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let lastStage = -1;
    let lastCombo = -1;

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
      track.style.setProperty("--journey", p.toFixed(4));

      const stage = p < 0.22 ? 0 : p < 0.55 ? 1 : p < 0.8 ? 2 : 3;
      if (stage !== lastStage) {
        lastStage = stage;
        track.dataset.stage = String(stage);
        track.classList.toggle("ge1", stage >= 1);
        track.classList.toggle("ge2", stage >= 2);
        track.classList.toggle("ge3", stage >= 3);
      }

      let combo = combos.length - 1;
      if (stage === 0) {
        combo = 0;
      } else if (stage === 1) {
        combo = Math.min(
          combos.length - 1,
          Math.floor(((p - 0.22) / 0.33) * combos.length),
        );
      }
      if (combo !== lastCombo) {
        lastCombo = combo;
        track.dataset.clad = combos[combo].clad;
        track.dataset.door = combos[combo].door;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section aria-labelledby="journey-heading">
      <div
        ref={trackRef}
        className="journey-track ge1 ge2 ge3 relative h-[340vh]"
        data-stage="3"
        data-clad="sage"
        data-door="french"
      >
        <div className="journey-stage sticky top-0 flex h-svh items-center overflow-hidden pt-20">
          <div className="mx-auto grid w-full max-w-[1280px] items-center gap-6 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-8">
            <div className="text-center lg:text-left">
              <p className="font-heading text-[13px] tracking-[0.22em] text-accent-strong uppercase">
                The journey
              </p>
              <h2
                id="journey-heading"
                className="mt-3 font-heading text-[30px] leading-[1.08] tracking-tight sm:text-[40px]"
              >
                Watch your studio come together.
              </h2>

              {/* Desktop: full caption list beside a progress rail. */}
              <ol className="j-rail relative mt-9 hidden space-y-7 pl-8 lg:block">
                {captions.map((caption, index) => (
                  <li key={caption.title} className={`j-cap j-cap-${index} relative`}>
                    <span
                      aria-hidden="true"
                      className="j-cap-dot absolute top-1.5 -left-[37px] size-3 rounded-full"
                    />
                    <h3 className="font-heading text-[20px] tracking-tight">
                      {caption.title}
                    </h3>
                    <p className="mt-1 max-w-[400px] text-[14px] leading-6 text-mid">
                      {caption.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <JourneyStudio />

              {/* Mobile: one caption at a time, crossfading. */}
              <div className="lg:hidden">
                <div className="relative mt-4 h-32">
                  {captions.map((caption, index) => (
                    <div
                      key={caption.title}
                      className={`j-mcap j-cap-${index} absolute inset-0 px-2 text-center`}
                    >
                      <h3 className="font-heading text-[19px] tracking-tight">
                        {caption.title}
                      </h3>
                      <p className="mx-auto mt-1 max-w-[400px] text-[14px] leading-6 text-mid">
                        {caption.body}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-1 flex justify-center gap-2.5">
                  {captions.map((caption, index) => (
                    <span
                      key={caption.title}
                      aria-hidden="true"
                      className={`j-dot j-dot-${index} size-2.5 rounded-full`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** The assembling studio. Group classes are driven by the track's state. */
function JourneyStudio() {
  return (
    <svg
      viewBox="0 0 520 400"
      role="img"
      aria-label="A Spare Space studio being assembled: shell, then options, then delivered with the lights on"
      className="mx-auto h-auto w-full max-w-[440px] lg:max-w-none"
    >
      <defs>
        <linearGradient id="jglass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eef5fa" />
          <stop offset="55%" stopColor="#d8e7f0" />
          <stop offset="100%" stopColor="#f6fbff" />
        </linearGradient>
        <linearGradient id="jwarm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe7bd" />
          <stop offset="60%" stopColor="#ffd391" />
          <stop offset="100%" stopColor="#f7b96d" />
        </linearGradient>
      </defs>

      {/* Sun — rises with scroll progress. */}
      <g className="j-sun">
        <circle cx="430" cy="84" r="44" fill="var(--accent-soft)" />
      </g>

      {/* Stage 0 — the shell. */}
      <ellipse cx="260" cy="356" rx="206" ry="13" fill="#2c2825" opacity="0.08" />
      <rect
        className="j-cladding"
        x="80"
        y="140"
        width="360"
        height="204"
        rx="10"
        stroke="#2c2825"
        strokeWidth="3"
      />
      <g className="j-boards" strokeOpacity="0.08" strokeWidth="1.5">
        {[160, 177, 194, 211, 228, 245, 262, 279, 296, 313, 330].map((y) => (
          <path key={y} d={`M84 ${y}h352`} />
        ))}
      </g>
      <g fill="#2c2825">
        <circle cx="126" cy="346" r="8" />
        <circle cx="260" cy="346" r="8" />
        <circle cx="394" cy="346" r="8" />
      </g>
      <path d="M62 144 458 116" stroke="#2c2825" strokeWidth="13" strokeLinecap="round" />

      {/* Stage 1 — windows and doors arrive (and cycle). */}
      <g className="j-s1">
        <rect x="104" y="166" width="128" height="116" rx="4" fill="#1f1c1a" />
        <rect x="113" y="175" width="110" height="98" rx="2" fill="url(#jglass)" />
        <rect className="j-warm" x="115" y="177" width="106" height="94" rx="2" fill="url(#jwarm)" />
        <path d="m126 256 58-66M148 262l66-76" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="5" strokeLinecap="round" />
      </g>

      <g className="j-door j-door-sliding">
        <rect x="288" y="162" width="126" height="182" rx="4" fill="#2c2825" />
        <rect x="295" y="169" width="54" height="168" rx="2" fill="url(#jglass)" />
        <rect x="351" y="169" width="56" height="168" rx="2" fill="url(#jglass)" opacity="0.92" />
        <rect className="j-warm" x="297" y="171" width="50" height="164" rx="2" fill="url(#jwarm)" />
        <rect className="j-warm" x="353" y="171" width="52" height="164" rx="2" fill="url(#jwarm)" />
        <path d="M349 169v168" stroke="#2c2825" strokeWidth="4" />
        <rect x="340" y="244" width="5" height="26" rx="2.5" fill="#2c2825" />
      </g>

      <g className="j-door j-door-french">
        <rect x="292" y="162" width="118" height="182" rx="4" fill="#ffffff" stroke="#2c2825" strokeWidth="2.5" />
        {[0, 1].map((side) => {
          const x = 299 + side * 56;
          return (
            <g key={side}>
              <rect x={x} y="170" width="48" height="78" rx="2" fill="url(#jglass)" stroke="#2c2825" strokeWidth="1.5" />
              <rect x={x} y="256" width="48" height="78" rx="2" fill="url(#jglass)" stroke="#2c2825" strokeWidth="1.5" />
              <rect className="j-warm" x={x + 2} y="172" width="44" height="74" rx="2" fill="url(#jwarm)" />
              <rect className="j-warm" x={x + 2} y="258" width="44" height="74" rx="2" fill="url(#jwarm)" />
              <path d={`M${x + 24} 170v164`} stroke="#2c2825" strokeWidth="1.2" strokeOpacity="0.5" />
            </g>
          );
        })}
        <path d="M351 162v182" stroke="#2c2825" strokeWidth="3" />
        <circle cx="344" cy="256" r="3.5" fill="#2c2825" />
        <circle cx="358" cy="256" r="3.5" fill="#2c2825" />
      </g>

      <g className="j-door j-door-barn">
        <path d="M276 156h150" stroke="#2c2825" strokeWidth="9" strokeLinecap="round" />
        <path d="M310 161v14M392 161v14" stroke="#2c2825" strokeWidth="5" strokeLinecap="round" />
        <rect x="296" y="172" width="110" height="172" rx="4" fill="#c89b72" stroke="#2c2825" strokeWidth="3" />
        <path d="M296 196h110M296 320h110M296 196l110 124M406 196 296 320" stroke="#2c2825" strokeWidth="2.5" strokeOpacity="0.65" />
        <rect x="304" y="248" width="6" height="30" rx="3" fill="#2c2825" />
      </g>

      {/* Stage 2 — placed on site: step and stepping stones. */}
      <g className="j-s2">
        <rect x="314" y="344" width="74" height="10" rx="4" fill="#e3d2c4" stroke="#2c2825" strokeWidth="2" />
        <ellipse cx="330" cy="372" rx="16" ry="5" fill="#2c2825" opacity="0.12" />
        <ellipse cx="296" cy="384" rx="12" ry="4" fill="#2c2825" opacity="0.1" />
        <ellipse cx="266" cy="393" rx="9" ry="3.5" fill="#2c2825" opacity="0.08" />
      </g>

      {/* Stage 3 — moved in: greenery joins the lights. */}
      <g className="j-s3">
        <path d="M452 318c-10-16 2-30 14-34-2 14-2 26-14 34Z" fill="var(--accent)" opacity="0.55" />
        <path d="M468 320c-2-12 6-22 16-24-4 10-6 18-16 24Z" fill="var(--accent)" opacity="0.4" />
        <path d="M448 322h40l-5 24h-30l-5-24Z" fill="#2c2825" />
      </g>
    </svg>
  );
}
