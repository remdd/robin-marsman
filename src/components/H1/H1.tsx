import classNames from "classnames";

interface H1Props {
  children: React.ReactNode;
  className?: string;
}

export function H1({ children, className = "" }: H1Props) {
  return (
    <>
      <h1
        className={classNames(
          "text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-widest text-shadow-md text-shadow-black",
          className,
        )}
      >
        {children}
      </h1>
      <div className="h-1 w-48 bg-white my-16" />
    </>
  );
}
