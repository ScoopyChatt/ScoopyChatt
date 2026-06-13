&rdquo;use client&rdquo;

import * as React from &rdquo;react&rdquo;
import * as SeparatorPrimitive from &rdquo;@radix-ui/react-separator&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;

const Separator = React.forwardRef((
  { className, orientation = &rdquo;horizontal&rdquo;, decorative = true, ...props },
  ref
) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      &rdquo;shrink-0 bg-border&rdquo;,
      orientation === &rdquo;horizontal&rdquo; ? &rdquo;h-[1px] w-full&rdquo; : &rdquo;h-full w-[1px]&rdquo;,
      className
    )}
    {...props} />
))
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }