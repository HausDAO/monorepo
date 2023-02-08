import { ValidNetwork } from '@daohaus/keychain-utils';
import { DropdownContentProps } from '../../molecules/Dropdown/Dropdown.types';

import { ProfileButtonProps } from '../../molecules/ProfileButton/ProfileButton.types';

export type MemberCardProps = ProfileButtonProps & DropdownContentProps;

export type MemberCardExplorerLinkProps = {
  profileAddress: string;
  explorerNetworkId: ValidNetwork;
};
