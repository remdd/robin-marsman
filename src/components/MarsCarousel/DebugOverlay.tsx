"use client";

import React, { useMemo } from "react";
import type { ImageState, CornerPosition } from "./types";

interface DebugOverlayProps {
  imageState: ImageState;
  translationOffset: { x: number; y: number };
  viewportSize: { width: number; height: number };
}

/**
 * Debug overlay component to visualize animation vectors, boundaries, and scaling
 * Only renders in development mode when debug is enabled
 */
export const DebugOverlay: React.FC<DebugOverlayProps> = React.memo(({
  imageState,
  translationOffset,
  viewportSize,
}) => {
  const baseImageSize = 1920;

  // Calculate corner position in viewport coordinates
  const cornerPosition = useMemo(() => {
    switch (imageState.position) {
      case "top-left":
        return { x: 0, y: 0 };
      case "top-right":
        return { x: viewportSize.width - baseImageSize, y: 0 };
      case "bottom-left":
        return { x: 0, y: viewportSize.height - baseImageSize };
      case "bottom-right":
        return { x: viewportSize.width - baseImageSize, y: viewportSize.height - baseImageSize };
      default:
        return { x: 0, y: 0 };
    }
  }, [imageState.position, viewportSize.width, viewportSize.height, baseImageSize]);

  // Calculate current animated position
  const currentPosition = useMemo(() => ({
    x: cornerPosition.x + translationOffset.x,
    y: cornerPosition.y + translationOffset.y,
  }), [cornerPosition.x, cornerPosition.y, translationOffset.x, translationOffset.y]);

  // Calculate scaled image bounds
  const scaledSize = useMemo(() => 
    baseImageSize * imageState.scaleFactor,
    [baseImageSize, imageState.scaleFactor]
  );

  // Calculate overflow areas
  const overflow = useMemo(() => {
    const horizontalOverflow = (scaledSize - viewportSize.width) / 2;
    const verticalOverflow = (scaledSize - viewportSize.height) / 2;
    return { horizontal: horizontalOverflow, vertical: verticalOverflow };
  }, [scaledSize, viewportSize.width, viewportSize.height]);

  // Get direction info based on corner
  const directionInfo = useMemo(() => {
    const angleMap: Record<CornerPosition, string> = {
      "top-left": "Southeast (0°-90°)",
      "top-right": "Southwest (90°-180°)",
      "bottom-left": "Northeast (270°-360°)",
      "bottom-right": "Northwest (180°-270°)",
    };
    return angleMap[imageState.position] || "Unknown";
  }, [imageState.position]);

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-50">
      {/* Corner indicator */}
      <div
        className="absolute w-4 h-4 bg-red-500 rounded-full"
        style={{
          left: `${cornerPosition.x}px`,
          top: `${cornerPosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Current position indicator */}
      <div
        className="absolute w-3 h-3 bg-blue-500 rounded-full"
        style={{
          left: `${currentPosition.x}px`,
          top: `${currentPosition.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Translation vector line */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        <line
          x1={cornerPosition.x}
          y1={cornerPosition.y}
          x2={currentPosition.x}
          y2={currentPosition.y}
          stroke="rgba(34, 197, 94, 0.7)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <circle
          cx={cornerPosition.x}
          cy={cornerPosition.y}
          r="6"
          fill="rgba(239, 68, 68, 0.7)"
        />
        <circle
          cx={currentPosition.x}
          cy={currentPosition.y}
          r="4"
          fill="rgba(59, 130, 246, 0.7)"
        />
      </svg>

      {/* Scaled image bounds (when visible) */}
      {imageState.opacity > 0.1 && (
        <div
          className="absolute border-2 border-yellow-400 border-dashed"
          style={{
            left: `${currentPosition.x}px`,
            top: `${currentPosition.y}px`,
            width: `${scaledSize}px`,
            height: `${scaledSize}px`,
            transformOrigin: imageState.position === "top-left" ? "top left" :
                           imageState.position === "top-right" ? "top right" :
                           imageState.position === "bottom-left" ? "bottom left" :
                           "bottom right",
          }}
        />
      )}

      {/* Viewport overflow indicators */}
      {overflow.horizontal > 0 && (
        <div className="absolute top-0 bottom-0 bg-red-500 bg-opacity-20">
          <div
            className="absolute top-0 bottom-0 bg-red-500 bg-opacity-40"
            style={{
              left: "0",
              width: `${overflow.horizontal}px`,
            }}
          />
          <div
            className="absolute top-0 bottom-0 bg-red-500 bg-opacity-40"
            style={{
              right: "0",
              width: `${overflow.horizontal}px`,
            }}
          />
        </div>
      )}

      {overflow.vertical > 0 && (
        <div className="absolute left-0 right-0 bg-red-500 bg-opacity-20">
          <div
            className="absolute left-0 right-0 bg-red-500 bg-opacity-40"
            style={{
              top: "0",
              height: `${overflow.vertical}px`,
            }}
          />
          <div
            className="absolute left-0 right-0 bg-red-500 bg-opacity-40"
            style={{
              bottom: "0",
              height: `${overflow.vertical}px`,
            }}
          />
        </div>
      )}

      {/* Debug info panel */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white p-3 rounded text-sm font-mono">
        <div>Position: {imageState.position}</div>
        <div>Direction: {directionInfo}</div>
        <div>Scale Factor: {imageState.scaleFactor.toFixed(2)}x</div>
        <div>Rotation: {imageState.rotation}°</div>
        <div>Translation: ({translationOffset.x.toFixed(1)}, {translationOffset.y.toFixed(1)})</div>
        <div>Vector: ({imageState.translationVector?.x.toFixed(2)}, {imageState.translationVector?.y.toFixed(2)})</div>
        <div>Scaled Size: {scaledSize.toFixed(0)}px</div>
        <div>Overflow: H:{overflow.horizontal.toFixed(0)}px V:{overflow.vertical.toFixed(0)}px</div>
        <div>Opacity: {(imageState.opacity * 100).toFixed(0)}%</div>
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white p-3 rounded text-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Corner Origin</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Current Position</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-0.5 bg-green-500"></div>
          <span>Translation Vector</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-6 h-0.5 border border-yellow-400 border-dashed"></div>
          <span>Scaled Bounds</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 bg-opacity-40"></div>
          <span>Overflow Area</span>
        </div>
      </div>
    </div>
  );
});

DebugOverlay.displayName = "DebugOverlay";