import { PageContainer } from "@/components/PageContainer";
import { MixcloudEmbed } from "@/components/MixcloudEmbed";
import { H1 } from "@/components/H1";

export default function Mixes() {
  return (
    <PageContainer>
      <H1>mixes</H1>
      <MixcloudEmbed src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Frobinmarsman%2Fcovidcore-fish-headband%2F" />
      <MixcloudEmbed src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Frobinmarsman%2Fpolycyclic-bisturbilism%2F" />
      <MixcloudEmbed src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Frobinmarsman%2Fcovidcore-fish-headband%2F" />
      <MixcloudEmbed src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Frobinmarsman%2Fpolycyclic-bisturbilism%2F" />
      <MixcloudEmbed src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Frobinmarsman%2Fcovidcore-fish-headband%2F" />
    </PageContainer>
  );
}
