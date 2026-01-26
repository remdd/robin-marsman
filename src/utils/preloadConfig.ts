import { getAssetPath } from "@/utils/paths";

/**
 * Configuration for resources to preload when hovering over navigation links
 *
 * Examples of what could be preloaded:
 * - Images for the target page
 * - Critical CSS or JS chunks
 * - API data
 * - Font files
 * - Third-party embed scripts
 */
export const ROUTE_PRELOAD_CONFIG = {
  "/about": [
    {
      href: getAssetPath("/img/robin-marsman.jpg"),
      as: "image" as const,
    },
  ],
  "/mixes": [
    // Example: Preload Mixcloud embed resources
    // {
    //   href: 'https://widget.mixcloud.com/media/js/widgetApi.js',
    //   as: 'script' as const,
    // },
  ],
  "/productions": [
    // Example: Preload production images or audio files
    // {
    //   href: getAssetPath('/img/album-cover.webp'),
    //   as: 'image' as const,
    // },
  ],
  "/": [
    // Example: Preload next Mars carousel images
    // {
    //   href: getAssetPath('/img/mars/optimized/desktop/2.webp'),
    //   as: 'image' as const,
    // },
  ],
} as const;

/**
 * Get preloadable resources for a given route
 */
export function getPreloadResourcesForRoute(route: string) {
  return ROUTE_PRELOAD_CONFIG[route as keyof typeof ROUTE_PRELOAD_CONFIG] || [];
}
