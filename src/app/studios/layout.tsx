import type { Metadata } from "next";

import { business, sites } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: "Spare Space Studios — Design and Order Your Lifestyle Studio",
  },
  description: `Seven signature studio designs, one size, endlessly customisable. Configure windows, doors and cladding, then order online. Delivered in 13 weeks, ${business.serviceArea}.`,
  twitter: { card: "summary_large_image" },
};

export default function StudiosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div data-site={sites.studios.id} className="flex min-h-screen flex-col">
      {children}
    </div>
  );
}
