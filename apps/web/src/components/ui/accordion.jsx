import * as React from &rdquo;react&rdquo;
import * as AccordionPrimitive from &rdquo;@radix-ui/react-accordion&rdquo;
import { ChevronDown } from &rdquo;lucide-react&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn(&rdquo;border-b&rdquo;, className)} {...props} />
))
AccordionItem.displayName = &rdquo;AccordionItem&rdquo;

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className=&rdquo;flex&rdquo;>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        &rdquo;flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180&rdquo;,
        className
      )}
      {...props}>
      {children}
      <ChevronDown
        className=&rdquo;h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200&rdquo; />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className=&rdquo;overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down&rdquo;
    {...props}>
    <div className={cn(&rdquo;pb-4 pt-0&rdquo;, className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }