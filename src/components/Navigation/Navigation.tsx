"use client";

import { usePathname } from "next/navigation";
import classNames from "classnames";
import { TextLink } from "@/components/TextLink";
import { useAnimationPreferences } from "@/hooks";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  prefersReducedMotion: boolean;
}

function NavLink({ href, children, isActive, prefersReducedMotion }: NavLinkProps) {
  return (
    <li className="relative">
      <TextLink
        href={href}
        className={classNames(
          "group relative text-sm sm:text-base md:text-lg py-2 px-2 sm:px-3 md:px-4",
          {
            "text-white hover:text-white": isActive,
          },
        )}
      >
        {children}

        {/* Current page underline (always visible with 1px height) */}
        {isActive && (
          <div className="absolute bottom-0 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4 h-px bg-white" />
        )}

        {/* Hover underline (only for non-active links, 1px height) */}
        {!isActive && (
          <div 
            className={classNames(
              "absolute bottom-0 left-2 sm:left-3 md:left-4 h-px bg-white navigation-underline",
              prefersReducedMotion 
                ? "w-0 group-hover:w-[calc(100%-1rem)] sm:group-hover:w-[calc(100%-1.5rem)] md:group-hover:w-[calc(100%-2rem)]" // Instant appearance for reduced motion
                : "w-0 group-hover:w-[calc(100%-1rem)] sm:group-hover:w-[calc(100%-1.5rem)] md:group-hover:w-[calc(100%-2rem)] transition-all duration-300 ease-out" // Smooth animation for regular users
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
    <nav className="fixed top-0 left-0 right-0 z-20 py-4 sm:py-6 md:py-8 px-4">
      <ul className="flex flex-wrap justify-center gap-x-2 gap-y-2 sm:gap-x-4 md:gap-x-8">
        {navItems.map(({ href, label }) => {
          const isActive = normalizedPathname === href;

          return (
            <NavLink 
              key={href} 
              href={href} 
              isActive={isActive}
              prefersReducedMotion={animationPrefs.prefersReducedMotion}
            >
              {label}
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
}
