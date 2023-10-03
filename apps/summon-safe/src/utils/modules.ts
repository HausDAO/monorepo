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
          address: '0x3D65060def34B7b09f3be8f1eDD826B278540201',
          singletonAddress: '0x11cf91a633b292e90afc1dd063dB9CE0b94a89aE',
        },
      },
      '0x64': {
        moduleFactory: {
          address: '0xD8f6FE1E102a05Eae8ab70290Dc410f80FdA3a8D',
          singletonAddress: '0x7dd7E6AF7Ff624EF6caf2d977E339209D2A5503A',
        },
      },
      '0xa': {},
      '0x89': {},
      '0xa4b1': {},
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
          address: '0x3D65060def34B7b09f3be8f1eDD826B278540201',
          singletonAddress: '0x478b6d99EfA2689649762a4B4E2590872184078f',
        },
      },
      '0x64': {
        moduleFactory: {
          address: '0xD8f6FE1E102a05Eae8ab70290Dc410f80FdA3a8D',
          singletonAddress: '0xFCC2d698C614743FD17f628921874e8Eac3D538F',
        },
      },
      '0xa': {},
      '0x89': {},
      '0xa4b1': {},
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
          address: '0x3D65060def34B7b09f3be8f1eDD826B278540201',
          singletonAddress: '0x7dd7E6AF7Ff624EF6caf2d977E339209D2A5503A',
        },
      },
      '0x64': {
        moduleFactory: {
          address: '0xD8f6FE1E102a05Eae8ab70290Dc410f80FdA3a8D',
          singletonAddress: '0x926542695E047463f25aa3Df7e78Ade57495808A',
        },
      },
      '0xa': {},
      '0x89': {},
      '0xa4b1': {},
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
          address: '0x3D65060def34B7b09f3be8f1eDD826B278540201',
          singletonAddress: '0xFCC2d698C614743FD17f628921874e8Eac3D538F',
        },
      },
      '0x64': {
        moduleFactory: {
          address: '0xD8f6FE1E102a05Eae8ab70290Dc410f80FdA3a8D',
          singletonAddress: '0x3D65060def34B7b09f3be8f1eDD826B278540201',
        },
      },
      '0xa': {},
      '0x89': {},
      '0xa4b1': {},
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
          address: '0x3D65060def34B7b09f3be8f1eDD826B278540201',
          singletonAddress: '0x926542695E047463f25aa3Df7e78Ade57495808A',
        },
      },
      '0x64': {
        moduleFactory: {
          address: '0xD8f6FE1E102a05Eae8ab70290Dc410f80FdA3a8D',
          singletonAddress: '0x0904DA589227e1c9f318D9581756c331f62ACd98',
        },
      },
      '0xa': {},
      '0x89': {},
      '0xa4b1': {},
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
