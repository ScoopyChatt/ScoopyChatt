&rdquo;use client&rdquo;;
import * as React from &rdquo;react&rdquo;
import { Slot } from &rdquo;@radix-ui/react-slot&rdquo;
import { Controller, FormProvider, useFormContext } from &rdquo;react-hook-form&rdquo;;

import { cn } from &rdquo;@/lib/utils&rdquo;
import { Label } from &rdquo;@/components/ui/label&rdquo;

const Form = FormProvider

const FormFieldContext = React.createContext(null)

const FormField = (
  {
    ...props
  }
) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error(&rdquo;useFormField should be used within <FormField>&rdquo;)
  }

  if (!itemContext) {
    throw new Error(&rdquo;useFormField should be used within <FormItem>&rdquo;)
  }

  const fieldState = getFieldState(fieldContext.name, formState)

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

const FormItemContext = React.createContext(null)

const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn(&rdquo;space-y-2&rdquo;, className)} {...props} />
    </FormItemContext.Provider>
  );
})
FormItem.displayName = &rdquo;FormItem&rdquo;

const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && &rdquo;text-destructive&rdquo;, className)}
      htmlFor={formItemId}
      {...props} />
  );
})
FormLabel.displayName = &rdquo;FormLabel&rdquo;

const FormControl = React.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props} />
  );
})
FormControl.displayName = &rdquo;FormControl&rdquo;

const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn(&rdquo;text-[0.8rem] text-muted-foreground&rdquo;, className)}
      {...props} />
  );
})
FormDescription.displayName = &rdquo;FormDescription&rdquo;

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? &rdquo;&rdquo;) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn(&rdquo;text-[0.8rem] font-medium text-destructive&rdquo;, className)}
      {...props}>
      {body}
    </p>
  );
})
FormMessage.displayName = &rdquo;FormMessage&rdquo;

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}