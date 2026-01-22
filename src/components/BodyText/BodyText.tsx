import classNames from "classnames";

interface BodyTextProps {
  children: React.ReactNode;
  className?: string;
}

export function BodyText({ children, className = "" }: BodyTextProps) {
  return (
    <p
      className={classNames(
        "font-bold text-base text-lg sm:text-xl text-white leading-relaxed text-shadow-xs text-shadow-black mb-8",
        className,
      )}
    >
      {children}
    </p>
  );
}
