import React from 'react';
import classNames from 'classnames';
import {
  RiArrowDropDownLine,
  RiCheckLine,
  RiRadioButtonFill,
} from 'react-icons/ri/index.js';

import { Button } from '../../atoms/Button';
import { ProfileButton } from '../ProfileButton';

import {
  Root,
  Trigger,
  Content,
  Item,
  CheckboxItem,
  ItemIndicator,
  Label,
  Separator,
  Portal,
  Group,
  RadioItem,
  RadioGroup,
} from './Dropdown.styles';
import {
  DropdownTriggerProps,
  DropdownContentProps,
  DropdownItemProps,
  DropdownCheckboxProps,
  DropdownRadioProps,
} from './Dropdown.types';

// * Start New Dropdown Implementation

export const DropdownMenu = Root;
export const DropdownLabel = Label;
export const DropdownGroup = Group;
export const DropdownRadioGroup = RadioGroup;
export const DropdownSeparator = Separator;

export const DropdownTrigger = ({
  color = 'secondary',
  children,
  ...props
}: DropdownTriggerProps) => {
  if ('profile' in props) {
    return (
      <Trigger asChild>
        <ProfileButton color={color} IconRight={RiArrowDropDownLine} {...props}>
          {children}
        </ProfileButton>
      </Trigger>
    );
  }
  return (
    <Trigger asChild>
      <Button color={color} IconRight={RiArrowDropDownLine} {...props}>
        {children}
      </Button>
    </Trigger>
  );
};

export const DropdownContent = React.forwardRef<
  HTMLDivElement,
  DropdownContentProps
>(({ color = 'secondary', className, children, ...props }, forwardedRef) => {
  return (
    <Portal>
      <Content color={color} {...props} ref={forwardedRef}>
        {children}
      </Content>
    </Portal>
  );
});

export const DropdownItem = ({
  color = 'secondary',
  size = 'lg',
  className,
  children,
  IconLeft,
  IconRight,
  ...props
}: DropdownItemProps) => {
  const classes = classNames({
    [size]: size,
  });
  return (
    <Item color={color} className={`${classes} ${className}`} {...props}>
      {children}
    </Item>
  );
};

export const DropdownCheckbox = React.forwardRef<
  HTMLDivElement,
  DropdownCheckboxProps
>(
  (
    {
      color = 'secondary',
      size = 'lg',
      checked,
      className,
      children,
      ...props
    },
    forwardedRef
  ) => {
    const classes = classNames({
      [size]: size,
    });
    return (
      <CheckboxItem
        color={color}
        checked={checked}
        className={`${classes} ${className}`}
        ref={forwardedRef}
        {...props}
      >
        {children}
        {/* <RiCheckLine /> */}
        <ItemIndicator>
          <RiCheckLine />
        </ItemIndicator>
      </CheckboxItem>
    );
  }
);

export const DropdownRadio = React.forwardRef<
  HTMLDivElement,
  DropdownRadioProps
>(
  (
    { color = 'secondary', size = 'lg', className, children, ...props },
    forwardedRef
  ) => {
    const classes = classNames({
      [size]: size,
    });
    return (
      <RadioItem
        color={color}
        className={`${classes} ${className}`}
        ref={forwardedRef}
        {...props}
      >
        {children}
        <ItemIndicator>
          <RiRadioButtonFill />
        </ItemIndicator>
      </RadioItem>
    );
  }
);
