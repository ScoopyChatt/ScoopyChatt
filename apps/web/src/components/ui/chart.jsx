import * as React from &rdquo;react&rdquo;
import * as RechartsPrimitive from &rdquo;recharts&rdquo;

import { cn } from &rdquo;@/lib/utils&rdquo;

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = {
  light: &rdquo;&rdquo;,
  dark: &rdquo;.dark&rdquo;
}

const ChartContext = React.createContext(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error(&rdquo;useChart must be used within a <ChartContainer />&rdquo;)
  }

  return context
}

const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, &rdquo;&rdquo;)}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          &rdquo;flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke=&rsquo;#ccc&rsquo;]]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke=&rsquo;#fff&rsquo;]]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke=&rsquo;#ccc&rsquo;]]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke=&rsquo;#ccc&rsquo;]]:stroke-border [&_.recharts-sector[stroke=&rsquo;#fff&rsquo;]]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none&rdquo;,
          className
        )}
        {...props}>
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
})
ChartContainer.displayName = &rdquo;Chart&rdquo;

const ChartStyle = ({
  id,
  config
}) => {
  const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color)

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
.map(([key, itemConfig]) => {
const color =
  itemConfig.theme?.[theme] ||
  itemConfig.color
return color ? `  --color-${key}: ${color};` : null
})
.join(&rdquo;\n&rdquo;)}
}
`)
          .join(&rdquo;\n&rdquo;),
      }} />
  );
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef((
  {
    active,
    payload,
    className,
    indicator = &rdquo;dot&rdquo;,
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    labelClassName,
    formatter,
    color,
    nameKey,
    labelKey,
  },
  ref
) => {
  const { config } = useChart()

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey || item?.dataKey || item?.name || &rdquo;value&rdquo;}`
    const itemConfig = getPayloadConfigFromPayload(config, item, key)
    const value =
      !labelKey && typeof label === &rdquo;string&rdquo;
        ? config[label]?.label || label
        : itemConfig?.label

    if (labelFormatter) {
      return (
        <div className={cn(&rdquo;font-medium&rdquo;, labelClassName)}>
          {labelFormatter(value, payload)}
        </div>
      );
    }

    if (!value) {
      return null
    }

    return <div className={cn(&rdquo;font-medium&rdquo;, labelClassName)}>{value}</div>;
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ])

  if (!active || !payload?.length) {
    return null
  }

  const nestLabel = payload.length === 1 && indicator !== &rdquo;dot&rdquo;

  return (
    <div
      ref={ref}
      className={cn(
        &rdquo;grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl&rdquo;,
        className
      )}>
      {!nestLabel ? tooltipLabel : null}
      <div className=&rdquo;grid gap-1.5&rdquo;>
        {payload
          .filter((item) => item.type !== &rdquo;none&rdquo;)
          .map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || &rdquo;value&rdquo;}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  &rdquo;flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground&rdquo;,
                  indicator === &rdquo;dot&rdquo; && &rdquo;items-center&rdquo;
                )}>
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(&rdquo;shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]&rdquo;, {
                            &rdquo;h-2.5 w-2.5&rdquo;: indicator === &rdquo;dot&rdquo;,
                            &rdquo;w-1&rdquo;: indicator === &rdquo;line&rdquo;,
                            &rdquo;w-0 border-[1.5px] border-dashed bg-transparent&rdquo;:
                              indicator === &rdquo;dashed&rdquo;,
                            &rdquo;my-0.5&rdquo;: nestLabel && indicator === &rdquo;dashed&rdquo;,
                          })}
                          style={
                            {
                              &rdquo;--color-bg&rdquo;: indicatorColor,
                              &rdquo;--color-border&rdquo;: indicatorColor
                            }
                          } />
                      )
                    )}
                    <div
                      className={cn(
                        &rdquo;flex flex-1 justify-between leading-none&rdquo;,
                        nestLabel ? &rdquo;items-end&rdquo; : &rdquo;items-center&rdquo;
                      )}>
                      <div className=&rdquo;grid gap-1.5&rdquo;>
                        {nestLabel ? tooltipLabel : null}
                        <span className=&rdquo;text-muted-foreground&rdquo;>
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className=&rdquo;font-mono font-medium tabular-nums text-foreground&rdquo;>
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
})
ChartTooltipContent.displayName = &rdquo;ChartTooltip&rdquo;

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef((
  { className, hideIcon = false, payload, verticalAlign = &rdquo;bottom&rdquo;, nameKey },
  ref
) => {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        &rdquo;flex items-center justify-center gap-4&rdquo;,
        verticalAlign === &rdquo;top&rdquo; ? &rdquo;pb-3&rdquo; : &rdquo;pt-3&rdquo;,
        className
      )}>
      {payload
        .filter((item) => item.type !== &rdquo;none&rdquo;)
        .map((item) => {
          const key = `${nameKey || item.dataKey || &rdquo;value&rdquo;}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                &rdquo;flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground&rdquo;
              )}>
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className=&rdquo;h-2 w-2 shrink-0 rounded-[2px]&rdquo;
                  style={{
                    backgroundColor: item.color,
                  }} />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
})
ChartLegendContent.displayName = &rdquo;ChartLegend&rdquo;

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config,
  payload,
  key
) {
  if (typeof payload !== &rdquo;object&rdquo; || payload === null) {
    return undefined
  }

  const payloadPayload =
    &rdquo;payload&rdquo; in payload &&
    typeof payload.payload === &rdquo;object&rdquo; &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey = key

  if (
    key in payload &&
    typeof payload[key] === &rdquo;string&rdquo;
  ) {
    configLabelKey = payload[key]
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key] === &rdquo;string&rdquo;
  ) {
    configLabelKey = payloadPayload[key]
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}