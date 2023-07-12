import styled from 'styled-components';

import { Button } from '../../atoms/Button';

export const MemberCardTrigger = styled(Button)<{ minWidth: string }>`
  min-width: ${({ minWidth }) => minWidth};

  & > span {
    margin-right: 8px;
  }

  &[data-state='open'] {
    border-bottom-right-radius: 0;
  }

  svg.icon-right {
    color: ${({ theme }) => theme.primary.step9};
    margin-left: auto;
  }

  svg.icon-left {
    color: ${({ theme }) => theme.primary.step9};
  }
`;
