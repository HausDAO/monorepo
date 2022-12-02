import { useMemo } from 'react';
import { useTheme } from 'styled-components';
import { RiArrowDropDownLine, RiMenuLine } from 'react-icons/ri/index.js';

import { useBreakpoint } from '../../../hooks/useMediaQuery';
import { widthQuery } from '../../../theme/global/breakpoints';
import { Button } from '../../atoms';
import { Dropdown } from '../../molecules';

import { NavigationTabsProps } from './NavigationTabs.types';
import {
  NavigationTabsContainer,
  DropdownLinkTrigger,
  DropdownLink,
  NavLink,
} from './NavigationTabs.styles';

const isSelected = (pathname: string, href: string) => pathname === href;

export const NavigationTabs = (props: NavigationTabsProps) => {
  const {
    className,
    navLinks = [],
    dropdownTriggerText = 'More',
    dropdownMenuAlign = 'end',
    dropdownMenuSpacing = '2rem',
    dropdownLinks = [],
    pathname,
  } = props;

  const theme = useTheme();
  const isSm = useBreakpoint(widthQuery.sm);
  const mobileLinks = [...navLinks, ...dropdownLinks];

  const currentLabel = useMemo(() => {
    const currentLink = navLinks.find((link) =>
      isSelected(pathname, link.href)
    );
    return currentLink?.label;
  }, [navLinks, pathname]);

  return (
    <NavigationTabsContainer className={className}>
      {isSm ? (
        <div className="mobile-box">
          <Dropdown
            menuBg={theme.secondary.step2}
            align={dropdownMenuAlign}
            spacing={dropdownMenuSpacing}
            trigger={
              <Button color="secondary" variant="outline" IconLeft={RiMenuLine}>
                {currentLabel}
              </Button>
            }
          >
            {mobileLinks.map((mobileLink) => {
              const selected = isSelected(pathname, mobileLink.href);
              return (
                <DropdownLink
                  key={mobileLink.label}
                  href={mobileLink.href}
                  selected={selected}
                >
                  {mobileLink.label}
                </DropdownLink>
              );
            })}
          </Dropdown>
        </div>
      ) : (
        <div className="nav-link-list">
          {navLinks.map((link) => {
            const selected = isSelected(pathname, link.href);
            return (
              <NavLink key={link.label} href={link.href} selected={selected}>
                {link.label}
              </NavLink>
            );
          })}
          {dropdownLinks.length > 0 && (
            <Dropdown
              modal={false}
              menuBg={theme.secondary.step2}
              align={dropdownMenuAlign}
              spacing={dropdownMenuSpacing}
              trigger={
                <DropdownLinkTrigger>
                  {dropdownTriggerText}
                  <RiArrowDropDownLine />
                </DropdownLinkTrigger>
              }
            >
              {dropdownLinks.map((dropdownLink, index) => {
                const selected = isSelected(pathname, dropdownLink.href);
                return (
                  <DropdownLink
                    key={`${dropdownLink.label}-${index}`}
                    href={dropdownLink.href}
                    selected={selected}
                  >
                    {dropdownLink.label}
                  </DropdownLink>
                );
              })}
            </Dropdown>
          )}
        </div>
      )}
    </NavigationTabsContainer>
  );
};
