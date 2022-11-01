import { useState } from 'react';
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from './Tooltip.styles';
import { SmTooltipIcon } from './TooltipTriggers';

export type TooltipProps = {
  content?: string | React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  triggerEl?: React.ReactNode;
  offset?: number;
  delay?: number;
  triggerAsChild?: boolean;
};

export const Tooltip = ({
  content = 'Content goes here',
  side = 'right',
  triggerEl = <SmTooltipIcon />,
  offset = 18,
  delay = 400,
  triggerAsChild = false,
}: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const [stayOpen, setStayOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setStayOpen(true);
  };

  const handleClickOutside = () => {
    setOpen(false);
    setStayOpen(false);
  };

  return (
    <TooltipProvider delayDuration={delay}>
      <TooltipRoot open={open || stayOpen} onOpenChange={setOpen}>
        <TooltipTrigger onClick={handleClickOpen} asChild={triggerAsChild}>
          {triggerEl}
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            side={side}
            sideOffset={offset}
            onEscapeKeyDown={handleClickOutside}
            onPointerDownOutside={handleClickOutside}
          >
            {content}
            <TooltipArrow />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  );
};
