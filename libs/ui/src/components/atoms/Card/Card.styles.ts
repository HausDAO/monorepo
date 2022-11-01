import styled, { css } from 'styled-components';

import { Theme } from '../../../types/theming';
import { border } from '../../../theme/global/border';

export const CardStyles = css`
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step2};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.secondary.step5};
  border-radius: ${border.cardRadius};
  padding: 2rem;

  width: ${({ width }: { width: string }) => width};
  max-width: 90vw;
`;

export const BaseCard = styled.div`
  ${CardStyles}/* Saved styles for cards that require hover, focus, or disabled states */

  /*
  :hover {
    background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step3};
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.secondary.step6};
  }

  :focus {
    background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step2};
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.secondary.step7};
    outline: none;
  }

   :disabled {
    background-color: ${({ theme }: { theme: Theme }) => theme.neutral.step2};
    border: 1px solid
      ${({ theme }: { theme: Theme }) => theme.neutral.step5};
    cursor: not-allowed;
  } */
`;
