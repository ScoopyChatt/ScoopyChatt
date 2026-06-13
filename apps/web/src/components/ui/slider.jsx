import * as React from &rdquo;react&rdquo;
import * as SliderPrimitive from &rdquo;@radix-ui/react-slider&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(&rdquo;relative flex w-full touch-none select-none items-center&rdquo;, className)}
    {...props}>
    <SliderPrimitive.Track
      className=&rdquo;relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20&rdquo;>
      <SliderPrimitive.Range className=&rdquo;absolute h-full bg-primary&rdquo; />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className=&rdquo;block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50&rdquo; />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }