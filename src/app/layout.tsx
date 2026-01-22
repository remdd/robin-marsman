import type { Metadata } from "next";
import { Geist, Geist_Mono, Michroma, Jura } from "next/font/google";
import { MarsCarousel } from "@/components/MarsCarousel";
import { Navigation } from "@/components/Navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const michroma = Michroma({
  variable: "--font-michroma",
  subsets: ["latin"],
  weight: "400", // Michroma only has one weight
});

const jura = Jura({
  variable: "--font-jura",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Robin Marsman - Next.js & GitHub Pages",
  description:
    "A modern web application built with Next.js, TypeScript, and Tailwind CSS, deployed to GitHub Pages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${michroma.variable} ${jura.variable} antialiased`}
      >
        {/* Fixed background layer */}
        <div className="fixed inset-0 bg-black z-[-3]">
          <MarsCarousel />
        </div>
        <div className="fixed inset-0 bg-black opacity-30 z-[-2]" />
        <div className="fixed inset-0 z-[-1] shadow-[inset_0_0_250px_100px_rgba(0,0,0,0.4)]" />

        {/* Fixed navigation */}
        <Navigation />

        {/* Scrollable content viewport */}
        <div className="fixed inset-0 top-[108px] overflow-y-auto z-10">
          {/* Inner wrapper with fade-out mask applied to content only */}
          <div
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0px, black 10px)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0px, black 10px)",
            }}
          >
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
