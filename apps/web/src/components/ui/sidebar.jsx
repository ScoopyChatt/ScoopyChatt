import * as React from &rdquo;react&rdquo;
import { Slot } from &rdquo;@radix-ui/react-slot&rdquo;
import { cva } from &rdquo;class-variance-authority&rdquo;;
import { PanelLeft } from &rdquo;lucide-react&rdquo;

import { useIsMobile } from &rdquo;@/hooks/use-mobile&rdquo;
import { cn } from &rdquo;@/lib/utils&rdquo;
import { Button } from &rdquo;@/components/ui/button&rdquo;
import { Input } from &rdquo;@/components/ui/input&rdquo;
import { Separator } from &rdquo;@/components/ui/separator&rdquo;
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from &rdquo;@/components/ui/sheet&rdquo;
import { Skeleton } from &rdquo;@/components/ui/skeleton&rdquo;
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from &rdquo;@/components/ui/tooltip&rdquo;

const SIDEBAR_COOKIE_NAME = &rdquo;sidebar_state&rdquo;
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = &rdquo;16rem&rdquo;
const SIDEBAR_WIDTH_MOBILE = &rdquo;18rem&rdquo;
const SIDEBAR_WIDTH_ICON = &rdquo;3rem&rdquo;
const SIDEBAR_KEYBOARD_SHORTCUT = &rdquo;b&rdquo;

const SidebarContext = React.createContext(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error(&rdquo;useSidebar must be used within a SidebarProvider.&rdquo;)
  }

  return context
}

const SidebarProvider = React.forwardRef((
  {
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...props
  },
  ref
) => {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback((value) => {
    const openState = typeof value === &rdquo;function&rdquo; ? value(open) : value
    if (setOpenProp) {
      setOpenProp(openState)
    } else {
      _setOpen(openState)
    }

    // This sets the cookie to keep the sidebar state.
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }, [setOpenProp, open])

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile
      ? setOpenMobile((open) => !open)
      : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile])

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener(&rdquo;keydown&rdquo;, handleKeyDown)
    return () => window.removeEventListener(&rdquo;keydown&rdquo;, handleKeyDown);
  }, [toggleSidebar])

  // We add a state so that we can do data-state=&rdquo;expanded&rdquo; or &rdquo;collapsed&rdquo;.
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? &rdquo;expanded&rdquo; : &rdquo;collapsed&rdquo;

  const contextValue = React.useMemo(() => ({
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  }), [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar])

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={
            {
              &rdquo;--sidebar-width&rdquo;: SIDEBAR_WIDTH,
              &rdquo;--sidebar-width-icon&rdquo;: SIDEBAR_WIDTH_ICON,
              ...style
            }
          }
          className={cn(
            &rdquo;group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar&rdquo;,
            className
          )}
          ref={ref}
          {...props}>
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
})
SidebarProvider.displayName = &rdquo;SidebarProvider&rdquo;

const Sidebar = React.forwardRef((
  {
    side = &rdquo;left&rdquo;,
    variant = &rdquo;sidebar&rdquo;,
    collapsible = &rdquo;offcanvas&rdquo;,
    className,
    children,
    ...props
  },
  ref
) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

  if (collapsible === &rdquo;none&rdquo;) {
    return (
      <div
        className={cn(
          &rdquo;flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground&rdquo;,
          className
        )}
        ref={ref}
        {...props}>
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar=&rdquo;sidebar&rdquo;
          data-mobile=&rdquo;true&rdquo;
          className=&rdquo;w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden&rdquo;
          style={
            {
              &rdquo;--sidebar-width&rdquo;: SIDEBAR_WIDTH_MOBILE
            }
          }
          side={side}>
          <SheetHeader className=&rdquo;sr-only&rdquo;>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className=&rdquo;flex h-full w-full flex-col&rdquo;>{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      ref={ref}
      className=&rdquo;group peer hidden text-sidebar-foreground md:block&rdquo;
      data-state={state}
      data-collapsible={state === &rdquo;collapsed&rdquo; ? collapsible : &rdquo;&rdquo;}
      data-variant={variant}
      data-side={side}>
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          &rdquo;relative w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear&rdquo;,
          &rdquo;group-data-[collapsible=offcanvas]:w-0&rdquo;,
          &rdquo;group-data-[side=right]:rotate-180&rdquo;,
          variant === &rdquo;floating&rdquo; || variant === &rdquo;inset&rdquo;
            ? &rdquo;group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]&rdquo;
            : &rdquo;group-data-[collapsible=icon]:w-[--sidebar-width-icon]&rdquo;
        )} />
      <div
        className={cn(
          &rdquo;fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex&rdquo;,
          side === &rdquo;left&rdquo;
            ? &rdquo;left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]&rdquo;
            : &rdquo;right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]&rdquo;,
          // Adjust the padding for floating and inset variants.
          variant === &rdquo;floating&rdquo; || variant === &rdquo;inset&rdquo;
            ? &rdquo;p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]&rdquo;
            : &rdquo;group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l&rdquo;,
          className
        )}
        {...props}>
        <div
          data-sidebar=&rdquo;sidebar&rdquo;
          className=&rdquo;flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow&rdquo;>
          {children}
        </div>
      </div>
    </div>
  );
})
Sidebar.displayName = &rdquo;Sidebar&rdquo;

const SidebarTrigger = React.forwardRef(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar=&rdquo;trigger&rdquo;
      variant=&rdquo;ghost&rdquo;
      size=&rdquo;icon&rdquo;
      className={cn(&rdquo;h-7 w-7&rdquo;, className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}>
      <PanelLeft />
      <span className=&rdquo;sr-only&rdquo;>Toggle Sidebar</span>
    </Button>
  );
})
SidebarTrigger.displayName = &rdquo;SidebarTrigger&rdquo;

const SidebarRail = React.forwardRef(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar=&rdquo;rail&rdquo;
      aria-label=&rdquo;Toggle Sidebar&rdquo;
      tabIndex={-1}
      onClick={toggleSidebar}
      title=&rdquo;Toggle Sidebar&rdquo;
      className={cn(
        &rdquo;absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex&rdquo;,
        &rdquo;[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize&rdquo;,
        &rdquo;[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize&rdquo;,
        &rdquo;group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar&rdquo;,
        &rdquo;[[data-side=left][data-collapsible=offcanvas]_&]:-right-2&rdquo;,
        &rdquo;[[data-side=right][data-collapsible=offcanvas]_&]:-left-2&rdquo;,
        className
      )}
      {...props} />
  );
})
SidebarRail.displayName = &rdquo;SidebarRail&rdquo;

const SidebarInset = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        &rdquo;relative flex w-full flex-1 flex-col bg-background&rdquo;,
        &rdquo;md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow&rdquo;,
        className
      )}
      {...props} />
  );
})
SidebarInset.displayName = &rdquo;SidebarInset&rdquo;

const SidebarInput = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar=&rdquo;input&rdquo;
      className={cn(
        &rdquo;h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring&rdquo;,
        className
      )}
      {...props} />
  );
})
SidebarInput.displayName = &rdquo;SidebarInput&rdquo;

const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar=&rdquo;header&rdquo;
      className={cn(&rdquo;flex flex-col gap-2 p-2&rdquo;, className)}
      {...props} />
  );
})
SidebarHeader.displayName = &rdquo;SidebarHeader&rdquo;

const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar=&rdquo;footer&rdquo;
      className={cn(&rdquo;flex flex-col gap-2 p-2&rdquo;, className)}
      {...props} />
  );
})
SidebarFooter.displayName = &rdquo;SidebarFooter&rdquo;

const SidebarSeparator = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar=&rdquo;separator&rdquo;
      className={cn(&rdquo;mx-2 w-auto bg-sidebar-border&rdquo;, className)}
      {...props} />
  );
})
SidebarSeparator.displayName = &rdquo;SidebarSeparator&rdquo;

const SidebarContent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar=&rdquo;content&rdquo;
      className={cn(
        &rdquo;flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden&rdquo;,
        className
      )}
      {...props} />
  );
})
SidebarContent.displayName = &rdquo;SidebarContent&rdquo;

const SidebarGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar=&rdquo;group&rdquo;
      className={cn(&rdquo;relative flex w-full min-w-0 flex-col p-2&rdquo;, className)}
      {...props} />
  );
})
SidebarGroup.displayName = &rdquo;SidebarGroup&rdquo;

const SidebarGroupLabel = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : &rdquo;div&rdquo;

  return (
    <Comp
      ref={ref}
      data-sidebar=&rdquo;group-label&rdquo;
      className={cn(
        &rdquo;flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0&rdquo;,
        &rdquo;group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0&rdquo;,
        className
      )}
      {...props} />
  );
})
SidebarGroupLabel.displayName = &rdquo;SidebarGroupLabel&rdquo;

const SidebarGroupAction = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : &rdquo;button&rdquo;

  return (
    <Comp
      ref={ref}
      data-sidebar=&rdquo;group-action&rdquo;
      className={cn(
        &rdquo;absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0&rdquo;,
        // Increases the hit area of the button on mobile.
        &rdquo;after:absolute after:-inset-2 after:md:hidden&rdquo;,
        &rdquo;group-data-[collapsible=icon]:hidden&rdquo;,
        className
      )}
      {...props} />
  );
})
SidebarGroupAction.displayName = &rdquo;SidebarGroupAction&rdquo;

const SidebarGroupContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar=&rdquo;group-content&rdquo;
    className={cn(&rdquo;w-full text-sm&rdquo;, className)}
    {...props} />
))
SidebarGroupContent.displayName = &rdquo;SidebarGroupContent&rdquo;

const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar=&rdquo;menu&rdquo;
    className={cn(&rdquo;flex w-full min-w-0 flex-col gap-1&rdquo;, className)}
    {...props} />
))
SidebarMenu.displayName = &rdquo;SidebarMenu&rdquo;

const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar=&rdquo;menu-item&rdquo;
    className={cn(&rdquo;group/menu-item relative&rdquo;, className)}
    {...props} />
))
SidebarMenuItem.displayName = &rdquo;SidebarMenuItem&rdquo;

const sidebarMenuButtonVariants = cva(
  &rdquo;peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0&rdquo;,
  {
    variants: {
      variant: {
        default: &rdquo;hover:bg-sidebar-accent hover:text-sidebar-accent-foreground&rdquo;,
        outline:
          &rdquo;bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]&rdquo;,
      },
      size: {
        default: &rdquo;h-8 text-sm&rdquo;,
        sm: &rdquo;h-7 text-xs&rdquo;,
        lg: &rdquo;h-12 text-sm group-data-[collapsible=icon]:!p-0&rdquo;,
      },
    },
    defaultVariants: {
      variant: &rdquo;default&rdquo;,
      size: &rdquo;default&rdquo;,
    },
  }
)

const SidebarMenuButton = React.forwardRef((
  {
    asChild = false,
    isActive = false,
    variant = &rdquo;default&rdquo;,
    size = &rdquo;default&rdquo;,
    tooltip,
    className,
    ...props
  },
  ref
) => {
  const Comp = asChild ? Slot : &rdquo;button&rdquo;
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      ref={ref}
      data-sidebar=&rdquo;menu-button&rdquo;
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props} />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === &rdquo;string&rdquo;) {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side=&rdquo;right&rdquo;
        align=&rdquo;center&rdquo;
        hidden={state !== &rdquo;collapsed&rdquo; || isMobile}
        {...tooltip} />
    </Tooltip>
  );
})
SidebarMenuButton.displayName = &rdquo;SidebarMenuButton&rdquo;

const SidebarMenuAction = React.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : &rdquo;button&rdquo;

  return (
    <Comp
      ref={ref}
      data-sidebar=&rdquo;menu-action&rdquo;
      className={cn(
        &rdquo;absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0&rdquo;,
        // Increases the hit area of the button on mobile.
        &rdquo;after:absolute after:-inset-2 after:md:hidden&rdquo;,
        &rdquo;peer-data-[size=sm]/menu-button:top-1&rdquo;,
        &rdquo;peer-data-[size=default]/menu-button:top-1.5&rdquo;,
        &rdquo;peer-data-[size=lg]/menu-button:top-2.5&rdquo;,
        &rdquo;group-data-[collapsible=icon]:hidden&rdquo;,
        showOnHover &&
          &rdquo;group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0&rdquo;,
        className
      )}
      {...props} />
  );
})
SidebarMenuAction.displayName = &rdquo;SidebarMenuAction&rdquo;

const SidebarMenuBadge = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar=&rdquo;menu-badge&rdquo;
    className={cn(
      &rdquo;pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground&rdquo;,
      &rdquo;peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground&rdquo;,
      &rdquo;peer-data-[size=sm]/menu-button:top-1&rdquo;,
      &rdquo;peer-data-[size=default]/menu-button:top-1.5&rdquo;,
      &rdquo;peer-data-[size=lg]/menu-button:top-2.5&rdquo;,
      &rdquo;group-data-[collapsible=icon]:hidden&rdquo;,
      className
    )}
    {...props} />
))
SidebarMenuBadge.displayName = &rdquo;SidebarMenuBadge&rdquo;

const SidebarMenuSkeleton = React.forwardRef(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, [])

  return (
    <div
      ref={ref}
      data-sidebar=&rdquo;menu-skeleton&rdquo;
      className={cn(&rdquo;flex h-8 items-center gap-2 rounded-md px-2&rdquo;, className)}
      {...props}>
      {showIcon && (
        <Skeleton className=&rdquo;size-4 rounded-md&rdquo; data-sidebar=&rdquo;menu-skeleton-icon&rdquo; />
      )}
      <Skeleton
        className=&rdquo;h-4 max-w-[--skeleton-width] flex-1&rdquo;
        data-sidebar=&rdquo;menu-skeleton-text&rdquo;
        style={
          {
            &rdquo;--skeleton-width&rdquo;: width
          }
        } />
    </div>
  );
})
SidebarMenuSkeleton.displayName = &rdquo;SidebarMenuSkeleton&rdquo;

const SidebarMenuSub = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar=&rdquo;menu-sub&rdquo;
    className={cn(
      &rdquo;mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5&rdquo;,
      &rdquo;group-data-[collapsible=icon]:hidden&rdquo;,
      className
    )}
    {...props} />
))
SidebarMenuSub.displayName = &rdquo;SidebarMenuSub&rdquo;

const SidebarMenuSubItem = React.forwardRef(({ ...props }, ref) => <li ref={ref} {...props} />)
SidebarMenuSubItem.displayName = &rdquo;SidebarMenuSubItem&rdquo;

const SidebarMenuSubButton = React.forwardRef(
  ({ asChild = false, size = &rdquo;md&rdquo;, isActive, className, ...props }, ref) => {
    const Comp = asChild ? Slot : &rdquo;a&rdquo;

    return (
      <Comp
        ref={ref}
        data-sidebar=&rdquo;menu-sub-button&rdquo;
        data-size={size}
        data-active={isActive}
        className={cn(
          &rdquo;flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground&rdquo;,
          &rdquo;data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground&rdquo;,
          size === &rdquo;sm&rdquo; && &rdquo;text-xs&rdquo;,
          size === &rdquo;md&rdquo; && &rdquo;text-sm&rdquo;,
          &rdquo;group-data-[collapsible=icon]:hidden&rdquo;,
          className
        )}
        {...props} />
    );
  }
)
SidebarMenuSubButton.displayName = &rdquo;SidebarMenuSubButton&rdquo;

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}