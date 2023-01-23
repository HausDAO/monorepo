import { Keychain, KeychainList, ValidNetwork } from './types';

export const ENDPOINTS: KeychainList = {
  V3_SUBGRAPH: {
    '0x1':
      'https://gateway.thegraph.com/api/[api-key]/subgraphs/id/GfHFdFmiSwW1PKtnDhhcxhArwtTjVuMnXxQ5XcETF1bP',
    '0x5': 'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-goerli',
    '0x64': 'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-gnosis',
    '0x89':
      'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-polygon',
    '0xa':
      'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-optimism',
    '0xa4b1':
      'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-arbitrum',
  },
  EXPLORER: {
    '0x1': 'https://etherscan.io',
    '0x5': 'https://goerli.etherscan.io',
    '0x64': 'https://gnosisscan.io/',
    '0x89': 'https://polygonscan.com/',
    '0xa': 'https://optimistic.etherscan.io/',
    '0xa4b1': 'https://arbiscan.io/',
  },
  GNOSIS_API: {
    '0x1': 'https://safe-transaction.mainnet.gnosis.io/api/v1',
    '0x5': 'https://safe-transaction.goerli.gnosis.io/api/v1',
    '0x64': 'https://safe-transaction.xdai.gnosis.io/api/v1',
    '0x89': 'https://safe-transaction.polygon.gnosis.io/api/v1',
    '0xa': 'https://safe-transaction.optimism.io/api/v1',
    '0xa4b1': 'https://safe-transaction.aribtrum.io/api/v1',
  },
  GAS_ESTIMATE: {
    '0x1':
      'https://safe-transaction.mainnet.gnosis.io/api/v1/safes/<<safeId>>/multisig-transactions/estimations/',
    '0x5':
      'https://safe-transaction.goerli.gnosis.io/api/v1/safes/<<safeId>>/multisig-transactions/estimations/',
    '0x64':
      'https://safe-transaction.xdai.gnosis.io/api/v1/safes/<<safeId>>/multisig-transactions/estimations/',
    '0x89':
      'https://safe-transaction.polygon.gnosis.io/api/v1/safes/<<safeId>>/multisig-transactions/estimations/',
    '0xa':
      'https://safe-transaction.optimism.gnosis.io/api/v1/safes/<<safeId>>/multisig-transactions/estimations/',
    '0xa4b1':
      'https://safe-transaction.aribtrum.gnosis.io/api/v1/safes/<<safeId>>/multisig-transactions/estimations/',
  },
  GNOSIS_SAFE_UI: {
    '0x1': 'https://app.safe.global/eth',
    '0x5': 'https://app.safe.global/gor',
    '0x64': 'https://app.safe.global/gno',
    '0x89': 'https://app.safe.global/matic',
    '0xa': 'https://app.safe.global/oeth',
    '0xa4b1': 'https://app.safe.global/arb',
  },
  TABULA_GRAPH: {
    '0x5':
      'https://api.thegraph.com/subgraphs/name/auryn-macmillan/tabula-goerli',
  },
};

export const addApiKeyToGraphEnpoints = (
  graphApiKeys: Keychain,
  endpoints: KeychainList
): KeychainList => {
  return Object.keys(graphApiKeys).reduce((acc, key) => {
    if (endpoints['V3_SUBGRAPH'][key as keyof Keychain] && acc) {
      const unreplacedValue = acc['V3_SUBGRAPH'][key as keyof Keychain];
      const apiKey = graphApiKeys[key as keyof Keychain];
      if (unreplacedValue && apiKey) {
        acc['V3_SUBGRAPH'][key as keyof Keychain] = unreplacedValue.replace(
          '[api-key]',
          apiKey
        );
      }
    }
    return acc;
  }, endpoints);
};
export const getGraphUrl = (
  networkId: ValidNetwork,
  graphApiKeys?: Keychain
): string | undefined => {
  if (graphApiKeys) {
    const endpoints = addApiKeyToGraphEnpoints(graphApiKeys, ENDPOINTS);
    return endpoints['V3_SUBGRAPH'][networkId];
  }
  return ENDPOINTS['V3_SUBGRAPH'][networkId];
};
export const HAUS_RPC = {
  '0x1': `https://${process.env['NX_RIVET_KEY']}.eth.rpc.rivet.cloud/`,
  '0x5': `https://${process.env['NX_RIVET_KEY']}.goerli.rpc.rivet.cloud/`,
  '0x64': 'https://rpc.gnosischain.com/',
  '0xa': 'https://mainnet.optimism.io',
  '0x89': 'https://polygon-rpc.com/',
  '0xa4b1': 'https://arb1.arbitrum.io/rpc',
};
export const GRAPH_API_KEYS = {
  '0x1': process.env['NX_GRAPH_API_KEY_MAINNET'],
};

export type PinataApiKeys = {
  pinata_api_key?: string;
  pinata_api_secret?: string;
};
export const PINATA_API_KEYS: PinataApiKeys = {
  pinata_api_key: process.env['NX_PINATA_API_KEY'],
  pinata_api_secret: process.env['NX_PINATA_API_SECRET'],
};
export const ABI_EXPLORER_KEYS: Keychain = {
  '0x1': process.env['NX_ETHERSCAN_KEY'],
  '0x5': process.env['NX_ETHERSCAN_KEY'],
};
