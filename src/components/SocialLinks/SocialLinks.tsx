"use client";

import { useState } from "react";
import Image from "next/image";
import { TextLink } from "@/components/TextLink/TextLink";
import { useAnimationPreferences } from "@/hooks";
import { getAssetPath } from "@/utils/paths";
import classNames from "classnames";

interface SocialLink {
  href: string;
  icon: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://robinmarsman.bandcamp.com/",
    icon: "/icons/bandcamp.svg",
    label: "Bandcamp",
  },
  {
    href: "https://www.mixcloud.com/robinmarsman/",
    icon: "/icons/mixcloud.svg",
    label: "Mixcloud",
  },
  {
    href: "mailto:robinmarsman@proton.me",
    icon: "/icons/email.svg",
    label: "Email",
  },
  {
    href: "https://www.facebook.com/people/Robin-Marsman/61587173637583/",
    icon: "/icons/facebook.svg",
    label: "Facebook",
  },
];

export function SocialLinks() {
  const animationPrefs = useAnimationPreferences();
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  const labelClasses = classNames(
    "mt-4 text-center text-white text-sm tracking-wider min-h-[1.25rem]",
    animationPrefs.prefersReducedMotion
      ? hoveredLabel
        ? "opacity-100"
        : "opacity-0" // Instant for reduced motion
      : "transition-opacity duration-300", // Smooth fade for normal motion
  );

  return (
    <div className="flex flex-col items-center mt-12">
      <div className="flex gap-4 sm:gap-6 justify-center items-center">
        {socialLinks.map((link) => {
          const transformClasses = classNames(
            "flex items-center justify-center",
            animationPrefs.prefersReducedMotion
              ? "" // No scale animation for reduced motion
              : "hover:scale-90 transition-transform duration-200",
          );

          return (
            <TextLink
              key={link.label}
              href={link.href}
              external={!link.href.startsWith("mailto:")}
              className={transformClasses}
              onMouseEnter={() => setHoveredLabel(link.label)}
              onMouseLeave={() => setHoveredLabel(null)}
              onFocus={() => setHoveredLabel(link.label)}
              onBlur={() => setHoveredLabel(null)}
            >
              <Image
                src={getAssetPath(link.icon)}
                alt={link.label}
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12 text-white"
                style={{
                  filter: "invert(1) brightness(1)",
                }}
              />
              <span className="sr-only">{link.label}</span>
            </TextLink>
          );
        })}
      </div>

      <div className={labelClasses}>
        {hoveredLabel && <span>{hoveredLabel}</span>}
      </div>
    </div>
  );
}
