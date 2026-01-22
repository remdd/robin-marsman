import type { Metadata } from "next";
import { Geist, Geist_Mono, Michroma, Jura } from "next/font/google";
import { MarsCarousel } from "@/components/MarsCarousel";
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
        <div className="min-h-screen relative bg-black">
          <MarsCarousel />
          <div className="absolute inset-0 bg-black opacity-30 z-[1]" />
          <div className="absolute inset-0 z-[2] shadow-[inset_0_0_250px_100px_rgba(0,0,0,0.4)]" />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
