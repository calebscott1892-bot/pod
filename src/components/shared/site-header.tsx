"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { business, type SiteConfig } from "@/lib/site-config";

const logoDimensions: Record<string, { width: number; height: number }> = {
  rentals: { width: 1024, height: 1024 },
  studios: { width: 1890, height: 1417 },
};

export function SiteHeader({ site }: { site: SiteConfig }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dims = logoDimensions[site.id];

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
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

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-cream/85 backdrop-blur transition-[border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-line shadow-[0_16px_40px_-32px_rgba(44,40,37,0.5)]"
          : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${site.id}`}
          className="flex shrink-0 items-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src={site.logo}
            alt={site.logoAlt}
            width={dims.width}
            height={dims.height}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-heading text-[14px] tracking-[0.12em] text-mid uppercase transition hover:text-dark"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={business.phoneHref}
            className="font-heading text-[15px] tracking-[0.04em] text-dark transition hover:text-accent-strong"
          >
            {business.phone}
          </a>
          <a
            href={site.cta.href}
            className="inline-flex min-h-12 items-center rounded-full bg-dark px-6 font-heading text-[13px] tracking-[0.12em] text-cream uppercase transition hover:bg-accent-strong"
          >
            {site.cta.label}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="grid size-12 shrink-0 place-items-center rounded-full border border-line text-dark md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {open ? (
              <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M3 6.5h16M3 11h16M3 15.5h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-cream md:hidden">
          <nav className="mx-auto flex max-w-[1280px] flex-col px-4 py-3 sm:px-6" aria-label="Mobile">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-line font-heading text-[15px] tracking-[0.1em] text-dark uppercase"
              >
                {item.label}
              </a>
            ))}
            <a
              href={business.phoneHref}
              className="flex min-h-12 items-center border-b border-line font-heading text-[15px] tracking-[0.04em] text-dark"
            >
              Call {business.phone}
            </a>
            <a
              href={site.cta.href}
              onClick={() => setOpen(false)}
              className="mt-4 mb-2 inline-flex min-h-12 items-center justify-center rounded-full bg-dark px-6 font-heading text-[13px] tracking-[0.12em] text-cream uppercase"
            >
              {site.cta.label}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
