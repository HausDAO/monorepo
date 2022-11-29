import {
  NavigationMenuProps,
  NavigationMenuListProps,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuContentProps,
  NavigationMenuLinkProps,
} from '@radix-ui/react-navigation-menu';

export type NavMenuProps = NavigationMenuProps & {
  customProp?: string;
};

export type NavMenuListProps = NavigationMenuListProps & {
  customProp?: string;
};

export type NavMenuItemProps = NavigationMenuItemProps & {
  customProp?: string;
};

export type NavMenuTriggerProps = NavigationMenuTriggerProps & {
  customProp?: string;
};

export type NavMenuContentProps = NavigationMenuContentProps & {
  customProp?: string;
};

export type NavMenuLinkProps = NavigationMenuLinkProps & {
  customProp?: string;
};
