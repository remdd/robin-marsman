import { StaticImageData } from "next/image";
import { Textbox } from "@/components/Textbox/Textbox";
import { TextLink } from "@/components/TextLink";
import { PhotoImage } from "@/components/PhotoImage";
import { BodyText } from "@/components/BodyText";

interface AlbumPromoBoxProps {
  albumTitle: string;
  albumLink: string;
  albumImage: StaticImageData;
  albumImageAlt: string;
}

export function AlbumPromoBox({
  albumTitle,
  albumLink,
  albumImage,
  albumImageAlt,
}: AlbumPromoBoxProps) {
  return (
    <Textbox className="w-[640px] max-w-full">
      <BodyText theme="dark" className="pt-4">
        Debut album <strong>"{albumTitle}"</strong> out now on{" "}
        <TextLink href={albumLink} external underline theme="dark">
          Bandcamp
        </TextLink>
        !
      </BodyText>
      <div className="flex w-full flex-col items-center">
        <a
          href={albumLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <PhotoImage
            src={albumImage}
            alt={albumImageAlt}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 640px, 640px"
          />
        </a>
      </div>
    </Textbox>
  );
}
