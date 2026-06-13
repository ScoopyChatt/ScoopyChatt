import * as React from &rdquo;react&rdquo;
import { ChevronLeft, ChevronRight, MoreHorizontal } from &rdquo;lucide-react&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;
import { buttonVariants } from &rdquo;@/components/ui/button&rdquo;;

const Pagination = ({
  className,
  ...props
}) => (
  <nav
    role=&rdquo;navigation&rdquo;
    aria-label=&rdquo;pagination&rdquo;
    className={cn(&rdquo;mx-auto flex w-full justify-center&rdquo;, className)}
    {...props} />
)
Pagination.displayName = &rdquo;Pagination&rdquo;

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(&rdquo;flex flex-row items-center gap-1&rdquo;, className)}
    {...props} />
))
PaginationContent.displayName = &rdquo;PaginationContent&rdquo;

const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn(&rdquo;&rdquo;, className)} {...props} />
))
PaginationItem.displayName = &rdquo;PaginationItem&rdquo;

const PaginationLink = ({
  className,
  isActive,
  size = &rdquo;icon&rdquo;,
  ...props
}) => (
  <a
    aria-current={isActive ? &rdquo;page&rdquo; : undefined}
    className={cn(buttonVariants({
      variant: isActive ? &rdquo;outline&rdquo; : &rdquo;ghost&rdquo;,
      size,
    }), className)}
    {...props} />
)
PaginationLink.displayName = &rdquo;PaginationLink&rdquo;

const PaginationPrevious = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label=&rdquo;Go to previous page&rdquo;
    size=&rdquo;default&rdquo;
    className={cn(&rdquo;gap-1 pl-2.5&rdquo;, className)}
    {...props}>
    <ChevronLeft className=&rdquo;h-4 w-4&rdquo; />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = &rdquo;PaginationPrevious&rdquo;

const PaginationNext = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label=&rdquo;Go to next page&rdquo;
    size=&rdquo;default&rdquo;
    className={cn(&rdquo;gap-1 pr-2.5&rdquo;, className)}
    {...props}>
    <span>Next</span>
    <ChevronRight className=&rdquo;h-4 w-4&rdquo; />
  </PaginationLink>
)
PaginationNext.displayName = &rdquo;PaginationNext&rdquo;

const PaginationEllipsis = ({
  className,
  ...props
}) => (
  <span
    aria-hidden
    className={cn(&rdquo;flex h-9 w-9 items-center justify-center&rdquo;, className)}
    {...props}>
    <MoreHorizontal className=&rdquo;h-4 w-4&rdquo; />
    <span className=&rdquo;sr-only&rdquo;>More pages</span>
  </span>
)
PaginationEllipsis.displayName = &rdquo;PaginationEllipsis&rdquo;

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}