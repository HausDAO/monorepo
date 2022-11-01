import styled from 'styled-components';
import { font } from '../../../theme/global/font';
import { Theme } from '../../../types/theming';
import { DropdownButton, DropdownLink } from '../../molecules';

export const AppSwitcherLink = styled(DropdownLink)`
  font-weight: ${font.weight.bold};
`;

export const AppSwitcherTrigger = styled(DropdownButton)`
  width: ${({ width }: { width: string }) => width};
  padding: 0 4px 0 16px;

  &[data-state='open'] {
    border-bottom-left-radius: 0;
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
