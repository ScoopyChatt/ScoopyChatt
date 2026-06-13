import * as React from &rdquo;react&rdquo;
import { Slot } from &rdquo;@radix-ui/react-slot&rdquo;
import { ChevronRight, MoreHorizontal } from &rdquo;lucide-react&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;

const Breadcrumb = React.forwardRef(
  ({ ...props }, ref) => <nav ref={ref} aria-label=&rdquo;breadcrumb&rdquo; {...props} />
)
Breadcrumb.displayName = &rdquo;Breadcrumb&rdquo;

const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      &rdquo;flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5&rdquo;,
      className
    )}
    {...props} />
))
BreadcrumbList.displayName = &rdquo;BreadcrumbList&rdquo;

const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn(&rdquo;inline-flex items-center gap-1.5&rdquo;, className)}
    {...props} />
))
BreadcrumbItem.displayName = &rdquo;BreadcrumbItem&rdquo;

const BreadcrumbLink = React.forwardRef(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : &rdquo;a&rdquo;

  return (
    <Comp
      ref={ref}
      className={cn(&rdquo;transition-colors hover:text-foreground&rdquo;, className)}
      {...props} />
  );
})
BreadcrumbLink.displayName = &rdquo;BreadcrumbLink&rdquo;

const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role=&rdquo;link&rdquo;
    aria-disabled=&rdquo;true&rdquo;
    aria-current=&rdquo;page&rdquo;
    className={cn(&rdquo;font-normal text-foreground&rdquo;, className)}
    {...props} />
))
BreadcrumbPage.displayName = &rdquo;BreadcrumbPage&rdquo;

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}) => (
  <li
    role=&rdquo;presentation&rdquo;
    aria-hidden=&rdquo;true&rdquo;
    className={cn(&rdquo;[&>svg]:w-3.5 [&>svg]:h-3.5&rdquo;, className)}
    {...props}>
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = &rdquo;BreadcrumbSeparator&rdquo;

const BreadcrumbEllipsis = ({
  className,
  ...props
}) => (
  <span
    role=&rdquo;presentation&rdquo;
    aria-hidden=&rdquo;true&rdquo;
    className={cn(&rdquo;flex h-9 w-9 items-center justify-center&rdquo;, className)}
    {...props}>
    <MoreHorizontal className=&rdquo;h-4 w-4&rdquo; />
    <span className=&rdquo;sr-only&rdquo;>More</span>
  </span>
)
BreadcrumbEllipsis.displayName = &rdquo;BreadcrumbElipssis&rdquo;

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}