"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";
import { useAnimationPreferences } from "@/hooks";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const animationPrefs = useAnimationPreferences();

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, animationPrefs.prefersReducedMotion ? 10 : 50); // Faster for reduced motion

    return () => clearTimeout(timer);
  }, [animationPrefs.prefersReducedMotion]);

  return (
    <div
      className={classNames(
        "flex flex-col items-center justify-items-start p-4 pt-16 sm:p-8 sm:pt-20 md:p-12 md:pt-24 lg:p-16 lg:pt-24 w-full md:w-10/12 lg:w-8/12 mx-auto max-w-[1024px] min-h-[60vh]",
        animationPrefs.prefersReducedMotion 
          ? "transition-opacity duration-100 ease" // Gentle, quick fade for reduced motion
          : "transition-opacity duration-700 ease-out", // Original smooth transition
        className,
      )}
    >
      <div
        className={classNames(
          "w-full",
          animationPrefs.prefersReducedMotion 
            ? "transition-opacity duration-100 ease" // Only opacity transition for reduced motion
            : "transition-all duration-700 ease-out", // Full transition for regular motion
          {
            "opacity-100": isVisible,
            "opacity-0": !isVisible,
            // Only apply translation for non-reduced motion users
            "translate-y-0": isVisible && !animationPrefs.prefersReducedMotion,
            "translate-y-8": !isVisible && !animationPrefs.prefersReducedMotion,
          }
        )}
      >
        <div className="flex flex-col items-center text-center w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
