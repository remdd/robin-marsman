import { PageContainer } from "@/components/PageContainer";
import { MixcloudEmbed } from "@/components/MixcloudEmbed";
import { H1 } from "@/components/H1";
import { BodyText } from "@/components/BodyText";
import { H2 } from "@/components/H2";
import { H3 } from "@/components/H3";
import { TextLink } from "@/components/TextLink";

export default function Mixes() {
  return (
    <PageContainer>
      <H1>mixes</H1>
      <H2>Selected DJ sets</H2>
      <BodyText>
        Follow on{" "}
        <TextLink
          href="https://www.mixcloud.com/robinmarsman/"
          external
          className="underline underline-offset-4"
        >
          Mixcloud
        </TextLink>{" "}
        for more.
      </BodyText>

      <H3>Red Mars Radio [0]</H3>
      <BodyText>
        The first half of a two-part platter of ambient, relaxed music to code
        or otherwise concentrate to.
      </BodyText>
      <MixcloudEmbed src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Frobinmarsman%2Fred-mars-radio-0%2F" />

      <H3>Polycyclic Bisturbilism</H3>
      <BodyText>
        A tuff techno session, occasionally veering off on a Detroit or
        tech-housey tangent. Recorded in the studio, shortly after the turn of
        the decade in Jan 2020.
      </BodyText>
      <MixcloudEmbed src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Frobinmarsman%2Fpolycyclic-bisturbilism%2F" />

      <H3>Covidcore // Fish Headband warmup</H3>
      <BodyText>
        Live recording of a 3 hour summer afternoon web stream, warming up the
        'Fish Headband' instalment of the Covidcore online rave series. Streamed
        during Covid lockdown in July 2020.
      </BodyText>
      <BodyText>
        Expect lots of ambient electronic sounds from across the years with
        dashes of experimental oddness, Krautrock, cosmic jazz, and various
        other curveballs - all interspersed with the occasional mini modular
        synth jam.
      </BodyText>
      <MixcloudEmbed src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Frobinmarsman%2Fcovidcore-fish-headband%2F" />
    </PageContainer>
  );
}
