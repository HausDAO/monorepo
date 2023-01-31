import { Validate } from 'react-hook-form';
import {
  isArray,
  isBoolean,
  isEthAddress,
  isObject,
  isNumberish,
  isString,
} from './typeguards';
import { toBaseUnits } from './units';
export const ValErrMsgs = {
  number: 'Field must be a number',
  boolean: 'Field must be a boolean',
  array: 'Field must be an array',
  ethAddress: 'Field must be an Ethereum address',
  url: 'Field must be a valid URL',
  email: 'Field must be a valid email',
  percent: 'Field must be a valid percentage',
  object: 'Field must be a valid JSON Object',
};
export const ValidateField = {
  number: (val: unknown) => (isNumberish(val) ? true : ValErrMsgs.number),
  boolean: (val: unknown) => (isBoolean(val) ? true : ValErrMsgs.boolean),
  array: (val: unknown) => (isArray(val) ? true : ValErrMsgs.array),
  ethAddress: (val: unknown) =>
    isEthAddress(val) ? true : ValErrMsgs.ethAddress,
  url: (val: unknown) =>
    isString(val) &&
    /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
      val
    )
      ? true
      : ValErrMsgs.url,
  email: (val: unknown) =>
    isString(val) && /^[^@]+@[^@]+\.[^@]+$/.test(val) ? true : ValErrMsgs.email,
  percent: (val: unknown, range: [number, number] = [0, 100]) =>
    isNumberish(val) && Number(val) >= range[0] && Number(val) <= range[1]
      ? true
      : ValErrMsgs.percent,
  object: (val: unknown) => (isObject(val) ? true : ValErrMsgs.object),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ignoreEmptyVal = (val: any, validator: Validate<any>) =>
  val === '' ? true : validator(val);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ignoreEmpty = (val: any, validator: Validate<any>) =>
  val === '' ? true : validator(val);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleBaseUnits = (val: any, decimals = 18) =>
  ValidateField.number(val) === true ? toBaseUnits(val, decimals) : val;
