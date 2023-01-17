import { BigNumber, utils } from 'ethers';
import {
  ArgType,
  ENCODED_0X0_DATA,
  MulticallAction,
  StringSearch,
  ValidArgType,
} from '@daohaus/utils';
import {
  ABI_EXPLORER_KEYS,
  CONTRACT_KEYCHAINS,
  HAUS_NETWORK_DATA,
  HAUS_RPC,
  Keychain,
  ValidNetwork,
} from '@daohaus/keychain-utils';

import { LOCAL_ABI } from '@daohaus/abis';
import { createContract, fetchABI, getCode } from './abi';
import { isSearchArg } from './args';

const OPERATION_TYPE = 2;
const ADDRESS = 40;
const VALUE = 64;
const DATA_LENGTH = 64;

type MultisendArgs = {
  chainId: ValidNetwork;
  actionData: string;
  rpcs: Keychain;
};
type EncodedAction = {
  to: string;
  value: string;
  data: string;
  operation: number;
};
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
};

export type DecodedMultiTX = (DecodedAction | ActionError)[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isActionError = (action: any): action is ActionError => {
  return action.error;
};

const getMultisendHex = ({ chainId, actionData, rpcs }: MultisendArgs) => {
  const multisendAddr = CONTRACT_KEYCHAINS.GNOSIS_MULTISEND[chainId];
  if (!multisendAddr) throw new Error('Invalid chainId');

  const multisendContract = createContract({
    chainId,
    address: multisendAddr,
    abi: LOCAL_ABI.GNOSIS_MULTISEND,
    rpcs,
  });

  const decoded = multisendContract.interface['decodeFunctionData'](
    'multiSend',
    actionData
  );

  return decoded['transactions']?.slice(2) || decoded?.[0]?.slice(2);
};

const processAction = (actionsHex: string, txLength: number): EncodedAction => {
  return {
    to: `0x${actionsHex.slice(OPERATION_TYPE, OPERATION_TYPE + ADDRESS)}`,
    value: `0x${actionsHex.slice(
      OPERATION_TYPE + ADDRESS,
      OPERATION_TYPE + ADDRESS + VALUE
    )}`,
    data: `0x${actionsHex.slice(
      OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH,
      OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH + txLength * 2
    )}`,
    operation: parseInt(actionsHex.slice(0, OPERATION_TYPE)),
  };
};
const decodeMultisend = ({ chainId, actionData, rpcs }: MultisendArgs) => {
  let actionsHex = getMultisendHex({ chainId, actionData, rpcs });
  const transactions = [];

  while (actionsHex.length >= OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH) {
    const thisTxLength = BigNumber.from(
      `0x${actionsHex.slice(
        OPERATION_TYPE + ADDRESS + VALUE,
        OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH
      )}`
    ).toNumber();

    transactions.push(processAction(actionsHex, thisTxLength));
    actionsHex = actionsHex.slice(
      OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH + thisTxLength * 2
    );
  }

  return transactions;
};

const isEthTransfer = async (
  chainId: ValidNetwork,
  action: EncodedAction,
  rpcs: Keychain
) =>
  action?.data?.slice(2)?.length === 0 ||
  action?.data === ENCODED_0X0_DATA ||
  (await getCode({ chainId, contractAddress: action.to, rpcs })) === '0x';

const buildEthTransferAction = (
  chainId: ValidNetwork,
  action: EncodedAction
): DecodedAction => ({
  to: action.to,
  name: `${HAUS_NETWORK_DATA[chainId]?.symbol} Transfer`,
  value: BigNumber.from(action.value).toString(),
  params: [],
});

const decodeParam = ({
  argMeta,
  value,
}: {
  argMeta?: ValidArgType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}) => {
  if (!argMeta || isSearchArg(argMeta)) {
    return value;
  }
  if (argMeta?.type === 'argEncode') {
    const decodedValues = utils.defaultAbiCoder.decode(
      argMeta.solidityTypes,
      value
    );
    return argMeta.args.map((arg, i) => {
      const label = isSearchArg(arg)
        ? (arg as StringSearch).trim().split('.').reverse()[0]
        : `Param${i}`;
      return [label, decodedValues[i]];
    });
  }
  return value;
};

const decodeAction = async ({
  chainId,
  action,
  actionMeta,
  rpcs,
  explorerKeys,
}: {
  chainId: ValidNetwork;
  action: EncodedAction;
  actionMeta?: MulticallAction;
  rpcs: Keychain;
  explorerKeys: Keychain;
}): Promise<DecodedAction | ActionError> => {
  if (await isEthTransfer(chainId, action, rpcs))
    return buildEthTransferAction(chainId, action);

  const { to, data, value } = action;

  const abi = await fetchABI({
    chainId,
    contractAddress: to,
    rpcs,
    explorerKeys,
  });
  if (!abi || !abi?.length) {
    return {
      error: true,
      message: 'No ABI found for this contract',
      data,
    };
  }

  const decoded = new utils.Interface(abi).parseTransaction({ data, value });

  if (!decoded) {
    return {
      error: true,
      message: 'Could not decode action',
      data: action.data,
    };
  }

  return {
    to,
    name: decoded.name,
    value: decoded.value?.toString(),
    params: decoded.args.map((arg, i) => ({
      name:
        decoded?.functionFragment?.inputs?.[i].name ||
        'ERROR: Could not find name',
      type:
        decoded?.functionFragment?.inputs?.[i].type ||
        'ERROR: Could not find type',
      value:
        decoded?.functionFragment?.inputs?.[i].type === 'bytes'
          ? decodeParam({
              argMeta: actionMeta?.args?.[i],
              value: arg,
            })
          : arg,
    })),
  };
};

export const decodeProposalActions = async ({
  chainId,
  actionData,
  actionsMeta = [],
  rpcs = HAUS_RPC,
  explorerKeys = ABI_EXPLORER_KEYS,
}: {
  chainId: ValidNetwork;
  actionData: string;
  actionsMeta?: MulticallAction[];
  rpcs?: Keychain;
  explorerKeys?: Keychain;
}) => {
  return Promise.all(
    decodeMultisend({ chainId, actionData, rpcs })?.map(async (action, i) => {
      return await decodeAction({
        chainId,
        action,
        actionMeta: actionsMeta[i],
        rpcs,
        explorerKeys,
      });
    })
  );
};
