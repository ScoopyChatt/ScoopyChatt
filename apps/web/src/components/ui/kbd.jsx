import { cn } from &rdquo;@/lib/utils&rdquo;

function Kbd({
  className,
  ...props
}) {
  return (
    <kbd
      data-slot=&rdquo;kbd&rdquo;
      className={cn(
        &rdquo;bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium&rdquo;,
        &rdquo;[&_svg:not([class*=&rsquo;size-&rsquo;])]:size-3&rdquo;,
        &rdquo;[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10&rdquo;,
        className
      )}
      {...props} />
  );
}

function KbdGroup({
  className,
  ...props
}) {
  return (
    <kbd
      data-slot=&rdquo;kbd-group&rdquo;
      className={cn(&rdquo;inline-flex items-center gap-1&rdquo;, className)}
      {...props} />
  );
}

export { Kbd, KbdGroup }