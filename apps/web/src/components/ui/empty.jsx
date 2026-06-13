import { cva } from &rdquo;class-variance-authority&rdquo;;

import { cn } from &rdquo;@/lib/utils&rdquo;

function Empty({
  className,
  ...props
}) {
  return (
    <div
      data-slot=&rdquo;empty&rdquo;
      className={cn(
        &rdquo;flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance rounded-lg border-dashed p-6 text-center md:p-12&rdquo;,
        className
      )}
      {...props} />
  );
}

function EmptyHeader({
  className,
  ...props
}) {
  return (
    <div
      data-slot=&rdquo;empty-header&rdquo;
      className={cn(&rdquo;flex max-w-sm flex-col items-center gap-2 text-center&rdquo;, className)}
      {...props} />
  );
}

const emptyMediaVariants = cva(
  &rdquo;mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0&rdquo;,
  {
    variants: {
      variant: {
        default: &rdquo;bg-transparent&rdquo;,
        icon: &rdquo;bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*=&rsquo;size-&rsquo;])]:size-6&rdquo;,
      },
    },
    defaultVariants: {
      variant: &rdquo;default&rdquo;,
    },
  }
)

function EmptyMedia({
  className,
  variant = &rdquo;default&rdquo;,
  ...props
}) {
  return (
    <div
      data-slot=&rdquo;empty-icon&rdquo;
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props} />
  );
}

function EmptyTitle({
  className,
  ...props
}) {
  return (
    <div
      data-slot=&rdquo;empty-title&rdquo;
      className={cn(&rdquo;text-lg font-medium tracking-tight&rdquo;, className)}
      {...props} />
  );
}

function EmptyDescription({
  className,
  ...props
}) {
  return (
    <div
      data-slot=&rdquo;empty-description&rdquo;
      className={cn(
        &rdquo;text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4&rdquo;,
        className
      )}
      {...props} />
  );
}

function EmptyContent({
  className,
  ...props
}) {
  return (
    <div
      data-slot=&rdquo;empty-content&rdquo;
      className={cn(
        &rdquo;flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm&rdquo;,
        className
      )}
      {...props} />
  );
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}