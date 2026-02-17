import { Metadata } from "next";
import { PageContainer } from "@/components/PageContainer";
import { H1 } from "@/components/H1";
import { Textbox } from "@/components/Textbox/Textbox";
import { createPageMetadata } from "@/lib/metadata";
import { TextLink } from "@/components/TextLink/TextLink";
import { PhotoImage } from "@/components/PhotoImage/PhotoImage";
import { albumLinks } from "@/config";
import redWorldDawningImage from "@public/img/robin-marsman---red-world-dawning.jpg";

export const metadata: Metadata = createPageMetadata("productions");

export default function Productions() {
  return (
    <PageContainer>
      <H1>productions</H1>
      <Textbox>
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
        <br />
        <br />
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
    </PageContainer>
  );
}
