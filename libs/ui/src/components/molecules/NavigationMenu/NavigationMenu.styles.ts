import styled, { css } from 'styled-components';
import * as RadixNavMenu from '@radix-ui/react-navigation-menu';

import { Theme } from '../../../types/theming';
import { font } from '../../../theme/global/font';
import { border } from '../../../theme/global/border';

export const NavMenuBaseItemStyles = css`
  padding: 8px 12px;
  cursor: pointer;
  outline: none;
  user-select: none;
  font-weight: ${font.weight.reg};
  line-height: ${font.lineHeight};
  letter-spacing: ${font.letterSpacing};
  font-size: ${font.size.lg};
  border-radius: 4px;
  color: ${(props) => props.theme.secondary.step9};

  &:hover {
    color: ${(props) => props.theme.secondary.step10};
  }

  &:focus {
    color: ${(props) => props.theme.secondary.step11};
  }
`;

export const Root = styled(RadixNavMenu.Root)`
  background-color: ${(props) => props.theme.secondary.step2};
  padding: 2.8rem;
`;

export const List = styled(RadixNavMenu.List)`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 30px;
`;

export const Trigger = styled(RadixNavMenu.Trigger)`
  all: unset;
  ${NavMenuBaseItemStyles}
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Item = styled(RadixNavMenu.Item)<{ active: boolean }>``;

export const Link = styled(RadixNavMenu.Link)`
  ${NavMenuBaseItemStyles}
  display: block;
  text-decoration: none;
`;

export const Content = styled(RadixNavMenu.Content)`
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step2};
  border-radius: ${border.cardRadius};
  height: 100%;
  width: fit-content;
`;

export const Indicator = styled(RadixNavMenu.Indicator)`
  bottom: 0;
  height: 2px;
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step11};
  transition: all 0.5s ease;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
`;

export const Sub = styled(RadixNavMenu.Sub)``;

export const Viewport = styled(RadixNavMenu.Viewport)`
  /* width: var(--radix-navigation-menu-viewport-width); */
`;

export const Dropdown = styled.ul`
  padding: 22px;
  margin: 0;
  list-style: none;
`;
