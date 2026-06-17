"use client";

import { useEffect, useRef } from "react";

/**
 * Pinned construction sequence — the studio is genuinely built as the
 * visitor scrolls, in a legible order:
 *
 *   1. a level base is set
 *   2. insulated wall panels rise (revealed bottom-up)
 *   3. the skillion roof descends and lands
 *   4. windows and the door are fitted, glass fills
 *   5. the cladding colour washes on and cycles through finishes
 *   6. it's delivered — landscaped, lights on, move-in ready
 *
 * A single scroll handler maps overall progress to each beat and writes
 * inline transforms/opacity per frame (smoother than stage snapping). The
 * server renders the finished, lit studio, so no-JS visitors — and
 * reduced-motion visitors, for whom CSS unpins the section — see the
 * completed build as one frame.
 */

const captions = [
  {
    title: "A level base",
    body: "Every studio starts on a dead-level base — set and checked before anything goes up.",
  },
  {
    title: "Insulated walls",
    body: "Engineered, insulated wall panels rise into place: sturdy, quiet and weather-tight.",
  },
  {
    title: "Roof goes on",
    body: "The skillion roof lands and seals the shell against the Queensland sun and rain.",
  },
  {
    title: "Windows & doors",
    body: "Glazing and your chosen door are fitted, opening the space up to the garden.",
  },
  {
    title: "Your finish",
    body: "Pick your cladding colour and watch the whole studio change as you decide.",
  },
  {
    title: "Delivered & yours",
    body: "Landscaped, lights on, move-in ready — thirteen weeks from order to opening the door.",
  },
];

// Cladding swatches cycled during the finish beat (ends on sage).
const finishSwatches = ["#8faf8a", "#7eb4c4", "#f0e3db", "#8faf8a"];

export function StudioJourney() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const q = (sel: string) => track.querySelector<SVGElement>(sel);
    const foundation = q(".j-foundation");
    const walls = q(".j-walls");
    const wallClip = q(".j-wallclip");
    const colorWall = q(".j-colorwall");
    const roof = q(".j-roof");
    const openings = q(".j-openings");
    const warm = q(".j-warm");
    const site = q(".j-site");
    const sun = q(".j-sun");

    const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
    const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

    let frame = 0;
    let lastStage = -1;

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? clamp01(-rect.top / total) : 1;
      track.style.setProperty("--journey", p.toFixed(4));

      const stage =
        p < 0.15 ? 0 : p < 0.34 ? 1 : p < 0.5 ? 2 : p < 0.64 ? 3 : p < 0.82 ? 4 : 5;
      if (stage !== lastStage) {
        lastStage = stage;
        track.dataset.stage = String(stage);
      }

      // 1 — base settles in
      const f = easeOut(clamp01(p / 0.12));
      if (foundation) {
        foundation.style.opacity = String(f);
        foundation.style.transform = `translateY(${((1 - f) * 16).toFixed(1)}px)`;
      }

      // 2 — walls rise (clip reveal from the floor up)
      const w = clamp01((p - 0.15) / 0.19);
      if (wallClip) {
        const top = 156;
        const H = 196;
        const h = H * w;
        wallClip.setAttribute("y", (top + (H - h)).toFixed(1));
        wallClip.setAttribute("height", h.toFixed(1));
      }
      if (walls) walls.style.opacity = String(clamp01(w * 6));

      // 3 — roof descends and lands
      const r = easeOut(clamp01((p - 0.34) / 0.16));
      if (roof) {
        roof.style.opacity = String(clamp01(r * 6));
        roof.style.transform = `translateY(${((r - 1) * 150).toFixed(1)}px)`;
      }

      // 4 — windows and door arrive
      const o = easeOut(clamp01((p - 0.5) / 0.14));
      if (openings) {
        openings.style.opacity = String(o);
        openings.style.transform = `translateY(${((1 - o) * 14).toFixed(1)}px)`;
      }

      // 5 — cladding colour washes on and cycles
      const c = clamp01((p - 0.64) / 0.18);
      if (colorWall) {
        colorWall.style.opacity = String(easeOut(c));
        const idx = Math.min(finishSwatches.length - 1, Math.floor(c * finishSwatches.length));
        colorWall.style.fill = finishSwatches[idx];
      }

      // 6 — delivered: landscaping in, lights on
      const m = easeOut(clamp01((p - 0.82) / 0.18));
      if (site) site.style.opacity = String(m);
      if (warm) warm.style.opacity = String(m);

      // Sun rises across the whole sequence
      if (sun) sun.style.transform = `translateY(${((1 - p) * 72).toFixed(1)}px)`;
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
        className="journey-track relative h-[360vh]"
        data-stage="5"
      >
        <div className="journey-stage sticky top-0 flex h-svh items-center overflow-hidden pt-20">
          <div className="mx-auto grid w-full max-w-[1280px] items-center gap-6 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-8">
            <div className="text-center lg:text-left">
              <p className="font-heading text-[13px] tracking-[0.22em] text-accent-strong uppercase">
                The build
              </p>
              <h2
                id="journey-heading"
                className="mt-3 font-heading text-[30px] leading-[1.08] tracking-tight sm:text-[40px]"
              >
                Watch your studio come together.
              </h2>

              {/* Desktop: full caption list beside a progress rail. */}
              <ol className="j-rail relative mt-9 hidden space-y-6 pl-8 lg:block">
                {captions.map((caption, index) => (
                  <li key={caption.title} className={`j-cap j-cap-${index} relative`}>
                    <span
                      aria-hidden="true"
                      className="j-cap-dot absolute top-1.5 -left-[37px] size-3 rounded-full"
                    />
                    <h3 className="font-heading text-[19px] tracking-tight">
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

/**
 * The studio, drawn so each construction beat can be revealed independently.
 * Group classes are the hooks the scroll handler animates; inline opacity
 * defaults keep the finished studio visible without JavaScript.
 */
function JourneyStudio() {
  const trim = "var(--ss-olive)";
  return (
    <svg
      viewBox="0 0 520 400"
      role="img"
      aria-label="A Spare Space studio being built step by step: a level base, walls, roof, windows and doors, the chosen cladding finish, then delivered with the lights on"
      className="mx-auto h-auto w-full max-w-[460px] lg:max-w-none"
    >
      <defs>
        <linearGradient id="j-glass-deep" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#48666a" />
          <stop offset="100%" stopColor="var(--ss-glass)" />
        </linearGradient>
        <linearGradient id="j-warm" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#ffe7bd" />
          <stop offset="100%" stopColor="#f7b96d" />
        </linearGradient>
        <clipPath id="j-wall-clip">
          <rect className="j-wallclip" x="94" y="156" width="332" height="196" />
        </clipPath>
      </defs>

      {/* Soft sun, rising */}
      <g className="j-sun">
        <circle cx="430" cy="86" r="44" fill="var(--accent-soft)" />
      </g>

      {/* 6 — site landscaping (delivered) */}
      <g className="j-site" style={{ opacity: 1 }}>
        <path
          d="M36 366 C150 354 230 356 290 362 C380 372 462 358 502 366"
          fill="none"
          stroke="var(--ss-clay)"
          strokeWidth="18"
          strokeLinecap="round"
          opacity="0.5"
        />
        <g stroke="var(--ss-eucalyptus)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5">
          <path d="M250 366v-12M256 366l5-9M244 366l-4-9" />
          <path d="M150 364v-11M156 364l4-8" />
        </g>
        {/* Step at the door */}
        <rect x="316" y="346" width="78" height="11" rx="4" fill="var(--ss-clay)" stroke={trim} strokeWidth="2" />
        {/* Left shrub */}
        <g>
          <circle cx="52" cy="340" r="20" fill="var(--ss-sage)" />
          <circle cx="72" cy="348" r="15" fill="var(--ss-eucalyptus)" opacity="0.85" />
          <circle cx="40" cy="350" r="12" fill="var(--ss-sage)" />
          <circle cx="50" cy="333" r="3" fill="var(--ss-blush)" />
          <circle cx="64" cy="343" r="2.6" fill="var(--ss-blush)" />
        </g>
        {/* Right potted plant */}
        <g>
          <path d="M456 318c-11-16 2-30 15-34-2 15-2 27-15 34Z" fill="var(--ss-eucalyptus)" />
          <path d="M472 320c-2-12 7-23 18-25-4 11-7 19-18 25Z" fill="var(--ss-sage)" />
          <path d="M464 336v-22" stroke="var(--ss-olive)" strokeWidth="3" />
          <path d="M452 338h28l-4 22h-20l-4-22Z" fill="var(--ss-clay)" stroke={trim} strokeWidth="2" />
        </g>
      </g>

      {/* 1 — base + feet */}
      <g className="j-foundation" style={{ opacity: 1 }}>
        <ellipse cx="262" cy="352" rx="186" ry="12" fill="#2c2825" opacity="0.12" />
        <rect x="92" y="344" width="336" height="14" rx="4" fill="var(--ss-clay)" stroke={trim} strokeWidth="2.5" />
        <g fill={trim}>
          <circle cx="130" cy="362" r="8" />
          <circle cx="260" cy="362" r="8" />
          <circle cx="390" cy="362" r="8" />
        </g>
      </g>

      {/* 2 — walls (raw panels + colour layer + boards), revealed bottom-up */}
      <g className="j-walls" clipPath="url(#j-wall-clip)" style={{ opacity: 1 }}>
        <rect x="100" y="158" width="320" height="188" rx="10" fill="#d9ccbb" stroke={trim} strokeWidth="3" />
        <rect
          className="j-colorwall"
          x="100"
          y="158"
          width="320"
          height="188"
          rx="10"
          fill="#8faf8a"
          stroke={trim}
          strokeWidth="3"
          style={{ opacity: 1 }}
        />
        <g stroke={trim} strokeOpacity="0.12" strokeWidth="1.5">
          {[176, 193, 210, 227, 244, 261, 278, 295, 312, 329].map((y) => (
            <path key={y} d={`M104 ${y}h312`} />
          ))}
        </g>
      </g>

      {/* 3 — skillion roof, descends into place */}
      <g className="j-roof" style={{ opacity: 1 }}>
        <path d="M84 162 436 138" stroke={trim} strokeWidth="13" strokeLinecap="round" />
      </g>

      {/* 4 — windows + door */}
      <g className="j-openings" style={{ opacity: 1 }}>
        {/* Feature picture window */}
        <rect x="124" y="190" width="96" height="104" rx="4" fill={trim} />
        <rect x="131" y="197" width="82" height="90" rx="2" fill="url(#j-glass-deep)" />
        <path d="m142 274 46-54M164 280l44-52" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="4" strokeLinecap="round" />
        {/* Sliding glass door */}
        <rect x="298" y="176" width="112" height="170" rx="4" fill={trim} />
        <rect x="304" y="182" width="48" height="158" rx="2" fill="url(#j-glass-deep)" />
        <rect x="356" y="182" width="48" height="158" rx="2" fill="url(#j-glass-deep)" opacity="0.9" />
        <path d="M318 190 305 218M338 190 325 218" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="4" strokeLinecap="round" />
        <path d="M354 182v158" stroke={trim} strokeWidth="3" />
        <rect x="345" y="250" width="5" height="26" rx="2.5" fill={trim} />
      </g>

      {/* 6 — warm light through the glass (lights on at move-in) */}
      <g className="j-warm" style={{ opacity: 1 }}>
        <rect x="131" y="197" width="82" height="90" rx="2" fill="url(#j-warm)" />
        <rect x="304" y="182" width="48" height="158" rx="2" fill="url(#j-warm)" />
        <rect x="356" y="182" width="48" height="158" rx="2" fill="url(#j-warm)" opacity="0.92" />
      </g>
    </svg>
  );
}
