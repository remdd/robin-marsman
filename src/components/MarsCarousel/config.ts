import type { CarouselConfig } from "./types";
import type { EasingFunction } from "./utils";

/**
 * Centralized configuration for the MarsCarousel component
 */

// =============================================================================
// Image Configuration
// =============================================================================

/** Base size for carousel images in pixels */
export const BASE_IMAGE_SIZE = 1920;

/** List of Mars background images */
export const CAROUSEL_IMAGES = [
  "/img/mars/1.jpg",
  "/img/mars/2.jpg",
  "/img/mars/3.jpg",
  "/img/mars/4.jpg",
  "/img/mars/5.jpg",
  "/img/mars/6.jpg",
  "/img/mars/7.jpg",
];

/** Optimized Mars background images by variant */
export const OPTIMIZED_CAROUSEL_IMAGES = {
  mobile: [
    "/img/mars/optimized/mobile/1.webp",
    "/img/mars/optimized/mobile/2.webp",
    "/img/mars/optimized/mobile/3.webp",
    "/img/mars/optimized/mobile/4.webp",
    "/img/mars/optimized/mobile/5.webp",
    "/img/mars/optimized/mobile/6.webp",
    "/img/mars/optimized/mobile/7.webp",
  ],
  tablet: [
    "/img/mars/optimized/tablet/1.webp",
    "/img/mars/optimized/tablet/2.webp",
    "/img/mars/optimized/tablet/3.webp",
    "/img/mars/optimized/tablet/4.webp",
    "/img/mars/optimized/tablet/5.webp",
    "/img/mars/optimized/tablet/6.webp",
    "/img/mars/optimized/tablet/7.webp",
  ],
  desktop: [
    "/img/mars/optimized/desktop/1.webp",
    "/img/mars/optimized/desktop/2.webp",
    "/img/mars/optimized/desktop/3.webp",
    "/img/mars/optimized/desktop/4.webp",
    "/img/mars/optimized/desktop/5.webp",
    "/img/mars/optimized/desktop/6.webp",
    "/img/mars/optimized/desktop/7.webp",
  ],
};

// =============================================================================
// Animation Durations (in milliseconds)
// =============================================================================

/** Duration the image is displayed at full opacity before fading out */
export const DISPLAY_DURATION = 10000;

/** Duration of the fade-out transition */
export const FADE_OUT_DURATION = 6000;

/** Duration of the fade-in transition */
export const FADE_IN_DURATION = 4000;

/** Total duration of one complete carousel cycle */
export const TOTAL_CYCLE_DURATION =
  DISPLAY_DURATION + FADE_OUT_DURATION + FADE_IN_DURATION;

// =============================================================================
// Reduced Motion Animation Durations (accessibility)
// =============================================================================

/** Reduced motion: Longer display duration for comfortable viewing */
export const REDUCED_MOTION_DISPLAY_DURATION = DISPLAY_DURATION * 2; // 20s

/** Reduced motion: Gentle fade-out duration (maximum 12s) */
export const REDUCED_MOTION_FADE_OUT_DURATION = Math.min(
  FADE_OUT_DURATION * 2,
  12000
); // 12s max

/** Reduced motion: Gentle fade-in duration (maximum 12s) */
export const REDUCED_MOTION_FADE_IN_DURATION = Math.min(
  FADE_IN_DURATION * 3,
  12000
); // 12s max

// =============================================================================
// Translation Animation Configuration
// =============================================================================

/** Translation speed in pixels per second */
export const TRANSLATION_SPEED_PX_PER_SEC = 25;

/** Default easing function for translation animations */
export const DEFAULT_TRANSLATION_EASING: EasingFunction = "linear";

// =============================================================================
// Opacity Transition Configuration
// =============================================================================

/** CSS transition timing for fade-in (opacity 0 -> 1) */
export const FADE_IN_TRANSITION = `opacity ${FADE_IN_DURATION}ms cubic-bezier(0.25, 1, 0.5, 1)`;

/** CSS transition timing for fade-out (opacity 1 -> 0) */
export const FADE_OUT_TRANSITION = `opacity ${FADE_OUT_DURATION}ms cubic-bezier(0.5, 0, 0.75, 0)`;

/** Reduced motion: Gentle fade-in transition */
export const REDUCED_MOTION_FADE_IN_TRANSITION = `opacity ${REDUCED_MOTION_FADE_IN_DURATION}ms ease`;

/** Reduced motion: Gentle fade-out transition */
export const REDUCED_MOTION_FADE_OUT_TRANSITION = `opacity ${REDUCED_MOTION_FADE_OUT_DURATION}ms ease`;

// =============================================================================
// Resize Handling Configuration
// =============================================================================

/** Debounce duration for viewport resize events (in milliseconds) */
export const RESIZE_DEBOUNCE_DURATION = 500;

// =============================================================================
// Default Carousel Configuration
// =============================================================================

/** Default configuration object for the carousel */
export const DEFAULT_CONFIG: CarouselConfig = {
  displayDuration: DISPLAY_DURATION,
  fadeOutDuration: FADE_OUT_DURATION,
  fadeInDuration: FADE_IN_DURATION,
  images: CAROUSEL_IMAGES,
};

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Calculate the total animation cycle duration from a config
 */
export const getTotalCycleDuration = (config: CarouselConfig): number => {
  return (
    config.displayDuration + config.fadeOutDuration + config.fadeInDuration
  );
};

/**
 * Get animation durations based on user's motion preference
 */
export const getAnimationDurations = (prefersReducedMotion: boolean) => {
  if (prefersReducedMotion) {
    return {
      displayDuration: REDUCED_MOTION_DISPLAY_DURATION,
      fadeOutDuration: REDUCED_MOTION_FADE_OUT_DURATION,
      fadeInDuration: REDUCED_MOTION_FADE_IN_DURATION,
      fadeInTransition: REDUCED_MOTION_FADE_IN_TRANSITION,
      fadeOutTransition: REDUCED_MOTION_FADE_OUT_TRANSITION,
    };
  }

  return {
    displayDuration: DISPLAY_DURATION,
    fadeOutDuration: FADE_OUT_DURATION,
    fadeInDuration: FADE_IN_DURATION,
    fadeInTransition: FADE_IN_TRANSITION,
    fadeOutTransition: FADE_OUT_TRANSITION,
  };
};
