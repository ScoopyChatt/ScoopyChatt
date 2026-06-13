import * as React from &rdquo;react&rdquo;
import { cva } from &rdquo;class-variance-authority&rdquo;;

import { cn } from &rdquo;@/lib/utils&rdquo;
import { Button } from &rdquo;@/components/ui/button&rdquo;
import { Input } from &rdquo;@/components/ui/input&rdquo;
import { Textarea } from &rdquo;@/components/ui/textarea&rdquo;

function InputGroup({
  className,
  ...props
}) {
  return (
    <div
      data-slot=&rdquo;input-group&rdquo;
      role=&rdquo;group&rdquo;
      className={cn(
        &rdquo;group/input-group border-input dark:bg-input/30 shadow-xs relative flex w-full items-center rounded-md border outline-none transition-[color,box-shadow]&rdquo;,
        &rdquo;h-9 has-[>textarea]:h-auto&rdquo;,
        // Variants based on alignment.
        &rdquo;has-[>[data-align=inline-start]]:[&>input]:pl-2&rdquo;,
        &rdquo;has-[>[data-align=inline-end]]:[&>input]:pr-2&rdquo;,
        &rdquo;has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3&rdquo;,
        &rdquo;has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3&rdquo;,
        // Focus state.
        &rdquo;has-[[data-slot=input-group-control]:focus-visible]:ring-ring has-[[data-slot=input-group-control]:focus-visible]:ring-1&rdquo;,
        // Error state.
        &rdquo;has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40&rdquo;,
        className
      )}
      {...props} />
  );
}

const inputGroupAddonVariants = cva(
  &rdquo;text-muted-foreground flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*=&rsquo;size-&rsquo;])]:size-4&rdquo;,
  {
    variants: {
      align: {
        &rdquo;inline-start&rdquo;:
          &rdquo;order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]&rdquo;,
        &rdquo;inline-end&rdquo;:
          &rdquo;order-last pr-3 has-[>button]:mr-[-0.4rem] has-[>kbd]:mr-[-0.35rem]&rdquo;,
        &rdquo;block-start&rdquo;:
          &rdquo;[.border-b]:pb-3 order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5&rdquo;,
        &rdquo;block-end&rdquo;:
          &rdquo;[.border-t]:pt-3 order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5&rdquo;,
      },
    },
    defaultVariants: {
      align: &rdquo;inline-start&rdquo;,
    },
  }
)

function InputGroupAddon({
  className,
  align = &rdquo;inline-start&rdquo;,
  ...props
}) {
  return (
    <div
      role=&rdquo;group&rdquo;
      data-slot=&rdquo;input-group-addon&rdquo;
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target).closest(&rdquo;button&rdquo;)) {
          return
        }
        e.currentTarget.parentElement?.querySelector(&rdquo;input&rdquo;)?.focus()
      }}
      {...props} />
  );
}

const inputGroupButtonVariants = cva(&rdquo;flex items-center gap-2 text-sm shadow-none&rdquo;, {
  variants: {
    size: {
      xs: &rdquo;h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*=&rsquo;size-&rsquo;])]:size-3.5&rdquo;,
      sm: &rdquo;h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5&rdquo;,
      &rdquo;icon-xs&rdquo;:
        &rdquo;size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0&rdquo;,
      &rdquo;icon-sm&rdquo;: &rdquo;size-8 p-0 has-[>svg]:p-0&rdquo;,
    },
  },
  defaultVariants: {
    size: &rdquo;xs&rdquo;,
  },
})

function InputGroupButton({
  className,
  type = &rdquo;button&rdquo;,
  variant = &rdquo;ghost&rdquo;,
  size = &rdquo;xs&rdquo;,
  ...props
}) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props} />
  );
}

function InputGroupText({
  className,
  ...props
}) {
  return (
    <span
      className={cn(
        &rdquo;text-muted-foreground flex items-center gap-2 text-sm [&_svg:not([class*=&rsquo;size-&rsquo;])]:size-4 [&_svg]:pointer-events-none&rdquo;,
        className
      )}
      {...props} />
  );
}

function InputGroupInput({
  className,
  ...props
}) {
  return (
    <Input
      data-slot=&rdquo;input-group-control&rdquo;
      className={cn(
        &rdquo;flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent&rdquo;,
        className
      )}
      {...props} />
  );
}

function InputGroupTextarea({
  className,
  ...props
}) {
  return (
    <Textarea
      data-slot=&rdquo;input-group-control&rdquo;
      className={cn(
        &rdquo;flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent&rdquo;,
        className
      )}
      {...props} />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}