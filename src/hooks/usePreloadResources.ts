import { useCallback, useRef } from "react";

type PreloadableResource = {
  href: string;
  as?: "image" | "script" | "style" | "font";
  type?: string;
  crossOrigin?: "anonymous" | "use-credentials";
};

/**
 * Hook to manage resource preloading with automatic deduplication
 */
export function usePreloadResources() {
  const preloadedResources = useRef(new Set<string>());

  const preloadResource = useCallback(
    (resource: PreloadableResource | string) => {
      const resourceConfig =
        typeof resource === "string"
          ? { href: resource, as: "image" as const }
          : resource;

      const { href, as = "image", type, crossOrigin } = resourceConfig;

      // Avoid duplicate preloads
      if (preloadedResources.current.has(href)) {
        return;
      }

      try {
        // Create prefetch link element
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = href;

        if (as) link.as = as;
        if (type) link.type = type;
        if (crossOrigin) link.crossOrigin = crossOrigin;

        document.head.appendChild(link);
        preloadedResources.current.add(href);
      } catch (error) {
        // Silently handle preload failures
        console.warn("Failed to preload resource:", href, error);
      }
    },
    []
  );

  const preloadMultipleResources = useCallback(
    (resources: (PreloadableResource | string)[]) => {
      resources.forEach((resource) => preloadResource(resource));
    },
    [preloadResource]
  );

  return {
    preloadResource,
    preloadMultipleResources,
    isPreloaded: useCallback(
      (href: string) => preloadedResources.current.has(href),
      []
    ),
  };
}
