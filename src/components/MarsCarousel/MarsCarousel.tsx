'use client';

import React, { useState, useEffect } from 'react';
import type { CarouselConfig } from './types';
import { CarouselImage } from './CarouselImage';
import { useCarouselCycle } from './useCarouselCycle';

interface MarsCarouselProps {
  className?: string;
}

const DEFAULT_CONFIG: CarouselConfig = {
  displayDuration: 4000,  // 4 seconds for development
  fadeOutDuration: 2000,  // 2 seconds
  fadeInDuration: 2000,   // 2 seconds
  images: [
    '/img/mars/1.jpg',
    '/img/mars/2.jpg',
    '/img/mars/3.jpg',
  ],
};

/**
 * Dynamic Mars background carousel component
 * Cycles through Mars images with random rotation and positioning
 */
export const MarsCarousel: React.FC<MarsCarouselProps> = ({ className = '' }) => {
  const [isClient, setIsClient] = useState(false);
  const { currentImage, nextImage, phase } = useCarouselCycle(DEFAULT_CONFIG);

  // Ensure component only renders after client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show static fallback during SSR to prevent hydration mismatch
  if (!isClient) {
    return (
      <div 
        className={`absolute inset-0 overflow-hidden ${className}`}
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute"
          style={{
            opacity: 1,
            transform: 'rotate(0deg) translate(0px, 0px)',
            transformOrigin: 'center',
            zIndex: 0,
            width: '1920px',
            height: '1920px',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url('/img/mars/1.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'contrast(1.25) saturate(1) hue-rotate(350deg)',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Current image during display and fade-out phases */}
      {currentImage && phase !== 'fading-in' && (
        <CarouselImage
          imageState={currentImage}
          alt="Mars background"
        />
      )}
      
      {/* Next image during fade-in phase */}
      {phase === 'fading-in' && (
        <CarouselImage
          imageState={nextImage}
          alt="Mars background"
        />
      )}
    </div>
  );
};