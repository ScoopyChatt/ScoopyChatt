import * as React from &rdquo;react&rdquo;
import * as ScrollAreaPrimitive from &rdquo;@radix-ui/react-scroll-area&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;

const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn(&rdquo;relative overflow-hidden&rdquo;, className)}
    {...props}>
    <ScrollAreaPrimitive.Viewport className=&rdquo;h-full w-full rounded-[inherit]&rdquo;>
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef(({ className, orientation = &rdquo;vertical&rdquo;, ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      &rdquo;flex touch-none select-none transition-colors&rdquo;,
      orientation === &rdquo;vertical&rdquo; &&
        &rdquo;h-full w-2.5 border-l border-l-transparent p-[1px]&rdquo;,
      orientation === &rdquo;horizontal&rdquo; &&
        &rdquo;h-2.5 flex-col border-t border-t-transparent p-[1px]&rdquo;,
      className
    )}
    {...props}>
    <ScrollAreaPrimitive.ScrollAreaThumb className=&rdquo;relative flex-1 rounded-full bg-border&rdquo; />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }