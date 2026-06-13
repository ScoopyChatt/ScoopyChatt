&rdquo;use client&rdquo;;
import * as React from &rdquo;react&rdquo;
import useEmblaCarousel from &rdquo;embla-carousel-react&rdquo;;
import { ArrowLeft, ArrowRight } from &rdquo;lucide-react&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;
import { Button } from &rdquo;@/components/ui/button&rdquo;

const CarouselContext = React.createContext(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error(&rdquo;useCarousel must be used within a <Carousel />&rdquo;)
  }

  return context
}

const Carousel = React.forwardRef((
  {
    orientation = &rdquo;horizontal&rdquo;,
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
  },
  ref
) => {
  const [carouselRef, api] = useEmblaCarousel({
    ...opts,
    axis: orientation === &rdquo;horizontal&rdquo; ? &rdquo;x&rdquo; : &rdquo;y&rdquo;,
  }, plugins)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api) => {
    if (!api) {
      return
    }

    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback((event) => {
    if (event.key === &rdquo;ArrowLeft&rdquo;) {
      event.preventDefault()
      scrollPrev()
    } else if (event.key === &rdquo;ArrowRight&rdquo;) {
      event.preventDefault()
      scrollNext()
    }
  }, [scrollPrev, scrollNext])

  React.useEffect(() => {
    if (!api || !setApi) {
      return
    }

    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) {
      return
    }

    onSelect(api)
    api.on(&rdquo;reInit&rdquo;, onSelect)
    api.on(&rdquo;select&rdquo;, onSelect)

    return () => {
      api?.off(&rdquo;select&rdquo;, onSelect)
    };
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === &rdquo;y&rdquo; ? &rdquo;vertical&rdquo; : &rdquo;horizontal&rdquo;),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}>
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn(&rdquo;relative&rdquo;, className)}
        role=&rdquo;region&rdquo;
        aria-roledescription=&rdquo;carousel&rdquo;
        {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
})
Carousel.displayName = &rdquo;Carousel&rdquo;

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className=&rdquo;overflow-hidden&rdquo;>
      <div
        ref={ref}
        className={cn(
          &rdquo;flex&rdquo;,
          orientation === &rdquo;horizontal&rdquo; ? &rdquo;-ml-4&rdquo; : &rdquo;-mt-4 flex-col&rdquo;,
          className
        )}
        {...props} />
    </div>
  );
})
CarouselContent.displayName = &rdquo;CarouselContent&rdquo;

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role=&rdquo;group&rdquo;
      aria-roledescription=&rdquo;slide&rdquo;
      className={cn(
        &rdquo;min-w-0 shrink-0 grow-0 basis-full&rdquo;,
        orientation === &rdquo;horizontal&rdquo; ? &rdquo;pl-4&rdquo; : &rdquo;pt-4&rdquo;,
        className
      )}
      {...props} />
  );
})
CarouselItem.displayName = &rdquo;CarouselItem&rdquo;

const CarouselPrevious = React.forwardRef(({ className, variant = &rdquo;outline&rdquo;, size = &rdquo;icon&rdquo;, ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(&rdquo;absolute  h-8 w-8 rounded-full&rdquo;, orientation === &rdquo;horizontal&rdquo;
        ? &rdquo;-left-12 top-1/2 -translate-y-1/2&rdquo;
        : &rdquo;-top-12 left-1/2 -translate-x-1/2 rotate-90&rdquo;, className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}>
      <ArrowLeft className=&rdquo;h-4 w-4&rdquo; />
      <span className=&rdquo;sr-only&rdquo;>Previous slide</span>
    </Button>
  );
})
CarouselPrevious.displayName = &rdquo;CarouselPrevious&rdquo;

const CarouselNext = React.forwardRef(({ className, variant = &rdquo;outline&rdquo;, size = &rdquo;icon&rdquo;, ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(&rdquo;absolute h-8 w-8 rounded-full&rdquo;, orientation === &rdquo;horizontal&rdquo;
        ? &rdquo;-right-12 top-1/2 -translate-y-1/2&rdquo;
        : &rdquo;-bottom-12 left-1/2 -translate-x-1/2 rotate-90&rdquo;, className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}>
      <ArrowRight className=&rdquo;h-4 w-4&rdquo; />
      <span className=&rdquo;sr-only&rdquo;>Next slide</span>
    </Button>
  );
})
CarouselNext.displayName = &rdquo;CarouselNext&rdquo;

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };