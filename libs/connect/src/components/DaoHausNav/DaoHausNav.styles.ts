import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { NavMenuBaseItemStyles } from '@daohaus/ui';
import { RiArrowDropDownLine } from 'react-icons/ri';

export const NavRouterLink = styled(RouterLink)`
  ${NavMenuBaseItemStyles}
  display: block;
  text-decoration: none;
`;

export const CaretDown = styled(RiArrowDropDownLine)`
  position: relative;
  top: 1;
  transition: transform 250ms ease;
  [data-state='open'] & {
    transform: rotate(-180deg);
  }
`;

export const ViewportPosition = styled.div`
  position: absolute;
  left: 64rem;
`;

export const DaoHausNavDropdownList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  list-style: none;
  padding: 6px;
  margin: 0;
`;
