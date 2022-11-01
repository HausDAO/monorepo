import {
  ABI,
  encodeFunction,
  encodeValues,
  isString,
  POSTER_TAGS,
  ValidNetwork,
} from '@daohaus/utils';
import { ethers } from 'ethers';
import { getContractAbi, getContractAddressesForChain } from './contract-meta';
import { SummonMolochV3Args } from './types';

export const encodeFunctionWrapper = (
  abi: ABI,
  fnName: string,
  functionArgs: ReadonlyArray<unknown>
): string => {
  const encoded = encodeFunction(abi, fnName, functionArgs);

  if (isString(encoded)) {
    return encoded;
  }
  throw new Error('Encoding Error');
};

export const encodeInitializationParams = (
  args: SummonMolochV3Args,
  networkId: ValidNetwork
): ethers.BytesLike[] => {
  const baalAbi = getContractAbi('BAAL');
  const posterAbi = getContractAbi('POSTER');
  const posterAddress = getContractAddressesForChain('POSTER', networkId);

  if (!baalAbi || !posterAbi || !posterAddress)
    throw 'Missing Contract ABIs or address';

  const encodedTokenConfig = encodeFunctionWrapper(baalAbi, 'setAdminConfig', [
    args.tokenConfig.pauseShares,
    args.tokenConfig.pauseLoot,
  ]);

  const encodedGovernanceValues = encodeValues(
    ['uint32', 'uint32', 'uint256', 'uint256', 'uint256', 'uint256'],
    [
      args.governanceConfig.voting,
      args.governanceConfig.grace,
      args.governanceConfig.newOffering,
      args.governanceConfig.quorum,
      args.governanceConfig.sponsor,
      args.governanceConfig.minRetention,
    ]
  );
  const encodedGovernanceConfig = encodeFunctionWrapper(
    baalAbi,
    'setGovernanceConfig',
    [encodedGovernanceValues]
  );

  const encodedShamanConfig = encodeFunctionWrapper(baalAbi, 'setShamans', [
    args.shamanConfig.shamans,
    args.shamanConfig.permissions,
  ]);

  const encodedSharesConfig = encodeFunctionWrapper(baalAbi, 'mintShares', [
    args.sharesConfig.to,
    args.sharesConfig.amount,
  ]);

  const encodedLootConfig = encodeFunctionWrapper(baalAbi, 'lootShares', [
    args.lootConfig.to,
    args.lootConfig.amount,
  ]);

  const METADATA = encodeFunctionWrapper(posterAbi, 'post', [
    JSON.stringify({ name: args.daoName }),
    POSTER_TAGS.summoner,
  ]);

  const encodedMetadataConfig = encodeFunctionWrapper(
    baalAbi,
    'executeAsBaal',
    [posterAddress, 0, METADATA]
  );

  return [
    encodedTokenConfig,
    encodedGovernanceConfig,
    encodedShamanConfig,
    encodedSharesConfig,
    encodedLootConfig,
    encodedMetadataConfig,
  ];
};
