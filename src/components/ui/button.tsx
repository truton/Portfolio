import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Variant & Size Types                                              */
/* ------------------------------------------------------------------ */

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render as a full-width block element. */
  fullWidth?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Variant Styles                                                    */
/* ------------------------------------------------------------------ */

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:opacity-90 active:opacity-80",
  secondary:
    "bg-muted text-foreground border border-border hover:bg-border active:opacity-80",
  outline:
    "bg-transparent text-foreground border border-border hover:bg-muted active:opacity-80",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-base gap-2.5",
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

/**
 * Reusable button with primary / secondary / outline variants.
 * Designed for the Varko-inspired minimal aesthetic: subtle borders,
 * tight padding, smooth transitions.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center rounded-lg font-medium",
          "transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          "cursor-pointer select-none",
          // Variant + Size
          variantStyles[variant],
          sizeStyles[size],
          // Full width
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
