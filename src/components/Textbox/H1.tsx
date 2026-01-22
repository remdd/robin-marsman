import classNames from "classnames";

interface TextboxProps {
  children: React.ReactNode;
  className?: string;
}

export function Textbox({ children, className = "" }: TextboxProps) {
  return (
    <p className={classNames("py-4 px-8 bg-white text-lg", className)}>
      {children}
    </p>
  );
}
