import * as React from &rdquo;react&rdquo;
import { Slot } from &rdquo;@radix-ui/react-slot&rdquo;
import { cva } from &rdquo;class-variance-authority&rdquo;;

import { cn } from &rdquo;@/lib/utils&rdquo;

const buttonVariants = cva(
  &rdquo;inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0&rdquo;,
  {
    variants: {
      variant: {
        default:
          &rdquo;bg-primary text-primary-foreground shadow hover:bg-primary/90&rdquo;,
        destructive:
          &rdquo;bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90&rdquo;,
        outline:
          &rdquo;border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground&rdquo;,
        secondary:
          &rdquo;bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80&rdquo;,
        ghost: &rdquo;hover:bg-accent hover:text-accent-foreground&rdquo;,
        link: &rdquo;text-primary underline-offset-4 hover:underline&rdquo;,
      },
      size: {
        default: &rdquo;h-9 px-4 py-2&rdquo;,
        sm: &rdquo;h-8 rounded-md px-3 text-xs&rdquo;,
        lg: &rdquo;h-10 rounded-md px-8&rdquo;,
        icon: &rdquo;h-9 w-9&rdquo;,
      },
    },
    defaultVariants: {
      variant: &rdquo;default&rdquo;,
      size: &rdquo;default&rdquo;,
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : &rdquo;button&rdquo;
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = &rdquo;Button&rdquo;

export { Button, buttonVariants }