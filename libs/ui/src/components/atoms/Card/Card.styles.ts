import styled, { css } from 'styled-components';

export const CardStyles = css<{ width?: string }>`
  background-color: ${({ theme }) => theme.card.bg};
  border: 1px solid ${({ theme }) => theme.card.border};
  border-radius: ${({ theme }) => theme.card.radius};
  padding: 2rem;

  width: ${({ width }) => width};
  max-width: 90vw;
`;

export const BaseCard = styled.div<{ width: string }>`
  ${CardStyles}/* Saved styles for cards that require hover, focus, or disabled states */

  /*
  &:hover {
    background-color: ${({ theme }) => theme.secondary.step3};
    border: 1px solid ${({ theme }) => theme.secondary.step6};
  }

  :focus {
    background-color: ${({ theme }) => theme.secondary.step2};
    border: 1px solid ${({ theme }) => theme.secondary.step7};
    outline: none;
  }

   :disabled {
    background-color: ${({ theme }) => theme.neutral.step2};
    border: 1px solid
      ${({ theme }) => theme.neutral.step5};
    cursor: not-allowed;
  } */
`;
