import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import {
  useBreakpoint,
  widthQuery,
  NavMenu,
  NavMenuList,
  NavMenuItem,
  NavMenuTrigger,
  NavMenuContent,
  NavMenuViewport,
  NavMenuLink,
  Button,
} from '@daohaus/ui';

import { ConnectButton } from '../ConnectButton';
import { NetworkButton } from '../NetworkButton';

import {
  CaretDown,
  DaoHausNavDropdownList,
  MobileNavContainer,
  ViewportPosition,
} from './DaoHausNav.styles';
import { DaoHausNavLinkType, DaoHausNavProps } from './DaoHausNav.types';
import { useMemo } from 'react';
import { RiMenuLine } from 'react-icons/ri/index.js';

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

  if (isSm) {
    const mobileLinks = dropdownLinks
      ? [...navLinks, ...dropdownLinks]
      : [...navLinks];
    // Return mobile dropdown
    return <DaoHausNavMobile mobileLinks={mobileLinks} pathname={pathname} />;
  }
  // Return Navigation menu
  return (
    <NavMenu>
      <NavMenuList>
        {navLinks?.map((navLink, index) => {
          const active = isActive(pathname, navLink.href);
          return (
            <NavMenuLink
              asChild
              active={active}
              key={`${navLink.label}-${index}`}
            >
              <RouterLink to={navLink.href}>{navLink.label}</RouterLink>
            </NavMenuLink>
          );
        })}
        {dropdownLinks && (
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
                      <NavMenuLink
                        asChild
                        key={`${dropdownLink.label}-${index}`}
                        active={active}
                      >
                        <RouterLink to={dropdownLink.href}>
                          {dropdownLink.label}
                        </RouterLink>
                      </NavMenuLink>
                    );
                  })}
              </DaoHausNavDropdownList>
            </NavMenuContent>
          </NavMenuItem>
        )}
      </NavMenuList>
      <ViewportPosition>
        <NavMenuViewport />
      </ViewportPosition>
    </NavMenu>
  );
};

const DaoHausNavMobile = ({
  mobileLinks,
  pathname,
}: {
  mobileLinks: DaoHausNavLinkType[];
  pathname: string;
}) => {
  const currentLabel = useMemo(() => {
    const currentLink = [...mobileLinks].find((link) =>
      isActive(pathname, link.href)
    );
    return currentLink?.label;
  }, [mobileLinks, pathname]);
  return (
    <MobileNavContainer>
      <NavMenu>
        <NavMenuList>
          <NavMenuItem>
            <NavMenuTrigger asChild>
              <Button color="secondary" variant="outline" IconLeft={RiMenuLine}>
                {currentLabel}
              </Button>
            </NavMenuTrigger>
            <NavMenuContent>
              {mobileLinks.map((mobileLink) => {
                const selected = isActive(pathname, mobileLink.href);
                return (
                  <NavMenuLink asChild active={selected}>
                    <RouterLink key={mobileLink.label} to={mobileLink.href}>
                      {mobileLink.label}
                    </RouterLink>
                  </NavMenuLink>
                );
              })}
            </NavMenuContent>
          </NavMenuItem>
        </NavMenuList>
        <NavMenuViewport />
      </NavMenu>
    </MobileNavContainer>
  );
};
