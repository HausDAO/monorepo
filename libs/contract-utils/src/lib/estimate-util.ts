import {
  ValidNetwork,
  HAUS_RPC,
} from '@daohaus/keychain-utils';
import { ethers } from 'ethers';
import { MetaTransaction } from '@gnosis.pm/safe-contracts';

export const estimateFunctionalGas = async ({
  chainId,
  constractAddress,
  from,
  value,
  data,
}: {
  chainId: ValidNetwork;
  constractAddress: string;
  from: string;
  value: string;
  data: string;
}): Promise<number | undefined> => {
  const rpcUrl = HAUS_RPC[chainId];

  const ethersProvider = new ethers.providers.JsonRpcProvider(rpcUrl);

  const functionGasFees = await ethersProvider.estimateGas({
    to: constractAddress,
    from: from,
    value: value,
    data: data,
  });

  return Number(functionGasFees);
};

export const gasEstimateFromActions = async ({
  actions,
  chainId,
  safeId,
}: {
  actions: MetaTransaction[];
  chainId: ValidNetwork;
  safeId: string;
}) => {
  const esitmatedGases = await Promise.all(
    actions.map(
      async (action) =>
        await estimateFunctionalGas({
          chainId: chainId,
          constractAddress: action.to,
          from: safeId, // from value needs to be the baal safe to esitmate without revert
          value: Number(action.value).toString(),
          data: action.data,
        })
    )
  );
  // get sum of all gas estimates
  const totalGasEstimate = esitmatedGases?.reduce(
    (a, b) => (a || 0) + (b || 0),
    0
  );
  console.log('totalGasEstimate', totalGasEstimate);

  return totalGasEstimate;
};


