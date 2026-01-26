import { PageContainer } from "@/components/PageContainer";
import { H1 } from "@/components/H1";
import { BodyText } from "@/components/BodyText";
import Image from "next/image";
import { getAssetPath } from "@/utils/paths";

export default function About() {
  return (
    <PageContainer>
      <H1>about</H1>
      <BodyText>
        Robin Marsman is a DJ, electronic music producer and modular synth
        addict based in Leicester, UK. He is also a father, a software monkey
        and occasionally even more besides.
      </BodyText>
      <Image
        src={getAssetPath("/img/robin-marsman.jpg")}
        alt="Robin Marsman"
        width={800}
        height={800}
        className="rounded-lg mb-8 w-80 shadow-xl border-2 border-white"
        priority
      />
    </PageContainer>
  );
}
