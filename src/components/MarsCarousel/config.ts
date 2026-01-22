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
export const FADE_IN_TRANSITION = `opacity ${FADE_IN_DURATION}ms ease-in-out`;

/** CSS transition timing for fade-out (opacity 1 -> 0) */
export const FADE_OUT_TRANSITION = `opacity ${FADE_OUT_DURATION}ms ease-in-out`;

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
