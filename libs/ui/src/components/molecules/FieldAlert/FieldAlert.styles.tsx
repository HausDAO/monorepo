import styled from 'styled-components';

// TODO: Delete props added to styled div
export const FieldAlertWrapper = styled.div`
  padding: 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: ${({ theme }) => theme.fieldAlert.radius};
  max-width: 600px;
  background: ${({ theme }) => theme.primary.step3};
  border: 1px solid ${({ theme }) => theme.primary.step6};

  &.full {
    max-width: ${({ theme }) => theme.field.size.full};
  }

  &.warning {
    background: ${({ theme }) => theme.warning.step2};
    border: 1px solid ${({ theme }) => theme.warning.step5};
    p {
      color: ${({ theme }) => theme.warning.step10};
    }
    /* ? Why so many style overrides here for the theme ? */
    button {
      background-color: ${({ theme }) => theme.warning.step9};
      border: 1px solid ${({ theme }) => theme.warning.step9};
      &:hover {
        background-color: ${({ theme }) => theme.warning.step10};
        border: 1px solid ${({ theme }) => theme.warning.step10};
      }
      :active {
        background-color: ${({ theme }) => theme.warning.step9};
        border: 1px solid ${({ theme }) => theme.warning.step9};
      }
    }
  }
`;
