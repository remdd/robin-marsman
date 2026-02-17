/**
 * Internal navigation routes
 * Single source of truth for app routing
 */
export const routes = {
  home: { href: "/", label: "Home" },
  mixes: { href: "/mixes", label: "Mixes" },
  productions: { href: "/productions", label: "Productions" },
  about: { href: "/about", label: "About" },
} as const;

/** Navigation items in display order */
export const navItems = [
  routes.home,
  routes.mixes,
  routes.productions,
  routes.about,
] as const;

export type Route = (typeof routes)[keyof typeof routes];
export type RouteKey = keyof typeof routes;
