import styled from 'styled-components';

import { Loading } from '../Loading';
import { ButtonJustifyContent, ButtonColor } from './Button.types';

export const StyledButton = styled.button<{
  $justify: ButtonJustifyContent;
  $color: ButtonColor;
}>`
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius};
  cursor: pointer;
  display: flex;
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  height: 4.8rem;
  justify-content: ${({ $justify }) => $justify};
  letter-spacing: 1.8px;
  outline: none;
  padding: 1.2rem;
  text-decoration: none;
  transition: 0.2s all;
  width: fit-content;

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

  &.solid {
    background-color: ${({ theme, $color }) =>
      theme.button[`${$color}`].solid.bg};
    border: 0.1rem solid
      ${({ theme, $color }) => theme.button[`${$color}`].solid.border};
    color: ${({ theme, $color }) => theme.button[`${$color}`].solid.text};

    &:hover {
      background-color: ${({ theme, $color }) =>
        theme.button[`${$color}`].solid.bgHover};
      border: 0.1rem solid
        ${({ theme, $color }) => theme.button[`${$color}`].solid.borderHover};
    }

    &:focus {
      background-color: ${({ theme, $color }) =>
        theme.button[`${$color}`].solid.bgFocus};
      border: 0.1rem solid
        ${({ theme, $color }) => theme.button[`${$color}`].solid.borderFocus};
    }

    &:disabled {
      background-color: ${({ theme, $color }) =>
        theme.button[`${$color}`].solid.bgDisabled};
      border: 0.1rem solid
        ${({ theme, $color }) => theme.button[`${$color}`].solid.borderDisabled};
      cursor: not-allowed;
    }
  }

  &.outline {
    background-color: transparent;
    border: 0.1rem solid
      ${({ theme, $color }) => theme.button[`${$color}`].outline.border};
    color: ${({ theme, $color }) => theme.button[`${$color}`].outline.text};

    &:hover {
      border: 0.1rem solid
        ${({ theme, $color }) => theme.button[`${$color}`].outline.hover};
      color: ${({ theme, $color }) => theme.button[`${$color}`].outline.hover};
    }

    &:focus {
      border: 0.1rem solid
        ${({ theme, $color }) => theme.button[`${$color}`].outline.focus};
      color: ${({ theme, $color }) => theme.button[`${$color}`].outline.focus};
    }

    &:disabled {
      border: 0.1rem solid
        ${({ theme, $color }) => theme.button[`${$color}`].outline.disabled};
      color: ${({ theme, $color }) =>
        theme.button[`${$color}`].outline.disabled};
      cursor: not-allowed;
    }
  }

  &.ghost {
    background-color: ${({ theme }) => theme.transparent};
    border: 1px solid ${({ theme }) => theme.transparent};
    color: ${({ theme, $color }) => theme.button[`${$color}`].ghost.text};

    &:hover {
      background-color: ${({ theme, $color }) =>
        theme.button[`${$color}`].ghost.bgHover};
    }

    &:focus {
      border: 1px solid
        ${({ theme, $color }) => theme.button[`${$color}`].ghost.borderFocus};
    }

    &:disabled {
      color: ${({ theme, $color }) => theme.button[`${$color}`].ghost.disabled};
      cursor: not-allowed;
    }
  }

  &.link {
    height: auto;
    font-family: ${({ theme }) => theme.font.family.body};
    font-weight: ${({ theme }) => theme.font.weight.reg};
    font-size: ${({ theme }) => theme.font.size.md};
    text-decoration: none;
    letter-spacing: 1.5px;
    padding: 0;
    background-color: transparent;
    border: none;
    color: ${({ theme, $color }) => theme.button[`${$color}`].link.text};

    &:hover {
      color: ${({ theme, $color }) => theme.button[`${$color}`].link.hover};
      text-decoration: underline;
    }

    &:focus {
      color: ${({ theme, $color }) => theme.button[`${$color}`].link.focus};
    }

    &:disabled {
      color: ${({ theme, $color }) => theme.button[`${$color}`].link.disabled};
      cursor: not-allowed;
    }
  }

  &.lg {
    font-size: ${({ theme }) => theme.font.size.lg};
    height: 6rem;
    min-width: 10.7rem;
    padding: 1.5rem;

    svg {
      height: 3.2rem;
      width: 3.2rem;
    }
  }

  &.sm {
    font-size: ${({ theme }) => theme.font.size.xs};
    height: 3.6rem;
    min-width: 6.6rem;
    padding: 0.9rem;

    svg {
      height: 1.8rem;
      width: 1.8rem;
    }
  }

  &.loading {
    .icon-left,
    .icon-right {
      visibility: hidden;
    }
  }

  &.full-width {
    min-width: 100%;
  }
`;

export const LoadingAbsolute = styled(Loading)`
  position: fixed;
`;

export const StyledInvisibleSpan = styled.span`
  visibility: hidden;
`;
