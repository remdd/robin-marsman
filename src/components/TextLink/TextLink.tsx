"use client";

import Link from "next/link";
import classNames from "classnames";
import { useAnimationPreferences } from "@/hooks";

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function TextLink({
  href,
  children,
  className = "",
  external = false,
}: TextLinkProps) {
  const animationPrefs = useAnimationPreferences();
  
  const linkClasses = classNames(
    "text-white tracking-wider inline-block hover:text-gray-300",
    animationPrefs.prefersReducedMotion 
      ? "transition-colors duration-75" // Quick, gentle transition for reduced motion
      : "transition-colors duration-200", // Original transition
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClasses}>
      {children}
    </Link>
  );
}
