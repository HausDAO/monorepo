import styled from 'styled-components';

export const BaseInput = styled.input`
  background-color: ${({ theme }) => theme.input.bg};
  border: 1px solid ${({ theme }) => theme.input.border};
  border-radius: ${({ theme }) => theme.field.radius};
  color: ${({ theme }) => theme.input.color};
  font-size: ${({ theme }) => theme.field.fontSize};
  font-weight: ${({ theme }) => theme.field.fontWeight};
  font-family: ${({ theme }) => theme.field.inputFont};
  height: 4.8rem;
  line-height: 150%;
  letter-spacing: 1.5px;
  max-width: ${({ theme }) => theme.field.size.md};
  padding: 1.2rem 1.8rem;
  transition: ${({ theme }) => theme.field.transition};
  width: 100%;

  ::placeholder {
    color: ${({ theme }) => theme.input.placeholder};
  }

  &:hover {
    background-color: ${({ theme }) => theme.input.hover.bg};
    border: 1px solid ${({ theme }) => theme.input.hover.border};
  }

  :focus {
    background-color: ${({ theme }) => theme.input.focus.bg};
    border: 1px solid ${({ theme }) => theme.input.focus.border};
    outline: none;
  }

  :disabled {
    background-color: ${({ theme }) => theme.input.disabled.bg};
    border: 1px solid ${({ theme }) => theme.input.disabled.border};
    color: ${({ theme }) => theme.input.disabled.color};
    cursor: not-allowed;
    font-style: italic;

    ::placeholder {
      color: ${({ theme }) => theme.input.disabled.placeholder};
    }
  }

  &.number {
    font-family: ${({ theme }) => theme.font.family.data};
    font-weight: ${({ theme }) => theme.font.weight.reg};
    letter-spacing: 1px;
  }

  &.long {
    max-width: ${({ theme }) => theme.field.size.lg};
  }

  &.full {
    max-width: ${({ theme }) => theme.field.size.full};
  }

  &.input-select {
    max-width: ${({ theme }) => theme.field.size.full};
  }

  &.success {
    border: 1px solid ${({ theme }) => theme.input.success.border};
  }

  &.warning {
    border: 1px solid ${({ theme }) => theme.input.warning.border};
  }

  &.error {
    border: 1px solid ${({ theme }) => theme.input.error.border};
  }
`;

export const WithIcon = styled.div`
  display: inline-block;
  position: relative;
  max-width: ${({ theme }) => theme.field.size.md};
  width: 100%;

  svg {
    color: ${({ theme }) => theme.input.icon.color};
    position: absolute;
    right: 2rem;
    top: 1.4rem;
  }

  input {
    padding: 1.2rem 4.2rem 1.2rem 1.8rem;
  }

  &.long {
    max-width: ${({ theme }) => theme.field.size.lg};
  }

  &.full {
    max-width: ${({ theme }) => theme.field.size.full};
  }
`;
