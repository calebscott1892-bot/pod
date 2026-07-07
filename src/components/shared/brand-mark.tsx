import Image from "next/image";

import type { SiteConfig } from "@/lib/site-config";

const dims: Record<string, { width: number; height: number }> = {
  rentals: { width: 1024, height: 1024 },
  studios: { width: 1890, height: 1417 },
};

/**
 * Brand logo for a site. Renders the image logo where one exists, or a
 * typeset wordmark for brands without an image yet (Spare Space Living).
 */
export function BrandMark({
  site,
  size = "sm",
  priority = false,
}: {
  site: SiteConfig;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}) {
  if (site.logo) {
    const d = dims[site.id] ?? { width: 1024, height: 1024 };
    // `self-start` keeps the logo at its intrinsic aspect ratio: as a direct
    // flex child it would otherwise stretch to the container's cross axis
    // (full card width in the column-layout gateway) and distort. No-op in the
    // header, where the wrapping link already shrink-wraps to the logo.
    const imgClass = `max-w-full self-start object-contain ${
      size === "lg" ? "h-24 w-auto" : size === "md" ? "h-16 w-auto" : "h-12 w-auto sm:h-14"
    }`;
    return (
      <Image
        src={site.logo}
        alt={site.logoAlt}
        width={d.width}
        height={d.height}
        priority={priority}
        className={imgClass}
      />
    );
  }

  const textClass =
    size === "lg"
      ? "text-[30px]"
      : size === "md"
        ? "text-[24px]"
        : "text-[20px] sm:text-[22px]";
  return (
    <span
      className={`font-heading leading-none tracking-tight text-dark ${textClass}`}
      aria-label={site.logoAlt}
    >
      Spare Space <span className="text-accent-strong">Living</span>
    </span>
  );
}
