import styled from 'styled-components';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { font } from '../../../theme/global/font';
import { Theme } from '../../../types/theming';

export const Container = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 12px;
`;

export const StyledCheckbox = styled(CheckboxPrimitive.Root)`
  align-items: center;
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step3};
  border: 2px solid ${({ theme }: { theme: Theme }) => theme.secondary.step6};
  border-radius: 1px;
  cursor: pointer;
  display: flex;
  height: 18px;
  justify-content: center;
  width: 18px;

  :hover {
    background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step4};
    border: 2px solid ${({ theme }: { theme: Theme }) => theme.secondary.step6};
  }

  :focus {
    background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step3};
    border: 2px solid ${({ theme }: { theme: Theme }) => theme.secondary.step7};
    outline: none;
  }

  :disabled {
    background-color: ${({ theme }: { theme: Theme }) => theme.neutral.step2};
    border: 2px solid ${({ theme }: { theme: Theme }) => theme.neutral.step6};
    cursor: not-allowed;
  }

  &[data-state='checked'] {
    background-color: ${({ theme }: { theme: Theme }) => theme.primary.step3};
    border: 2px solid ${({ theme }: { theme: Theme }) => theme.primary.step9};

    :hover {
      background-color: ${({ theme }: { theme: Theme }) => theme.primary.step4};
      border: 2px solid ${({ theme }: { theme: Theme }) => theme.primary.step9};
    }

    :focus {
      background-color: ${({ theme }: { theme: Theme }) => theme.primary.step3};
      border: 2px solid ${({ theme }: { theme: Theme }) => theme.primary.step10};
      outline: none;
    }

    :disabled {
      background-color: ${({ theme }: { theme: Theme }) => theme.neutral.step2};
      border: 2px solid ${({ theme }: { theme: Theme }) => theme.neutral.step9};
      cursor: not-allowed;
    }
  }
`;

export const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
  color: ${({ theme }: { theme: Theme }) => theme.primary.step9};
  font-size: 2rem;
  padding-top: 3px;
  :disabled {
    color: ${({ theme }: { theme: Theme }) => theme.neutral.step2};
  }
`;

export const LabelContainer = styled.label`
  align-items: center;
  display: flex;
  margin-left: 1.2rem;
  label {
    margin-right: 0.1rem;
  }
  svg {
    transform: translateY(0.1rem);
  }
`;

export const RequiredAsterisk = styled.span`
  color: ${({ theme }: { theme: Theme }) => theme.warning.step9};
  font-weight: ${font.weight.bold};
  margin-right: 8px;
  transform: translateY(-0.25rem);
`;
