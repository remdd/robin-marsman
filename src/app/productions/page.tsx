import { Metadata } from "next";
import { PageContainer } from "@/components/PageContainer";
import { H1 } from "@/components/H1";
import { createPageMetadata } from "@/lib/metadata";
import { AlbumPromoBox } from "@/components/AlbumPromoBox";
import { albumLinks } from "@/config";
import redWorldDawningImage from "@public/img/robin-marsman---red-world-dawning-optimized.webp";

export const metadata: Metadata = createPageMetadata("productions");

export default function Productions() {
  return (
    <PageContainer>
      <H1>productions</H1>
      <AlbumPromoBox
        albumTitle="red world dawning"
        albumLink={albumLinks.redWorldDawning}
        albumImage={redWorldDawningImage}
        albumImageAlt="Album cover for Red World Dawning by Robin Marsman"
      />
    </PageContainer>
  );
}
