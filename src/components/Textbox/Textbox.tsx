import classNames from "classnames";

interface TextboxProps {
  children: React.ReactNode;
  className?: string;
}

export function Textbox({ children, className = "" }: TextboxProps) {
  return (
    <p
      className={classNames("bg-white px-8 py-4 text-lg text-black", className)}
    >
      {children}
    </p>
  );
}
