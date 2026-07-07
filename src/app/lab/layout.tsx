import type { Metadata } from "next";

import { sites } from "@/lib/site-config";

// Private sandbox for motion/media components — not linked from the live nav
// and kept out of search indexes until a treatment is promoted to a real page.
export const metadata: Metadata = {
  title: "Component lab, Spare Space",
  robots: { index: false, follow: false },
};

export default function LabLayout({
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
