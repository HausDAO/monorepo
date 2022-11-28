import { Keychain } from '@daohaus/keychain-utils';
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
