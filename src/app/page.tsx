import { Metadata } from "next";
import { PageContainer } from "@/components/PageContainer";
import { H1 } from "@/components/H1";
import { Textbox } from "@/components/Textbox/Textbox";
import { SocialLinks } from "@/components/SocialLinks";
import { createPageMetadata, structuredData } from "@/lib/metadata";
import { TextLink } from "@/components/TextLink";
import { PhotoImage } from "@/components/PhotoImage";
import { albumLinks } from "@/config";
import redWorldDawningImage from "@public/img/robin-marsman---red-world-dawning.jpg";
import { BodyText } from "@/components/BodyText";

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
        <Textbox>
          <BodyText theme="dark" className="pt-4">
            Debut album <strong>"red world dawning"</strong> out now on{" "}
            <TextLink
              href={albumLinks.redWorldDawning}
              external
              underline
              theme="dark"
            >
              Bandcamp
            </TextLink>
            !
          </BodyText>
          <div className="flex flex-col items-center">
            <a
              href={albumLinks.redWorldDawning}
              target="_blank"
              rel="noopener noreferrer"
            >
              <PhotoImage
                src={redWorldDawningImage}
                alt="Album cover for Red World Dawning by Robin Marsman"
                className="w-160"
              />
            </a>
          </div>
        </Textbox>
        <SocialLinks />
      </PageContainer>
    </>
  );
}
