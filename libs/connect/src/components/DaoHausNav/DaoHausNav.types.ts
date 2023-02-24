export type DaoHausNavLinkType = {
  label: string;
  href: string;
};

export type DaoHausNavProps = {
  navLinks: DaoHausNavLinkType[];
  pathname: string;
  dropdownTriggerLabel?: string;
  dropdownLinks?: DaoHausNavLinkType[];
};
