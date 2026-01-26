import { PageContainer } from "@/components/PageContainer";
import { H1 } from "@/components/H1";
import { BodyText } from "@/components/BodyText";
import { ProfileImage } from "@/components/ProfileImage";

export default function About() {
  return (
    <PageContainer>
      <H1>about</H1>
      <BodyText>
        Robin Marsman is a DJ, electronic music producer and modular synth
        addict based in Leicester, UK. He is also a father, a software monkey
        and occasionally even more besides.
      </BodyText>
      <ProfileImage />
    </PageContainer>
  );
}
