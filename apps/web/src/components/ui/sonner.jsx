import { useTheme } from &rdquo;next-themes&rdquo;
import { Toaster as Sonner } from &rdquo;sonner&rdquo;

const Toaster = ({
  ...props
}) => {
  const { theme = &rdquo;system&rdquo; } = useTheme()

  return (
    <Sonner
      theme={theme}
      className=&rdquo;toaster group&rdquo;
      toastOptions={{
        classNames: {
          toast:
            &rdquo;group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg&rdquo;,
          description: &rdquo;group-[.toast]:text-muted-foreground&rdquo;,
          actionButton:
            &rdquo;group-[.toast]:bg-primary group-[.toast]:text-primary-foreground&rdquo;,
          cancelButton:
            &rdquo;group-[.toast]:bg-muted group-[.toast]:text-muted-foreground&rdquo;,
        },
      }}
      {...props} />
  );
}

export { Toaster }