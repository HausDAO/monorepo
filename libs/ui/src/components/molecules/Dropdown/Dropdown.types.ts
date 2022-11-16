import {
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioItemProps,
} from '@radix-ui/react-dropdown-menu';

import { ButtonProps } from '../../atoms';
import { ProfileButtonProps } from '../ProfileButton';

export type DropdownColor = 'primary' | 'secondary';
export type DropdownSize = 'md' | 'lg';

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
  color?: DropdownColor;
}

/* Types for Dropdown Items */

export interface BaseItemProps {
  color?: DropdownColor;
  size?: DropdownSize;
}

export type DropdownItemProps = BaseItemProps & DropdownMenuItemProps;

export type DropdownCheckboxProps = BaseItemProps &
  DropdownMenuCheckboxItemProps;

export type DropdownRadioProps = BaseItemProps & DropdownMenuRadioItemProps;
