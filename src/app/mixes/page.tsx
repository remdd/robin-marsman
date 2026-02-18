import { Metadata } from "next";
import { PageContainer } from "@/components/PageContainer";
import { MixcloudEmbed } from "@/components/MixcloudEmbed";
import { H1 } from "@/components/H1";
import { BodyText } from "@/components/BodyText";
import { H2 } from "@/components/H2";
import { H3 } from "@/components/H3";
import { TextLink } from "@/components/TextLink";
import { createPageMetadata } from "@/lib/metadata";
import { socialLinks, mixcloudEmbeds } from "@/config";

export const metadata: Metadata = createPageMetadata("mixes");

export default function Mixes() {
  return (
    <PageContainer>
      <H1>mixes</H1>
      <H2>Selected DJ sets</H2>
      <BodyText theme="light">
        Follow on{" "}
        <TextLink
          href={socialLinks.mixcloud}
          external
          theme="light"
          className="underline underline-offset-4"
        >
          Mixcloud
        </TextLink>{" "}
        for more.
      </BodyText>

      <H3>Blobby's Creamy Plague Weekender</H3>
      <BodyText theme="light">
        Live recording of a techno DJ set performed for a late night silent
        disco tent in a field somewhere in England, in the summer of 2021.
      </BodyText>
      <MixcloudEmbed src={mixcloudEmbeds.blobbysPlagueWeekender} />

      <H3>Red Mars Radio [0]</H3>
      <BodyText theme="light">
        The first half of a two-part platter of relaxed, ambient music to code
        or otherwise concentrate to.
      </BodyText>
      <MixcloudEmbed src={mixcloudEmbeds.redMarsRadio0} />

      <H3>Polycyclic Bisturbilism</H3>
      <BodyText theme="light">
        A tuff techno session, occasionally veering off on a Detroit or
        tech-housey tangent. Recorded in the studio, shortly after the turn of
        the decade in Jan 2020.
      </BodyText>
      <MixcloudEmbed src={mixcloudEmbeds.polycyclicBisturbilism} />

      <H3>Covidcore // Fish Headband warmup</H3>
      <BodyText theme="light">
        Live recording of a 3 hour summer afternoon web stream, warming up the
        'Fish Headband' instalment of the Covidcore online rave series. Streamed
        during Covid lockdown in July 2020.
      </BodyText>
      <BodyText theme="light">
        Expect lots of ambient electronic sounds from across the years with
        dashes of experimental oddness, Krautrock, cosmic jazz, and various
        other curveballs - all interspersed with the occasional mini modular
        synth jam.
      </BodyText>
      <MixcloudEmbed src={mixcloudEmbeds.covidcoreFishHeadband} />
    </PageContainer>
  );
}
