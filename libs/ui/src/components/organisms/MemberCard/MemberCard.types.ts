import { ValidNetwork } from '@daohaus/keychain-utils';
import { AccountProfile } from '@daohaus/utils';

export type MemberCardProps = {
  profile: AccountProfile;
  explorerNetworkId: ValidNetwork;
  customProfileURI?: string;
  minWidth?: string;
  menuBg?: string;
  className?: string;
};
