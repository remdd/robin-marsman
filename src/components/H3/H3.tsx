import classNames from "classnames";

interface H3Props {
  children: React.ReactNode;
  className?: string;
}

export function H3({ children, className = "" }: H3Props) {
  return (
    <div className="mb-8 flex items-center gap-4 sm:mb-10 md:mb-12">
      <div className="hidden h-px w-8 flex-shrink-0 bg-white md:block" />
      <h3
        className={classNames(
          "text-shadow-md text-shadow-black text-xl font-bold tracking-widest text-white sm:text-2xl md:text-3xl",
          className
        )}
      >
        {children}
      </h3>
      <div className="hidden h-px w-8 flex-shrink-0 bg-white md:block" />
    </div>
  );
}
