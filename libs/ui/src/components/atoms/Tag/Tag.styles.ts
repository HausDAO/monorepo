import styled from 'styled-components';

import { border } from '../../../theme/global/border';

export const BaseTag = styled.div<{
  tagColor: 'blue' | 'green' | 'pink' | 'violet' | 'yellow' | 'red';
  fontSize?: string;
}>`
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme, tagColor }) => theme[`${tagColor}3`]};
  border: 1px solid ${({ theme, tagColor }) => theme[`${tagColor}3`]};
  border-radius: ${border.radius};
  color: ${({ theme, tagColor }) => theme[`${tagColor}11`]};
  height: fit-content;
  width: fit-content;
  padding: 0.5rem 0.8rem;
  font-size: ${({ fontSize }) => fontSize};
  &:hover {
    background-color: ${({ theme, tagColor }) => theme[`${tagColor}3`]};
    border: 1px solid ${({ theme, tagColor }) => theme[`${tagColor}4`]};
  }

  :focus {
    background-color: ${({ theme, tagColor }) => theme[`${tagColor}3`]};
    border: 1px solid ${({ theme, tagColor }) => theme[`${tagColor}5`]};
    outline: none;
  }

  /* We might not need this */
  :disabled {
    background-color: ${({ theme }) => theme.neutral.step2};
    border: 1px solid ${({ theme }) => theme.neutral.step5};
    cursor: not-allowed;
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
    color: ${({ theme, tagColor }) => theme[`${tagColor}11`]};
  }

  svg.icon-left {
    margin-right: 1rem;
  }

  svg.icon-right {
    margin-left: 0.5rem;
  }
`;
