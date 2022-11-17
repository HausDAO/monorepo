import { TokenBalance } from '@daohaus/utils';
import { HAUS_NETWORK_DATA, ValidNetwork } from '@daohaus/keychain-utils';
import { DaoWithTokenData } from '@daohaus/moloch-v3-data';

const isNetworkToken = (tokenData: TokenBalance) => {
  return !tokenData.token;
};

export type TokenData = {
  decimals: number;
  name: string;
  symbol: string;
  daoBalance: string;
  address: string;
};

export const getErc20s = (daoData: DaoWithTokenData) => {
  return daoData.tokenBalances.reduce(
    (acc: TokenData[], tokenData: TokenBalance) => {
      if (!isNetworkToken(tokenData)) {
        return [
          ...acc,
          {
            daoBalance: tokenData.balance,
            decimals: tokenData.token?.decimals || 18,
            address: tokenData.tokenAddress || 'Error: Data Missing',
            name: tokenData.token?.name || 'Error: Data Missing',
            symbol: tokenData.token?.symbol || 'Error: Data Missing',
          },
        ];
      }
      return acc;
    },
    []
  );
};

export const getNetworkToken = (
  daoData: DaoWithTokenData,
  daochain: ValidNetwork,
  networks = HAUS_NETWORK_DATA
) => {
  const networkData = networks[daochain];
  const networkToken = daoData.tokenBalances.find(isNetworkToken);

  if (networkToken && networkData) {
    return {
      daoBalance: networkToken.balance,
      decimals: networkData.tokenDecimals,
      symbol: networkData.symbol,
      name:
        daochain === '0x1'
          ? 'ETH'
          : `${networkData.symbol} on ${networkData.name}`,
    };
  }
  return null;
};
