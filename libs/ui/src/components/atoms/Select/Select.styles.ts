import styled from 'styled-components';
import { field } from '../../../theme/component/fieldFamily';
import { Theme } from '../../../types/theming';

export const WithIcon = styled.div`
  position: relative;
  width: 100%;
  max-width: ${field.size.md};

  svg {
    position: absolute;
    color: ${({ theme }: { theme: Theme }) => theme.secondary.step11};
    top: 1.4rem;
    right: 2rem;
    pointer-events: none;
  }

  &.long {
    max-width: ${field.size.lg};
  }

  &.full {
    max-width: ${field.size.full};
  }

  &.warning {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.warning.step9};
  }

  &.error {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.danger.step9};
  }
`;

export const BaseSelect = styled.select`
  align-items: center;
  appearance: none;
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step2};
  border: 1px ${({ theme }: { theme: Theme }) => theme.transparent} solid;
  border-radius: ${field.borderRadius};
  color: ${({ theme }: { theme: Theme }) => theme.secondary.step11};
  display: inline-flex;
  font-size: ${field.fontSize};
  font-weight: ${field.fontWeight};
  font-family: ${({ theme }: { theme: Theme }) => theme.font.family.body};
  height: 4.8rem;
  justify-content: space-between;
  line-height: 150%;
  max-width: ${field.size.md};
  padding: 0 1.8rem;
  transition: ${field.transition};
  width: 100%;

  &.long {
    max-width: ${field.size.lg};
  }
  &.full {
    max-width: ${field.size.full};
  }
  &.warning {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.warning.step9};
  }

  &.error {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.danger.step9};
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
    color: ${({ theme }: { theme: Theme }) => theme.neutral.step5};
    cursor: not-allowed;
    font-style: italic;

    ::placeholder {
      color: ${({ theme }: { theme: Theme }) => theme.neutral.step10};
    }
  }
`;

export const StyledOption = styled.option`
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step3};
  color: ${({ theme }: { theme: Theme }) => theme.secondary.step11};
  font-family: ${({ theme }: { theme: Theme }) => theme.font.family.body};
  font-size: ${field.fontSize};
  font-weight: ${field.fontWeight};
  height: 4.8rem;
`;
