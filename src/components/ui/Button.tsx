import type { ButtonHTMLAttributes } from "react";

type Variant = "solid" | "outline";

const VARIANTS: Record<Variant, string> = {
  solid: "bg-accent text-canvas hover:bg-body",
  outline: "border border-line text-body hover:border-accent hover:text-accent",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

/** The single button treatment used across the page: Anton, zero radius. */
const Button = ({ variant = "solid", className = "", ...props }: ButtonProps) => (
  <button
    {...props}
    className={`display inline-flex items-center gap-3 px-8 py-4 text-lg tracking-[0.1em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
  />
);

export default Button;
