export type SiteId = "rentals" | "studios" | "living";

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
  commercialEmail: string;
  /** Registered company operating this brand (from Paul, Jul 2026). */
  legalEntity: string;
  abn: string;
  tradingAs: string;
  logo: string;
  logoAlt: string;
  tagline: string;
  nav: { href: string; label: string }[];
  cta: { href: string; label: string };
};

/** The three-company structure for the group landing page. */
export const companies = [
  {
    id: "studios",
    name: "Spare Space Studios",
    entity: "Kiwi Kiwi Industries Pty Ltd",
    abn: "36 149 338 018",
    tradingAs: "Spare Space Studios, Spare Space Sheds, Spare Space Pods",
  },
  {
    id: "rentals",
    name: "Spare Space Rentals",
    entity: "Kiwi Kiwi Industries (QLD) Pty Ltd",
    abn: "95 789 306 129",
    tradingAs: "Spare Space Rentals",
  },
  {
    id: "living",
    name: "Spare Space Living",
    entity: "Kiwi Kiwi Industries (National) Pty Ltd",
    abn: "77 902 819 793",
    tradingAs: "Spare Space Living",
  },
] as const;

export const group = {
  name: "Kiwi Kiwi Group of Companies",
  otherBrands: ["Spare Space Sheds", "Spare Space Pods"],
};

export const sites: Record<SiteId, SiteConfig> = {
  rentals: {
    id: "rentals",
    name: "Spare Space Rentals",
    domain: "sparespacerentals.com.au",
    email: "Rentals@sparespacerentals.com.au",
    commercialEmail: "commercial@sparespacerentals.com.au",
    legalEntity: "Kiwi Kiwi Industries (QLD) Pty Ltd",
    abn: "95 789 306 129",
    tradingAs: "Spare Space Rentals",
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
    email: "Sales@sparespacestudios.com.au",
    commercialEmail: "commercial@sparespacestudios.com.au",
    legalEntity: "Kiwi Kiwi Industries Pty Ltd",
    abn: "36 149 338 018",
    tradingAs: "Spare Space Studios, Spare Space Sheds, Spare Space Pods",
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
  living: {
    id: "living",
    name: "Spare Space Living",
    domain: "sparespaceliving.com.au",
    // Placeholder inbox — Paul to confirm the Living address.
    email: "living@sparespaceliving.com.au",
    commercialEmail: "commercial@sparespaceliving.com.au",
    legalEntity: "Kiwi Kiwi Industries (National) Pty Ltd",
    abn: "77 902 819 793",
    tradingAs: "Spare Space Living",
    // No image logo yet — rendered as a text wordmark.
    logo: "",
    logoAlt: "Spare Space Living",
    tagline: "Fit-out your space — flooring, curtains, shelving and tiny-space furniture.",
    nav: [
      { href: "#offering", label: "What we offer" },
      { href: "#fitout", label: "Fit-out range" },
      { href: "#how-it-works", label: "How it works" },
    ],
    cta: { href: "#enquire", label: "Enquire" },
  },
};
