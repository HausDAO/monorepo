import styled, { css } from 'styled-components';
import * as RadixNavMenu from '@radix-ui/react-navigation-menu';

import { Theme } from '../../../types/theming';
import { font } from '../../../theme/global/font';
import { border } from '../../../theme/global/border';

const BaseItemStyles = css`
  padding: 8px 12px;
  outline: none;
  user-select: none;
  font-weight: ${font.weight.reg};
  line-height: ${font.lineHeight};
  letter-spacing: ${font.letterSpacing};
  font-size: ${font.size.md};
  border-radius: 4px;
  color: ${(props) => props.theme.secondary.step9};

  &:hover {
    color: ${(props) => props.theme.secondary.step10};
  }

  &:focus {
    color: ${(props) => props.theme.secondary.step11};
  }
`;

export const Root = styled(RadixNavMenu.Root)``;

export const List = styled(RadixNavMenu.List)`
  background-color: ${(props) => props.theme.secondary.step2};
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Trigger = styled(RadixNavMenu.Trigger)`
  all: unset;
  ${BaseItemStyles}
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2;
`;

export const Item = styled(RadixNavMenu.Item)<{ active: boolean }>``;

export const Link = styled(RadixNavMenu.Link)`
  ${BaseItemStyles}
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

export const ViewportPosition = styled.div``;

export const Viewport = styled(RadixNavMenu.Viewport)`
  /* width: var(--radix-navigation-menu-viewport-width); */
`;

export const Dropdown = styled.ul`
  padding: 22px;
  margin: 0;
  list-style: none;
`;
