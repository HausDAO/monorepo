import { SequenceIndexer } from '@0xsequence/indexer';
import { formatFetchError, IFindQueryResult } from '@daohaus/data-fetch-utils';
import { ENDPOINTS, ValidNetwork } from '@daohaus/keychain-utils';
import { DaoTokenBalances } from '@daohaus/utils';

export type TokenBalanceAlch = {
  tokenBalance: string;
  contractAddress: string;
};

export const listTokenBalances = async ({
  networkId,
  safeAddress,
}: {
  networkId: ValidNetwork;
  safeAddress: string;
}): Promise<IFindQueryResult<DaoTokenBalances>> => {
  const url = ENDPOINTS['SEQUENCE_API'][networkId];
  const key = process.env['NX_SEQUENCE_KEY'];

  if (!url) {
    return {
      error: formatFetchError({ type: 'INVALID_NETWORK_ERROR' }),
    };
  }

  if (!key) {
    return {
      error: formatFetchError({ type: 'MISSING_SEQUENCE_ENV_VARIABLE' }),
    };
  }

  const indexer = new SequenceIndexer(url, key);

  try {
    const tokenBalances = await indexer.getTokenBalances({
      accountAddress: safeAddress,
      includeMetadata: true,
      includeCollectionTokens: false,
      // spam flter
      // metadataOptions: { verifiedOnly: true },
    });

    const balance = await indexer.getEtherBalance({
      accountAddress: safeAddress,
    });

    const transformedTokenBalances = tokenBalances.balances.map((tokenBal) => {
      return {
        token: {
          decimals: tokenBal.contractInfo?.decimals,
          symbol: tokenBal.contractInfo?.symbol,
          name: tokenBal.contractInfo?.name,
          logoUri: tokenBal.contractInfo?.logoURI,
        },
        tokenAddress: tokenBal.contractAddress,
        balance: tokenBal.balance,
      };
    });

    const nativeBalance = {
      tokenAddress: null,
      balance: balance.balance.balanceWei,
    };

    return {
      data: {
        safeAddress,
        tokenBalances: [nativeBalance, ...transformedTokenBalances],
      },
    };
  } catch (err) {
    return {
      error: formatFetchError({ type: 'TOKEN_FETCH_ERROR', errorObject: err }),
    };
  }
};
