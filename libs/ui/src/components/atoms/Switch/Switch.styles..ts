import styled from 'styled-components';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { font } from '../../../theme/global/font';

export const Container = styled.div`
  align-items: center;
  display: flex;
  padding-top: 12px;
  padding-bottom: 12px;
`;

export const SwitchBase = styled(SwitchPrimitive.Root)`
  all: unset;
  background-color: ${({ theme }) => theme.switch.base.bg};
  border-radius: 9999px;
  cursor: pointer;
  height: 16px;
  left: 9px;
  position: relative;
  width: 54px;

  &[data-disabled] {
    background-color: ${({ theme }) => theme.switch.base.disabled.bg};
    cursor: not-allowed;
  }

  &[data-state='checked'] {
    background-color: ${({ theme }) => theme.switch.base.active.bg};

    &[data-disabled] {
      background-color: ${({ theme }) => theme.switch.base.active.disabled.bg};
      cursor: not-allowed;
    }
  }
`;

export const SwitchSlider = styled(SwitchPrimitive.Thumb)`
  background-color: ${({ theme }) => theme.switch.indicator.bg};
  border: 2px solid ${({ theme }) => theme.switch.indicator.border};
  border-radius: 9999px;
  height: 34px;
  position: absolute;
  top: -10px;
  transform: translateX(-9px);
  transition: transform 0.4s;
  width: 34px;
  will-change: transform;

  &:hover {
    background-color: ${({ theme }) => theme.switch.indicator.hover.bg};
    border: 1px solid ${({ theme }) => theme.switch.indicator.hover.border};
  }

  :focus {
    background-color: ${({ theme }) => theme.switch.indicator.focus.bg};
    border: 1px solid ${({ theme }) => theme.switch.indicator.focus.border};
    outline: none;
  }

  &[data-disabled] {
    background-color: ${({ theme }) => theme.switch.indicator.disabled.bg};
    border: 1px solid ${({ theme }) => theme.switch.indicator.disabled.border};
    cursor: not-allowed;
  }

  &[data-state='checked'] {
    background-color: ${({ theme }) => theme.switch.indicator.active.bg};
    border: 2px solid ${({ theme }) => theme.switch.indicator.active.border};
    transform: translateX(27px);

    &:hover {
      background-color: ${({ theme }) =>
        theme.switch.indicator.active.hover.bg};
      border: 1px solid
        ${({ theme }) => theme.switch.indicator.active.hover.border};
    }

    :focus {
      background-color: ${({ theme }) =>
        theme.switch.indicator.active.focus.bg};
      border: 1px solid
        ${({ theme }) => theme.switch.indicator.active.focus.border};
      outline: none;
    }

    &[data-disabled] {
      background-color: ${({ theme }) =>
        theme.switch.indicator.active.disabled.bg};
      border: 1px solid
        ${({ theme }) => theme.switch.indicator.active.disabled.border};
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
  color: ${({ theme }) => theme.switch.label.color};
  font-family: ${({ theme }) => theme.font.family.body};
  font-weight: ${font.weight.reg};
  font-size: ${font.size.md};

  &.disabled {
    color: ${({ theme }) => theme.switch.label.disabled.color};
  }
`;
