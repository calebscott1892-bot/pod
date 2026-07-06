import type { Metadata } from "next";

import { business, sites } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: "Spare Space Studios, Design and Order Your Lifestyle Studio",
  },
  description: `Signature studio designs, one size, endlessly customisable. Choose your roof, doors, windows, wall and trim colour, then order online. Built and delivered within weeks, ${business.serviceArea}.`,
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
