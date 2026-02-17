"use client";

import Link from "next/link";
import classNames from "classnames";
import { useAnimationPreferences } from "@/hooks";

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  theme?: "dark" | "light";
  underline?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function TextLink({
  href,
  children,
  className = "",
  external = false,
  theme = "dark",
  underline = false,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
}: TextLinkProps) {
  const animationPrefs = useAnimationPreferences();

  const linkClasses = classNames(
    "inline-block tracking-wider",
    theme === "light" && "text-white hover:text-gray-300",
    theme === "light" &&
      underline &&
      "decoration-white hover:decoration-gray-300",
    underline && "underline underline-offset-4",
    theme === "dark" && "text-gray-900 hover:text-gray-600",
    theme === "dark" &&
      underline &&
      "decoration-gray-900 hover:decoration-gray-600",
    animationPrefs.prefersReducedMotion
      ? "transition-colors duration-75" // Quick, gentle transition for reduced motion
      : "transition-colors duration-200", // Original transition
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={linkClasses}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
    </Link>
  );
}
