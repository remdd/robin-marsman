import { Metadata } from "next";
import { PageContainer } from "@/components/PageContainer";
import { H1 } from "@/components/H1";
import { SocialLinks } from "@/components/SocialLinks";
import { createPageMetadata, structuredData } from "@/lib/metadata";
import { AlbumPromoBox } from "@/components/AlbumPromoBox";
import { albumLinks } from "@/config";
import redWorldDawningImage from "@public/img/robin-marsman---red-world-dawning-optimized.webp";

export const metadata: Metadata = createPageMetadata("home");

export default function Home() {
  return (
    <>
      {/* Homepage-specific structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.musicAlbum),
        }}
      />

      <PageContainer>
        <H1>robin marsman</H1>
        <AlbumPromoBox
          albumTitle="red world dawning"
          albumLink={albumLinks.redWorldDawning}
          albumImage={redWorldDawningImage}
          albumImageAlt="Album cover for Red World Dawning by Robin Marsman"
        />
        <SocialLinks />
      </PageContainer>
    </>
  );
}
