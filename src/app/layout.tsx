import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const arcon = localFont({
  src: "../fonts/arcon-regular.otf",
  variable: "--font-arcon",
  display: "swap",
  fallback: ["Avenir Next", "Segoe UI", "sans-serif"],
});

const corbel = localFont({
  src: "../fonts/corbel.ttf",
  variable: "--font-corbel",
  display: "swap",
  fallback: ["Corbel", "Segoe UI", "system-ui", "sans-serif"],
});

const haroldGraham = localFont({
  src: "../fonts/harold-graham.otf",
  variable: "--font-harold",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const sophistica = localFont({
  src: "../fonts/sophistica-monoline-slant.ttf",
  variable: "--font-sophistica",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Spare Space — Premium Lifestyle Studios",
    template: "%s | Spare Space",
  },
  description:
    "Premium modular lifestyle studios for home gyms, offices, creative spaces and wellness retreats. Delivered and installed from the Northern Rivers NSW to the Sunshine Coast QLD.",
};

export const viewport: Viewport = {
  themeColor: "#f0e3db",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${arcon.variable} ${corbel.variable} ${haroldGraham.variable} ${sophistica.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream font-sans text-dark">
        {children}
      </body>
    </html>
  );
}
