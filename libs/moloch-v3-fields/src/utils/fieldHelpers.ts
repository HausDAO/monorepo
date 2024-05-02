import {
  GRAPH_API_KEYS,
  HAUS_NETWORK_DATA,
  ValidNetwork,
} from '@daohaus/keychain-utils';
import {
  findMember,
  FindMemberQuery,
  MolochV3Dao,
} from '@daohaus/moloch-v3-data';
import { ErrorMessage } from '@daohaus/ui';
import {
  isArray,
  isNumberish,
  isNumberString,
  isString,
  ReactSetter,
  toBaseUnits,
  TokenBalance,
} from '@daohaus/utils';
import { isAddress } from 'viem';

const VAL_MSG = {
  formattingError:
    'Incorrect formatting. Check formatting rules in tooltip above.',
  AMOUNT_ERR:
    'Amounts are required and must be a number. Check formatting rules in tooltip above.',
  ADDRESS_ERR:
    'Recipient addresses are required and must be valid Ethereum addresses. Check formatting rules in tooltip above.',
};

export const validateAddressesAndAmountsData = (
  disperseData: Record<string, string[]> | ''
) => {
  if (disperseData === '') return true;
  const { recipients, values } = disperseData;
  if (!isArray(recipients) || !isArray(values)) return VAL_MSG.formattingError;

  if (!recipients.every((address) => isAddress(address)))
    return VAL_MSG.ADDRESS_ERR;
  if (!values.every((address) => isNumberString(address)))
    return VAL_MSG.AMOUNT_ERR;
  return true;
};
export const transformAddressesAndAmountsData = (
  response: string | undefined
) => {
  if (!isString(response) || response === '') return '';
  const recipientEntities = response
    .split(/[\n|,]/)
    .map((str) => str.trim())
    .filter(Boolean);

  const accEntites = recipientEntities.reduce(
    (acc, member) => {
      const splitString = member.trim().split(' ');
      const newRecipientAddress = splitString[0];
      const newAmount = splitString[1];
      const newAmountsWei = isNumberish(newAmount)
        ? toBaseUnits(newAmount)
        : newAmount;

      return {
        recipients: [...acc.recipients, newRecipientAddress],
        values: [...acc.values, newAmountsWei],
        total: isNumberish(newAmountsWei)
          ? acc.total + BigInt(newAmountsWei)
          : acc.total,
      };
    },
    {
      recipients: [] as string[],
      values: [] as string[],
      total: BigInt(0),
    }
  );

  return {
    ...accEntites,
    total: accEntites.total.toString(),
  };
};
export const sortTokensForRageQuit = (tokens: string[]): string[] => {
  return tokens.sort((a, b) => {
    return parseInt(a.slice(2), 16) - parseInt(b.slice(2), 16);
  });
};
const isNetworkToken = (tokenData: TokenBalance) => {
  return !tokenData.token;
};
export type TokenData = {
  decimals: number;
  name: string;
  symbol: string;
  daoBalance: string;
  address: string;
};
export const getErc20s = (treasury: MolochV3Dao['vaults'][number]) => {
  return treasury.tokenBalances.reduce(
    (acc: TokenData[], tokenData: TokenBalance) => {
      if (!isNetworkToken(tokenData)) {
        return [
          ...acc,
          {
            daoBalance: tokenData.balance,
            decimals: tokenData.token?.decimals || 18,
            address: tokenData.tokenAddress || 'Error: Data Missing',
            name: tokenData.token?.name || 'Error: Data Missing',
            symbol: tokenData.token?.symbol || 'Error: Data Missing',
          },
        ];
      }
      return acc;
    },
    []
  );
};
export const getNetworkToken = (
  daoData: MolochV3Dao,
  daochain: ValidNetwork,
  safeAddress: string,
  networks = HAUS_NETWORK_DATA
) => {
  const networkData = networks[daochain];
  const treasury = daoData.vaults.find((v) => {
    if (!safeAddress) return v.safeAddress === daoData.safeAddress;
    return v.safeAddress === safeAddress;
  });
  const networkToken = treasury && treasury.tokenBalances.find(isNetworkToken);

  if (networkToken && networkData) {
    return {
      daoBalance: networkToken.balance,
      decimals: networkData.tokenDecimals,
      symbol: networkData.symbol,
      name:
        daochain === '0x1'
          ? 'ETH'
          : `${networkData.symbol} on ${networkData.name}`,
    };
  }
  return null;
};

export const isActiveMember = async ({
  daoid,
  daochain,
  address,
  setMemberLoading,
}: {
  daoid: string;
  daochain: ValidNetwork;
  address: string;
  setMemberLoading: ReactSetter<boolean>;
}): Promise<{ member?: FindMemberQuery['member']; error?: ErrorMessage }> => {
  try {
    setMemberLoading(true);
    const memberRes = await findMember({
      networkId: daochain,
      dao: daoid,
      memberAddress: address.toLowerCase(),
      graphApiKeys: GRAPH_API_KEYS,
    });

    if (
      memberRes?.data?.member &&
      Number(memberRes?.data?.member?.shares) > 0
    ) {
      return {
        member: memberRes.data.member,
      };
    }
    if (memberRes?.data?.member && Number(memberRes?.data?.member?.loot) > 0) {
      return {
        member: memberRes.data.member,
        error: {
          type: 'error',
          message: `Member doesn't own any shares`,
        },
      };
    }
    return {
      error: {
        type: 'error',
        message: `Member not found`,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      error: {
        type: 'error',
        message: `${error}`,
      },
    };
  } finally {
    setMemberLoading(false);
  }
};
