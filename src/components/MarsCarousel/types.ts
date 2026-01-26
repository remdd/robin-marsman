import type { EasingFunction } from "./utils";

export type Rotation = 0 | 90 | 180 | 270;

export type CornerPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type CarouselPhase = "displaying" | "fading-out" | "fading-in";

export interface ImageState {
  src: string;
  rotation: Rotation;
  position: CornerPosition;
  opacity: number;
  scaleFactor: number;
  // Translation animation properties
  translationVector: { x: number; y: number }; // Normalized direction vector (-1 to 1)
  animationStartTime: number; // Performance.now() timestamp when animation begins
  easing?: EasingFunction; // Optional easing function (defaults to 'subtle')
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
  enableEasing?: boolean; // Enable easing for translation animations
  defaultEasing?: EasingFunction; // Default easing function
}

export interface CarouselImageProps {
  imageState: ImageState;
  alt: string;
  className?: string;
  debug?: boolean; // Enable debug overlay
}
