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
  transition: 0.2s all;
  svg {
    &.icon-right {
      margin-left: auto;
    }
  }

  &[data-state='open'] {
    svg {
      transform: rotate(180deg);
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

  svg {
    width: 2.2rem;
    height: 2.2rem;

    &.icon-left {
      margin-right: 1rem;
    }

    &.icon-right {
      margin-left: 0.5rem;
    }
  }
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

export const DropdownLink = styled(Link)`
  color: ${(props) => props.theme.secondary.step12};

  :hover {
    background-color: ${(props) => props.theme.secondary.step4};
    border-color: ${(props) => props.theme.secondary.step8};
    text-decoration: none;
  }

  &.disabled {
    color: ${(props) => props.theme.secondary.step11};
  }
`;
