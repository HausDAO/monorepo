import styled from 'styled-components';

import { Link } from '../../atoms';

export const NavigationTabsContainer = styled.div`
  width: '100%';
  height: 10rem;
  background-color: ${(props) => props.theme.secondary.step2};

  .nav-link-list {
    padding: 3.2rem 3.5rem 2.2rem 3.5rem;
    a {
      margin-right: 4rem;
    }
  }
  .mobile-box {
    padding: 2.6rem;
  }
`;

// TODO Move to Button component as pre defined button style?
export const DropdownLinkTrigger = styled.button`
  background-color: transparent;
  border: none;
  border-bottom: 2px transparent solid;
  color: ${(props) => props.theme.secondary.step9};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-size: 2.2rem;
  letter-spacing: 1.5px;
  padding-bottom: 1rem;
  transition: 0.2s all;
  padding-left: 0;

  svg {
    margin-left: 0.3rem;
  }

  :hover {
    color: ${(props) => props.theme.secondary.step10};
    text-decoration: none;
  }
  &.selected {
    color: white;
    border-bottom: 2px ${(props) => props.theme.secondary.step9} solid;
  }
  &.navTabs {
    padding-bottom: 1rem;
  }
`;

export const NavLink = styled(Link)`
  border-bottom: 2px transparent solid;
  color: ${(props) => props.theme.secondary.step9};
  cursor: pointer;
  font-size: 2.2rem;
  letter-spacing: 1.5px;
  padding-bottom: 1rem;
  transition: 0.2s all;

  svg {
    margin-left: 0.3rem;
  }

  :hover {
    color: ${(props) => props.theme.secondary.step10};
    text-decoration: none;
  }

  &.selected {
    color: white;
    border-bottom: 2px ${(props) => props.theme.secondary.step9} solid;
  }

  &.nav-tabs {
    padding-bottom: 1rem;
  }
`;

export const DropdownLink = styled(Link)`
  border-radius: 2px;
  color: ${(props) => props.theme.secondary.step9};
  cursor: pointer;
  display: flex;
  font-size: 2.2rem;
  letter-spacing: 1.5px;
  padding: 1rem;
  transition: 0.2s all;
  width: 100%;

  svg {
    margin-left: 0.3rem;
  }

  :hover {
    background-color: ${(props) => props.theme.secondary.step4};
    border-color: ${(props) => props.theme.secondary.step8};
    text-decoration: none;
  }

  &.selected {
    background-color: ${(props) => props.theme.secondary.step9};
    border-color: ${(props) => props.theme.secondary.step6};
    color: ${(props) => props.theme.secondary.step12};
  }
`;
