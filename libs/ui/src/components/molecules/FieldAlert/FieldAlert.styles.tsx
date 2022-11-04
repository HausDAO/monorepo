import styled from 'styled-components';

import { Theme } from '../../../types/theming';
import { border } from '../../../theme/global/border';
import { field } from '../../../theme/component/fieldFamily';

export const FieldAlertWrapper = styled.div<{
  color?: string;
  background?: string;
  border?: string;
}>`
  padding: 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${border.radius};
  max-width: 600px;
  background: ${({ theme }: { theme: Theme }) => theme.primary.step3};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.primary.step6};

  &.full {
    max-width: ${field.size.full};
  }

  &.warning {
    background: ${({ theme }: { theme: Theme }) => theme.warning.step2};
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.warning.step5};
    p {
      color: ${({ theme }: { theme: Theme }) => theme.warning.step10};
    }
    button {
      background-color: ${({ theme }: { theme: Theme }) => theme.warning.step9};
      border: 1px solid ${({ theme }: { theme: Theme }) => theme.warning.step9};
      :hover {
        background-color: ${({ theme }: { theme: Theme }) =>
          theme.warning.step9};
        border: 1px solid
          ${({ theme }: { theme: Theme }) => theme.warning.step9};
      }
      :active {
        background-color: ${({ theme }: { theme: Theme }) =>
          theme.warning.step9};
        border: 1px solid
          ${({ theme }: { theme: Theme }) => theme.warning.step9};
      }
    }
  }
`;
