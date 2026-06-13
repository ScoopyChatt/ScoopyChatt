import * as React from &rdquo;react&rdquo;
import { Drawer as DrawerPrimitive } from &rdquo;vaul&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
)
Drawer.displayName = &rdquo;Drawer&rdquo;

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn(&rdquo;fixed inset-0 z-50 bg-black/80&rdquo;, className)}
    {...props} />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        &rdquo;fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background&rdquo;,
        className
      )}
      {...props}>
      <div className=&rdquo;mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted&rdquo; />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = &rdquo;DrawerContent&rdquo;

const DrawerHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn(&rdquo;grid gap-1.5 p-4 text-center sm:text-left&rdquo;, className)}
    {...props} />
)
DrawerHeader.displayName = &rdquo;DrawerHeader&rdquo;

const DrawerFooter = ({
  className,
  ...props
}) => (
  <div className={cn(&rdquo;mt-auto flex flex-col gap-2 p-4&rdquo;, className)} {...props} />
)
DrawerFooter.displayName = &rdquo;DrawerFooter&rdquo;

const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(&rdquo;text-lg font-semibold leading-none tracking-tight&rdquo;, className)}
    {...props} />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn(&rdquo;text-sm text-muted-foreground&rdquo;, className)}
    {...props} />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}