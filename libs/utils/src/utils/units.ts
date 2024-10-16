import { parseUnits, formatUnits } from 'viem';

import numbro from 'numbro';
import { isNumberish } from './typeguards';

export const toBaseUnits = (amount: string, decimals = 18) =>
  parseUnits(amount, decimals).toString();

export const toWholeUnits = (amount: string, decimals = 18) =>
  formatUnits(BigInt(amount), decimals).toString();

export const truncValue = (amount: string, decimals = 6) =>
  // wrapped again into Number to strip any trailing zeroes
  Number(Number(amount).toFixed(decimals));

type NumericalFormat =
  | 'currency'
  | 'currencyShort'
  | 'number'
  | 'numberShort'
  | 'percent'
  | 'percentShort'
  | 'exponential';

interface FormatGeneratorParams {
  value: number;
  type: NumericalFormat | string;
  decimals: number;
}

const generateNumeral = ({
  value,
  type,
  decimals,
}: FormatGeneratorParams): string => {
  // cheap zeroFormatter
  if (value === 0) return '0';
  // short formats shrink large numbers to the shorter representation
  // e.g. 1.000 -> 1k, 1.000.000 -> 1m, etc
  const short = type.match(/(short)/i) ? 'a' : '';

  const decimalCount = decimals ? '0'.repeat(decimals) : '';

  // build the correct numbro.js format OR pass a one off custom format on.
  //
  // custom format: create your own format and it will bypass straight to numbro.js
  // eg. readableNumbers.toCustomFormat({value: 10, unit: 'Place', format: '0o '}) => '10th Place'
  let format;

  if (type.match(/(exponent)/i)) {
    format = `0,0[.]${decimalCount}e`;
    return numbro(value).format(format);
  } else if (type.match(/(percent)/i)) {
    const decimalMatcher = decimals > 0 ? `[.]${decimalCount}` : '';
    format = `0${decimalMatcher}%`;
    return numbro(value / 100).format(format);
  } else if (type.match(/(currency)/i)) {
    format = `$0[.]${decimalCount}${short}`;
    return numbro(value).format(format);
  } else if (type.match(/(number)/)) {
    format = `0,0[.]${decimalCount}${short}`;
    return numbro(value).format(format);
  } else {
    return numbro(value).format(type);
  }
};

interface ReadableNumberParams {
  value: number | string;
  unit?: string;
  decimals?: number;
  separator?: string;
  format?: NumericalFormat | string;
}

export const formatValueTo = ({
  value,
  unit = '',
  decimals = 4,
  separator = ' ',
  format,
}: ReadableNumberParams): string => {
  if (typeof value === 'string' && isNumberish(value)) {
    value = Number(value);
  }
  if (typeof value === 'string' && !isNumberish(value)) {
    throw new Error(`${value} is not a number`);
  }

  if (value > 0 && value < 1) {
    return unit
      ? `${value.toFixed(decimals)}${separator}${unit}`
      : value.toFixed(decimals);
  }

  if (!format) {
    throw new Error(`must define a format if ${value} is not between 0 and 1`);
  }

  const formatted = generateNumeral({
    value,
    type: format as NumericalFormat,
    decimals,
  });

  return `${formatted}${separator}${unit}`;
};

export const formatShares = (baseAmt: string | number) => {
  if (!isNumberish(baseAmt)) {
    console.warn('formatShares: baseAmt is not a number', baseAmt);
    return;
  }
  return formatValueTo({
    value: toWholeUnits(baseAmt.toString()),
    decimals: 2,
    format: 'numberShort',
    separator: '',
  });
};

export const percentage = (value: number, total: number) => {
  return (value / total) * 100;
};

export const roundedPercentage = (value: number, total: number) => {
  return Math.round(percentage(value, total));
};

export const checkHasQuorum = ({
  yesVotes,
  totalShares,
  quorumPercent,
}: {
  yesVotes: number;
  totalShares: number;
  quorumPercent: number;
}) => {
  return percentage(yesVotes, totalShares) >= quorumPercent;
};

export const dynamicDecimals = ({
  baseUnits,
  tokenDecimals = 18,
  extraZeros = 0,
}: {
  baseUnits: number;
  tokenDecimals?: number;
  extraZeros?: number;
}) => {
  const decimals = tokenDecimals - baseUnits.toString().length + 1 + extraZeros;
  // if decimals is negative, return 0
  return decimals > 0 ? decimals : 0;
};

/*
  https://numbrojs.com/old-format.html
  const string = numbro(1000.23).format('$ 0,0[.]0000 %'); => $ 1000.2300 %

  to create customFormatters add more logic to the formatGenerator function

  results in the readableNumbers resemble values seen in these examples:

  type         number       format        result
  ------------------------  --------------------------
  number       10000        '0,0.0000'     10,000.0000
  number       -10000       '0,0.0'       -10,000.0
  number       -10000       '0,0[.]0'     -10,000
  number       -10000.23    '0,0[.]0'     -10,000.2
  currency     1230974      '0.0a'         1.2m
  currency     1001         '$ 0,0[.]00'   $ 1,001
  currency     1230974      '($ 0.00 a)'   $ 1.23 m
  currency     1000.2       '0,0[.]00 $'   1,000.20 $
  currency     1001         '$ 0,0[.]00'   $ 1,001
  pecentage    1            '0%'           100%
  percentage   0.974878234  '0.000%'       97.488%
  percentage   -0.43        '0 %'          -43 %
  exponential  1123456789   '0,0e+0'       1e+9
  exponential  12398734.202 '0.00e+0'      1.24e+7

  create your own custom format and pass it to:
  readableNumber.toCustomFormat({ value, format, decimals, separator, unit })

  to use the default formats, pass value with any of the the following optional args:
  readableNumber.toCurrencyShort({ value, decimals, separator, unit })
*/

interface ReadableNumbersInterface {
  toCurrency: (args: Exclude<ReadableNumberParams, 'format'>) => string;
  toCurrencyShort: (args: Exclude<ReadableNumberParams, 'format'>) => string;
  toDollars: (
    args: Exclude<ReadableNumberParams, 'format' | 'decimals'>
  ) => string;
  toNumber: (args: Exclude<ReadableNumberParams, 'format'>) => string;
  toNumberShort: (args: Exclude<ReadableNumberParams, 'format'>) => string;
  toPercent: (args: Exclude<ReadableNumberParams, 'format'>) => string;
  toPercentDecimals: (args: Exclude<ReadableNumberParams, 'format'>) => string;
  toExponential: (args: Exclude<ReadableNumberParams, 'format'>) => string;
  toCustomFormat: (args: ReadableNumberParams) => string;
}

export const readableNumbers: ReadableNumbersInterface = {
  toCurrency: (args: ReadableNumberParams) => {
    return formatValueTo({ ...args, format: 'currency' });
  },
  toCurrencyShort: (args: ReadableNumberParams) => {
    return formatValueTo({ ...args, format: 'currencyShort' });
  },
  toDollars: (args: ReadableNumberParams) => {
    return formatValueTo({ ...args, decimals: 2, format: 'currency' });
  },
  toNumber: (args: ReadableNumberParams) => {
    return formatValueTo({ ...args, format: 'number' });
  },
  toNumberShort: (args: ReadableNumberParams) => {
    return formatValueTo({ ...args, format: 'numberShort' });
  },
  toPercent: (args: ReadableNumberParams) => {
    return formatValueTo({ ...args, decimals: 0, format: 'percent' });
  },
  toPercentDecimals: (args: ReadableNumberParams) => {
    return formatValueTo({ ...args, decimals: 2, format: 'percentShort' });
  },
  toExponential: (args: ReadableNumberParams) => {
    return formatValueTo({ ...args, format: 'exponential' });
  },
  toCustomFormat: (args: ReadableNumberParams) => {
    return formatValueTo(args);
  },
};
