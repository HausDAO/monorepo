import styled from 'styled-components';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { font } from '../../../theme/global/font';

export const Container = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 12px;
`;

export const StyledCheckbox = styled(CheckboxPrimitive.Root)`
  align-items: center;
  background-color: ${({ theme }) => theme.checkbox.bg};
  border: 2px solid ${({ theme }) => theme.checkbox.border};
  border-radius: 1px;
  cursor: pointer;
  display: flex;
  height: 18px;
  justify-content: center;
  width: 18px;

  &:hover {
    background-color: ${({ theme }) => theme.checkbox.hover.bg};
    border: 2px solid ${({ theme }) => theme.checkbox.hover.border};
  }

  :focus {
    background-color: ${({ theme }) => theme.checkbox.focus.bg};
    border: 2px solid ${({ theme }) => theme.checkbox.focus.border};
    outline: none;
  }

  :disabled {
    background-color: ${({ theme }) => theme.checkbox.disabled.bg};
    border: 2px solid ${({ theme }) => theme.checkbox.disabled.border};
    cursor: not-allowed;
  }

  &[data-state='checked'] {
    background-color: ${({ theme }) => theme.checkbox.active.bg};
    border: 2px solid ${({ theme }) => theme.checkbox.active.border};

    &:hover {
      background-color: ${({ theme }) => theme.checkbox.active.hover.bg};
      border: 2px solid ${({ theme }) => theme.checkbox.active.hover.border};
    }

    :focus {
      background-color: ${({ theme }) => theme.checkbox.active.focus.bg};
      border: 2px solid ${({ theme }) => theme.checkbox.active.focus.border};
      outline: none;
    }

    :disabled {
      background-color: ${({ theme }) => theme.checkbox.active.disabled.bg};
      border: 2px solid ${({ theme }) => theme.checkbox.active.disabled.border};
      cursor: not-allowed;
    }
  }
`;

export const StyledIndicator = styled(CheckboxPrimitive.Indicator)`
  color: ${({ theme }) => theme.checkbox.indicator.color};
  font-size: 2rem;
  padding-top: 3px;
  :disabled {
    color: ${({ theme }) => theme.checkbox.indicator.disabled.color};
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
  color: ${({ theme }) => theme.warning.step9};
  font-weight: ${font.weight.bold};
  margin-right: 8px;
  transform: translateY(-0.25rem);
`;
