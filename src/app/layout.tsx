import type { Metadata } from "next";
import { Geist, Geist_Mono, Michroma, Jura } from "next/font/google";
import { MarsCarousel } from "@/components/MarsCarousel";
import { Navigation } from "@/components/Navigation";
import classNames from "classnames";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Not critical for initial render
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Not critical for initial render
});

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400", // Michroma only has one weight
  display: "swap",
  preload: true, // Critical for headings
});

const jura = Jura({
  variable: "--font-jura",
  subsets: ["latin"],
  display: "swap",
  preload: true, // Critical for body text
});

export const metadata: Metadata = {
  title: "Robin Marsman - DJ and music production website",
  description:
    "Audio and info from Robin Marsman, UK-based DJ and electronic music producer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={classNames(
          geistSans.variable,
          geistMono.variable,
          michroma.variable,
          jura.variable,
          "antialiased"
        )}
      >
        {/* Fixed background layer */}
        <div className="fixed inset-0 z-[-3] bg-black">
          <MarsCarousel />
        </div>
        <div className="fixed inset-0 z-[-2] bg-black opacity-30" />
        <div className="fixed inset-0 z-[-1] shadow-[inset_0_0_250px_100px_rgba(0,0,0,0.4)]" />

        {/* Fixed navigation */}
        <Navigation />

        {/* Scrollable content viewport with fade-out mask at top */}
        <div
          className="fixed inset-0 top-[108px] z-10 overflow-y-auto"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0px, black 10px)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0px, black 10px)",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
