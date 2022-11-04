import styled from 'styled-components';

import { Theme } from '../../../types/theming';
import { field } from '../../../theme/component/fieldFamily';

export const BaseTextArea = styled.textarea`
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step3};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.secondary.step3};
  border-radius: ${field.borderRadius};
  color: ${({ theme }: { theme: Theme }) => theme.rootFontColor};
  font-size: ${field.fontSize};
  font-weight: ${field.fontWeight};
  font-family: ${field.fontFamily};
  height: 7.688rem;
  max-width: ${field.size.lg};
  height: ${({ height }: { height?: string }) => height || '12rem'};

  width: 100%;
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.rootBgColor};
  border-radius: ${field.borderRadius};
  line-height: 150%;
  letter-spacing: 1.5px;
  max-width: ${field.size.lg};
  padding: 1.2rem 1.8rem;
  resize: none;
  transition: ${field.transition};
  width: 100%;

  ::placeholder {
    color: ${({ theme }: { theme: Theme }) => theme.secondary.step11};
  }

  :hover {
    background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step4};
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.secondary.step4};
  }

  :focus {
    background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step3};
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.secondary.step6};
    outline: none;
  }

  :disabled {
    background-color: ${({ theme }: { theme: Theme }) => theme.neutral.step5};
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.neutral.step5};
    cursor: not-allowed;
    font-style: italic;

    ::placeholder {
      color: ${({ theme }: { theme: Theme }) => theme.neutral.step10};
    }
  }

  &.full {
    max-width: ${field.size.full};
  }

  &.success {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.success.step9};
  }

  &.warning {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.warning.step9};
  }

  &.error {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.danger.step9};
  }
`;
