"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Vertical parallax factor — positive drifts down, negative drifts up. */
  speed?: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * Gentle scroll parallax. First layer of the scroll-journey treatment:
 * decorative elements drift at their own pace while content scrolls
 * normally. No-ops under reduced motion.
 */
export function Drift({ speed = 0.06, className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      el.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`;
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
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
