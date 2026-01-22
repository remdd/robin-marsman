import Link from "next/link";

export function Navigation() {
  return (
    <nav className="mt-16">
      <ul className="flex justify-center space-x-8 flex-wrap gap-y-4">
        <li>
          <Link 
            href="/" 
            className="text-white hover:text-gray-300 transition-colors duration-200 text-lg tracking-wider"
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            href="/mixes" 
            className="text-white hover:text-gray-300 transition-colors duration-200 text-lg tracking-wider"
          >
            Mixes
          </Link>
        </li>
        <li>
          <Link 
            href="/productions" 
            className="text-white hover:text-gray-300 transition-colors duration-200 text-lg tracking-wider"
          >
            Productions
          </Link>
        </li>
        <li>
          <Link 
            href="/about" 
            className="text-white hover:text-gray-300 transition-colors duration-200 text-lg tracking-wider"
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}