import { Keychain } from '../keychains';

export interface ITransformedMembership {
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
  fiatTotal?: number;
  totalProposalCount: string;
  contractType: string;
  tokenBalances?: TokenBalance[];
}
export interface ITransformedMembershipsQuery {
  daos: ITransformedMembership[];
}

export type TokenInfo = {
  decimals: number;
  symbol: string;
  name: string;
  logoUri: string | null;
};

export type TokenBalance = {
  token: TokenInfo | null;
  tokenAddress: string | null;
  balance: string;
  ethValue: string;
  timestamp: string;
  fiatBalance: string;
  fiatConversion: string;
  fiatCode: string;
};
export type DaoTokenBalances = {
  safeAddress: string;
  fiatTotal: number;
  tokenBalances: TokenBalance[];
};

export type AccountProfile = {
  address: string;
  ens?: string;
  image?: string;
  name?: string;
  description?: string;
  emoji?: string;
  lensHandle?: string;
  lensId?: string;
  daos?: ITransformedMembershipsQuery['daos'];
};
