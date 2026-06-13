&rdquo;use client&rdquo;;
import * as React from &rdquo;react&rdquo;
import * as ToggleGroupPrimitive from &rdquo;@radix-ui/react-toggle-group&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;
import { toggleVariants } from &rdquo;@/components/ui/toggle&rdquo;

const ToggleGroupContext = React.createContext({
  size: &rdquo;default&rdquo;,
  variant: &rdquo;default&rdquo;,
})

const ToggleGroup = React.forwardRef(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(&rdquo;flex items-center justify-center gap-1&rdquo;, className)}
    {...props}>
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(toggleVariants({
        variant: context.variant || variant,
        size: context.size || size,
      }), className)}
      {...props}>
      {children}
    </ToggleGroupPrimitive.Item>
  );
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }