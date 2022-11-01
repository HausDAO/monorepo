import styled from 'styled-components';

import { Button } from '../../atoms/Button';
import { ProfileAvatar } from '../ProfileAvatar';

export const DropdownButtonBase = styled(Button)`
  svg {
    &.icon-right {
      margin-left: auto;
    }
  }
`;

export const DropdownAvatar = styled(ProfileAvatar)`
  margin-right: 1rem;

  &.sm {
    margin-right: 0.8rem;
  }

  &.lg {
    margin-right: 1.4rem;
  }
`;
