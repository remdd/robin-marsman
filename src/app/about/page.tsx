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
        Robin Marsman is a DJ and electronic music producer based in Leicester,
        UK.
      </BodyText>
      <Image
        src={getAssetPath("/img/robin-marsman.jpg")}
        alt="Robin Marsman"
        width={800}
        height={800}
        className="rounded-lg mb-8 w-80"
        priority
      />
    </PageContainer>
  );
}
