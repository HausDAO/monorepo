import {
  NavigationMenuProps,
  NavigationMenuListProps,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuContentProps,
  NavigationMenuLinkProps,
} from '@radix-ui/react-navigation-menu';

export type NavMenuProps = NavigationMenuProps;

export type NavMenuListProps = NavigationMenuListProps;

export type NavMenuItemProps = NavigationMenuItemProps & {
  active?: boolean;
};

export type NavMenuTriggerProps = NavigationMenuTriggerProps;

export type NavMenuContentProps = NavigationMenuContentProps;

export type NavMenuLinkProps = NavigationMenuLinkProps;
