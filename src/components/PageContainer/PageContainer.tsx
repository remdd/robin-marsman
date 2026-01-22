"use client";

import { useEffect, useState } from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50); // Small delay to ensure smooth animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-items-start ${className} p-16 pt-24`}
    >
      <div
        className={`transition-all duration-700 ease-out w-full ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex flex-col items-center text-center w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
