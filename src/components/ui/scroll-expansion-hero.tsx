"use client";

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from "react";
import Image from "next/image";

/**
 * Scroll-to-expand media hero (adapted from a 21st.dev block).
 *
 * Rebuilt for this codebase to match its hand-rolled motion conventions and
 * fix the imported original's problems:
 *  - No framer-motion. Opacity crossfades are inline style + CSS transition, so
 *    prefers-reduced-motion (the global duration reset) neutralises them for free.
 *  - Wheel/touch progress is throttled through a ref + rAF, and the listeners
 *    bind ONCE (mount-only effect) instead of rebinding on every scroll tick.
 *  - NOT a scroll trap: it no longer force-scrolls the window to 0. Keyboard and
 *    scrollbar users can pass; a scroll-key/Tab press completes the expansion so
 *    they reach the content below. prefers-reduced-motion / no-JS render it open.
 *  - The split title is display text (<p>), not <h2>, so the host page keeps one
 *    clean <h1>.
 *  - `preload` (Next 16) replaces the deprecated `priority`.
 *
 * Drop real footage in via `mediaSrc` (mp4 or YouTube) once Paul supplies it;
 * `bgImageSrc` is the full-bleed still behind the collapsing card.
 */
interface ScrollExpandMediaProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const SCROLL_KEYS = new Set([
  " ",
  "Spacebar",
  "ArrowDown",
  "ArrowUp",
  "PageDown",
  "PageUp",
  "End",
  "Home",
  "Tab",
]);

const ScrollExpandMedia = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Mutable mirrors so the mount-once listeners read live values without the
  // effect depending on (and re-subscribing to) React state.
  const progressRef = useRef(0);
  const expandedRef = useRef(false);
  const touchStartRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    progressRef.current = 0;
    expandedRef.current = false;
    const id = window.setTimeout(() => {
      setScrollProgress(0);
      setShowContent(false);
    }, 0);
    return () => window.clearTimeout(id);
  }, [mediaType]);

  // Reduced motion: present the media open and never hijack scroll.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReducedMotion(mq.matches);
      if (mq.matches) {
        progressRef.current = 1;
        expandedRef.current = true;
        setScrollProgress(1);
        setShowContent(true);
      }
    };
    const id = window.setTimeout(apply, 0);
    mq.addEventListener("change", apply);
    return () => {
      window.clearTimeout(id);
      mq.removeEventListener("change", apply);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    // Commit the current ref progress to React state at most once per frame,
    // and reconcile the discrete expanded/showContent flags.
    const commit = () => {
      rafRef.current = 0;
      const p = progressRef.current;
      setScrollProgress(p);
      if (p >= 1) {
        expandedRef.current = true;
        setShowContent(true);
      } else if (p < 0.75) {
        setShowContent(false);
      }
    };
    const schedule = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(commit);
    };
    const advance = (delta: number) => {
      progressRef.current = Math.min(Math.max(progressRef.current + delta, 0), 1);
      schedule();
    };
    const collapse = () => {
      if (!expandedRef.current) return;
      expandedRef.current = false;
      progressRef.current = 0;
      schedule();
    };
    const expandFully = () => {
      progressRef.current = 1;
      expandedRef.current = true;
      setScrollProgress(1);
      setShowContent(true);
    };

    const handleWheel = (e: WheelEvent) => {
      if (expandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
        collapse();
        e.preventDefault();
      } else if (!expandedRef.current) {
        e.preventDefault();
        advance(e.deltaY * 0.0009);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartRef.current - touchY;

      if (expandedRef.current && deltaY < -20 && window.scrollY <= 5) {
        collapse();
        e.preventDefault();
      } else if (!expandedRef.current) {
        e.preventDefault();
        advance(deltaY * (deltaY < 0 ? 0.008 : 0.005));
        touchStartRef.current = touchY;
      }
    };

    const handleTouchEnd = (): void => {
      touchStartRef.current = 0;
    };

    // Keyboard / scrollbar users can't fire wheel events — let a scroll-key or
    // Tab complete the expansion so they reach the content instead of stalling.
    const handleKeydown = (e: globalThis.KeyboardEvent) => {
      if (!expandedRef.current && SCROLL_KEYS.has(e.key)) {
        expandFully();
      }
    };

    window.addEventListener("wheel", handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener(
      "touchstart",
      handleTouchStart as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener(
      "touchmove",
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener("touchend", handleTouchEnd as EventListener);
    window.addEventListener("keydown", handleKeydown);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      window.removeEventListener(
        "wheel",
        handleWheel as unknown as EventListener
      );
      window.removeEventListener(
        "touchstart",
        handleTouchStart as unknown as EventListener
      );
      window.removeEventListener(
        "touchmove",
        handleTouchMove as unknown as EventListener
      );
      window.removeEventListener("touchend", handleTouchEnd as EventListener);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [reducedMotion]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const mediaWidth = 300 + scrollProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + scrollProgress * (isMobileState ? 200 : 400);
  // Reduced motion jumps straight to expanded; keep the title centred rather
  // than translated off-screen so the branding is still visible.
  const textTranslateX = reducedMotion
    ? 0
    : scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(" ")[0] : "";
  const restOfTitle = title ? title.split(" ").slice(1).join(" ") : "";
  const fade = "opacity 0.2s ease-out";

  return (
    <div className="overflow-x-hidden transition-colors duration-700 ease-in-out">
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-start">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          <div
            className="absolute inset-0 z-0 h-full"
            style={{ opacity: 1 - scrollProgress, transition: fade }}
          >
            <Image
              src={bgImageSrc}
              alt=""
              width={1920}
              height={1080}
              sizes="100vw"
              className="h-screen w-screen"
              style={{ objectFit: "cover", objectPosition: "center" }}
              preload
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          <div className="relative z-10 container mx-auto flex flex-col items-center justify-start">
            <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center">
              <div
                className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 transform rounded-2xl transition-none"
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0px 30px 80px rgba(44, 40, 37, 0.4)",
                }}
              >
                {mediaType === "video" ? (
                  mediaSrc.includes("youtube.com") ? (
                    <div className="relative h-full w-full pointer-events-none">
                      <iframe
                        width="100%"
                        height="100%"
                        src={
                          mediaSrc.includes("embed")
                            ? mediaSrc +
                              (mediaSrc.includes("?") ? "&" : "?") +
                              "autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1"
                            : mediaSrc.replace("watch?v=", "embed/") +
                              "?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=" +
                              mediaSrc.split("v=")[1]
                        }
                        className="h-full w-full rounded-xl"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div
                        className="absolute inset-0 z-10 rounded-xl bg-black/30"
                        style={{ opacity: 0.5 - scrollProgress * 0.3, transition: fade }}
                      />
                    </div>
                  ) : (
                    <div className="relative h-full w-full pointer-events-none">
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="h-full w-full rounded-xl object-cover"
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div
                        className="absolute inset-0 z-10 rounded-xl bg-black/30"
                        style={{ opacity: 0.5 - scrollProgress * 0.3, transition: fade }}
                      />
                    </div>
                  )
                ) : (
                  <div className="relative h-full w-full">
                    <Image
                      src={mediaSrc}
                      alt={title || "Media content"}
                      width={1280}
                      height={720}
                      className="h-full w-full rounded-xl object-cover"
                    />
                    <div
                      className="absolute inset-0 rounded-xl bg-black/40"
                      style={{ opacity: 0.6 - scrollProgress * 0.3, transition: fade }}
                    />
                  </div>
                )}

                <div className="relative z-10 mt-4 flex flex-col items-center text-center transition-none">
                  {date && (
                    <p
                      className="font-script text-[22px] leading-none text-cream"
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && !reducedMotion && (
                    <p
                      className="mt-1 text-center font-heading text-[12px] tracking-[0.08em] text-cream/70 uppercase"
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              {/* Display title — intentionally not a heading, so the host page's
                  own <h1> stays the single top-level heading. */}
              <div
                className={`relative z-10 flex w-full flex-col items-center justify-center gap-2 text-center transition-none ${
                  textBlend ? "mix-blend-difference" : "mix-blend-normal"
                }`}
                aria-hidden="true"
              >
                <p
                  className="font-heading text-4xl leading-[1.02] tracking-tight text-cream md:text-5xl lg:text-6xl"
                  style={{ transform: `translateX(-${textTranslateX}vw)` }}
                >
                  {firstWord}
                </p>
                <p
                  className="text-center font-heading text-4xl leading-[1.02] tracking-tight text-cream md:text-5xl lg:text-6xl"
                  style={{ transform: `translateX(${textTranslateX}vw)` }}
                >
                  {restOfTitle}
                </p>
              </div>
            </div>

            <section
              className="flex w-full flex-col px-8 py-10 md:px-16 lg:py-20"
              style={{ opacity: showContent ? 1 : 0, transition: "opacity 0.7s ease-out" }}
            >
              {children}
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
