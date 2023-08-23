import styled from 'styled-components';

export const WithIcon = styled.div`
  position: relative;
  width: 100%;
  max-width: ${({ theme }) => theme.field.size.md};

  svg {
    position: absolute;
    color: ${({ theme }) => theme.select.icon.color};
    top: 1.4rem;
    right: 2rem;
    pointer-events: none;
  }

  &.long {
    max-width: ${({ theme }) => theme.field.size.lg};
  }

  &.full {
    max-width: ${({ theme }) => theme.field.size.full};
  }

  &.success {
    border: 1px solid ${({ theme }) => theme.select.success.border};
  }

  &.warning {
    border: 1px solid ${({ theme }) => theme.select.warning.border};
  }

  &.error {
    border: 1px solid ${({ theme }) => theme.select.error.border};
  }
`;

export const BaseSelect = styled.select`
  align-items: center;
  appearance: none;
  background-color: ${({ theme }) => theme.select.bg};
  border: 1px ${({ theme }) => theme.select.border} solid;
  border-radius: ${({ theme }) => theme.select.radius};
  color: ${({ theme }) => theme.select.color};
  cursor: pointer;
  display: inline-flex;
  font-size: ${({ theme }) => theme.field.fontSize};
  font-weight: ${({ theme }) => theme.field.fontWeight};
  font-family: ${({ theme }) => theme.field.inputFont};
  height: 4.8rem;
  justify-content: space-between;
  line-height: 150%;
  max-width: ${({ theme }) => theme.field.size.md};
  padding: 0 1.8rem;
  transition: ${({ theme }) => theme.field.transition};
  width: 100%;

  &.long {
    max-width: ${({ theme }) => theme.field.size.lg};
  }
  &.full {
    max-width: ${({ theme }) => theme.field.size.full};
  }

  &.success {
    border: 1px solid ${({ theme }) => theme.select.success.border};
  }

  &.warning {
    border: 1px solid ${({ theme }) => theme.select.warning.border};
  }

  &.error {
    border: 1px solid ${({ theme }) => theme.select.error.border};
  }

  &:hover {
    background-color: ${({ theme }) => theme.select.hover.bg};
    border: 1px solid ${({ theme }) => theme.select.hover.border};
  }

  :focus {
    background-color: ${({ theme }) => theme.select.focus.bg};
    border: 1px solid ${({ theme }) => theme.select.focus.border};
    outline: none;
  }

  :disabled {
    background-color: ${({ theme }) => theme.select.disabled.bg};
    color: ${({ theme }) => theme.select.disabled.color};
    cursor: not-allowed;
    font-style: italic;

    ::placeholder {
      color: ${({ theme }) => theme.select.disabled.placeholder};
    }
  }
`;

export const StyledOption = styled.option`
  background-color: ${({ theme }) => theme.select.option.bg};
  color: ${({ theme }) => theme.select.option.color};
  font-family: ${({ theme }) => theme.font.family.body};
  font-size: ${({ theme }) => theme.field.fontSize};
  font-weight: ${({ theme }) => theme.field.fontWeight};
  height: 4.8rem;
`;
