import * as React from &rdquo;react&rdquo;
import * as AvatarPrimitive from &rdquo;@radix-ui/react-avatar&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(&rdquo;relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full&rdquo;, className)}
    {...props} />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn(&rdquo;aspect-square h-full w-full&rdquo;, className)}
    {...props} />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      &rdquo;flex h-full w-full items-center justify-center rounded-full bg-muted&rdquo;,
      className
    )}
    {...props} />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }