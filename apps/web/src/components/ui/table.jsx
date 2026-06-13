import * as React from &rdquo;react&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className=&rdquo;relative w-full overflow-auto&rdquo;>
    <table
      ref={ref}
      className={cn(&rdquo;w-full caption-bottom text-sm&rdquo;, className)}
      {...props} />
  </div>
))
Table.displayName = &rdquo;Table&rdquo;

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn(&rdquo;[&_tr]:border-b&rdquo;, className)} {...props} />
))
TableHeader.displayName = &rdquo;TableHeader&rdquo;

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(&rdquo;[&_tr:last-child]:border-0&rdquo;, className)}
    {...props} />
))
TableBody.displayName = &rdquo;TableBody&rdquo;

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(&rdquo;border-t bg-muted/50 font-medium [&>tr]:last:border-b-0&rdquo;, className)}
    {...props} />
))
TableFooter.displayName = &rdquo;TableFooter&rdquo;

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      &rdquo;border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted&rdquo;,
      className
    )}
    {...props} />
))
TableRow.displayName = &rdquo;TableRow&rdquo;

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      &rdquo;h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]&rdquo;,
      className
    )}
    {...props} />
))
TableHead.displayName = &rdquo;TableHead&rdquo;

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      &rdquo;p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]&rdquo;,
      className
    )}
    {...props} />
))
TableCell.displayName = &rdquo;TableCell&rdquo;

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(&rdquo;mt-4 text-sm text-muted-foreground&rdquo;, className)}
    {...props} />
))
TableCaption.displayName = &rdquo;TableCaption&rdquo;

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}