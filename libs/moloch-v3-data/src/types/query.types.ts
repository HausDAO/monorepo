import { TokenBalance } from '@daohaus/utils';
import { Keychain } from '@daohaus/keychain-utils';
import {
  FindDaoQuery,
  ListDaosQuery,
} from '../subgraph/queries/daos.generated';
import { ListProposalsQuery } from '../subgraph/queries/proposals.generated';
import { Ordering } from '@daohaus/data-fetch-utils';

export interface ICrossNetworkMemberListArguments<
  TOrderBy extends string,
  DaoVariables,
  MemberVariables
> {
  networkIds: Array<keyof Keychain>;
  memberAddress: string;
  daoFilter?: DaoVariables;
  memberFilter?: MemberVariables;
  ordering?: Ordering<TOrderBy>;
  graphApiKeys: Keychain;
}

export type QueryProposal = ListProposalsQuery['proposals'][number];
export interface ITransformedProposal extends QueryProposal {
  status?: string;
}

export interface ITransformedProposalQuery {
  proposal: ITransformedProposal | undefined;
}
export interface ITransformedProposalListQuery {
  proposals: ITransformedProposal[];
}

// DAO
export type DaoProfileLink = {
  label?: string;
  url?: string;
};
export type DaoProfile = {
  description?: string;
  longDescription?: string;
  avatarImg?: string;
  tags?: string[];
  links?: DaoProfileLink[];
};
type DaoWithProfile = FindDaoQuery['dao'] & DaoProfile;
type DaoWithProfileQuery = {
  dao: DaoWithProfile | undefined;
};
export type DaoVault = DaoWithProfile['vaults'][number] & {
  fiatTotal: number;
  tokenBalances: TokenBalance[];
};
type MolochV3DaoQuery = {
  dao: MolochV3Dao;
};

export type MolochV3Dao = Omit<DaoWithProfile, 'vaults'> & {
  vaults: DaoVault[];
  fiatTotal: number;
};

export type FindDaoQueryRes =
  | DaoWithProfileQuery
  | MolochV3DaoQuery
  | FindDaoQuery;
export type ListDaosQueryResDaos = DaoWithProfile[];
