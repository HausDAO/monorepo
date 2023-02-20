import styled from 'styled-components';

import { Theme } from '../../../types/theming';
// import { DropdownButton } from '../../molecules';
import { Button } from '../../atoms/Button';

export const MemberCardTrigger = styled(Button)`
  min-width: ${({ minWidth }: { minWidth: string }) => minWidth};

  & > span {
    margin-right: 8px;
  }

  &[data-state='open'] {
    border-bottom-right-radius: 0;
  }

  svg.icon-right {
    color: ${({ theme }: { theme: Theme }) => theme.primary.step9};
    margin-left: auto;
  }

  svg.icon-left {
    color: ${({ theme }: { theme: Theme }) => theme.primary.step9};
  }
`;
