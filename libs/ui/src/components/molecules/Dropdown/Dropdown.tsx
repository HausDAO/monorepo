import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import {
  DropdownMenuProps,
  DropdownMenuContentProps,
  DropdownMenuTriggerProps,
} from '@radix-ui/react-dropdown-menu';

import { Button, ButtonProps } from '../../atoms/Button';

import { Root, DropdownMenuContent, Trigger } from './Dropdown.styles';
import { DropdownTriggerProps } from './Dropdown.types';
import { ProfileButton } from '../ProfileButton';

export const DropdownMenu = Root;

export const DropdownTrigger = (props: DropdownTriggerProps) => {
  if ('profile' in props) {
    return (
      <Trigger asChild>
        <ProfileButton {...props}>{props.children}</ProfileButton>
      </Trigger>
    );
  }
  return (
    <Trigger asChild>
      <Button IconRight={RiArrowDropDownLine} {...props}>
        {props.children}
      </Button>
    </Trigger>
  );
};

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
    <Root
      // open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      modal={modal}
      dir={dir}
    >
      <Trigger asChild>{trigger}</Trigger>
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
    </Root>
  );
};
