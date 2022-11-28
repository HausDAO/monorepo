import { TokenBalance } from '@daohaus/utils';
import { HAUS_NETWORK_DATA, ValidNetwork } from '@daohaus/keychain-utils';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';

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

export const getErc20s = (treasury: MolochV3Dao['vaults'][number]) => {
  return treasury.tokenBalances.reduce(
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
  daoData: MolochV3Dao,
  daochain: ValidNetwork,
  safeAddress: string,
  networks = HAUS_NETWORK_DATA
) => {
  const networkData = networks[daochain];
  const treasury = daoData.vaults.find((v) => {
    if (!safeAddress) return v.safeAddress === daoData.safeAddress;
    return v.safeAddress === safeAddress;
  });
  const networkToken = treasury && treasury.tokenBalances.find(isNetworkToken);

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
