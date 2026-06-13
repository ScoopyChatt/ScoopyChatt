&rdquo;use client&rdquo;;
import * as React from &rdquo;react&rdquo;
import * as SheetPrimitive from &rdquo;@radix-ui/react-dialog&rdquo;
import { cva } from &rdquo;class-variance-authority&rdquo;;
import { X } from &rdquo;lucide-react&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      &rdquo;fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0&rdquo;,
      className
    )}
    {...props}
    ref={ref} />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  &rdquo;fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out&rdquo;,
  {
    variants: {
      side: {
        top: &rdquo;inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top&rdquo;,
        bottom:
          &rdquo;inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom&rdquo;,
        left: &rdquo;inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm&rdquo;,
        right:
          &rdquo;inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm&rdquo;,
      },
    },
    defaultVariants: {
      side: &rdquo;right&rdquo;,
    },
  }
)

const SheetContent = React.forwardRef(({ side = &rdquo;right&rdquo;, className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
      <SheetPrimitive.Close
        className=&rdquo;absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary&rdquo;>
        <X className=&rdquo;h-4 w-4&rdquo; />
        <span className=&rdquo;sr-only&rdquo;>Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn(&rdquo;flex flex-col space-y-2 text-center sm:text-left&rdquo;, className)}
    {...props} />
)
SheetHeader.displayName = &rdquo;SheetHeader&rdquo;

const SheetFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn(&rdquo;flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2&rdquo;, className)}
    {...props} />
)
SheetFooter.displayName = &rdquo;SheetFooter&rdquo;

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(&rdquo;text-lg font-semibold text-foreground&rdquo;, className)}
    {...props} />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn(&rdquo;text-sm text-muted-foreground&rdquo;, className)}
    {...props} />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}