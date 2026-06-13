import * as React from &rdquo;react&rdquo;
import { OTPInput, OTPInputContext } from &rdquo;input-otp&rdquo;
import { Minus } from &rdquo;lucide-react&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;

const InputOTP = React.forwardRef(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(&rdquo;flex items-center gap-2 has-[:disabled]:opacity-50&rdquo;, containerClassName)}
    className={cn(&rdquo;disabled:cursor-not-allowed&rdquo;, className)}
    {...props} />
))
InputOTP.displayName = &rdquo;InputOTP&rdquo;

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(&rdquo;flex items-center&rdquo;, className)} {...props} />
))
InputOTPGroup.displayName = &rdquo;InputOTPGroup&rdquo;

const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        &rdquo;relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md&rdquo;,
        isActive && &rdquo;z-10 ring-1 ring-ring&rdquo;,
        className
      )}
      {...props}>
      {char}
      {hasFakeCaret && (
        <div
          className=&rdquo;pointer-events-none absolute inset-0 flex items-center justify-center&rdquo;>
          <div className=&rdquo;h-4 w-px animate-caret-blink bg-foreground duration-1000&rdquo; />
        </div>
      )}
    </div>
  );
})
InputOTPSlot.displayName = &rdquo;InputOTPSlot&rdquo;

const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => (
  <div ref={ref} role=&rdquo;separator&rdquo; {...props}>
    <Minus />
  </div>
))
InputOTPSeparator.displayName = &rdquo;InputOTPSeparator&rdquo;

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }