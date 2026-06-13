import { useMemo } from &rdquo;react&rdquo;
import { cva } from &rdquo;class-variance-authority&rdquo;;

import { cn } from &rdquo;@/lib/utils&rdquo;
import { Label } from &rdquo;@/components/ui/label&rdquo;
import { Separator } from &rdquo;@/components/ui/separator&rdquo;

function FieldSet({
  className,
  ...props
}) {
  return (
    <fieldset
      data-slot=&rdquo;field-set&rdquo;
      className={cn(
        &rdquo;flex flex-col gap-6&rdquo;,
        &rdquo;has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3&rdquo;,
        className
      )}
      {...props} />
  );
}

function FieldLegend({
  className,
  variant = &rdquo;legend&rdquo;,
  ...props
}) {
  return (
    <legend
      data-slot=&rdquo;field-legend&rdquo;
      data-variant={variant}
      className={cn(
        &rdquo;mb-3 font-medium&rdquo;,
        &rdquo;data-[variant=legend]:text-base&rdquo;,
        &rdquo;data-[variant=label]:text-sm&rdquo;,
        className
      )}
      {...props} />
  );
}

function FieldGroup({
  className,
  ...props
}) {
  return (
    <div
      data-slot=&rdquo;field-group&rdquo;
      className={cn(
        &rdquo;group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4&rdquo;,
        className
      )}
      {...props} />
  );
}

const fieldVariants = cva(&rdquo;group/field data-[invalid=true]:text-destructive flex w-full gap-3&rdquo;, {
  variants: {
    orientation: {
      vertical: [&rdquo;flex-col [&>*]:w-full [&>.sr-only]:w-auto&rdquo;],
      horizontal: [
        &rdquo;flex-row items-center&rdquo;,
        &rdquo;[&>[data-slot=field-label]]:flex-auto&rdquo;,
        &rdquo;has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px has-[>[data-slot=field-content]]:items-start&rdquo;,
      ],
      responsive: [
        &rdquo;@md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto flex-col [&>*]:w-full [&>.sr-only]:w-auto&rdquo;,
        &rdquo;@md/field-group:[&>[data-slot=field-label]]:flex-auto&rdquo;,
        &rdquo;@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px&rdquo;,
      ],
    },
  },
  defaultVariants: {
    orientation: &rdquo;vertical&rdquo;,
  },
})

function Field({
  className,
  orientation = &rdquo;vertical&rdquo;,
  ...props
}) {
  return (
    <div
      role=&rdquo;group&rdquo;
      data-slot=&rdquo;field&rdquo;
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props} />
  );
}

function FieldContent({
  className,
  ...props
}) {
  return (
    <div
      data-slot=&rdquo;field-content&rdquo;
      className={cn(&rdquo;group/field-content flex flex-1 flex-col gap-1.5 leading-snug&rdquo;, className)}
      {...props} />
  );
}

function FieldLabel({
  className,
  ...props
}) {
  return (
    <Label
      data-slot=&rdquo;field-label&rdquo;
      className={cn(
        &rdquo;group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50&rdquo;,
        &rdquo;has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>[data-slot=field]]:p-4&rdquo;,
        &rdquo;has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10&rdquo;,
        className
      )}
      {...props} />
  );
}

function FieldTitle({
  className,
  ...props
}) {
  return (
    <div
      data-slot=&rdquo;field-label&rdquo;
      className={cn(
        &rdquo;flex w-fit items-center gap-2 text-sm font-medium leading-snug group-data-[disabled=true]/field:opacity-50&rdquo;,
        className
      )}
      {...props} />
  );
}

function FieldDescription({
  className,
  ...props
}) {
  return (
    <p
      data-slot=&rdquo;field-description&rdquo;
      className={cn(
        &rdquo;text-muted-foreground text-sm font-normal leading-normal group-has-[[data-orientation=horizontal]]/field:text-balance&rdquo;,
        &rdquo;nth-last-2:-mt-1 last:mt-0 [[data-variant=legend]+&]:-mt-1.5&rdquo;,
        &rdquo;[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4&rdquo;,
        className
      )}
      {...props} />
  );
}

function FieldSeparator({
  children,
  className,
  ...props
}) {
  return (
    <div
      data-slot=&rdquo;field-separator&rdquo;
      data-content={!!children}
      className={cn(
        &rdquo;relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2&rdquo;,
        className
      )}
      {...props}>
      <Separator className=&rdquo;absolute inset-0 top-1/2&rdquo; />
      {children && (
        <span
          className=&rdquo;bg-background text-muted-foreground relative mx-auto block w-fit px-2&rdquo;
          data-slot=&rdquo;field-separator-content&rdquo;>
          {children}
        </span>
      )}
    </div>
  );
}

function FieldError({
  className,
  children,
  errors,
  ...props
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors) {
      return null
    }

    if (errors?.length === 1 && errors[0]?.message) {
      return errors[0].message
    }

    return (
      <ul className=&rdquo;ml-4 flex list-disc flex-col gap-1&rdquo;>
        {errors.map((error, index) =>
          error?.message && <li key={index}>{error.message}</li>)}
      </ul>
    );
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role=&rdquo;alert&rdquo;
      data-slot=&rdquo;field-error&rdquo;
      className={cn(&rdquo;text-destructive text-sm font-normal&rdquo;, className)}
      {...props}>
      {content}
    </div>
  );
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}