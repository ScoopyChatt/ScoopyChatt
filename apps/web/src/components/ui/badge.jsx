import * as React from &rdquo;react&rdquo;
import { cva } from &rdquo;class-variance-authority&rdquo;;

import { cn } from &rdquo;@/lib/utils&rdquo;

const badgeVariants = cva(
  &rdquo;inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2&rdquo;,
  {
    variants: {
      variant: {
        default:
          &rdquo;border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80&rdquo;,
        secondary:
          &rdquo;border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80&rdquo;,
        destructive:
          &rdquo;border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80&rdquo;,
        outline: &rdquo;text-foreground&rdquo;,
      },
    },
    defaultVariants: {
      variant: &rdquo;default&rdquo;,
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}) {
  return (<div className={cn(badgeVariants({ variant }), className)} {...props} />);
}

export { Badge, badgeVariants }