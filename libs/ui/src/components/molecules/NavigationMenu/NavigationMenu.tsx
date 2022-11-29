import React from 'react';
import classNames from 'classnames';
import {
  RiArrowDropDownLine,
  RiCheckLine,
  RiRadioButtonFill,
} from 'react-icons/ri';

import {
  NavMenuProps,
  NavMenuListProps,
  NavMenuTriggerProps,
  NavMenuContentProps,
  NavMenuItemProps,
  NavMenuLinkProps,
} from './NavigationMenu.types';
import {
  Root,
  List,
  Item,
  Trigger,
  Content,
  Link,
  Viewport,
  ViewportPosition,
} from './NavigationMenu.styles';

export const NavViewport = Viewport;
export const NavViewportPosition = ViewportPosition;

export const NavMenu = ({ children, ...props }: NavMenuProps) => (
  <Root {...props}>{children}</Root>
);

export const NavMenuList = ({
  color = 'secondary',
  children,
  ...props
}: NavMenuListProps) => {
  return <List {...props}>{children}</List>;
};

export const NavMenuItem = ({
  color = 'secondary',
  className,
  children,
  ...props
}: NavMenuItemProps) => {
  return (
    <Item color={color} className={` ${className}`} {...props}>
      {children}
    </Item>
  );
};

export const NavMenuTrigger = ({
  color = 'secondary',
  children,
  ...props
}: NavMenuTriggerProps) => {
  return <Trigger {...props}>{children}</Trigger>;
};

export const NavMenuContent = ({
  color = 'secondary',
  className,
  children,
  ...props
}: NavMenuContentProps) => {
  return (
    <Content color={color} {...props}>
      {children}
    </Content>
  );
};

export const NavMenuLink = ({ children, ...props }: NavMenuLinkProps) => {
  return <Link {...props}>{children}</Link>;
};
