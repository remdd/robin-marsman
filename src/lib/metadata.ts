import { Metadata } from "next";
import { siteConfig } from "@/config";

// OpenGraph image configuration
const OG_IMAGE = {
  url: `${siteConfig.url}/img/robin-marsman-og.jpg`,
  width: 1200,
  height: 630,
  alt: "Robin Marsman - UK electronic music producer & DJ",
} as const;

// Default metadata that applies to all pages
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,

  // Favicons and app icons
  icons: {
    icon: [
      { url: "/favicons/favicon.ico", sizes: "32x32" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/favicons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  // Web app manifest for PWA support
  manifest: "/site.webmanifest",

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
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Music",
  classification: "Entertainment",

  // OpenGraph
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [OG_IMAGE],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    site: siteConfig.name,
    creator: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
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
      url: siteConfig.url,
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
      url: `${siteConfig.url}/about`,
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
      url: `${siteConfig.url}/productions`,
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
      url: `${siteConfig.url}/mixes`,
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
    name: siteConfig.name,
    jobTitle: ["DJ", "Music Producer", "Electronic Music Artist"],
    description: siteConfig.description,
    url: siteConfig.url,
    location: {
      "@type": "Place",
      name: siteConfig.location,
    },
    genre: siteConfig.genre,
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
      name: siteConfig.name,
    },
    genre: ["Electronic", "Techno", "Electro", "Ambient"],
    url: `${siteConfig.url}/productions`,
  },

  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },

  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: `Electronic music producer and DJ based in ${siteConfig.location}`,
    url: siteConfig.url,
    location: {
      "@type": "Place",
      name: siteConfig.location,
    },
  },
} as const;
