import styled from 'styled-components';

import { Theme } from '../../../types/theming';
import { field } from '../../../theme/component/fieldFamily';
import { font } from '../../../theme/global/font';

export const BaseInput = styled.input`
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step3};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.secondary.step3};
  border-radius: ${field.borderRadius};
  color: ${({ theme }: { theme: Theme }) => theme.rootFontColor};
  font-size: ${field.fontSize};
  font-weight: ${field.fontWeight};
  font-family: ${({ theme }: { theme: Theme }) => theme.font.family.body};
  height: 4.8rem;
  line-height: 150%;
  letter-spacing: 1.5px;
  max-width: ${field.size.md};
  padding: 1.2rem 1.8rem;
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
    color: ${({ theme }: { theme: Theme }) => theme.neutral.step10};
    cursor: not-allowed;
    font-style: italic;

    ::placeholder {
      color: ${({ theme }: { theme: Theme }) => theme.neutral.step10};
    }
  }

  &.number {
    font-family: ${({ theme }: { theme: Theme }) => theme.font.family.data};
    font-weight: ${font.weight.reg};
    letter-spacing: 1px;
  }

  &.long {
    max-width: ${field.size.lg};
  }

  &.full {
    max-width: ${field.size.full};
  }

  &.input-select {
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

export const WithIcon = styled.div`
  display: inline-block;
  position: relative;
  max-width: ${field.size.md};
  width: 100%;

  svg {
    color: ${({ theme }: { theme: Theme }) => theme.secondary.step11};
    position: absolute;
    right: 2rem;
    top: 1.4rem;
  }

  input {
    padding: 1.2rem 4.2rem 1.2rem 1.8rem;
  }

  &.long {
    max-width: ${field.size.lg};
  }

  &.full {
    max-width: ${field.size.full};
  }
`;
