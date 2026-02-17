import classNames from "classnames";

interface BodyTextProps {
  children: React.ReactNode;
  className?: string;
  theme?: "dark" | "light";
}

export function BodyText({
  children,
  className = "",
  theme = "dark",
}: BodyTextProps) {
  return (
    <p
      className={classNames(
        "mb-8 text-base text-lg font-bold leading-relaxed sm:text-xl",
        theme === "light"
          ? "text-shadow-xs text-shadow-black text-white"
          : "text-gray-900",
        className
      )}
    >
      {children}
    </p>
  );
}
