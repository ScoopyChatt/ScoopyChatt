&rdquo;use client&rdquo;

import * as React from &rdquo;react&rdquo;
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from &rdquo;lucide-react&rdquo;
import { DayPicker, getDefaultClassNames } from &rdquo;react-day-picker&rdquo;;

import { cn } from &rdquo;@/lib/utils&rdquo;
import { Button, buttonVariants } from &rdquo;@/components/ui/button&rdquo;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = &rdquo;label&rdquo;,
  buttonVariant = &rdquo;ghost&rdquo;,
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        &rdquo;bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent&rdquo;,
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(&rdquo;default&rdquo;, { month: &rdquo;short&rdquo; }),
        ...formatters,
      }}
      classNames={{
        root: cn(&rdquo;w-fit&rdquo;, defaultClassNames.root),
        months: cn(&rdquo;relative flex flex-col gap-4 md:flex-row&rdquo;, defaultClassNames.months),
        month: cn(&rdquo;flex w-full flex-col gap-4&rdquo;, defaultClassNames.month),
        nav: cn(
          &rdquo;absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1&rdquo;,
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          &rdquo;h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50&rdquo;,
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          &rdquo;h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50&rdquo;,
          defaultClassNames.button_next
        ),
        month_caption: cn(
          &rdquo;flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]&rdquo;,
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          &rdquo;flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium&rdquo;,
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          &rdquo;has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border&rdquo;,
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(&rdquo;bg-popover absolute inset-0 opacity-0&rdquo;, defaultClassNames.dropdown),
        caption_label: cn(&rdquo;select-none font-medium&rdquo;, captionLayout === &rdquo;label&rdquo;
          ? &rdquo;text-sm&rdquo;
          : &rdquo;[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5&rdquo;, defaultClassNames.caption_label),
        table: &rdquo;w-full border-collapse&rdquo;,
        weekdays: cn(&rdquo;flex&rdquo;, defaultClassNames.weekdays),
        weekday: cn(
          &rdquo;text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal&rdquo;,
          defaultClassNames.weekday
        ),
        week: cn(&rdquo;mt-2 flex w-full&rdquo;, defaultClassNames.week),
        week_number_header: cn(&rdquo;w-[--cell-size] select-none&rdquo;, defaultClassNames.week_number_header),
        week_number: cn(
          &rdquo;text-muted-foreground select-none text-[0.8rem]&rdquo;,
          defaultClassNames.week_number
        ),
        day: cn(
          &rdquo;group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md&rdquo;,
          defaultClassNames.day
        ),
        range_start: cn(&rdquo;bg-accent rounded-l-md&rdquo;, defaultClassNames.range_start),
        range_middle: cn(&rdquo;rounded-none&rdquo;, defaultClassNames.range_middle),
        range_end: cn(&rdquo;bg-accent rounded-r-md&rdquo;, defaultClassNames.range_end),
        today: cn(
          &rdquo;bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none&rdquo;,
          defaultClassNames.today
        ),
        outside: cn(
          &rdquo;text-muted-foreground aria-selected:text-muted-foreground&rdquo;,
          defaultClassNames.outside
        ),
        disabled: cn(&rdquo;text-muted-foreground opacity-50&rdquo;, defaultClassNames.disabled),
        hidden: cn(&rdquo;invisible&rdquo;, defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (<div data-slot=&rdquo;calendar&rdquo; ref={rootRef} className={cn(className)} {...props} />);
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === &rdquo;left&rdquo;) {
            return (<ChevronLeftIcon className={cn(&rdquo;size-4&rdquo;, className)} {...props} />);
          }

          if (orientation === &rdquo;right&rdquo;) {
            return (<ChevronRightIcon className={cn(&rdquo;size-4&rdquo;, className)} {...props} />);
          }

          return (<ChevronDownIcon className={cn(&rdquo;size-4&rdquo;, className)} {...props} />);
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div
                className=&rdquo;flex size-[--cell-size] items-center justify-center text-center&rdquo;>
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props} />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant=&rdquo;ghost&rdquo;
      size=&rdquo;icon&rdquo;
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        &rdquo;data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70&rdquo;,
        defaultClassNames.day,
        className
      )}
      {...props} />
  );
}

export { Calendar, CalendarDayButton }