import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Variant Types                                                     */
/* ------------------------------------------------------------------ */

type BadgeVariant = "default" | "primary" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

/* ------------------------------------------------------------------ */
/*  Variant Styles                                                    */
/* ------------------------------------------------------------------ */

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-muted text-muted-foreground border-transparent",
  primary:
    "bg-primary/10 text-primary border-primary/20",
  outline:
    "bg-transparent text-foreground border-border",
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

/**
 * Small label badge for tags, status indicators, and tech labels.
 * Clean, minimal design consistent with the Varko aesthetic.
 */
function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5",
        "text-xs font-medium leading-none tracking-wide",
        "transition-colors duration-200",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge, type BadgeProps, type BadgeVariant };
