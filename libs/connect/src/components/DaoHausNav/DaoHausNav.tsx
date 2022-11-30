import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import {
  useBreakpoint,
  widthQuery,
  NavMenu,
  NavMenuList,
  NavMenuItem,
  NavMenuLink,
  NavMenuTrigger,
  NavMenuContent,
  NavMenuIndicator,
  NavMenuViewport,
  Button,
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

export const DaoHausNavMenu = (props: DaoHausNavProps) => {
  const {
    navLinks,
    dropdownLinks,
    pathname,
    dropdownTriggerLabel = 'More',
  } = props;
  return (
    <NavMenu>
      <NavMenuList>
        {navLinks?.map((navLink) => {
          return (
            <NavMenuItem>
              <NavRouterLink to={navLink.href}>{navLink.label}</NavRouterLink>
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
              {dropdownLinks?.map((dropdownLink, index) => {
                return (
                  <NavMenuItem key={`${dropdownLink.label}-${index}`}>
                    <NavRouterLink to={dropdownLink.href}>
                      {dropdownLink.label}
                    </NavRouterLink>
                  </NavMenuItem>
                );
              })}
            </DaoHausNavDropdownList>
          </NavMenuContent>
        </NavMenuItem>
      </NavMenuList>
      <NavMenuIndicator />
      <ViewportPosition>
        <NavMenuViewport />
      </ViewportPosition>
    </NavMenu>
  );
};
