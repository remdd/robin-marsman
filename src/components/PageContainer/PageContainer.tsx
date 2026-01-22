"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";

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
      className={classNames(
        "flex flex-col items-center justify-items-start p-4 pt-16 sm:p-8 sm:pt-20 md:p-12 md:pt-24 lg:p-16 lg:pt-24 w-full md:w-10/12 lg:w-8/12 mx-auto max-w-[1024px] min-h-[60vh] transition-opacity duration-700 ease-out",
        className,
      )}
    >
      <div
        className={classNames("transition-all duration-700 ease-out w-full", {
          "opacity-100 translate-y-0": isVisible,
          "opacity-0 translate-y-8": !isVisible,
        })}
      >
        <div className="flex flex-col items-center text-center w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
