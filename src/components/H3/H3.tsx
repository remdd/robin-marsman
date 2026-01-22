import classNames from "classnames";

interface H3Props {
  children: React.ReactNode;
  className?: string;
}

export function H3({ children, className = "" }: H3Props) {
  return (
    <div className="flex items-center gap-4 mb-8 sm:mb-10 md:mb-12">
      <div className="hidden md:block h-px w-8 bg-white flex-shrink-0" />
      <h3
        className={classNames(
          "text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-widest text-shadow-md text-shadow-black",
          className,
        )}
      >
        {children}
      </h3>
      <div className="hidden md:block h-px w-8 bg-white flex-shrink-0" />
    </div>
  );
}
