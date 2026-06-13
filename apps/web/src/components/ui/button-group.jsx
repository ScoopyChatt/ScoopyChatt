import { Slot } from &rdquo;@radix-ui/react-slot&rdquo;
import { cva } from &rdquo;class-variance-authority&rdquo;;

import { cn } from &rdquo;@/lib/utils&rdquo;
import { Separator } from &rdquo;@/components/ui/separator&rdquo;

const buttonGroupVariants = cva(
  &rdquo;flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot=select-trigger]:not([class*=&rsquo;w-&rsquo;])]:w-fit [&>input]:flex-1&rdquo;,
  {
    variants: {
      orientation: {
        horizontal:
          &rdquo;[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none&rdquo;,
        vertical:
          &rdquo;flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none&rdquo;,
      },
    },
    defaultVariants: {
      orientation: &rdquo;horizontal&rdquo;,
    },
  }
)

function ButtonGroup({
  className,
  orientation,
  ...props
}) {
  return (
    <div
      role=&rdquo;group&rdquo;
      data-slot=&rdquo;button-group&rdquo;
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props} />
  );
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : &rdquo;div&rdquo;

  return (
    <Comp
      className={cn(
        &rdquo;bg-muted shadow-xs flex items-center gap-2 rounded-md border px-4 text-sm font-medium [&_svg:not([class*=&rsquo;size-&rsquo;])]:size-4 [&_svg]:pointer-events-none&rdquo;,
        className
      )}
      {...props} />
  );
}

function ButtonGroupSeparator({
  className,
  orientation = &rdquo;vertical&rdquo;,
  ...props
}) {
  return (
    <Separator
      data-slot=&rdquo;button-group-separator&rdquo;
      orientation={orientation}
      className={cn(
        &rdquo;bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto&rdquo;,
        className
      )}
      {...props} />
  );
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}