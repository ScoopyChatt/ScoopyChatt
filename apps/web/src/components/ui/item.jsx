import * as React from &rdquo;react&rdquo;
import { Slot } from &rdquo;@radix-ui/react-slot&rdquo;
import { cva } from &rdquo;class-variance-authority&rdquo;;

import { cn } from &rdquo;@/lib/utils&rdquo;
import { Separator } from &rdquo;@/components/ui/separator&rdquo;

function ItemGroup({
  className,
  ...props
}) {
  return (
    <div
      role=&rdquo;list&rdquo;
      data-slot=&rdquo;item-group&rdquo;
      className={cn(&rdquo;group/item-group flex flex-col&rdquo;, className)}
      {...props} />
  );
}

function ItemSeparator({
  className,
  ...props
}) {
  return (
    <Separator
      data-slot=&rdquo;item-separator&rdquo;
      orientation=&rdquo;horizontal&rdquo;
      className={cn(&rdquo;my-0&rdquo;, className)}
      {...props} />
  );
}

const itemVariants = cva(
  &rdquo;group/item [a]:hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-ring/50 [a]:transition-colors flex flex-wrap items-center rounded-md border border-transparent text-sm outline-none transition-colors duration-100 focus-visible:ring-[3px]&rdquo;,
  {
    variants: {
      variant: {
        default: &rdquo;bg-transparent&rdquo;,
        outline: &rdquo;border-border&rdquo;,
        muted: &rdquo;bg-muted/50&rdquo;,
      },
      size: {
        default: &rdquo;gap-4 p-4 &rdquo;,
        sm: &rdquo;gap-2.5 px-4 py-3&rdquo;,
      },
    },
    defaultVariants: {
      variant: &rdquo;default&rdquo;,
      size: &rdquo;default&rdquo;,
    },
  }
)

function Item({
  className,
  variant = &rdquo;default&rdquo;,
  size = &rdquo;default&rdquo;,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : &rdquo;div&rdquo;
  return (
    <Comp
      data-slot=&rdquo;item&rdquo;
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props} />
  );
}

const itemMediaVariants = cva(
  &rdquo;flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none&rdquo;,
  {
    variants: {
      variant: {
        default: &rdquo;bg-transparent&rdquo;,
        icon: &rdquo;bg-muted size-8 rounded-sm border [&_svg:not([class*=&rsquo;size-&rsquo;])]:size-4&rdquo;,
        image:
          &rdquo;size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover&rdquo;,
      },
    },
    defaultVariants: {
      variant: &rdquo;default&rdquo;,
    },
  }
)

function ItemMedia({
  className,
  variant = &rdquo;default&rdquo;,
  ...props
}) {
  return (
    <div
      data-slot=&rdquo;item-media&rdquo;
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props} />
  );
}

function ItemContent({
  className,
  ...props
}) {
  return (
    <div
      data-slot=&rdquo;item-content&rdquo;
      className={cn(
        &rdquo;flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none&rdquo;,
        className
      )}
      {...props} />
  );
}

function ItemTitle({
  className,
  ...props
}) {
  return (
    <div
      data-slot=&rdquo;item-title&rdquo;
      className={cn(
        &rdquo;flex w-fit items-center gap-2 text-sm font-medium leading-snug&rdquo;,
        className
      )}
      {...props} />
  );
}

function ItemDescription({
  className,
  ...props
}) {
  return (
    <p
      data-slot=&rdquo;item-description&rdquo;
      className={cn(
        &rdquo;text-muted-foreground line-clamp-2 text-balance text-sm font-normal leading-normal&rdquo;,
        &rdquo;[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4&rdquo;,
        className
      )}
      {...props} />
  );
}

function ItemActions({
  className,
  ...props
}) {
  return (
    <div
      data-slot=&rdquo;item-actions&rdquo;
      className={cn(&rdquo;flex items-center gap-2&rdquo;, className)}
      {...props} />
  );
}

function ItemHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot=&rdquo;item-header&rdquo;
      className={cn(&rdquo;flex basis-full items-center justify-between gap-2&rdquo;, className)}
      {...props} />
  );
}

function ItemFooter({
  className,
  ...props
}) {
  return (
    <div
      data-slot=&rdquo;item-footer&rdquo;
      className={cn(&rdquo;flex basis-full items-center justify-between gap-2&rdquo;, className)}
      {...props} />
  );
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}