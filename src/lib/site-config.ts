export type SiteId = "rentals" | "studios";

/**
 * Canonical site origin for metadata, sitemap and robots. Prefers an
 * explicit NEXT_PUBLIC_APP_URL, then Vercel's auto-injected production
 * domain, then localhost. Trimmed and de-slashed so a stray newline in an
 * env value can never produce an invalid URL at build time.
 */
export const siteUrl = (() => {
  const explicit = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;
  return "http://localhost:3000";
})();

export const business = {
  legalName: "Kiwi Kiwi Industries Pty Ltd",
  abn: "36 149 338 018",
  tradingNames: [
    "Spare Space Sheds",
    "Spare Space Pods",
    "Spare Space Studios",
  ],
  phone: "0434 541 768",
  phoneHref: "tel:+61434541768",
  serviceArea: "Northern Rivers NSW to the Sunshine Coast QLD",
};

export type SiteConfig = {
  id: SiteId;
  name: string;
  domain: string;
  email: string;
  logo: string;
  logoAlt: string;
  tagline: string;
  nav: { href: string; label: string }[];
  cta: { href: string; label: string };
};

export const sites: Record<SiteId, SiteConfig> = {
  rentals: {
    id: "rentals",
    name: "Spare Space Rentals",
    domain: "sparespacerentals.com.au",
    email: "sparespacerentals@gmail.com",
    logo: "/assets/logos/spare-space-rentals.png",
    logoAlt: "Spare Space Rentals",
    tagline: "Premium lifestyle studios, delivered and installed.",
    nav: [
      { href: "#spaces", label: "Spaces" },
      { href: "#how-it-works", label: "How it works" },
      { href: "#service-area", label: "Service area" },
    ],
    cta: { href: "#enquire", label: "Make an enquiry" },
  },
  studios: {
    id: "studios",
    name: "Spare Space Studios",
    domain: "sparespacestudios.com.au",
    // Interim contact address until a studios inbox is set up.
    email: "sparespacerentals@gmail.com",
    logo: "/assets/logos/spare-space-studios.png",
    logoAlt: "Spare Space Studios",
    tagline: "Seven signature designs. Endlessly customisable.",
    nav: [
      { href: "#styles", label: "Styles" },
      { href: "#configurator", label: "Customise" },
      { href: "#delivery", label: "Delivery" },
      { href: "#faq", label: "FAQ" },
    ],
    cta: { href: "#configurator", label: "Design yours" },
  },
};
