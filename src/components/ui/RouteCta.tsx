import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RouteCtaProps {
  href: string;
  children: React.ReactNode;
}

/**
 * Inline link out to a route. Sections that continue on their own page end
 * with one of these, so the routes are reachable by reading the page rather
 * than only by opening the menu.
 */
const RouteCta = ({ href, children }: RouteCtaProps) => (
  <Link
    href={href}
    className="group display inline-flex items-center gap-4 border-b border-line pb-3 text-2xl tracking-[0.05em] text-accent transition-colors duration-300 hover:border-signal hover:text-signal md:text-3xl"
  >
    {children}
    <ArrowRight
      className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden="true"
    />
  </Link>
);

export default RouteCta;
