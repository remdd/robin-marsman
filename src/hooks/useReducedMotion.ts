"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the user prefers reduced motion
 * Respects the prefers-reduced-motion media query and handles SSR safely
 *
 * @returns {boolean} True if the user prefers reduced motion, false otherwise
 */
export const useReducedMotion = (): boolean => {
  // Default to false for SSR - animations will work initially and then be disabled if needed
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState<boolean>(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return;
    }

    // Check if matchMedia is supported
    if (!window.matchMedia) {
      return;
    }

    // Create media query matcher
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial state
    setPrefersReducedMotion(mediaQuery.matches);

    // Define change handler
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add event listener for changes
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup function
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

/**
 * Hook variant that provides more granular animation preferences
 * Returns an object with different types of motion preferences
 */
export const useAnimationPreferences = () => {
  const prefersReducedMotion = useReducedMotion();

  return {
    prefersReducedMotion,
    // Disable all motion-based animations (translation, rotation, scale)
    disableMotion: prefersReducedMotion,
    // Allow gentle opacity/color transitions but make them slower
    allowGentleTransitions: true,
    // Animation duration multipliers based on preference
    durationMultiplier: prefersReducedMotion ? 3 : 1,
    // Maximum safe animation duration for reduced motion users (200ms)
    maxSafeDuration: prefersReducedMotion ? 200 : 1000,
  };
};
