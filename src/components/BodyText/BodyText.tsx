import classNames from "classnames";

interface BodyTextProps {
  children: React.ReactNode;
  className?: string;
}

export function BodyText({ children, className = "" }: BodyTextProps) {
  return (
    <p
      className={classNames(
        "text-shadow-xs text-shadow-black mb-8 text-base text-lg font-bold leading-relaxed text-white sm:text-xl",
        className
      )}
    >
      {children}
    </p>
  );
}
