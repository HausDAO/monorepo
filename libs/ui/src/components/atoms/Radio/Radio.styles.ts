import styled from 'styled-components';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

export const Container = styled.div`
  align-items: center;
  display: flex;
  padding-bottom: 1.4rem;
`;

export const RadioGroup = RadioGroupPrimitive.Root;

export const RadioItem = styled(RadioGroupPrimitive.Item)`
  all: unset;
  background-color: ${({ theme }) => theme.radio.bg};
  border: 2px solid ${({ theme }) => theme.radio.border};
  border-radius: 100%;
  cursor: pointer;
  height: 2rem;
  position: relative;
  width: 2rem;

  :hover {
    background-color: ${({ theme }) => theme.radio.hover.bg};
    border: 2px solid ${({ theme }) => theme.radio.hover.border};
  }

  :focus {
    background-color: ${({ theme }) => theme.radio.focus.bg};
    border: 2px solid ${({ theme }) => theme.radio.focus.border};
    outline: none;
  }

  :disabled {
    background-color: ${({ theme }) => theme.radio.disabled.bg};
    border: 2px solid ${({ theme }) => theme.radio.disabled.border};
    cursor: not-allowed;
  }

  &[data-state='checked'] {
    background-color: ${({ theme }) => theme.radio.active.bg};
    border: 2px solid ${({ theme }) => theme.radio.active.border};

    :hover {
      background-color: ${({ theme }) => theme.radio.active.hover.bg};
      border: 2px solid ${({ theme }) => theme.radio.active.hover.border};
    }

    :focus {
      background-color: ${({ theme }) => theme.radio.active.focus.bg};
      border: 2px solid ${({ theme }) => theme.radio.active.focus.border};
      outline: none;
    }

    :disabled {
      background-color: ${({ theme }) => theme.radio.active.disabled.bg};
      border: 2px solid ${({ theme }) => theme.radio.active.disabled.border};
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
    background-color: ${({ theme }) => theme.radio.indicator.bg};
    border-radius: 50%;
    content: '';
    display: block;
    height: 1rem;
    width: 1rem;
  }

  &[data-disabled] {
    &::after {
      background-color: ${({ theme }) => theme.radio.indicator.disabled.bg};
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
