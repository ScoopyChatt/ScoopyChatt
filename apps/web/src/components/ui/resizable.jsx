&rdquo;use client&rdquo;;

import { createContext, useContext } from &rdquo;react&rdquo;;
import { GripVertical } from &rdquo;lucide-react&rdquo;;
import { Group, Panel, Separator } from &rdquo;react-resizable-panels&rdquo;;

import { cn } from &rdquo;@/lib/utils&rdquo;;

const PanelGroupDirectionContext = createContext(&rdquo;horizontal&rdquo;);

const ResizablePanelGroup = ({
  className,
  direction,
  orientation = direction ?? &rdquo;horizontal&rdquo;,
  ...props
}) => (
  <PanelGroupDirectionContext.Provider value={orientation}>
    <Group
      className={cn(
        &rdquo;flex h-full w-full data-[panel-group-direction=vertical]:flex-col&rdquo;,
        className,
      )}
      data-panel-group-direction={orientation}
      orientation={orientation}
      {...props}
    />
  </PanelGroupDirectionContext.Provider>
);

const ResizablePanel = Panel;

const ResizableHandle = ({ withHandle, className, ...props }) => {
  const direction = useContext(PanelGroupDirectionContext);
  return (
    <Separator
      className={cn(
        &rdquo;relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90&rdquo;,
        className,
      )}
      data-panel-group-direction={direction}
      {...props}
    >
      {withHandle && (
        <div className=&rdquo;z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border&rdquo;>
          <GripVertical className=&rdquo;h-2.5 w-2.5&rdquo; />
        </div>
      )}
    </Separator>
  );
};

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };