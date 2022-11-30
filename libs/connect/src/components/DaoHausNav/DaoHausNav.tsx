import styled, { useTheme } from 'styled-components';

import {
  useBreakpoint,
  widthQuery,
  NavMenu,
  NavMenuList,
  NavMenuItem,
  NavMenuTrigger,
  NavMenuContent,
  NavMenuViewport,
  Button,
  Dropdown,
  DropdownLink,
} from '@daohaus/ui';

import { ConnectButton } from '../ConnectButton';
import { NetworkButton } from '../NetworkButton';

import {
  CaretDown,
  DaoHausNavDropdownList,
  NavRouterLink,
  ViewportPosition,
} from './DaoHausNav.styles';
import { DaoHausNavProps } from './DaoHausNav.types';
import { useMemo } from 'react';
import { RiMenuLine } from 'react-icons/ri';
import classNames from 'classnames';

const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  .connect-box {
    margin-left: 1.2rem;
  }
`;

export const DaoHausNav = () => {
  const isSm = useBreakpoint(widthQuery.sm);
  return (
    <StyledNav className="connect">
      <div>
        <NetworkButton isSm={isSm} />
      </div>
      <div className="connect-box">
        <ConnectButton isSm={isSm} />
      </div>
    </StyledNav>
  );
};

const isActive = (pathname: string, href: string) => pathname === href;

export const DaoHausNavMenu = (props: DaoHausNavProps) => {
  const {
    navLinks = [{ label: 'Hub', href: '/' }],
    dropdownLinks,
    pathname,
    dropdownTriggerLabel = 'More',
  } = props;
  const isSm = useBreakpoint(widthQuery.sm);
  const theme = useTheme();

  const currentLabel = useMemo(() => {
    const currentLink = navLinks.find((link) => isActive(pathname, link.href));
    return currentLink?.label;
  }, [navLinks, pathname]);

  if (isSm) {
    const mobileLinks = dropdownLinks
      ? [...navLinks, ...dropdownLinks]
      : [...navLinks];

    return (
      <Dropdown
        menuBg={theme.secondary.step2}
        trigger={
          <Button color="secondary" variant="outline" IconLeft={RiMenuLine}>
            {currentLabel}
          </Button>
        }
      >
        {mobileLinks.map((mobileLink) => {
          const selected = isActive(pathname, mobileLink.href);
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
    );
  }

  return (
    <NavMenu>
      <NavMenuList>
        {navLinks?.map((navLink, index) => {
          const active = isActive(pathname, navLink.href);
          return (
            <NavMenuItem key={`${navLink.label}-${index}`}>
              <NavRouterLink
                className={classNames({ active })}
                to={navLink.href}
              >
                {navLink.label}
              </NavRouterLink>
            </NavMenuItem>
          );
        })}
        <NavMenuItem>
          <NavMenuTrigger>
            {dropdownTriggerLabel}
            <CaretDown />
          </NavMenuTrigger>
          <NavMenuContent>
            <DaoHausNavDropdownList>
              {dropdownLinks &&
                dropdownLinks.map((dropdownLink, index) => {
                  const active = isActive(pathname, dropdownLink.href);
                  return (
                    <NavMenuItem key={`${dropdownLink.label}-${index}`}>
                      <NavRouterLink
                        className={classNames({ active })}
                        to={dropdownLink.href}
                      >
                        {dropdownLink.label}
                      </NavRouterLink>
                    </NavMenuItem>
                  );
                })}
            </DaoHausNavDropdownList>
          </NavMenuContent>
        </NavMenuItem>
      </NavMenuList>
      {/* <NavMenuIndicator /> */}
      <ViewportPosition>
        <NavMenuViewport />
      </ViewportPosition>
    </NavMenu>
  );
};
