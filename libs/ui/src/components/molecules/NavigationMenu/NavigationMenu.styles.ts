import styled, { css, keyframes } from 'styled-components';
import * as RadixNavMenu from '@radix-ui/react-navigation-menu';

export const Root = styled(RadixNavMenu.Root)`
  background-color: ${(props) => props.theme.secondary.step2};
  padding: 2.8rem;
`;

export const Content = styled(RadixNavMenu.Content)`
  position: absolute;
  top: 100%;
  background-color: ${({ theme }) => theme.navigationMenu.content.bg};
  border: 1px solid ${({ theme }) => theme.navigationMenu.content.border};
  border-radius: 4px;
  font-weight: ${({ theme }) => theme.font.weight.reg};
  line-height: ${({ theme }) => theme.font.lineHeight};
  letter-spacing: ${({ theme }) => theme.font.letterSpacing};
  font-size: ${({ theme }) => theme.font.size.md};
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: fit-content;
`;

export const NavMenuBaseItemStyles = css`
  padding: 8px 12px;
  cursor: pointer;
  outline: none;
  user-select: none;
  font-weight: ${({ theme }) => theme.font.weight.reg};
  line-height: ${({ theme }) => theme.font.lineHeight};
  letter-spacing: ${({ theme }) => theme.font.letterSpacing};
  font-size: ${({ theme }) => theme.font.size.lg};
  border-radius: 4px;
  color: ${({ theme }) => theme.navigationMenu.baseItem.color};

  &&:hover {
    color: ${({ theme }) => theme.navigationMenu.baseItem.hover.bg};
  }

  &:focus {
    color: ${({ theme }) => theme.navigationMenu.baseItem.focus.bg};
  }
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

export const Item = styled(RadixNavMenu.Item)``;

export const Link = styled(RadixNavMenu.Link)`
  ${NavMenuBaseItemStyles}
  display: block;
  text-decoration: none;

  &[data-active] {
    color: ${({ theme }) => theme.navigationMenu.link.active.color};
    border-bottom: 2px ${({ theme }) => theme.navigationMenu.link.active.border}
      solid;
  }
`;

export const Indicator = styled(RadixNavMenu.Indicator)`
  bottom: 0;
  height: 2px;
  background-color: ${({ theme }) => theme.secondary.step11};
  transition: all 0.5s ease;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
`;

export const Sub = styled(RadixNavMenu.Sub);

const scaleIn = keyframes({
  from: { transform: 'rotateX(-30deg) scale(0.9)', opacity: 0 },
  to: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
});

const scaleOut = keyframes({
  from: { transform: 'rotateX(0deg) scale(1)', opacity: 1 },
  to: { transform: 'rotateX(-10deg) scale(0.95)', opacity: 0 },
});

export const Viewport = styled(RadixNavMenu.Viewport)`
  position: relative;
  transform-origin: top center;
  transition: width, height, 300ms ease;
  &[data-state='open'] {
    animation: ${scaleIn} 200ms ease;
  }
  &[data-state='closed'] {
    animation: ${scaleOut} 200ms ease;
  }
`;

export const Dropdown = styled.ul`
  padding: 22px;
  margin: 0;
  list-style: none;
`;
