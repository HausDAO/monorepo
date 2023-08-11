import styled from 'styled-components';

import type { BadgeColor, BadgeSize } from './Badge.types';

export const BaseBadge = styled.div<{
  $color: BadgeColor;
  $size: BadgeSize;
}>`
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme, $color }) => theme[`${$color}7`]};
  border: 1px solid ${({ theme, $color }) => theme[`${$color}3`]};
  border-radius: 2.1rem;
  justify-content: center;
  min-height: ${({ $size }) => {
    return $size === 'sm' ? '2.4rem;' : '3.6rem;';
  }};
  min-width: ${({ $size }) => {
    return $size === 'sm' ? '3rem;' : '8.1rem;';
  }};
  padding: ${({ $size }) => {
    return $size === 'sm' ? '0.3rem 0.8rem;' : '0.6rem 1.6rem;';
  }};

  font-size: ${({ $size }) => ($size === 'sm' ? '1.2rem;' : '1.6rem;')};
  color: ${({ theme, $color }) => theme[`${$color}12`]};

  :focus {
    background-color: ${({ theme, $color }) => theme[`${$color}6`]};
    border: 1px solid ${({ theme, $color }) => theme[`${$color}8`]};
  }

  :disabled {
    background-color: ${({ theme, $color }) => theme[`${$color}7`]};
    color: ${({ theme, $color }) => theme[`${$color}9`]};
  }
`;
