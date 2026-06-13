&rdquo;use client&rdquo;

import * as React from &rdquo;react&rdquo;
import * as RadioGroupPrimitive from &rdquo;@radix-ui/react-radio-group&rdquo;
import { Circle } from &rdquo;lucide-react&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (<RadioGroupPrimitive.Root className={cn(&rdquo;grid gap-2&rdquo;, className)} {...props} ref={ref} />);
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        &rdquo;aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50&rdquo;,
        className
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator className=&rdquo;flex items-center justify-center&rdquo;>
        <Circle className=&rdquo;h-3.5 w-3.5 fill-primary&rdquo; />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }