import * as React from &rdquo;react&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(&rdquo;rounded-xl border bg-card text-card-foreground shadow&rdquo;, className)}
    {...props} />
))
Card.displayName = &rdquo;Card&rdquo;

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(&rdquo;flex flex-col space-y-1.5 p-6&rdquo;, className)}
    {...props} />
))
CardHeader.displayName = &rdquo;CardHeader&rdquo;

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(&rdquo;font-semibold leading-none tracking-tight&rdquo;, className)}
    {...props} />
))
CardTitle.displayName = &rdquo;CardTitle&rdquo;

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(&rdquo;text-sm text-muted-foreground&rdquo;, className)}
    {...props} />
))
CardDescription.displayName = &rdquo;CardDescription&rdquo;

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(&rdquo;p-6 pt-0&rdquo;, className)} {...props} />
))
CardContent.displayName = &rdquo;CardContent&rdquo;

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(&rdquo;flex items-center p-6 pt-0&rdquo;, className)}
    {...props} />
))
CardFooter.displayName = &rdquo;CardFooter&rdquo;

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }