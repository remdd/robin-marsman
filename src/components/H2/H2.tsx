import classNames from "classnames";

interface H2Props {
  children: React.ReactNode;
  className?: string;
}

export function H2({ children, className = "" }: H2Props) {
  return (
    <h2
      className={classNames(
        "text-shadow-md text-shadow-black mb-10 text-2xl font-bold tracking-widest text-white sm:mb-12 sm:text-3xl md:mb-16 md:text-4xl",
        className
      )}
    >
      {children}
    </h2>
  );
}
