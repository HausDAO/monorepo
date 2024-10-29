import { getAddress } from 'viem';
import {
  formatFetchError,
  IFindQueryResult,
  fetch,
} from '@daohaus/data-fetch-utils';
import { ENDPOINTS, ValidNetwork } from '@daohaus/keychain-utils';
import { DaoTokenBalances, TokenBalance } from '@daohaus/utils';
import { transformTokenBalances } from './utils';

export const listTokenBalances = async ({
  networkId,
  safeAddress,
}: {
  networkId: ValidNetwork;
  safeAddress: string;
}): Promise<IFindQueryResult<DaoTokenBalances>> => {
  const url = ENDPOINTS['GNOSIS_API'][networkId];

  if (!url) {
    return {
      error: formatFetchError({ type: 'INVALID_NETWORK_ERROR' }),
    };
  }

  try {
    const res = await fetch.get<TokenBalance[]>(
      `${url}/safes/${getAddress(safeAddress)}/balances/?exclude_spam=true`
    );

    return { data: transformTokenBalances(res, safeAddress) };
  } catch (err) {
    return {
      error: formatFetchError({ type: 'GNOSIS_ERROR', errorObject: err }),
    };
  }
};
