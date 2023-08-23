import styled from 'styled-components';

export const BaseTextArea = styled.textarea<{ height?: string }>`
  background-color: ${({ theme }) => theme.textarea.bg};
  border: 1px solid ${({ theme }) => theme.textarea.border};
  border-radius: ${({ theme }) => theme.field.radius};
  color: ${({ theme }) => theme.textarea.color};
  font-size: ${({ theme }) => theme.field.fontSize};
  font-weight: ${({ theme }) => theme.field.fontWeight};
  font-family: ${({ theme }) => theme.field.inputFont};
  height: ${({ height }: { height?: string }) => height || '12rem'};
  line-height: 150%;
  letter-spacing: 1.5px;
  max-width: ${({ theme }) => theme.field.size.lg};
  padding: 1.2rem 1.8rem;
  resize: none;
  transition: ${({ theme }) => theme.field.transition};
  width: 100%;

  ::placeholder {
    color: ${({ theme }) => theme.textarea.placeholder};
  }

  &:hover {
    background-color: ${({ theme }) => theme.textarea.hover.bg};
    border: 1px solid ${({ theme }) => theme.textarea.hover.border};
  }

  :focus {
    background-color: ${({ theme }) => theme.textarea.focus.bg};
    border: 1px solid ${({ theme }) => theme.textarea.focus.border};
    outline: none;
  }

  :disabled {
    background-color: ${({ theme }) => theme.textarea.disabled.bg};
    border: 1px solid ${({ theme }) => theme.textarea.disabled.border};
    cursor: not-allowed;
    font-style: italic;

    ::placeholder {
      color: ${({ theme }) => theme.textarea.disabled.placeholder};
    }
  }

  &.full {
    max-width: ${({ theme }) => theme.field.size.full};
  }

  &.success {
    border: 1px solid ${({ theme }) => theme.textarea.success.border};
  }

  &.warning {
    border: 1px solid ${({ theme }) => theme.textarea.warning.border};
  }

  &.error {
    border: 1px solid ${({ theme }) => theme.textarea.error.border};
  }
`;
