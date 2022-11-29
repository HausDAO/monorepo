import { Align } from '@radix-ui/react-popper';

type NavLinkType = {
  label: string;
  href: string;
};

export type NavigationTabsProps = {
  className?: string;
  navLinks?: NavLinkType[];
  pathname: string;
  dropdownTriggerText?: string;
  dropdownMenuSpacing?: string;
  dropdownMenuAlign?: Align;
  dropdownLinks?: NavLinkType[];
};
