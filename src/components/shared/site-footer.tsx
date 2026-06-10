import Image from "next/image";
import Link from "next/link";

import { business, sites, type SiteConfig } from "@/lib/site-config";

export function SiteFooter({ site }: { site: SiteConfig }) {
  const otherSite = site.id === "rentals" ? sites.studios : sites.rentals;

  return (
    <footer className="border-t border-line bg-cream-soft">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.9fr_1fr] lg:gap-8 lg:px-8 lg:py-16">
        <div>
          <Image
            src={site.logo}
            alt={site.logoAlt}
            width={300}
            height={220}
            className="h-16 w-auto"
          />
          <p className="mt-4 max-w-[340px] text-[15px] leading-7 text-mid">
            {site.tagline}
          </p>
          <div className="mt-5 flex gap-3">
            <SocialLink label="Instagram">
              <path d="M11 7.6A3.4 3.4 0 1 0 11 14.4 3.4 3.4 0 0 0 11 7.6Zm0 5.4a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm3.7-5.7a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0ZM7.3 3.5h7.4a3.8 3.8 0 0 1 3.8 3.8v7.4a3.8 3.8 0 0 1-3.8 3.8H7.3a3.8 3.8 0 0 1-3.8-3.8V7.3a3.8 3.8 0 0 1 3.8-3.8Zm7.4 1.5H7.3A2.3 2.3 0 0 0 5 7.3v7.4A2.3 2.3 0 0 0 7.3 17h7.4a2.3 2.3 0 0 0 2.3-2.3V7.3A2.3 2.3 0 0 0 14.7 5Z" />
            </SocialLink>
            <SocialLink label="Facebook">
              <path d="M12.6 18.5v-6h2l.3-2.4h-2.3V8.6c0-.7.2-1.2 1.2-1.2h1.2V5.3c-.2 0-1-.1-1.8-.1-1.8 0-3 1.1-3 3.1v1.8H8.1v2.4h2.1v6h2.4Z" />
            </SocialLink>
          </div>
        </div>

        <div>
          <p className="font-heading text-[13px] tracking-[0.18em] text-accent-strong uppercase">
            Get in touch
          </p>
          <ul className="mt-4 space-y-3 text-[15px] leading-6">
            <li>
              <a
                href={business.phoneHref}
                className="text-dark transition hover:text-accent-strong"
              >
                {business.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-dark transition hover:text-accent-strong"
              >
                {site.email}
              </a>
            </li>
            <li className="text-mid">{business.serviceArea}</li>
          </ul>
        </div>

        <div>
          <p className="font-heading text-[13px] tracking-[0.18em] text-accent-strong uppercase">
            Spare Space family
          </p>
          <p className="mt-4 text-[15px] leading-6 text-mid">
            Looking to {site.id === "rentals" ? "own" : "rent"} instead?{" "}
            <Link
              href={`/${otherSite.id}`}
              className="text-dark underline decoration-line underline-offset-4 transition hover:text-accent-strong"
            >
              Visit {otherSite.name}
            </Link>
          </p>
          <div className="mt-6 space-y-1 text-[13px] leading-6 text-mid">
            <p>
              © 2026 {business.legalName} · ABN {business.abn}
            </p>
            <p>T/As {business.tradingNames.join(", ")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#"
      aria-label={`${label} (coming soon)`}
      className="grid size-12 place-items-center rounded-full border border-line text-mid transition hover:border-accent-strong hover:text-accent-strong"
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
