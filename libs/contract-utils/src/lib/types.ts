import { ABI } from '@daohaus/utils';
import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';

import { ethers } from 'ethers';

export type ContractConfig = {
  address: string;
  provider: ethers.providers.Provider | ethers.Signer;
};

export type ContractNetworkConfig = {
  networkId: keyof Keychain;
  provider: ethers.providers.Provider | ethers.Signer;
};

export type BaseOverrideArgs = ethers.Overrides;

type daoTokenConfigArgs = {
  to: string[];
  amount: bigint[];
};

export type SummonMolochV3Args = {
  sharesTokenName: string;
  sharesTokenSymbol: string;
  lootTokenName?: string;
  lootTokenSymbol?: string;
  safeAddress?: string;
  forwarder?: string;
  lootToken?: string;
  sharesToken?: string;
  tokenConfig: {
    pauseShares: boolean;
    pauseLoot: boolean;
  };
  governanceConfig: {
    voting: bigint;
    grace: bigint;
    newOffering: bigint;
    quorum: bigint;
    sponsor: bigint;
    minRetention: bigint;
  };
  shamanConfig: {
    shamans: string[];
    permissions: bigint[];
  };
  sharesConfig: daoTokenConfigArgs;
  lootConfig: daoTokenConfigArgs;
  daoName: string;
  overrides?: ethers.Overrides;
};

type ProposalActionParams = {
  abi: ABI;
  fnName: string;
  functionArgs: ReadonlyArray<unknown>;
  to: string;
  value: bigint;
  operation: number;
};

export type SubmitProposalArgs = {
  proposalActions: ProposalActionParams[];
  expiration: bigint;
  baalGas?: number;
  networkId: ValidNetwork;
  details: string;
  overrides?: ethers.Overrides;
};

export type ProcessProposalArgs = {
  id: bigint;
  proposalData: ethers.BytesLike;
  overrides?: ethers.Overrides;
};
