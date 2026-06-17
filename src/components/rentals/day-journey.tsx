"use client";

import { useEffect, useRef } from "react";

/**
 * Pinned day-in-the-life journey — one studio carried through a single
 * day: dawn gym, daylight office, dusk retreat with the lights on.
 *
 * Scroll progress drives --journey (0–1), data-stage (0–2) and the sun's
 * arc (--dj-sun-x/y) on the track; globals.css turns those into the sky,
 * sun, interior scene and window-glow transitions. The server renders the
 * dusk "lights on" frame, so visitors without JavaScript — and
 * reduced-motion visitors, for whom CSS unpins the section — see the
 * warmest, most aspirational moment as a single still.
 */

const captions = [
  {
    title: "Train before the world wakes",
    body: "Roll out of bed and into your own gym. No drive, no queue — just you and the morning.",
  },
  {
    title: "Focus, uninterrupted",
    body: "A dedicated office a few steps from the back door. Close the laptop, close the door, leave work behind.",
  },
  {
    title: "Unwind in your retreat",
    body: "As the light fades, your space becomes a sanctuary — yoga, a book, a quiet moment that's yours.",
  },
];

export function DayJourney() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let lastStage = -1;

    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
      track.style.setProperty("--journey", p.toFixed(4));

      // Sun arcs left-low → high-centre → right-low (viewBox user units).
      const sunX = 120 + p * 280;
      const sunY = 132 - Math.sin(p * Math.PI) * 82;
      track.style.setProperty("--dj-sun-x", `${sunX.toFixed(1)}px`);
      track.style.setProperty("--dj-sun-y", `${sunY.toFixed(1)}px`);

      const stage = p < 0.38 ? 0 : p < 0.72 ? 1 : 2;
      if (stage !== lastStage) {
        lastStage = stage;
        track.dataset.stage = String(stage);
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
    <section className="bg-cream" aria-labelledby="day-journey-heading">
      <div
        ref={trackRef}
        className="dj-track relative h-[300vh]"
        data-stage="2"
      >
        <div className="dj-stage sticky top-0 flex h-svh items-center overflow-hidden pt-20">
          <div className="mx-auto grid w-full max-w-[1280px] items-center gap-6 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-8">
            <div className="text-center lg:text-left">
              <p className="font-heading text-[13px] tracking-[0.22em] text-accent-strong uppercase">
                A day in your space
              </p>
              <h2
                id="day-journey-heading"
                className="mt-3 font-heading text-[30px] leading-[1.08] tracking-tight sm:text-[40px]"
              >
                One studio. Every part of your day.
              </h2>

              <ol className="dj-rail relative mt-9 hidden space-y-7 pl-8 lg:block">
                {captions.map((caption, index) => (
                  <li key={caption.title} className={`dj-cap dj-cap-${index} relative`}>
                    <span
                      aria-hidden="true"
                      className="dj-cap-dot absolute top-1.5 -left-[37px] size-3 rounded-full"
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
              <DayStudio />

              <div className="lg:hidden">
                <div className="relative mt-4 h-32">
                  {captions.map((caption, index) => (
                    <div
                      key={caption.title}
                      className={`dj-mcap dj-cap-${index} absolute inset-0 px-2 text-center`}
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
                      className={`dj-dot dj-dot-${index} size-2.5 rounded-full`}
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

/** The studio through the day: sky, sun, and a glass front whose interior
 *  scene and warmth change with the time of day. */
function DayStudio() {
  return (
    <svg
      viewBox="0 0 520 400"
      role="img"
      aria-label="A Spare Space studio through one day — a morning gym, a daytime office, and an evening retreat with the lights on"
      className="mx-auto h-auto w-full max-w-[460px] lg:max-w-none"
    >
      <defs>
        <linearGradient id="dj-dawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9b6d6" />
          <stop offset="55%" stopColor="#e9bfb2" />
          <stop offset="100%" stopColor="#f7d9a8" />
        </linearGradient>
        <linearGradient id="dj-day" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a9cbe0" />
          <stop offset="60%" stopColor="#d6e7ee" />
          <stop offset="100%" stopColor="#f1e7d6" />
        </linearGradient>
        <linearGradient id="dj-dusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34304c" />
          <stop offset="52%" stopColor="#8a5a6b" />
          <stop offset="100%" stopColor="#d99a6a" />
        </linearGradient>
        <linearGradient id="dj-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe7bd" />
          <stop offset="100%" stopColor="#f7b96d" />
        </linearGradient>
        <clipPath id="dj-glass">
          <rect x="146" y="176" width="232" height="138" rx="4" />
        </clipPath>
      </defs>

      {/* Sky */}
      <rect className="dj-sky dj-sky-dawn" width="520" height="400" fill="url(#dj-dawn)" />
      <rect className="dj-sky dj-sky-day" width="520" height="400" fill="url(#dj-day)" />
      <rect className="dj-sky dj-sky-dusk" width="520" height="400" fill="url(#dj-dusk)" />

      {/* Stars (dusk) */}
      <g className="dj-stars" fill="#fdf3e3">
        <circle cx="96" cy="60" r="1.6" />
        <circle cx="150" cy="38" r="1.2" />
        <circle cx="214" cy="66" r="1.5" />
        <circle cx="430" cy="52" r="1.3" />
        <circle cx="472" cy="92" r="1.6" />
        <circle cx="392" cy="34" r="1.1" />
      </g>

      {/* Sun / celestial body */}
      <g className="dj-sun">
        <circle cx="0" cy="0" r="26" />
      </g>

      {/* Ground */}
      <ellipse cx="260" cy="350" rx="208" ry="14" fill="#2c2825" opacity="0.1" />

      {/* Studio shell */}
      <rect x="110" y="150" width="300" height="184" rx="10" fill="#f0e3db" stroke="#2c2825" strokeWidth="3" />
      <path d="M92 154 428 126" stroke="#2c2825" strokeWidth="13" strokeLinecap="round" />
      <g fill="#2c2825">
        <circle cx="150" cy="336" r="8" />
        <circle cx="260" cy="336" r="8" />
        <circle cx="370" cy="336" r="8" />
      </g>

      {/* Glass front + interior */}
      <rect x="146" y="176" width="232" height="138" rx="4" fill="#211e1b" stroke="#2c2825" strokeWidth="3" />

      <g clipPath="url(#dj-glass)">
        {/* Warm interior glow (builds to dusk) */}
        <rect className="dj-warm" x="146" y="176" width="232" height="138" fill="url(#dj-glow)" />

        {/* Floor line */}
        <path d="M146 300h232" stroke="#3a342e" strokeWidth="2" />

        {/* Gym scene */}
        <g className="dj-scene dj-scene-gym" stroke="#caa06a" strokeWidth="4" fill="none" strokeLinecap="round">
          <path d="M196 300v-20h60v20" />
          <path d="M210 280v-8h32v8" />
          <g strokeWidth="5">
            <path d="M300 286h44" />
          </g>
          <g fill="#caa06a" stroke="none">
            <rect x="296" y="278" width="8" height="16" rx="2" />
            <rect x="340" y="278" width="8" height="16" rx="2" />
          </g>
        </g>

        {/* Office scene */}
        <g className="dj-scene dj-scene-office" stroke="#caa06a" strokeWidth="4" fill="none" strokeLinecap="round">
          <path d="M198 300v-26h84v26" />
          <path d="M198 280h84" />
          <g fill="#caa06a" stroke="none">
            <rect x="300" y="252" width="48" height="30" rx="2" />
          </g>
          <path d="M324 282v8M312 298h24" />
        </g>

        {/* Retreat scene */}
        <g className="dj-scene dj-scene-retreat" strokeLinecap="round">
          {/* daybed */}
          <rect x="188" y="284" width="120" height="16" rx="8" fill="#caa06a" />
          <circle cx="200" cy="282" r="8" fill="#d9b48a" />
          {/* pendant light */}
          <path d="M330 176v34" stroke="#8a6a44" strokeWidth="2" fill="none" />
          <circle cx="330" cy="216" r="9" fill="#ffe7bd" />
          {/* plant */}
          <path d="M348 300v-18" stroke="#8a6a44" strokeWidth="3" fill="none" />
          <path d="M348 286c-8-2-12-10-10-18 8 2 12 10 10 18ZM348 288c8-2 12-10 10-18-8 2-12 10-10 18Z" fill="#8faf8a" />
          <rect x="340" y="300" width="16" height="10" rx="2" fill="#caa06a" />
        </g>
      </g>

      {/* Mullion suggesting sliding glass */}
      <path d="M262 176v138" stroke="#2c2825" strokeWidth="3" />
    </svg>
  );
}
