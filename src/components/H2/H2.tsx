import classNames from "classnames";

interface H2Props {
  children: React.ReactNode;
  className?: string;
}

export function H2({ children, className = "" }: H2Props) {
  return (
    <h2
      className={classNames(
        "text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-widest text-shadow-md text-shadow-black mb-10 sm:mb-12 md:mb-16",
        className,
      )}
    >
      {children}
    </h2>
  );
}
