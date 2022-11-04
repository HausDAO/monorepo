import styled from 'styled-components';

import { Theme } from '../../../types/theming';
import { DropdownButton } from '../../molecules';

export const MemberCardTrigger = styled(DropdownButton)`
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
    // TODO Need to know if colors are already applied to App SVGs
    color: ${({ theme }: { theme: Theme }) => theme.primary.step9};
  }
`;
