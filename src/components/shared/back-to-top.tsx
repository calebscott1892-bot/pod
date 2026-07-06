"use client";

import { useEffect, useState } from "react";

/** Floating back-to-top control for long pages. Desktop only, mobile
 * keeps its thumb space (and, on Studios, the sticky total bar). */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > 720);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  function scrollToTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed right-6 bottom-6 z-40 hidden size-12 place-items-center rounded-full border border-line bg-white/90 text-dark shadow-[0_18px_40px_-24px_rgba(44,40,37,0.5)] backdrop-blur transition hover:border-accent-strong hover:text-accent-strong lg:grid ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M9 14V4m0 0L4 9m5-5 5 5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
