import * as React from &rdquo;react&rdquo;
import * as TogglePrimitive from &rdquo;@radix-ui/react-toggle&rdquo;
import { cva } from &rdquo;class-variance-authority&rdquo;;

import { cn } from &rdquo;@/lib/utils&rdquo;

const toggleVariants = cva(
  &rdquo;inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0&rdquo;,
  {
    variants: {
      variant: {
        default: &rdquo;bg-transparent&rdquo;,
        outline:
          &rdquo;border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground&rdquo;,
      },
      size: {
        default: &rdquo;h-9 px-2 min-w-9&rdquo;,
        sm: &rdquo;h-8 px-1.5 min-w-8&rdquo;,
        lg: &rdquo;h-10 px-2.5 min-w-10&rdquo;,
      },
    },
    defaultVariants: {
      variant: &rdquo;default&rdquo;,
      size: &rdquo;default&rdquo;,
    },
  }
)

const Toggle = React.forwardRef(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props} />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }