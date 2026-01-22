import { PageContainer } from "@/components/PageContainer";
import { MixcloudEmbed } from "@/components/MixcloudEmbed";

export default function Mixes() {
  return (
    <PageContainer>
      <h1 className="text-6xl font-bold text-white tracking-widest">mixes</h1>
      <MixcloudEmbed src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Frobinmarsman%2Fcovidcore-fish-headband%2F" />
      <MixcloudEmbed src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Frobinmarsman%2Fpolycyclic-bisturbilism%2F" />
      <MixcloudEmbed src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Frobinmarsman%2Fcovidcore-fish-headband%2F" />
      <MixcloudEmbed src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Frobinmarsman%2Fpolycyclic-bisturbilism%2F" />
      <MixcloudEmbed src="https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2Frobinmarsman%2Fcovidcore-fish-headband%2F" />
    </PageContainer>
  );
}
