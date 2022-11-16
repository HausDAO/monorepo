import {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
} from '@radix-ui/react-dropdown-menu';

import { ButtonProps } from '../../atoms';
import { ProfileButtonProps } from '../ProfileButton';

/* Types for Dropdown Trigger leveraging Button & Profile Button */
type OmittedTriggerButtonProps = 'IconRight';

// Maybe Discriminated union type would be better
type DropdownButton = Omit<ButtonProps, OmittedTriggerButtonProps>;
type ProfileDropdownButton = Omit<
  ProfileButtonProps,
  OmittedTriggerButtonProps
>;

export type DropdownTriggerProps = DropdownButton | ProfileDropdownButton;

/* Types for Dropdown Content */
export interface DropdownContentProps extends DropdownMenuContentProps {
  color?: 'primary' | 'secondary';
}

/* Types for Dropdown Items */

export interface DropdownItemProps extends DropdownMenuItemProps {
  color?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
}
