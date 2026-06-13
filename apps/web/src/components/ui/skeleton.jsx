import { cn } from &rdquo;@/lib/utils&rdquo;

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn(&rdquo;animate-pulse rounded-md bg-primary/10&rdquo;, className)}
      {...props} />
  );
}

export { Skeleton }