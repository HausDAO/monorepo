import { LOCAL_ABI } from '@daohaus/abis';
import {
  ArgType,
  DAOHAUS_SUMMONER_REFERRER,
  encodeFunction,
  encodeValues,
  getNonce,
  isArray,
  isBoolean,
  isNumberish,
  isString,
  POSTER_TAGS,
  toBaseUnits,
  ZERO_ADDRESS,
} from '@daohaus/utils';
import { CONTRACT_KEYCHAINS, ValidNetwork } from '@daohaus/keychain-utils';

export type SummonParams = {
  daoName?: string;
  tokenName?: string;
  tokenSymbol?: string;
  lootTokenName?: string;
  lootTokenSymbol?: string;
  votingTransferable?: boolean;
  nvTransferable?: boolean;
  quorum?: string;
  minRetention?: string;
  sponsorThreshold?: string;
  newOffering?: string;
  votingPeriod?: string;
  votingPeriodInSeconds?: number;
  gracePeriod?: string;
  gracePeriodInSeconds?: number;
  shamans?:
    | ''
    | {
        shamanAddresses: string[];
        shamanPermissions: string[];
      };
  members?:
    | ''
    | {
        memberAddresses: string[];
        memberShares: string[];
        memberLoot: string[];
      };
};

export const encodeMintParams = (formValues: SummonParams) => {
  const { members } = formValues;

  if (
    !members ||
    !isArray(members?.memberAddresses) ||
    members.memberAddresses.some((addr) => !isString(addr)) ||
    !isArray(members?.memberShares) ||
    members.memberShares.some((shares) => !isNumberish(shares)) ||
    !isArray(members?.memberLoot) ||
    members.memberLoot.some((shares) => !isNumberish(shares))
  ) {
    console.log('ERROR: Form Values', formValues);
    throw new Error(
      'encodeMintParams recieved arguments in the wrong shape or type'
    );
  }

  const wholeShareAmts = members.memberShares;
  const sharesInBaseUnits = wholeShareAmts.map((shares) => toBaseUnits(shares));
  const wholeLootAmts = members.memberLoot;
  const lootInBaseUnits = wholeLootAmts.map((loot) =>
    toBaseUnits(loot.toString())
  );

  const encoded = encodeValues(
    ['address[]', 'uint256[]', 'uint256[]'],
    [members.memberAddresses, sharesInBaseUnits, lootInBaseUnits]
  );

  if (isString(encoded)) {
    return encoded;
  }
  throw new Error('Encoding Error');
};

export const encodeTokenParams = (formValues: SummonParams) => {
  const tokenName = formValues.tokenName;
  const tokenSymbol = formValues.tokenSymbol;
  const lootTokenName = formValues.lootTokenName;
  const lootTokenSymbol = formValues.lootTokenSymbol;
  const pauseVoteToken = formValues.votingTransferable;
  const pauseNvToken = formValues.nvTransferable;

  if (
    !isString(tokenName) ||
    !isString(tokenSymbol) ||
    !isString(lootTokenName) ||
    !isString(lootTokenSymbol) ||
    !isBoolean(pauseVoteToken) ||
    !isBoolean(pauseNvToken)
  ) {
    console.log('ERROR: Form Values', formValues);

    throw new Error(
      'encodeTokenParams recieved arguments in the wrong shape or type'
    );
  }

  const encoded = encodeValues(
    ['string', 'string', 'string', 'string', 'bool', 'bool'],
    [
      tokenName,
      tokenSymbol,
      lootTokenName,
      lootTokenSymbol,
      pauseVoteToken,
      pauseNvToken,
    ]
  );

  if (isString(encoded)) {
    return encoded;
  }
  throw new Error('Encoding Error');
};

const governanceConfigTX = (formValues: SummonParams) => {
  const {
    votingPeriodInSeconds,
    gracePeriodInSeconds,
    newOffering,
    quorum,
    sponsorThreshold,
    minRetention,
  } = formValues;

  if (
    !isNumberish(votingPeriodInSeconds) ||
    !isNumberish(gracePeriodInSeconds) ||
    !isNumberish(newOffering) ||
    !isNumberish(quorum) ||
    !isNumberish(sponsorThreshold) ||
    !isNumberish(minRetention)
  ) {
    throw new Error(
      'governanceConfigTX recieved arguments in the wrong shape or type'
    );
  }

  const encodedValues = encodeValues(
    ['uint32', 'uint32', 'uint256', 'uint256', 'uint256', 'uint256'],
    [
      votingPeriodInSeconds,
      gracePeriodInSeconds,
      newOffering,
      quorum,
      sponsorThreshold,
      minRetention,
    ]
  );
  const encoded = encodeFunction(LOCAL_ABI.BAAL, 'setGovernanceConfig', [
    encodedValues,
  ]);
  if (isString(encoded)) {
    return encoded;
  }
  throw new Error('Encoding Error');
};

export const shamanConfigTX = (formValues: SummonParams) => {
  const { shamans } = formValues;

  if (shamans === '' || !shamans) {
    const encoded = encodeFunction(LOCAL_ABI.BAAL, 'setShamans', [[], []]);
    if (isString(encoded)) {
      return encoded;
    }
    throw new Error('Encoding Error');
  }
  if (
    !isArray(shamans?.shamanAddresses) ||
    shamans.shamanAddresses.some((addr) => !isString(addr)) ||
    !isArray(shamans?.shamanPermissions) ||
    shamans.shamanPermissions.some((addr) => !isNumberish(addr))
  ) {
    console.log('ERROR: Form Values', formValues);
    throw new Error(
      'shamanConfigTX recieved arguments in the wrong shape or type'
    );
  }
  const encoded = encodeFunction(LOCAL_ABI.BAAL, 'setShamans', [
    shamans.shamanAddresses,
    shamans.shamanPermissions,
  ]);
  if (isString(encoded)) {
    return encoded;
  }
  throw new Error('Encoding Error');
};

const metadataConfigTX = (formValues: SummonParams, posterAddress: string) => {
  const { daoName } = formValues;
  if (!isString(daoName)) {
    console.log('ERROR: Form Values', formValues);
    throw new Error('metadataTX recieved arguments in the wrong shape or type');
  }

  const METADATA = encodeFunction(LOCAL_ABI.POSTER, 'post', [
    JSON.stringify({ name: daoName }),
    POSTER_TAGS.summoner,
  ]);

  const encoded = encodeFunction(LOCAL_ABI.BAAL, 'executeAsBaal', [
    posterAddress,
    0,
    METADATA,
  ]);
  if (isString(encoded)) {
    return encoded;
  }
  throw new Error('Encoding Error');
};

// THIS IS ONLY USED IN V3_FACTORY_ORIGINAL CONTRACT
const tokenConfigTX = (formValues: SummonParams) => {
  const pauseVoteToken = !formValues.votingTransferable;
  const pauseNvToken = !formValues.nvTransferable;

  const encoded = encodeFunction(LOCAL_ABI.BAAL, 'setAdminConfig', [
    pauseVoteToken,
    pauseNvToken,
  ]);

  if (isString(encoded)) {
    return encoded;
  }
  throw new Error('Encoding Error');
};

// THIS IS ONLY USED IN V3_FACTORY_ORIGINAL CONTRACT
export const shareConfigTX = (formValues: SummonParams) => {
  const { members } = formValues;

  if (
    !members ||
    !isArray(members?.memberAddresses) ||
    members.memberAddresses.some((addr) => !isString(addr)) ||
    !isArray(members?.memberShares) ||
    members.memberShares.some((shares) => !isNumberish(shares))
  ) {
    console.log('ERROR: Form Values', formValues);
    throw new Error(
      'shareConfigTX recieved arguments in the wrong shape or type'
    );
  }

  const wholeShareAmts = members.memberShares;
  const sharesInBaseUnits = wholeShareAmts.map((shares) => toBaseUnits(shares));
  const encoded = encodeFunction(LOCAL_ABI.BAAL, 'mintShares', [
    members.memberAddresses,
    sharesInBaseUnits,
  ]);

  if (isString(encoded)) {
    return encoded;
  }
  throw new Error('Encoding Error');
};

// THIS IS ONLY USED IN V3_FACTORY_ORIGINAL CONTRACT
export const lootConfigTX = (formValues: SummonParams) => {
  const { members } = formValues;

  if (
    !members ||
    !isArray(members?.memberAddresses) ||
    members.memberAddresses.some((addr) => !isString(addr)) ||
    !isArray(members?.memberShares) ||
    members.memberShares.some((shares) => !isNumberish(shares))
  ) {
    console.log('ERROR: Form Values', formValues);
    throw new Error(
      'shareConfigTX recieved arguments in the wrong shape or type'
    );
  }

  const wholeLootAmts = members.memberLoot;
  const lootInBaseUnits = wholeLootAmts.map((loot) =>
    toBaseUnits(loot.toString())
  );
  const encoded = encodeFunction(LOCAL_ABI.BAAL, 'mintLoot', [
    members.memberAddresses,
    lootInBaseUnits,
  ]);
  if (isString(encoded)) {
    return encoded;
  }
  throw new Error('Encoding Error');
};

export const handleKeychains = (chainId: ValidNetwork) => {
  const { V3_FACTORY_ADV, POSTER, ZODIAC_FACTORY } = CONTRACT_KEYCHAINS;
  const v3Contracts = [V3_FACTORY_ADV, POSTER];

  if (v3Contracts.every((contract) => contract[chainId])) {
    return {
      V3_FACTORY_ADV: V3_FACTORY_ADV[chainId] || '',
      POSTER: POSTER[chainId] || '',
      ZODIAC_FACTORY: ZODIAC_FACTORY[chainId] || '',
    };
  }

  throw new Error('Could not find V3 contracts for this network');
};

export const assembleTxArgs = (
  formValues: Record<string, unknown>,
  chainId: ValidNetwork,
  safeAddress?: string
): ArgType[] => {
  const tokenName = formValues['tokenName'];
  const tokenSymbol = formValues['tokenSymbol'];
  const lootTokenName = formValues['lootTokenName'];
  const lootTokenSymbol = formValues['lootTokenSymbol'];

  if (
    !isString(tokenName) ||
    !isString(tokenSymbol) ||
    !isString(lootTokenName) ||
    !isString(lootTokenSymbol)
  ) {
    console.log('ERROR: Form Values', formValues);

    throw new Error(
      'assembleSummonTx recieved arguments in the wrong shape or type'
    );
  }

  const { POSTER } = handleKeychains(chainId);

  const mintParams = encodeMintParams(formValues);

  const tokenParams = encodeTokenParams(formValues);

  const initActions = [
    governanceConfigTX(formValues),
    shamanConfigTX(formValues),
    metadataConfigTX(formValues, POSTER),
  ];
  const args = [
    safeAddress || ZERO_ADDRESS,
    ZERO_ADDRESS,
    getNonce(),
    mintParams,
    tokenParams,
    initActions,
  ];
  console.log('args', args);

  return args;
};

// THIS IS ONLY USED FOR THE V3_FACTORY_ORIGINAL CONTRACT
export const assembleTxArgsOriginalFactory = (
  formValues: Record<string, unknown>,
  chainId: ValidNetwork,
  safeAddress?: string
): ArgType[] => {
  const tokenName = formValues['tokenName'];
  const tokenSymbol = formValues['tokenSymbol'];

  if (!isString(tokenName) || !isString(tokenSymbol)) {
    console.log('ERROR: Form Values', formValues);

    throw new Error(
      'assembleSummonTx recieved arguments in the wrong shape or type'
    );
  }

  const { POSTER } = handleKeychains(chainId);

  const initParams = encodeValues(
    ['string', 'string', 'address', 'address', 'address', 'address'],
    [
      tokenName,
      tokenSymbol,
      safeAddress || ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
      ZERO_ADDRESS,
    ]
  );

  const initActions = [
    tokenConfigTX(formValues),
    governanceConfigTX(formValues),
    shamanConfigTX(formValues),
    shareConfigTX(formValues),
    lootConfigTX(formValues),
    metadataConfigTX(formValues, POSTER),
  ];
  const args = [initParams, initActions, getNonce(), DAOHAUS_SUMMONER_REFERRER];
  console.log('args', args);

  return args;
};
