import styled from 'styled-components';

import { Button } from '../../atoms/Button';
import { ProfileAvatar } from '../ProfileAvatar';

export const StyledProfileButton = styled(Button)`
  svg {
    &.icon-right {
      margin-left: auto;
    }
  }

  .interior {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ProfileBtnAvatar = styled(ProfileAvatar)`
  margin-right: 1rem;

  &.sm {
    margin-right: 0.8rem;
  }

  &.lg {
    margin-right: 1.4rem;
  }
`;
