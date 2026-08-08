"use client";

import Button from "@/components/ui/Button";
import { scrollToSection } from "@/lib/smooth-scroll";

interface ScrollToButtonProps {
  target: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
}

const ScrollToButton = ({
  target,
  children,
  variant = "solid",
}: ScrollToButtonProps) => (
  <Button variant={variant} onClick={() => scrollToSection(target)}>
    {children}
  </Button>
);

export default ScrollToButton;
