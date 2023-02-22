import { ValidNetwork } from '@daohaus/keychain-utils';
import {
  DropdownContentProps,
  DropdownItemProps,
} from '../../molecules/Dropdown/Dropdown.types';

import { ProfileButtonProps } from '../../molecules/ProfileButton/ProfileButton.types';

export type MemberCardProps = Omit<ProfileButtonProps, 'color'> &
  Omit<DropdownContentProps, 'color'> & {
    profileButtonColor?: 'primary' | 'secondary';
    dropdownColor?: 'primary' | 'secondary';
  };

export type MemberCardExplorerLinkProps = DropdownItemProps & {
  profileAddress: string;
  explorerNetworkId: ValidNetwork;
};

export type MemberCardCopyAddressProps = DropdownItemProps & {
  profileAddress: string;
};

export type MemberCardItemProps = DropdownItemProps;
