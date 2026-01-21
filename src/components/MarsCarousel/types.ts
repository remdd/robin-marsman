export type Rotation = 0 | 90 | 180 | 270;

export type CornerPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type CarouselPhase = 'displaying' | 'fading-out' | 'fading-in';

export interface ImageState {
  src: string;
  rotation: Rotation;
  position: CornerPosition;
  opacity: number;
  scaleFactor: number;
}

export interface CarouselState {
  currentImage: ImageState | null;
  nextImage: ImageState;
  phase: CarouselPhase;
  imageIndex: number;
}

export interface CarouselConfig {
  displayDuration: number; // milliseconds
  fadeOutDuration: number; // milliseconds
  fadeInDuration: number; // milliseconds
  images: string[];
}

export interface CarouselImageProps {
  imageState: ImageState;
  alt: string;
  className?: string;
}