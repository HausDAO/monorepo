import React from 'react';

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
  Indicator,
} from './NavigationMenu.styles';
import classNames from 'classnames';

export const NavMenuViewport = Viewport;
export const NavMenuIndicator = Indicator;

export const NavMenu = ({ children, ...props }: NavMenuProps) => (
  <Root {...props}>{children}</Root>
);

export const NavMenuList = ({ children, ...props }: NavMenuListProps) => {
  return <List {...props}>{children}</List>;
};

export const NavMenuItem = ({
  active = false,
  className,
  children,
  ...props
}: NavMenuItemProps) => {
  const classes = classNames({ active });
  return (
    <Item className={`${className} ${classes}`} {...props}>
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
  return <Content {...props}>{children}</Content>;
};

export const NavMenuLink = ({ children, ...props }: NavMenuLinkProps) => {
  return <Link {...props}>{children}</Link>;
};
