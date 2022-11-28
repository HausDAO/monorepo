import { ButtonProps } from '../../atoms/Button/Button.types';
import { ProfileAvatarProps } from '../ProfileAvatar/';

type OmittedProps = 'IconLeft';
export interface ProfileButtonProps extends Omit<ButtonProps, OmittedProps> {
  /* Profile Avatar stils on the left of button */
  profile: Omit<ProfileAvatarProps, 'size'>;
}
