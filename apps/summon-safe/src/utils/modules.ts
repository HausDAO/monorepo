import { ModuleTemplate } from './types';

export const MODULES: Record<string, ModuleTemplate> = {
  BAAL_COOKIE_JAR: {
    id: 'baalCookieJar',
    name: 'Baal CookieJar',
    tag: 'baal',
    description: 'A CookieJar ready for Baal',
    factory: {
      abi: [
        'function summonCookieJar(address _singleton,bytes memory _initializer,string memory _details,address donationToken,uint256 donationAmount,uint256 _saltNonce)',
      ],
      initializationParams: [
        'address',
        'uint256',
        'uint256',
        'address',
        'address',
        'uint256',
        'bool',
        'bool',
      ],
      singletonAbi: ['function setUp(bytes memory _initializationParams)'],
    },
    chain: {
      '0x1': {},
      '0x5': {
        moduleFactory: {
          address: '0x8f60853B55847d91331106acc303F4A8676efc8B',
          singletonAddress: '0x30b3Ac0e403e5102c9f0097E9c65f09E5AaF810c',
        },
      },
      '0x64': {
        moduleFactory: {
          address: '0xD858ce60102BCEa272a6FA36B2E1770877B8Fa45',
          singletonAddress: '0x7c1Db931F804271E39b04E68221b71Ca94E9AFa5',
        },
      },
      '0xa': {
        moduleFactory: {
          address: '0xD858ce60102BCEa272a6FA36B2E1770877B8Fa45',
          singletonAddress: '0x7c1Db931F804271E39b04E68221b71Ca94E9AFa5',
        },
      },
      '0x89': {},
      '0xa4b1': {},
      '0xaa36a7': {
        moduleFactory: {
          address: '0xD858ce60102BCEa272a6FA36B2E1770877B8Fa45',
          singletonAddress: '0x7c1Db931F804271E39b04E68221b71Ca94E9AFa5',
        },
      },
      // '0x2105': {},
    },
    params: [
      {
        id: '_safeTarget',
        type: 'address',
        defaultValue: 'safeAddress',
        order: 0,
      },
      {
        id: '_dao',
        type: 'address',
        defaultValue: 'baalAddress',
        order: 4,
      },
      {
        id: '_cookieToken',
        label: 'Cookie Address',
        placeholder: '0x123...',
        type: 'address',
        order: 3,
      },
      {
        id: '_cookieAmount',
        label: 'Cookie Amount',
        placeholder: '1000000',
        type: 'uint256',
        order: 2,
      },
      {
        id: '_periodLength',
        label: 'Period Length',
        placeholder: '86400 (seconds)',
        type: 'uint256',
        order: 1,
      },
      {
        id: '_threshold',
        label: 'Threshold',
        placeholder: '1000000000000000000',
        type: 'uint256',
        order: 5,
      },
      {
        id: '_useShares',
        label: 'Use Shares?',
        type: 'bool',
        order: 6,
      },
      {
        id: '_useLoot',
        label: 'Use Loot?',
        type: 'bool',
        order: 7,
      },
    ],
    daoSettings: {
      daoName: { show: true },
      tokenSettings: {
        defaultValues: {
          tokenName: 'Voting Token',
          tokenSymbol: 'SHARES',
          lootTokenName: 'Non-Voting Token',
          lootTokenSymbol: 'LOOT',
          votingTransferable: false,
          nvTransferable: true,
        },
      },
      proposalTiming: {
        show: true,
        // TODO: how to make those input to auto-update with default values
        // defaultValues: {
        //   votingPeriodInSeconds_input: '1',
        //   votingPeriodInSeconds: 24 * 3600,
        //   gracePeriodInSeconds_input: '0.5',
        //   gracePeriodInSeconds: 12 * 3600,
        // },
      },
      advancedGovernance: {
        defaultValues: {
          quorum: '0',
          minRetention: '66',
          sponsorThreshold: '0',
          newOffering: '0',
        },
      },
      shamans: {
        defaultValues: {
          shamans: '',
        },
      },
      startingMembers: { show: true },
    },
  },
  ERC20_COOKIE_JAR: {
    id: 'erc20CookieJar',
    name: 'ERC20 CookieJar',
    tag: 'erc20',
    description: 'An ERC20 CookieJar',
    factory: {
      abi: [
        'function summonCookieJar(address _singleton,bytes memory _initializer,string memory _details,address donationToken,uint256 donationAmount,uint256 _saltNonce)',
      ],
      initializationParams: [
        'address',
        'uint256',
        'uint256',
        'address',
        'address',
        'uint256',
      ],
      singletonAbi: ['function setUp(bytes memory _initializationParams)'],
    },
    chain: {
      '0x1': {},
      '0x5': {
        moduleFactory: {
          address: '0x8f60853B55847d91331106acc303F4A8676efc8B',
          singletonAddress: '0x6a2580B166b7132042cCcABa1Fe554fd67440597',
        },
      },
      '0x64': {
        moduleFactory: {
          address: '0xD858ce60102BCEa272a6FA36B2E1770877B8Fa45',
          singletonAddress: '0x85C60D0674e161B7f9d1d40A2A46e4b788E7F057',
        },
      },
      '0xa': {
        moduleFactory: {
          address: '0xD858ce60102BCEa272a6FA36B2E1770877B8Fa45',
          singletonAddress: '0x85C60D0674e161B7f9d1d40A2A46e4b788E7F057',
        },
      },
      '0x89': {},
      '0xa4b1': {},
      '0xaa36a7': {
        moduleFactory: {
          address: '0xD858ce60102BCEa272a6FA36B2E1770877B8Fa45',
          singletonAddress: '0x85C60D0674e161B7f9d1d40A2A46e4b788E7F057',
        },
      },
      // '0x2105': {},
    },
    params: [
      {
        id: '_safeTarget',
        type: 'address',
        defaultValue: 'safeAddress',
        order: 0,
      },
      {
        id: '_cookieToken',
        label: 'Cookie Address',
        placeholder: '0x123...',
        type: 'address',
        order: 3,
      },
      {
        id: '_cookieAmount',
        label: 'Cookie Amount',
        placeholder: '1000000',
        type: 'uint256',
        order: 2,
      },
      {
        id: '_erc20addr',
        label: 'ERC20 Address',
        placeholder: '0x123...',
        type: 'address',
        order: 4,
      },
      {
        id: '_threshold',
        label: 'Threshold',
        placeholder: '1000000000000000',
        type: 'uint256',
        order: 5,
      },
      {
        id: '_periodLength',
        label: 'Period Length',
        placeholder: '86400 (seconds)',
        type: 'uint256',
        order: 1,
      },
    ],
  },
  ERC721_COOKIE_JAR: {
    id: 'erc721CookieJar',
    name: 'ERC721 CookieJar',
    tag: 'erc721',
    description: 'An ERC721 CookieJar',
    factory: {
      abi: [
        'function summonCookieJar(address _singleton,bytes memory _initializer,string memory _details,address donationToken,uint256 donationAmount,uint256 _saltNonce)',
      ],
      initializationParams: [
        'address',
        'uint256',
        'uint256',
        'address',
        'address',
      ],
      singletonAbi: ['function setUp(bytes memory _initializationParams)'],
    },
    chain: {
      '0x1': {},
      '0x5': {
        moduleFactory: {
          address: '0x8f60853B55847d91331106acc303F4A8676efc8B',
          singletonAddress: '0xf3219beFA8d7ae465fbb0DD227F706972943a84E',
        },
      },
      '0x64': {
        moduleFactory: {
          address: '0xD858ce60102BCEa272a6FA36B2E1770877B8Fa45',
          singletonAddress: '0x15f06a6dB8eC8D79Eaa49659210C1c58975a4056',
        },
      },
      '0xa': {
        moduleFactory: {
          address: '0xD858ce60102BCEa272a6FA36B2E1770877B8Fa45',
          singletonAddress: '0x15f06a6dB8eC8D79Eaa49659210C1c58975a4056',
        },
      },
      '0x89': {},
      '0xa4b1': {},
      '0xaa36a7': {
        moduleFactory: {
          address: '0xD858ce60102BCEa272a6FA36B2E1770877B8Fa45',
          singletonAddress: '0x15f06a6dB8eC8D79Eaa49659210C1c58975a4056',
        },
      },
      // '0x2105': {},
    },
    params: [
      {
        id: '_safeTarget',
        type: 'address',
        defaultValue: 'safeAddress',
        order: 0,
      },
      {
        id: '_cookieToken',
        label: 'Cookie Address',
        placeholder: '0x123...',
        type: 'address',
        order: 3,
      },
      {
        id: '_cookieAmount',
        label: 'Cookie Amount',
        placeholder: '1000000',
        type: 'uint256',
        order: 2,
      },
      {
        id: '_periodLength',
        label: 'Period Length',
        placeholder: '86400 (seconds)',
        type: 'uint256',
        order: 1,
      },
      {
        id: '_erc721addr',
        label: 'ERC721 Address',
        placeholder: '0x123...',
        type: 'address',
        order: 4,
      },
    ],
  },
  LIST_COOKIE_JAR: {
    id: 'listCookieJar',
    name: 'List CookieJar',
    tag: 'list',
    description: 'An Allowlist CookieJar',
    factory: {
      abi: [
        'function summonCookieJar(address _singleton,bytes memory _initializer,string memory _details,address donationToken,uint256 donationAmount,uint256 _saltNonce)',
      ],
      initializationParams: [
        'address',
        'uint256',
        'uint256',
        'address',
        'address[]',
      ],
      singletonAbi: ['function setUp(bytes memory _initializationParams)'],
    },
    chain: {
      '0x1': {},
      '0x5': {
        moduleFactory: {
          address: '0x8f60853B55847d91331106acc303F4A8676efc8B',
          singletonAddress: '0x92c82e6DFd97e54c5f22bE866b863Ce71f26373f',
        },
      },
      '0x64': {
        moduleFactory: {
          address: '0xD858ce60102BCEa272a6FA36B2E1770877B8Fa45',
          singletonAddress: '0x226E0601aa8b8CC34519c76Be00A7a6a8a4d97d2',
        },
      },
      '0xa': {
        moduleFactory: {
          address: '0xD858ce60102BCEa272a6FA36B2E1770877B8Fa45',
          singletonAddress: '0x226E0601aa8b8CC34519c76Be00A7a6a8a4d97d2',
        },
      },
      '0x89': {},
      '0xa4b1': {},
      '0xaa36a7': {
        moduleFactory: {
          address: '0xD858ce60102BCEa272a6FA36B2E1770877B8Fa45',
          singletonAddress: '0x226E0601aa8b8CC34519c76Be00A7a6a8a4d97d2',
        },
      },
      // '0x2105': {},
    },
    params: [
      {
        id: '_safeTarget',
        type: 'address',
        defaultValue: 'safeAddress',
        order: 0,
      },
      {
        id: '_cookieToken',
        label: 'Cookie Address',
        placeholder: '0x123...',
        type: 'address',
        order: 3,
      },
      {
        id: '_cookieAmount',
        label: 'Cookie Amount',
        placeholder: '1000000',
        type: 'uint256',
        order: 2,
      },
      {
        id: '_periodLength',
        label: 'Period Length',
        placeholder: '86400 (seconds)',
        type: 'uint256',
        order: 1,
      },
      {
        id: '_allowList',
        label: 'Allow List',
        headerLabel: 'Member Address',
        multipleValues: true,
        placeholder: '0x123...',
        type: 'address',
        order: 4,
      },
    ],
  },
  OPEN_COOKIE_JAR: {
    id: 'openCookieJar',
    name: 'Open CookieJar',
    tag: 'open',
    description: 'An Open CookieJar',
    factory: {
      abi: [
        'function summonCookieJar(address _singleton,bytes memory _initializer,string memory _details,address donationToken,uint256 donationAmount,uint256 _saltNonce)',
      ],
      initializationParams: ['address', 'uint256', 'uint256', 'address'],
      singletonAbi: ['function setUp(bytes memory _initializationParams)'],
    },
    chain: {
      '0x1': {},
      '0x5': {
        moduleFactory: {
          address: '0x8f60853B55847d91331106acc303F4A8676efc8B',
          singletonAddress: '0x5BeFFF7186811b49d29B5565B161Ea7e3d890CC8',
        },
      },
      '0x64': {
        moduleFactory: {
          address: '0xD858ce60102BCEa272a6FA36B2E1770877B8Fa45',
          singletonAddress: '0x0C7F0fC0ddb95d7099ED97c10A2DE549c03E39F9',
        },
      },
      '0xa': {
        moduleFactory: {
          address: '0xD858ce60102BCEa272a6FA36B2E1770877B8Fa45',
          singletonAddress: '0x0C7F0fC0ddb95d7099ED97c10A2DE549c03E39F9',
        },
      },
      '0x89': {},
      '0xa4b1': {},
      '0xaa36a7': {
        moduleFactory: {
          address: '0xD858ce60102BCEa272a6FA36B2E1770877B8Fa45',
          singletonAddress: '0x0C7F0fC0ddb95d7099ED97c10A2DE549c03E39F9',
        },
      },
      // '0x2105': {},
    },
    params: [
      {
        id: '_safeTarget',
        type: 'address',
        defaultValue: 'safeAddress',
        order: 0,
      },
      {
        id: '_cookieToken',
        label: 'Cookie Address',
        placeholder: '0x123...',
        type: 'address',
        order: 3,
      },
      {
        id: '_cookieAmount',
        label: 'Cookie Amount',
        placeholder: '1000000',
        type: 'uint256',
        order: 2,
      },
      {
        id: '_periodLength',
        label: 'Period Length',
        placeholder: '86400 (seconds)',
        type: 'uint256',
        order: 1,
      },
    ],
  },
};
