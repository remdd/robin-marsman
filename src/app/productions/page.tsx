import { Metadata } from "next";
import { PageContainer } from "@/components/PageContainer";
import { H1 } from "@/components/H1";
import { Textbox } from "@/components/Textbox/Textbox";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata("productions");

export default function Productions() {
  return (
    <PageContainer>
      <H1>productions</H1>
      <Textbox>
        Debut album <strong>"red world dawning"</strong> coming soon
      </Textbox>
    </PageContainer>
  );
}
