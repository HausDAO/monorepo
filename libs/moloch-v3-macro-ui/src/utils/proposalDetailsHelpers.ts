import { LOCAL_ABI } from '@daohaus/abis';
import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import { MolochV3Dao, MolochV3Proposal } from '@daohaus/moloch-v3-data';
import {
  DecodedAction,
  DecodedMultiTX,
  createContract,
  isActionError,
} from '@daohaus/tx-builder';
import { formatValueTo, toWholeUnits } from '@daohaus/utils';
import { BigNumberish } from 'ethers';

export type ProposalDataPoint = {
  displayType: 'data' | 'member';
  label: string;
  value: string;
};

const isMintProposal = (
  actionData: DecodedMultiTX,
  dao: MolochV3Dao
): boolean => {
  return actionData.some((action) => {
    if (isActionError(action)) return false;
    const isDao = action.to.toLowerCase() === dao.id.toLocaleLowerCase();
    const isMint = action.name === 'mintShares' || action.name === 'mintLoot';
    return isDao && isMint;
  });
};

const isTributeProposal = (proposal: MolochV3Proposal): boolean => {
  return proposal.tributeEscrowRecipient !== null;
};

const isFundingProposal = (actionData: DecodedMultiTX): boolean => {
  return actionData.some((action) => {
    return !isActionError(action) && action.name === 'transfer';
  });
};

const getValueFromMintOrTransferAction = (
  actionData: DecodedAction,
  decimals = 18
): string => {
  if (
    actionData.params[0].name !== 'to' &&
    actionData.params[1].name !== 'amount'
  ) {
    return 'decoding error';
  }

  const value = Array.isArray(actionData.params[1].value)
    ? (actionData.params[1].value[0] as BigNumberish)
    : (actionData.params[1].value as BigNumberish);

  return formatValueTo({
    value: toWholeUnits(value.toString(), decimals),
    decimals: 2,
    format: 'numberShort',
  });
};

const getValueFromTributeData = (proposal: MolochV3Proposal): string => {
  if (!proposal.tributeOffered || !proposal.tributeTokenDecimals) {
    return 'decoding err';
  }
  return `${formatValueTo({
    value: toWholeUnits(
      proposal.tributeOffered,
      Number(proposal.tributeTokenDecimals)
    ),
    decimals: 2,
    format: 'numberShort',
  })} ${proposal.tributeTokenSymbol}`;
};

const getRecipientAddressFromMintOrTransferAction = (
  actionData: DecodedAction
): string => {
  if (
    actionData.params[0].name !== 'to' &&
    actionData.params[1].name !== 'amount'
  ) {
    return 'decoding error';
  }

  return Array.isArray(actionData.params[0].value)
    ? actionData.params[0].value[0].toString()
    : actionData.params[0].value.toString();
};

const addTributeData = (
  proposal: MolochV3Proposal,
  actionData: DecodedMultiTX,
  dao: MolochV3Dao
): ProposalDataPoint[] => {
  let data: ProposalDataPoint[] = [
    {
      displayType: 'data',
      label: 'Tribute Amount',
      value: getValueFromTributeData(proposal),
    },
  ];

  const sharesAction = actionData.find((action) => {
    return !isActionError(action) && action.name === 'mintShares';
  });

  if (sharesAction && !isActionError(sharesAction)) {
    data = [
      ...data,
      {
        displayType: 'data',
        label: 'Voting Tokens Requested',
        value: `${getValueFromMintOrTransferAction(sharesAction)} ${
          dao.shareTokenSymbol
        }`,
      },
    ];
  }

  const lootAction = actionData.find((action) => {
    return !isActionError(action) && action.name === 'mintLoot';
  });

  if (lootAction && !isActionError(lootAction)) {
    data = [
      ...data,
      {
        displayType: 'data',
        label: 'Non-Voting Tokens Requested',
        value: getValueFromMintOrTransferAction(lootAction),
      },
    ];
  }

  return data;
};

const addMintData = (
  actionData: DecodedMultiTX,
  dao: MolochV3Dao
): ProposalDataPoint[] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recipient: any = {};

  const sharesAction = actionData.find((action) => {
    return !isActionError(action) && action.name === 'mintShares';
  });
  const lootAction = actionData.find((action) => {
    return !isActionError(action) && action.name === 'mintLoot';
  });

  if (sharesAction && !isActionError(sharesAction)) {
    data = [
      ...data,
      {
        displayType: 'data',
        label: 'Voting Tokens Requested',
        value: `${getValueFromMintOrTransferAction(sharesAction)} ${
          dao.shareTokenSymbol
        }`,
      },
    ];
    recipient = {
      displayType: 'member',
      label: 'Recipient',
      value: getRecipientAddressFromMintOrTransferAction(sharesAction),
    };
  }

  if (lootAction && !isActionError(lootAction)) {
    data = [
      ...data,
      {
        displayType: 'data',
        label: 'Non-Voting Tokens Requested',
        value: `${getValueFromMintOrTransferAction(lootAction)} ${
          dao.lootTokenSymbol
        }`,
      },
    ];
    recipient = {
      displayType: 'member',
      label: 'Recipient',
      value: getRecipientAddressFromMintOrTransferAction(lootAction),
    };
  }

  return [...data, recipient];
};

const addFundingData = async (
  actionData: DecodedMultiTX,
  daoChain: string
): Promise<ProposalDataPoint[]> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any = [];

  if (!isActionError(actionData[0])) {
    const recipient = {
      displayType: 'member',
      label: 'Recipient',
      value: getRecipientAddressFromMintOrTransferAction(actionData[0]),
    };
    const tokenData = await fetchTokenData({
      actionData: actionData[0],
      chainId: daoChain as ValidNetwork,
    });

    const amount = {
      displayType: 'data',
      label: 'Funding Amount',
      value: `${getValueFromMintOrTransferAction(
        actionData[0],
        tokenData?.decimals
      )} ${tokenData?.symbol}`,
    };

    data = [recipient, amount];
  }

  return data;
};

const fetchTokenData = async ({
  actionData,
  chainId,
  rpcs,
}: {
  actionData: DecodedAction;
  chainId: ValidNetwork;
  rpcs?: Keychain;
}) => {
  const tokenAddress = actionData.to;
  const tokenContract = createContract({
    address: tokenAddress,
    abi: LOCAL_ABI.ERC20,
    chainId,
    rpcs,
  });

  try {
    const decimals = await tokenContract.decimals();
    const symbol = await tokenContract.symbol();

    return {
      tokenAddress,
      decimals,
      symbol,
    };
  } catch {
    console.log('token fetch error');
  }
};

export const formatAddtionalDataPoints = async (
  proposal: MolochV3Proposal,
  actionData: DecodedMultiTX,
  dao: MolochV3Dao,
  daoChain: string
): Promise<ProposalDataPoint[] | undefined> => {
  if (isTributeProposal(proposal)) {
    return addTributeData(proposal, actionData, dao);
  }

  // NOTE: this check must come after tribute prop
  if (isMintProposal(actionData, dao)) {
    return addMintData(actionData, dao);
  }

  if (isFundingProposal(actionData)) {
    return addFundingData(actionData, daoChain);
  }
};
