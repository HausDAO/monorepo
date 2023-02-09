import styled from 'styled-components';
import { font } from '../../../theme/global/font';
import { Theme } from '../../../types/theming';
import { DropdownButton } from '../../molecules';

export const AppSwitcherTrigger = styled(DropdownButton)`
  width: ${({ width }: { width: string }) => width};
  padding: 0 4px 0 16px;

  &[data-state='open'] {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;
