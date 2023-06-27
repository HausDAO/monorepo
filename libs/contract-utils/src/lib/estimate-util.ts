import { getAddress } from 'ethers/lib/utils';
import {
  CONTRACT_KEYCHAINS,
  ValidNetwork,
  ENDPOINTS,
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

export const estimateGasSafeApi = async ({
  chainId,
  safeId,
  data,
}: {
  chainId: ValidNetwork;
  safeId: string;
  data: string;
}): Promise<number> => {
  const rawUri = ENDPOINTS['GAS_ESTIMATE'][chainId];
  if (!rawUri)
    throw new Error(
      `Gnosis Gas Estimation API not found for chainID: ${chainId}`
    );

  const gnosisMultisendAddress =
    CONTRACT_KEYCHAINS['GNOSIS_MULTISEND'][chainId];

  if (!gnosisMultisendAddress)
    throw new Error(
      `Gnosis Multisend Contract not found for chainID: ${chainId}`
    );
  const gasEstimateUri = rawUri.replace('<<safeId>>', getAddress(safeId));
  try {
    const response = await fetch(gasEstimateUri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: getAddress(gnosisMultisendAddress),
        value: 0,
        data,
        operation: 1,
      }),
    });

    const estimate = response.ok ? await response.json() : {};

    if (estimate?.safeTxGas) {
      return Math.round(Number(estimate.safeTxGas) * Number(1.6));
    } else {
      // This happens when the safe vault takes longer to be indexed by the Gnosis API
      // and it returns a 404 HTTP error
      console.error(`Failed to estimate gas:`, response.statusText);
      return 0;
    }
  } catch (error) {
    throw new Error(`Failed to estimate gas: ${error}`);
  }
};
