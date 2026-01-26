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
          "text-shadow-md text-shadow-black text-4xl font-bold tracking-widest text-white sm:text-5xl md:text-6xl",
          className
        )}
      >
        {children}
      </h1>
      <div className="my-16 h-1 w-48 bg-white" />
    </>
  );
}
