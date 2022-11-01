import styled from 'styled-components';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

import { Theme } from '../../../types/theming';
import { Button, Link } from '../../atoms';

export const DropdownMenu = Dropdown.Root;
export const DropdownMenuTrigger = styled(Dropdown.Trigger)``;

type MenuContentType = {
  bgmenu?: string;
  minwidth: string;
  theme: Theme;
};

export const DropdownMenuContent = styled(Dropdown.DropdownMenuContent)`
  background-color: ${(props: MenuContentType) =>
    props.bgmenu ? props.bgmenu : props.theme.secondary.step3};
  padding: 0.4rem;
  min-width: ${(props: MenuContentType) => props.minwidth};
  z-index: 10;
`;

export const DropdownMenuLabel = styled(Dropdown.Label)`
  display: flex;
  align-items: flex-start;
  padding: 1.2rem;
  min-height: 4.8rem;
`;

export const DropdownButton = styled(Button)`
  /* TODO This should be handled using dropdown checkboxes */
  &.selected {
    background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step9};
  }
`;

export const DropdownMenuItem = styled(Dropdown.Item)`
  margin-bottom: ${(props: { spacing?: string }) => props.spacing};
`;

/*
 * TODO Centralize Dropdown Variantes and Base Styles.
 * Base styles for Links, Tabs, Buttons, etc should exists as components in
 * the Dropdown components that can be futhers customized on imports
 * Variants for dropdowns should be in a centralized place and
 */

/*
 * Following are styled as Links
 */

// TODO update colors to be dropdown specific
export const DropdownTriggerLink = styled.button`
  background-color: transparent;
  border: none;
  border-bottom: 2px transparent solid;
  color: ${(props) => props.theme.secondary.step12};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
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

  &.navTabs {
    padding-bottom: 1rem;
  }
`;

// TODO Update theme colors to be dropdown specific
export const DropdownLink = styled(Link)`
  border-radius: 2px;
  color: ${(props) => props.theme.secondary.step12};
  cursor: pointer;
  display: flex;
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

  &.disabled {
    color: ${(props) => props.theme.secondary.step11};
  }
`;

export const DropdownText = styled.div`
  border-radius: 2px;
  color: ${(props) => props.theme.secondary.step12};
  cursor: pointer;
  display: flex;
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

  &.disabled {
    color: ${(props) => props.theme.secondary.step11};
  }
`;

// TODO Add Dropdown styles for Checkbox, Radio, and Radio Group
