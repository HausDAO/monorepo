import { ValidNetwork } from '@daohaus/keychain-utils';
import { JsonFragment } from '@ethersproject/abi';
import { Fragment } from 'ethers/lib/utils';

export type FactoryContractParams = {
  abi: string | readonly (string | Fragment | JsonFragment)[];
  singletonAbi: string | readonly (string | Fragment | JsonFragment)[];
  initializationParams: string[];
};

export type Factory = {
  address: string;
  singletonAddress: string;
};

export type Network = {
  moduleFactory?: Factory;
};

export type Param = {
  id: string;
  label?: string;
  headerLabel?: string;
  type: 'address' | 'address[]' | 'bool' | 'bytes32' | 'string' | 'uint256';
  multipleValues?: boolean;
  placeholder?: string;
  defaultValue?:
    | `.formValues.${string}`
    | 'baalAddress'
    | 'safeAddress'
    | 'members';
  order: number;
};

export type SetupSection<T> = {
  show?: boolean;
  defaultValues?: T;
};

export type ModuleTemplate = {
  id: string;
  name: string;
  tag: string;
  description: string;
  avatarImg?: string;
  chain: Record<ValidNetwork, Network>;
  factory: FactoryContractParams;
  params: Array<Param>;
  daoSettings?: {
    daoName: SetupSection<{
      daoName: string;
    }>;
    tokenSettings: SetupSection<{
      tokenName: string;
      tokenSymbol: string;
      lootTokenName: string;
      lootTokenSymbol: string;
      votingTransferable: boolean;
      nvTransferable: boolean;
    }>;
    proposalTiming: SetupSection<{
      votingPeriodInSeconds_input: string;
      votingPeriodInSeconds: number; // BigNumberish
      gracePeriodInSeconds_input: string;
      gracePeriodInSeconds: number; // BigNumberish
    }>;
    advancedGovernance: SetupSection<{
      quorum: string; // BigNumberish
      minRetention: string; // BigNumberish
      sponsorThreshold: string; // BigNumberish
      newOffering: string; // BigNumberish
    }>;
    shamans: SetupSection<{
      shamans:
        | ''
        | {
            shamanAddresses: string[];
            shamanPermissions: string[];
          };
    }>;
    startingMembers: SetupSection<{
      members:
        | ''
        | {
            memberAddresses: string[];
            memberShares: string[];
            memberLoot: string[];
          };
    }>;
  };
};
