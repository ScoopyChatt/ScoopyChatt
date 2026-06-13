&rdquo;use client&rdquo;

import * as React from &rdquo;react&rdquo;
import * as LabelPrimitive from &rdquo;@radix-ui/react-label&rdquo;
import { cva } from &rdquo;class-variance-authority&rdquo;;

import { cn } from &rdquo;@/lib/utils&rdquo;

const labelVariants = cva(
  &rdquo;text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70&rdquo;
)

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }