import { ArgType } from '@daohaus/utils';
import { OperationType } from 'ethers-multisend';

export type DecodedAction = {
  to: string;
  name: string;
  value: string;
  params: {
    name: string;
    type: string;
    value: ArgType;
  }[];
};

export type ActionError = {
  error: boolean;
  message: string;
  data: string;
  contractAddress?: string;
  value?: string;
};

export type DecodedMultiTX = (DecodedAction | ActionError)[];

export type DeepDecodedAction = {
  to: string;
  operation: OperationType;
  name: string;
  value: string;
  params: {
    name: string;
    type: string;
    value: ArgType;
  }[];
  decodedActions?: DeepDecodedMultiTX;
};

export type DeepDecodedMultiTX = (DeepDecodedAction | ActionError)[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isActionError = (action: any): action is ActionError => {
  return action.error;
};
