import { Metadata } from "next";

// Base site configuration
const SITE_CONFIG = {
  name: "Robin Marsman",
  title: "Robin Marsman | UK DJ & electronic music producer",
  description:
    "Electronic music producer and DJ based in Leicester, UK. Specializing in techno, electro, ambient and other underground electronic music. Listen to original productions and DJ mixes.",
  url: "https://robinmarsman.com",
  locale: "en_GB",
  location: "Leicester, UK",
  genre: ["Techno", "Electro", "Ambient", "Electronic", "Underground"],
} as const;

// OpenGraph image configuration
const OG_IMAGE = {
  url: `${SITE_CONFIG.url}/img/robin-marsman-og.jpg`,
  width: 1200,
  height: 630,
  alt: "Robin Marsman - UK electronic music producer & DJ",
} as const;

// Default metadata that applies to all pages
export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "electronic music producer",
    "Leicester DJ",
    "Leicester music producer",
    "UK electronic music",
    "techno",
    "electro",
    "ambient",
    "underground electronic",
    "independent electronic artist",
  ] as string[],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  category: "Music",
  classification: "Entertainment",

  // OpenGraph
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [OG_IMAGE],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    site: SITE_CONFIG.name,
    creator: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [OG_IMAGE.url],
  },

  // Additional meta
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },

  // Verification (add when you have these)
  // verification: {
  //   google: "your-google-site-verification",
  //   yandex: "your-yandex-verification",
  // },
} as const;

// Page-specific metadata configurations
export const pageMetadata = {
  home: {
    title: "Robin Marsman | UK DJ & electronic music producer",
    description: "Electronic music producer and DJ based in Leicester, UK.",
    keywords: [
      "Robin Marsman",
      "electronic music producer Leicester",
      "UK electronic music DJ",
      "techno producer",
      "ambient electronic music",
      "Leicester electronic music scene",
      "underground electronic UK",
    ] as string[],
    openGraph: {
      title: "Robin Marsman | UK DJ & electronic music producer",
      description: "Electronic music producer and DJ based in Leicester, UK.",
      url: SITE_CONFIG.url,
    },
  },

  about: {
    title: "Robin Marsman | About",
    description:
      "Learn about Robin Marsman, electronic music producer and DJ based in Leicester, UK.",
    keywords: [
      "Robin Marsman biography",
      "electronic music producer Leicester",
      "UK electronic music DJ",
      "techno producer",
      "ambient electronic music",
      "Leicester electronic music scene",
      "underground electronic UK",
    ] as string[],
    openGraph: {
      title: "Robin Marsman | About",
      description:
        "Learn about Robin Marsman, electronic music producer and DJ based in Leicester, UK.",
      url: `${SITE_CONFIG.url}/about`,
    },
  },

  productions: {
    title: "Robin Marsman | Music Productions",
    description: "Original electronic music productions by Robin Marsman.",
    keywords: [
      "Robin Marsman music",
      "electronic music productions",
      "electronic music Leicester",
      "underground electronic music UK",
      "Red world dawning album",
      "independent electronic music",
    ] as string[],
    openGraph: {
      title: "Robin Marsman | Music Productions",
      description: "Original electronic music productions by Robin Marsman.",
      url: `${SITE_CONFIG.url}/productions`,
    },
  },

  mixes: {
    title: "Robin Marsman | DJ mixes & live sets",
    description: "DJ mixes and live sets by Robin Marsman.",
    keywords: [
      "Robin Marsman DJ mixes",
      "electronic DJ sets",
      "techno DJ set",
      "techno DJ mix",
      "electro DJ set",
      "electro DJ mix",
      "ambient DJ mix",
      "Leicester DJ",
      "underground electronic mixes",
      "UK electronic DJ",
      "mixcloud Robin Marsman",
    ] as string[],
    openGraph: {
      title: "Robin Marsman | DJ mixes & live sets",
      description: "DJ mixes and live sets by Robin Marsman.",
      url: `${SITE_CONFIG.url}/mixes`,
    },
  },
} as const;

// Utility function to create metadata for a specific page
export function createPageMetadata(
  pageKey: keyof typeof pageMetadata
): Metadata {
  const page = pageMetadata[pageKey];

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...page.openGraph,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: page.title,
      description: page.description,
    },
  };
}

// Structured data schemas
export const structuredData = {
  person: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.name,
    jobTitle: ["DJ", "Music Producer", "Electronic Music Artist"],
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    location: {
      "@type": "Place",
      name: SITE_CONFIG.location,
    },
    genre: SITE_CONFIG.genre,
    sameAs: [
      // Add these URLs when you have them
      // "https://bandcamp.com/robinmarsman",
      // "https://mixcloud.com/robinmarsman",
      // "https://facebook.com/robinmarsmanmusic",
    ],
  },

  musicAlbum: {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    name: "Red world dawning",
    byArtist: {
      "@type": "Person",
      name: SITE_CONFIG.name,
    },
    genre: ["Electronic", "Techno", "Electro", "Ambient"],
    url: `${SITE_CONFIG.url}/productions`,
  },

  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_CONFIG.url}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },

  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    description: `Electronic music producer and DJ based in ${SITE_CONFIG.location}`,
    url: SITE_CONFIG.url,
    location: {
      "@type": "Place",
      name: SITE_CONFIG.location,
    },
  },
} as const;

export { SITE_CONFIG };
