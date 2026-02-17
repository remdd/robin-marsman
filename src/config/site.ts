/**
 * Base site configuration
 * Single source of truth for site identity and metadata
 */
export const siteConfig = {
  name: "Robin Marsman",
  title: "Robin Marsman | UK DJ & electronic music producer",
  description:
    "Electronic music producer and DJ based in Leicester, UK. Specializing in techno, electro, ambient and other underground electronic music. Listen to original productions and DJ mixes.",
  url: "https://robinmarsman.com",
  locale: "en_GB",
  location: "Leicester, UK",
  genre: ["Techno", "Electro", "Ambient", "Electronic", "Underground"],
} as const;

export type SiteConfig = typeof siteConfig;
