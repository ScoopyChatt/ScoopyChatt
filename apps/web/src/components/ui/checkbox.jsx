import * as React from &rdquo;react&rdquo;
import * as CheckboxPrimitive from &rdquo;@radix-ui/react-checkbox&rdquo;
import { Check } from &rdquo;lucide-react&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      &rdquo;grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground&rdquo;,
      className
    )}
    {...props}>
    <CheckboxPrimitive.Indicator className={cn(&rdquo;grid place-content-center text-current&rdquo;)}>
      <Check className=&rdquo;h-4 w-4&rdquo; />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }