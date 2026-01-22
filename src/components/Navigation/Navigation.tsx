"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}

function NavLink({ href, children, isActive }: NavLinkProps) {
  return (
    <li className="relative">
      <Link
        href={href}
        className={`group relative text-white text-lg tracking-wider py-2 px-4 inline-block transition-colors duration-200 hover:text-gray-200 ${
          isActive ? "text-white" : ""
        }`}
      >
        {children}

        {/* Current page underline (always visible with 4px height) */}
        {isActive && (
          <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-white" />
        )}

        {/* Hover animation underline (only for non-active links, 4px height) */}
        {!isActive && (
          <div className="absolute bottom-0 left-4 h-[2px] bg-white w-0 group-hover:w-[calc(100%-2rem)] transition-all duration-300 ease-out" />
        )}
      </Link>
    </li>
  );
}

export function Navigation() {
  const pathname = usePathname();

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
    <nav className="fixed top-0 left-0 right-0 z-20 py-8">
      <ul className="flex justify-center space-x-8">
        {navItems.map(({ href, label }) => {
          const isActive = normalizedPathname === href;

          return (
            <NavLink key={href} href={href} isActive={isActive}>
              {label}
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
}
