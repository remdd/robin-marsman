import { Metadata } from "next";
import { PageContainer } from "@/components/PageContainer";
import { H1 } from "@/components/H1";
import { Textbox } from "@/components/Textbox/Textbox";
import { SocialLinks } from "@/components/SocialLinks";
import { createPageMetadata, structuredData } from "@/lib/metadata";

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
          Debut album <strong>"red world dawning"</strong> coming soon
        </Textbox>
        <SocialLinks />
      </PageContainer>
    </>
  );
}
