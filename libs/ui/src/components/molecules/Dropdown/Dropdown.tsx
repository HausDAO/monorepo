import React from 'react';
import {
  DropdownMenuProps,
  DropdownMenuContentProps,
} from '@radix-ui/react-dropdown-menu';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './Dropdown.styles';

export type DropdownItem = {
  content: React.ReactNode;
  key?: string;
};

type DropdownProps = DropdownMenuProps &
  DropdownMenuContentProps & {
    trigger: React.ReactNode;
    spacing?: string;
    menuMinWidth?: string;
    menuBg?: string;
    className?: string;
  };

export const Dropdown = ({
  defaultOpen,
  open,
  onOpenChange,
  modal,
  dir,
  trigger,
  side,
  sideOffset,
  align = 'start',
  alignOffset,
  avoidCollisions,
  className,
  menuMinWidth = 'fit-content',
  menuBg,
  children,
}: DropdownProps) => {
  return (
    <DropdownMenu
      // open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      modal={modal}
      dir={dir}
    >
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        className={className}
        bgmenu={menuBg}
        minwidth={menuMinWidth}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
