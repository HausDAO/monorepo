import { AccountProfile } from '@daohaus/utils';

import { ButtonProps } from '../../atoms/Button/Button.types';

type OmittedProps = 'IconLeft' | 'href';
export interface ProfileButtonProps extends Omit<ButtonProps, OmittedProps> {
  profile: AccountProfile;
  avatarOnly?: boolean;
}
