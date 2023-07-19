import {
  isArray,
  isNumberish,
  isNumberString,
  isString,
  toBaseUnits,
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
