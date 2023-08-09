import styled from 'styled-components';

import { font } from '../../../theme/global/font';
import { field } from '../../../theme/component/fieldFamily';

export const InputSelectBox = styled.div`
  display: flex;
  width: 100%;
  max-width: ${field.size.md};

  .select {
    max-width: 100%;
    padding: 0 0.8rem;
    border-radius: 0 ${field.borderRadius} ${field.borderRadius} 0;
    border-left: none;
    color: white;
    font-weight: ${font.weight.bold};
    background-color: ${({ theme }) => theme.inputSelect.bg};
    color: ${({ theme }) => theme.inputSelect.color};

    &:hover {
      background-color: ${({ theme }) => theme.inputSelect.hover.bg};
    }

    :focus {
      background-color: ${({ theme }) => theme.inputSelect.focus.bg};
    }

    :disabled {
      background-color: ${({ theme }) => theme.inputSelect.disabled.bg};
      cursor: not-allowed;
    }
  }

  .select-box {
    max-width: 10rem;
    svg {
      right: 0.6rem;
      color: ${({ theme }) => theme.inputSelect.selectBox.bg};
    }
    &.match-long {
      max-width: 16rem;
    }
    &.match-full {
      max-width: 18rem;
    }
  }

  .input {
    border-right: none;
    border-radius: ${field.borderRadius} 0 0 ${field.borderRadius};
  }

  &.long {
    max-width: ${field.size.lg};
  }

  &.full {
    max-width: ${field.size.full};
  }
`;
