import type { Metadata } from "next";

import { business, sites } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: "Spare Space Rentals — Premium Lifestyle Studios, Delivered",
  },
  description: `Rent a premium backyard studio — home gym, office, creative space or wellness retreat. Delivered and installed, ${business.serviceArea}. Call ${business.phone}.`,
  twitter: { card: "summary_large_image" },
};

export default function RentalsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div data-site={sites.rentals.id} className="flex min-h-screen flex-col">
      {children}
    </div>
  );
}
