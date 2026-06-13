&rdquo;use client&rdquo;

import * as React from &rdquo;react&rdquo;
import * as ProgressPrimitive from &rdquo;@radix-ui/react-progress&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      &rdquo;relative h-2 w-full overflow-hidden rounded-full bg-primary/20&rdquo;,
      className
    )}
    {...props}>
    <ProgressPrimitive.Indicator
      className=&rdquo;h-full w-full flex-1 bg-primary transition-all&rdquo;
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }