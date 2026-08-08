"use client";

import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { scrollToSection } from "@/lib/smooth-scroll";

interface ScrollToButtonProps {
  target: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
}

/**
 * Scrolls to a section of the home page. From another route the section is
 * not mounted, so it navigates home with the hash and lets SmoothScroll
 * finish the scroll once the page exists.
 */
const ScrollToButton = ({
  target,
  children,
  variant = "solid",
}: ScrollToButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const go = () => {
    if (pathname === "/") scrollToSection(target);
    else router.push(`/${target}`);
  };

  return (
    <Button variant={variant} onClick={go}>
      {children}
    </Button>
  );
};

export default ScrollToButton;
