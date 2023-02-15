import {
  DropdownMenuProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioItemProps,
} from '@radix-ui/react-dropdown-menu';

import { ButtonProps, IconButtonProps } from '../../atoms';
import { ProfileButtonProps } from '../ProfileButton';

export type DropdownProps = DropdownMenuProps;

export type DropdownColor = 'primary' | 'secondary';

/* Types for Dropdown Trigger leveraging Button & Profile Button */
type OmittedTriggerButtonProps = 'IconRight';

export type DropdownButtonTriggerProps = Omit<
  ButtonProps,
  OmittedTriggerButtonProps
>;

export type DropdownProfileTriggerProps = Omit<
  ProfileButtonProps,
  OmittedTriggerButtonProps
>;

export type DropdownIconTriggerProps = IconButtonProps;

/* Types for Dropdown Content */
export interface DropdownContentProps extends DropdownMenuContentProps {
  color?: DropdownColor;
}

/* Types for Dropdown Items */

export interface BaseItemProps {
  color?: DropdownColor;
}

export type DropdownItemProps = BaseItemProps & DropdownMenuItemProps;

export type DropdownCheckboxProps = BaseItemProps &
  DropdownMenuCheckboxItemProps;

export type DropdownRadioProps = BaseItemProps & DropdownMenuRadioItemProps;
