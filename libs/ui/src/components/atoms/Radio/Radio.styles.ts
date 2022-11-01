import styled from 'styled-components';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { Theme } from '../../../types/theming';

export const Container = styled.div`
  align-items: center;
  display: flex;
  padding-bottom: 1.4rem;
`;

export const RadioGroup = RadioGroupPrimitive.Root;

export const RadioItem = styled(RadioGroupPrimitive.Item)`
  all: unset;
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step3};
  border: 2px solid ${({ theme }: { theme: Theme }) => theme.secondary.step6};
  border-radius: 100%;
  cursor: pointer;
  height: 2rem;
  position: relative;
  width: 2rem;

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
    background-color: ${({ theme }: { theme: Theme }) => theme.primary.step9};
    border: 2px solid ${({ theme }: { theme: Theme }) => theme.primary.step9};

    :hover {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.primary.step10};
      border: 2px solid ${({ theme }: { theme: Theme }) => theme.primary.step10};
    }

    :focus {
      background-color: ${({ theme }: { theme: Theme }) => theme.primary.step9};
      border: 2px solid ${({ theme }: { theme: Theme }) => theme.primary.step11};
      outline: none;
    }

    :disabled {
      background-color: ${({ theme }: { theme: Theme }) => theme.neutral.step9};
      border: 2px solid ${({ theme }: { theme: Theme }) => theme.neutral.step9};
      cursor: not-allowed;
    }
  }
`;

export const RadioIndicator = styled(RadioGroupPrimitive.Indicator)`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;

  &::after {
    background-color: ${({ theme }: { theme: Theme }) => theme.primary.step3};
    border-radius: 50%;
    content: '';
    display: block;
    height: 1rem;
    width: 1rem;
  }

  &[data-disabled] {
    &::after {
      background-color: ${({ theme }: { theme: Theme }) => theme.neutral.step1};
    }
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
