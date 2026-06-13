import * as React from &rdquo;react&rdquo;
import { cva } from &rdquo;class-variance-authority&rdquo;;

import { cn } from &rdquo;@/lib/utils&rdquo;

const alertVariants = cva(
  &rdquo;relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7&rdquo;,
  {
    variants: {
      variant: {
        default: &rdquo;bg-background text-foreground&rdquo;,
        destructive:
          &rdquo;border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive&rdquo;,
      },
    },
    defaultVariants: {
      variant: &rdquo;default&rdquo;,
    },
  }
)

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role=&rdquo;alert&rdquo;
    className={cn(alertVariants({ variant }), className)}
    {...props} />
))
Alert.displayName = &rdquo;Alert&rdquo;

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(&rdquo;mb-1 font-medium leading-none tracking-tight&rdquo;, className)}
    {...props} />
))
AlertTitle.displayName = &rdquo;AlertTitle&rdquo;

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(&rdquo;text-sm [&_p]:leading-relaxed&rdquo;, className)}
    {...props} />
))
AlertDescription.displayName = &rdquo;AlertDescription&rdquo;

export { Alert, AlertTitle, AlertDescription }