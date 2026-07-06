import type { Metadata } from "next";

import { sites } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: "Spare Space Living — Fit-out Supply & Install",
  },
  description:
    "Fit-out your space with flooring, curtains, shelving and tiny-space furniture. Supply only, or supply and install — from Spare Space Living, part of the Kiwi Kiwi Group.",
  twitter: { card: "summary_large_image" },
};

export default function LivingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div data-site={sites.living.id} className="flex min-h-screen flex-col">
      {children}
    </div>
  );
}
