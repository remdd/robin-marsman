import { usePreloadResources } from './usePreloadResources';
import { getPreloadResourcesForRoute } from '@/utils/preloadConfig';

/**
 * Hook to handle navigation-based preloading
 */
export function useNavigationPreloading() {
  const { preloadMultipleResources } = usePreloadResources();

  const preloadRoute = (route: string) => {
    const resources = getPreloadResourcesForRoute(route);
    if (resources.length > 0) {
      preloadMultipleResources([...resources]); // Spread to remove readonly
    }
  };

  return { preloadRoute };
}