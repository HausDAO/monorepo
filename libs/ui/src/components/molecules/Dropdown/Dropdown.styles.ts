import styled, { css } from 'styled-components';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

import { Theme } from '../../../types/theming';
import { font } from '../../../theme/global/font';
import { Button, Link } from '../../atoms';
import { DropdownColor } from './Dropdown.types';

// * Start New Dropdown implementation
export const Root = Dropdown.Root;
export const Portal = Dropdown.Portal;
export const Group = Dropdown.Group;
export const RadioGroup = Dropdown.RadioGroup;

export const Trigger = styled(Dropdown.Trigger)`
  svg {
    &.icon-right {
      margin-left: auto;
    }
  }
`;

const BaseContentStyle = css`
  background-color: ${({
    color,
    theme,
  }: {
    color: DropdownColor;
    theme: Theme;
  }) => theme[color].step3};
  border-radius: 4px;
  font-weight: ${font.weight.reg};
  line-height: ${font.lineHeight};
  letter-spacing: ${font.letterSpacing};
  font-size: ${font.size.md};
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Content = styled(Dropdown.DropdownMenuContent)`
  ${BaseContentStyle}
`;

export const SubContent = styled(Dropdown.DropdownMenuSubContent)`
  ${BaseContentStyle}
`;

export const Label = styled(Dropdown.Label)`
  font-size: ${font.size.xs};
  min-height: 4.8rem;
  padding: 12px;
`;

const BaseItemStyles = css`
  align-items: center;
  background-color: ${({
    color,
    theme,
  }: {
    color: DropdownColor;
    theme: Theme;
  }) => theme[color].step3};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  padding: 0 12px;
  width: 100%;
  outline: none;

  &.md {
    height: 36px;
  }

  &.lg {
    height: 48px;
  }

  &:focus-visible {
    background-color: ${({
      color,
      theme,
    }: {
      color: DropdownColor;
      theme: Theme;
    }) => theme[color].step5};
  }

  &[data-highlighted] {
    background-color: ${({
      color,
      theme,
    }: {
      color: DropdownColor;
      theme: Theme;
    }) => theme[color].step4};
  }

  &[data-disabled] {
    cursor: not-allowed;
    color: ${({ theme }: { theme: Theme }) => theme.neutral.step10};

    & * {
      color: ${({ theme }: { theme: Theme }) => theme.neutral.step10};
    }

    &:hover {
      background-color: ${({
        color,
        theme,
      }: {
        color: DropdownColor;
        theme: Theme;
      }) => theme[color].step3};
    }
  }
`;

export const Item = styled(Dropdown.Item)`
  ${BaseItemStyles}
`;

export const CheckboxItem = styled(Dropdown.CheckboxItem)`
  ${BaseItemStyles}
`;

export const RadioItem = styled(Dropdown.RadioItem)`
  ${BaseItemStyles}
`;

export const SubTrigger = styled(Dropdown.SubTrigger)`
  ${BaseItemStyles}
`;

export const Separator = styled(Dropdown.Separator)`
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step12};
  height: 1px;
  margin: 5px 0;
  width: 100%;
`;

export const ItemIndicator = styled(Dropdown.ItemIndicator)`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

// ! End New Dropdown implementation

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
