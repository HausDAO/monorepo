import { Keychain } from '@daohaus/keychain-utils';

export interface MolochV3Membership {
  dao: string;
  name?: string;
  safeAddress: string;
  daoAvatarImg?: string;
  activeProposalCount: number;
  activeMemberCount: string;
  votingPower: number;
  networkId?: keyof Keychain;
  delegatingTo?: string;
  isDelegate: boolean;
  memberAddress: string;
  totalProposalCount: string;
  contractType: string;
  tokenBalances?: TokenBalance[];
}
export interface MolochV3MembershipQuery {
  daos: MolochV3Membership[];
}
export type TokenInfo = {
  decimals?: number;
  symbol?: string;
  name?: string;
  logoUri?: string | null;
};
export type TokenBalance = {
  token?: TokenInfo | null;
  tokenAddress: string | null;
  balance: string;
};
export type DaoTokenBalances = {
  safeAddress: string;
  tokenBalances: TokenBalance[];
};
export type AccountProfile = {
  address: string;
  ens?: string;
  avatar?: string | null;
  daos?: MolochV3MembershipQuery['daos'];
};
