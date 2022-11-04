import styled from 'styled-components';

import { Theme } from '../../../types/theming';
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
    background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step6};
    color: ${({ theme }: { theme: Theme }) => theme.secondary.step12};

    :hover {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.secondary.step7};
    }

    :focus {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.secondary.step6};
    }

    :disabled {
      background-color: ${({ theme }: { theme: Theme }) =>
        theme.secondary.step3};
      cursor: not-allowed;
    }
  }

  .select-box {
    max-width: 10rem;
    svg {
      right: 0.6rem;
      color: ${({ theme }: { theme: Theme }) => theme.primary.step6};
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
