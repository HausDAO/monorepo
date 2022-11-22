import { TokenBalance } from '@daohaus/utils';
import { Keychain } from '@daohaus/keychain-utils';
import { ListDaosQuery } from '../subgraph/queries/daos.generated';
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

export type ITransformedDao = ListDaosQuery['daos'][number] & DaoProfile;

export interface ITransformedDaoQuery {
  dao: ITransformedDao | undefined;
}
export interface ITransformedDaoListQuery {
  daos: ITransformedDao[];
}

export type TransformedVault = ITransformedDao['vaults'][number] & {
  fiatTotal: number;
  tokenBalances: TokenBalance[];
};
export type DaoWithTokenData = Omit<ITransformedDao, 'vaults'> & {
  vaults: TransformedVault[];
  fiatTotal: number;
};

export type DaoWithTokenDataQuery = {
  dao: DaoWithTokenData;
};
