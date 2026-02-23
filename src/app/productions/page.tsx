import { Metadata } from "next";
import { PageContainer } from "@/components/PageContainer";
import { H1 } from "@/components/H1";
import { createPageMetadata } from "@/lib/metadata";
import { BandcampEmbed } from "@/components/BandcampEmbed";
import { bandcampEmbeds } from "@/config";

export const metadata: Metadata = createPageMetadata("productions");

export default function Productions() {
  return (
    <PageContainer>
      <H1>productions</H1>

      <div className="flex w-full flex-col items-center">
        <BandcampEmbed
          src={bandcampEmbeds.redWorldDawning}
          albumTitle="Red World Dawning by Robin Marsman"
        />
      </div>
    </PageContainer>
  );
}
