import styled from 'styled-components';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { Theme } from '../../../types/theming';
import { font } from '../../../theme/global/font';

export const Container = styled.div`
  align-items: center;
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
`;

export const SwitchBase = styled(SwitchPrimitive.Root)`
  all: unset;
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step6};
  border-radius: 9999px;
  cursor: pointer;
  height: 16px;
  left: 9px;
  position: relative;
  width: 54px;

  &[data-disabled] {
    background-color: ${({ theme }: { theme: Theme }) => theme.neutral.step6};
    cursor: not-allowed;
  }

  &[data-state='checked'] {
    background-color: ${({ theme }: { theme: Theme }) => theme.primary.step6};

    &[data-disabled] {
      background-color: ${({ theme }: { theme: Theme }) => theme.neutral.step6};
      cursor: not-allowed;
    }
  }
`;

export const SwitchSlider = styled(SwitchPrimitive.Thumb)`
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step9};
  border: 2px solid ${({ theme }: { theme: Theme }) => theme.secondary.step9};
  border-radius: 9999px;
  height: 34px;
  position: absolute;
  top: -10px;
  transform: translateX(-9px);
  transition: transform 0.4s;
  width: 34px;
  will-change: transform;

  :hover {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.secondary.step10};
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.secondary.step10};
  }

  :focus {
    background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step9};
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.secondary.step11};
    outline: none;
  }

  &[data-disabled] {
    background-color: ${({ theme }: { theme: Theme }) => theme.neutral.step9};
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.neutral.step9};
    cursor: not-allowed;
  }

  &[data-state='checked'] {
    background-color: ${({ theme }: { theme: Theme }) => theme.primary.step9};
    border: 2px solid ${({ theme }: { theme: Theme }) => theme.primary.step9};
    transform: translateX(27px);

    :hover {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.primary.step10};
      border: 1px solid ${({ theme }: { theme: Theme }) => theme.primary.step10};
    }

    :focus {
      background-color: ${({ theme }: { theme: Theme }) => theme.primary.step9};
      border: 1px solid ${({ theme }: { theme: Theme }) => theme.primary.step11};
      outline: none;
    }

    &[data-disabled] {
      background-color: ${({ theme }: { theme: Theme }) => theme.neutral.step9};
      border: 1px solid ${({ theme }: { theme: Theme }) => theme.neutral.step9};
      cursor: not-allowed;
    }
  }
`;

export const LabelContainer = styled.label`
  align-items: center;
  display: flex;
  margin-left: 28px;

  label {
    margin-right: 10px;
  }

  svg {
    transform: translateY(0.1rem);
  }
`;

export const StyledLabel = styled.label`
  color: white;
  font-family: ${font.family.body};
  font-weight: ${font.weight.reg};
  font-size: ${font.size.md};

  &.disabled {
    color: ${({ theme }: { theme: Theme }) => theme.neutral.step9};
  }
`;
