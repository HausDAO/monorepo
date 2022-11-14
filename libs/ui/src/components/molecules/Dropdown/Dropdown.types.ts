import { ButtonProps } from '../../atoms';
import { ProfileButtonProps } from '../ProfileButton';

type OmittedProps = 'IconRight';

// Maybe Discriminated union type would be better
type DropdownButton = Omit<ButtonProps, OmittedProps>;
type ProfileDropdownButton = Omit<ProfileButtonProps, OmittedProps>;

export type DropdownTriggerProps = DropdownButton | ProfileDropdownButton;
