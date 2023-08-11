import styled from 'styled-components';

import { field } from '../../../theme';
import { font } from '../../../theme/global/font';

export const FieldWrapperBase = styled.div`
  width: 100%;
  max-width: ${field.size.lg};
  .field-slot {
    margin-bottom: 1.2rem;
  }
  &.long {
    max-width: ${field.size.lg};
  }
  &.full {
    max-width: ${field.size.full};
  }
  &.hidden {
    display: none;
  }
`;

export const LabelContainer = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  label {
    margin-right: 10px;
  }
  svg {
    transform: translateY(0.1rem);
  }
`;

export const BottomContainer = styled.div`
  display: flex;
  margin-bottom: 12px;
  width: 100%;
  max-width: ${field.size.md};
  &.long {
    max-width: ${field.size.lg};
  }
  &.full {
    max-width: ${field.size.full};
  }
`;

export const LeftAddonContainer = styled.div`
  display: flex;
  align-items: end;
  min-width: 70%;
`;

export const RightAddonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 30%;
`;

export const RequiredAsterisk = styled.span`
  margin-right: 8px;
  font-weight: ${font.weight.bold};
  color: ${({ theme }) => theme.warning.step9};
  transform: translateY(-0.25rem);
`;
