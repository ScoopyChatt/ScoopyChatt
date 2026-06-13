import { Loader2Icon } from &rdquo;lucide-react&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;

function Spinner({
  className,
  ...props
}) {
  return (
    <Loader2Icon
      role=&rdquo;status&rdquo;
      aria-label=&rdquo;Loading&rdquo;
      className={cn(&rdquo;size-4 animate-spin&rdquo;, className)}
      {...props} />
  );
}

export { Spinner }