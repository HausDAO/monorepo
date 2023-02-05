import { LOCAL_ABI } from '@daohaus/abis';
import { useQuery } from 'react-query';

import { createContract } from '@daohaus/tx-builder';
import { ValidNetwork, Keychain } from '@daohaus/keychain-utils';

type FetchShape = {
  decimals?: boolean;
  name?: boolean;
  symbol?: boolean;
  totalSupply?: boolean;
  balanceOf?: boolean;
  allowance?: boolean;
};

const fetchTokenData = async ({
  tokenAddress,
  userAddress,
  chainId,
  spenderAddress,
  rpcs,
  fetchShape,
}: {
  tokenAddress: string;
  userAddress?: string | null;
  chainId: ValidNetwork;
  rpcs?: Keychain;
  spenderAddress?: string | null;
  fetchShape?: FetchShape;
}) => {
  const tokenContract = createContract({
    address: tokenAddress,
    abi: LOCAL_ABI.ERC20,
    chainId,
    rpcs,
  });

  try {
    const decimals = fetchShape?.decimals
      ? await tokenContract.decimals()
      : null;
    const name = fetchShape?.name ? await tokenContract.name() : null;
    const symbol = fetchShape?.symbol ? await tokenContract.symbol() : null;
    const totalSupply = fetchShape?.totalSupply
      ? await tokenContract.totalSupply()
      : null;
    const balance =
      fetchShape?.balanceOf && userAddress
        ? await tokenContract.balanceOf(userAddress)
        : null;
    const allowance =
      fetchShape?.allowance && userAddress && spenderAddress
        ? await tokenContract.allowance(userAddress, spenderAddress)
        : null;

    const data = {
      decimals,
      name,
      symbol,
      totalSupply: totalSupply ? (totalSupply?.toString() as string) : null,
      balance: balance ? (balance?.toString() as string) : null,
      allowance: allowance ? (allowance?.toString() as string) : null,
      isApproved: !!allowance && allowance?.gt(0),
    };

    console.log('data', data);
    return data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message as string);
  }
};

export const useERC20 = ({
  tokenAddress,
  userAddress,
  spenderAddress,
  chainId,
  rpcs,
  cacheTime = 1000 * 60 * 20,
  staleTime = 1000 * 60 * 20,
  fetchShape = {
    decimals: true,
    name: true,
    symbol: true,
    totalSupply: true,
    balanceOf: true,
    allowance: true,
  },
}: {
  tokenAddress: string;
  userAddress?: string | null;
  spenderAddress?: string | null;
  chainId: ValidNetwork;
  rpcs?: Keychain;
  cacheTime?: number;
  staleTime?: number;
  fetchShape?: FetchShape;
}) => {
  const { data, error, ...rest } = useQuery(
    [
      `tokenData-${tokenAddress}`,
      { tokenAddress, userAddress, chainId, spenderAddress },
    ],
    () =>
      fetchTokenData({
        tokenAddress,
        userAddress,
        chainId,
        rpcs,
        spenderAddress,
        fetchShape,
      }),
    {
      enabled: !!tokenAddress && !!chainId,
      cacheTime,
      staleTime,
    }
  );
  return { tokenData: data, error: error as Error, ...rest };
};
