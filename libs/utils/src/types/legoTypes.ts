import { JSXElementConstructor } from 'react';
import { BlockTag } from 'viem';
import { Keychain } from '@daohaus/keychain-utils';

import { ABI, ArgType } from './contract';
import { EthAddress, RequireOnlyOne } from './general';
import { ValidateField } from '../utils';

export type LookupType = Record<
  string,
  // React wants me to use JSXElementConstructor<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keyof JSX.IntrinsicElements | JSXElementConstructor<any>
>;

export type FieldValidationType = keyof typeof ValidateField;

export type FieldLegoBase<Lookup extends LookupType> = {
  [FieldType in keyof Lookup]: React.ComponentProps<Lookup[FieldType]> & {
    type: FieldType;
    expectType?: FieldValidationType;
  };
}[keyof Lookup];

export type FormLegoBase<Lookup extends LookupType = LookupType> = {
  id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  tx?: TXLego;
  fields: FieldLegoBase<Lookup>[];
  requiredFields?: Record<string, boolean>;
  log?: boolean;
  devtool?: boolean;
  submitButtonText?: string;
};

export type RequiredFields = Record<string, boolean>;

export type StringSearch = `.${string}`;

type DetailsSchema = Record<string, ValidArgType>;
export type JSONDetailsSearch = {
  type: 'JSONDetails';
  jsonSchema: DetailsSchema;
};
export type MulticallAction = {
  contract: ContractLego;
  method: string;
  value?: ValidArgType;
  operations?: ValidArgType;
  args: ValidArgType[];
  data?: StaticArg | StringSearch;
};
export type MulticallArg = {
  type: 'multicall';
  actions: MulticallAction[];
  formActions?: boolean;
};
export type EncodeMulticall = {
  type: 'encodeMulticall';
  actions: MulticallAction[];
  formActions?: boolean;
};
export type EncodeCallArg = {
  type: 'encodeCall';
  action: MulticallAction;
};
export type EstimateGas = {
  type: 'estimateGas';
  actions: MulticallAction[];
  bufferPercentage?: number;
  formActions?: boolean;
};

type ProposalExpiry = {
  type: 'proposalExpiry';
  search?: StringSearch;
  fallback: number;
};

type StaticArg = {
  type: 'static';
  value: ArgType;
};

type TemplateArg = {
  type: 'template';
  value: string;
};

type SingletonSearch = {
  type: 'singleton';
  keychain: Keychain;
};

export type ArgEncode = {
  type: 'argEncode';
  args: ValidArgType[];
  solidityTypes: string[];
};

export type NestedArray = {
  type: 'nestedArray';
  args: ValidArgType[];
};

export type IPFSPinata = {
  type: 'ipfsPinata';
  content: ValidArgType;
};

export type ValidArgType =
  | StringSearch
  | JSONDetailsSearch
  | EstimateGas
  | SingletonSearch
  | NestedArray
  | MulticallArg
  | EncodeCallArg
  | ProposalExpiry
  | StaticArg
  | TemplateArg
  | IPFSPinata
  | EncodeMulticall
  | ArgEncode;

export type TxStates =
  | 'idle'
  | 'submitting'
  | 'polling'
  | 'pollFailed'
  | 'failed'
  | 'success';

export type TXOverrides = {
  gasLimit?: ValidArgType;
  value?: ValidArgType;
  gasPrice?: ValidArgType;
  from?: ValidArgType;
  blockTag?: ValidArgType;
};

export type TXStaticOverrides = {
  gasLimit?: bigint;
  value?: bigint;
  gasPrice?: bigint;
  from?: `0x${string}`;
  blockTag?: BlockTag;
};

export type TXLegoBase = {
  id: string;
  contract: ContractLego;
  method: string;
  args?: ValidArgType[];
  argCallback?: string;
  staticArgs?: ArgType[];
  overrides?: TXOverrides;
  staticOverrides?: TXStaticOverrides;
  disablePoll?: boolean;
  customPoll?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetch: (...args: any) => Promise<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    test: (result?: any) => boolean;
  };
};

export type TXLego = RequireOnlyOne<
  TXLegoBase,
  'args' | 'argCallback' | 'staticArgs'
>;

export type StaticContract = {
  contractName: string;
  type: 'static';
  abi: ABI;
  targetAddress: Keychain | StringSearch | EthAddress;
};
export type LocalContract = {
  contractName: string;
  type: 'local';
  targetAddress: Keychain | StringSearch | EthAddress;
};
export type RemoteContract = {
  contractName: string;
  type: 'remote';
  targetAddress: Keychain | StringSearch | EthAddress;
};
export type ProcessedContract = {
  type: 'processed';
  contractName: string;
  abi: ABI;
  address: string;
};
export type ContractLego =
  | StaticContract
  | RemoteContract
  | LocalContract
  | ProcessedContract;
