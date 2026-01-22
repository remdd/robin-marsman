import Link from "next/link";
import classNames from "classnames";

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export function TextLink({
  href,
  children,
  className = "",
  external = false,
}: TextLinkProps) {
  const linkClasses = classNames(
    "text-white tracking-wider inline-block transition-colors duration-200 hover:text-gray-300",
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClasses}>
      {children}
    </Link>
  );
}
