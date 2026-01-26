"use client";

import { usePathname } from "next/navigation";
import classNames from "classnames";
import { TextLink } from "@/components/TextLink";
import { useAnimationPreferences, useNavigationPreloading } from "@/hooks";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  prefersReducedMotion: boolean;
  onMouseEnter?: () => void;
  onFocus?: () => void;
}

function NavLink({
  href,
  children,
  isActive,
  prefersReducedMotion,
  onMouseEnter,
  onFocus,
}: NavLinkProps) {
  return (
    <li className="relative">
      <TextLink
        href={href}
        className={classNames(
          "group relative px-2 py-2 text-sm sm:px-3 sm:text-base md:px-4 md:text-lg",
          {
            "text-white hover:text-white": isActive,
          }
        )}
        onMouseEnter={onMouseEnter}
        onFocus={onFocus}
      >
        {children}

        {/* Current page underline (always visible with 1px height) */}
        {isActive && (
          <div className="absolute bottom-0 left-2 right-2 h-px bg-white sm:left-3 sm:right-3 md:left-4 md:right-4" />
        )}

        {/* Hover underline (only for non-active links, 1px height) */}
        {!isActive && (
          <div
            className={classNames(
              "navigation-underline absolute bottom-0 left-2 h-px bg-white sm:left-3 md:left-4",
              prefersReducedMotion
                ? "w-0 group-hover:w-[calc(100%-1rem)] sm:group-hover:w-[calc(100%-1.5rem)] md:group-hover:w-[calc(100%-2rem)]" // Instant appearance for reduced motion
                : "w-0 transition-all duration-300 ease-out group-hover:w-[calc(100%-1rem)] sm:group-hover:w-[calc(100%-1.5rem)] md:group-hover:w-[calc(100%-2rem)]" // Smooth animation for regular users
            )}
          />
        )}
      </TextLink>
    </li>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const animationPrefs = useAnimationPreferences();
  const { preloadRoute } = useNavigationPreloading();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/mixes", label: "Mixes" },
    { href: "/productions", label: "Productions" },
    { href: "/about", label: "About" },
  ];

  // Normalize pathname by removing trailing slash (except for root)
  const normalizedPathname =
    pathname === "/" ? "/" : pathname.replace(/\/$/, "");

  return (
    <nav className="fixed left-0 right-0 top-0 z-20 px-4 py-4 sm:py-6 md:py-8">
      <ul className="flex flex-wrap justify-center gap-x-2 gap-y-2 sm:gap-x-4 md:gap-x-8">
        {navItems.map(({ href, label }) => {
          const isActive = normalizedPathname === href;

          return (
            <NavLink
              key={href}
              href={href}
              isActive={isActive}
              prefersReducedMotion={animationPrefs.prefersReducedMotion}
              onMouseEnter={() => preloadRoute(href)}
              onFocus={() => preloadRoute(href)}
            >
              {label}
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
}
