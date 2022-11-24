import { TokenBalance } from '@daohaus/utils';
import { FindDaoQuery } from '../subgraph/queries/daos.generated';

// TODO: should TokenBalance live here?

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
