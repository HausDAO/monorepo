import styled, { css } from 'styled-components';
import * as RadixNavMenu from '@radix-ui/react-navigation-menu';

import { Theme } from '../../../types/theming';
import { font } from '../../../theme/global/font';

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
    box-shadow: 0 0 0 2px purple;
  }
`;

// * Nav Menu implementation
export const Root = styled(RadixNavMenu.Root)`
  position: relative;
  display: flex;
  justify-content: start;
  width: 100vw;
  z-index: 1;
`;

export const List = styled(RadixNavMenu.List)`
  /* background-color: ${(props) => props.theme.secondary.step2}; */
  width: 100vw;
  display: flex;
  justify-content: start;
  list-style: none;
  margin: 0;
`;

export const Trigger = styled(RadixNavMenu.Trigger)`
  all: unset;
  ${BaseItemStyles}
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2;
`;

export const Item = styled(RadixNavMenu.Item)`
  /* ${BaseItemStyles} */
`;

export const Link = styled(RadixNavMenu.Link)`
  ${BaseItemStyles}
  display: block;
  text-decoration: none;
`;

export const Content = styled(RadixNavMenu.Content)`
  position: absolute;
  z-index: 20;
  background-color: ${(props) => props.theme.secondary.step2};
  top: 0;
  left: 0;
  width: fit-content;
`;

export const Indicator = styled(RadixNavMenu.Indicator)`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 10px;
  top: 100%;
  overflow: hidden;
  z-index: 1;
`;

export const Sub = styled(RadixNavMenu.Sub)``;

export const ViewportPosition = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 50%;
  height: 100%;
  top: 100%;
  left: 20px;
  perspective: 2000px;
`;

export const Viewport = styled(RadixNavMenu.Viewport)`
  position: relative;
  transform-origin: top center;
  margin-top: 10px;
  width: 100%;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
`;

export const Dropdown = styled.ul`
  padding: 22px;
  margin: 0;
  list-style: none;
`;
