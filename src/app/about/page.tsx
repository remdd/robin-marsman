import { Metadata } from "next";
import { PageContainer } from "@/components/PageContainer";
import { H1 } from "@/components/H1";
import { BodyText } from "@/components/BodyText";
import { PhotoImage } from "@/components/PhotoImage";
import { createPageMetadata } from "@/lib/metadata";
import robinMarsmanImage from "@public/img/robin-marsman.jpg";

export const metadata: Metadata = createPageMetadata("about");

export default function About() {
  return (
    <PageContainer>
      <H1>about</H1>
      <BodyText>
        Robin Marsman is a DJ, electronic music producer and modular synth
        addict based in Leicester, UK. He is also a father, a software monkey
        and occasionally even more besides.
      </BodyText>
      <PhotoImage
        src={robinMarsmanImage}
        alt="Robin Marsman"
        className="w-80"
      />
    </PageContainer>
  );
}
