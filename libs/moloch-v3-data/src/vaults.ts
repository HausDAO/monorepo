import { ethers } from 'ethers';
import {
  formatFetchError,
  IFindQueryResult,
  fetch,
} from '@daohaus/data-fetch-utils';
import { getGraphUrl, Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import { DaoTokenBalances, TokenBalance } from '@daohaus/utils';
import { transformTokenBalances } from './utils';

export const listTokenBalances = async ({
  networkId,
  safeAddress,
  graphApiKeys,
}: {
  networkId: ValidNetwork;
  safeAddress: string;
  graphApiKeys: Keychain;
}): Promise<IFindQueryResult<DaoTokenBalances>> => {
  const url = getGraphUrl(networkId, graphApiKeys);
  if (!url) {
    return {
      error: formatFetchError({ type: 'INVALID_NETWORK_ERROR' }),
    };
  }

  try {
    const res = await fetch.get<TokenBalance[]>(
      `${url}/safes/${ethers.utils.getAddress(safeAddress)}/balances/usd/`
    );

    return { data: transformTokenBalances(res, safeAddress) };
  } catch (err) {
    return {
      error: formatFetchError({ type: 'GNOSIS_ERROR', errorObject: err }),
    };
  }
};
