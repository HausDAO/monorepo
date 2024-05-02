import { Keychain, KeychainList, ValidNetwork } from './types';

export const ENDPOINTS: KeychainList = {
  V3_SUBGRAPH: {
    '0x1':
      'https://gateway.thegraph.com/api/[api-key]/subgraphs/id/GfHFdFmiSwW1PKtnDhhcxhArwtTjVuMnXxQ5XcETF1bP',
    '0x5': 'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-goerli',
    '0x64':
      'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/6x9FK3iuhVFaH9sZ39m8bKB5eckax8sjxooBPNKWWK8r',
    '0x89':
      'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/A4su27JYXR5TkPZmiFHzzqMJnmYttfU3FyrdNBDnnu8T',
    '0xa':
      'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/CgH5vtz9CJPdcSmD3XEh8fCVDjQjnRwrSawg71T1ySXW',
    '0xa4b1':
      'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/GPACxuMWrrPSEJpFqupnePJNMfuArpFabrXLnWvXU2bp',
    '0xaa36a7':
      'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/3k93SNY5Y1r4YYWEuPY9mpCm2wnGoYDKRtk82QZJ3Kvw',
    '0x2105':
      'https://gateway-arbitrum.network.thegraph.com/api/[api-key]/subgraphs/id/7yh4eHJ4qpHEiLPAk9BXhL5YgYrTrRE6gWy8x4oHyAqW',
  },
  EXPLORER: {
    '0x1': 'https://etherscan.io',
    '0x5': 'https://goerli.etherscan.io',
    '0x64': 'https://gnosisscan.io',
    '0x89': 'https://polygonscan.com',
    '0xa': 'https://optimistic.etherscan.io',
    '0xa4b1': 'https://arbiscan.io',
    '0xaa36a7': 'https://sepolia.etherscan.io',
    '0x2105': 'https://basescan.org',
  },
  GNOSIS_API: {
    '0x1': 'https://safe-transaction-mainnet.safe.global/api/v1',
    '0x5': 'https://safe-transaction-goerli.safe.global/api/v1',
    '0x64': 'https://safe-transaction-gnosis-chain.safe.global/api/v1',
    '0x89': 'https://safe-transaction-polygon.safe.global/api/v1',
    '0xa': 'https://safe-transaction-optimism.safe.global/api/v1',
    '0xa4b1': 'https://safe-transaction-arbitrum.safe.global/api/v1',
    '0xaa36a7': 'https://safe-transaction-sepolia.safe.global/api/v1',
    '0x2105': 'https://safe-transaction-base.safe.global/api/v1',
  },
  GNOSIS_SAFE_UI: {
    '0x1': 'https://app.safe.global/eth',
    '0x5': 'https://app.safe.global/gor',
    '0x64': 'https://app.safe.global/gno',
    '0x89': 'https://app.safe.global/matic',
    '0xa': 'https://app.safe.global/oeth',
    '0xa4b1': 'https://app.safe.global/arb',
    '0xaa36a7': 'https://app.safe.global/sep',
    '0x2105': 'https://app.safe.global/base',
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
export const HAUS_RPC_DEFAULTS = {
  '0x1': process.env['NX_RIVET_KEY']
    ? `https://${process.env['NX_RIVET_KEY']}.eth.rpc.rivet.cloud`
    : `https://eth-mainnet.g.alchemy.com/v2/${process.env['NX_ETHEREUM_ALCHEMY_KEY']}`,
  '0x5': process.env['NX_RIVET_KEY']
    ? `https://${process.env['NX_RIVET_KEY']}.goerli.rpc.rivet.cloud/`
    : `https://eth-goerli.g.alchemy.com/v2/demo`,
  '0x64': 'https://rpc.gnosischain.com/',
  '0xa': process.env['NX_OPTIMISM_ALCHEMY_KEY']
    ? `https://opt-mainnet.g.alchemy.com/v2/${process.env['NX_OPTIMISM_ALCHEMY_KEY']}`
    : 'https://mainnet.optimism.io',
  '0x89': process.env['NX_POLYGONPOS_ALCHEMY_KEY']
    ? `https://polygon-mainnet.g.alchemy.com/v2/${process.env['NX_POLYGONPOS_ALCHEMY_KEY']}`
    : 'https://polygon-rpc.com/',
  '0xa4b1': process.env['NX_ARBITRUM_ALCHEMY_KEY']
    ? `https://arb-mainnet.g.alchemy.com/v2/${process.env['NX_ARBITRUM_ALCHEMY_KEY']}`
    : 'https://arb1.arbitrum.io/rpc',
  '0xaa36a7': process.env['NX_RIVET_KEY']
    ? `https://${process.env['NX_RIVET_KEY']}.sepolia.rpc.rivet.cloud/`
    : 'https://eth-sepolia.g.alchemy.com/v2/demo',
  '0x2105': `https://base.llamarpc.com`,
};
export const HAUS_RPC = {
  '0x1': process.env['NX_MAINNET_RPC']
    ? process.env['NX_MAINNET_RPC']
    : HAUS_RPC_DEFAULTS['0x1'],
  '0x5': process.env['NX_GOERLI_RPC']
    ? process.env['NX_GOERLI_RPC']
    : HAUS_RPC_DEFAULTS['0x5'],
  '0x64': process.env['NX_GNOSISCHAIN_RPC']
    ? process.env['NX_GNOSISCHAIN_RPC']
    : HAUS_RPC_DEFAULTS['0x64'],
  '0xa': process.env['NX_OPTIMISM_RPC']
    ? process.env['NX_OPTIMISM_RPC']
    : HAUS_RPC_DEFAULTS['0xa'],
  '0x89': process.env['NX_POLYGONPOS_RPC']
    ? process.env['NX_POLYGONPOS_RPC']
    : HAUS_RPC_DEFAULTS['0x89'],
  '0xa4b1': process.env['NX_ARBITRUM_RPC']
    ? process.env['NX_ARBITRUM_RPC']
    : HAUS_RPC_DEFAULTS['0xa4b1'],
  '0xaa36a7': process.env['NX_SEPOLIA_RPC']
    ? process.env['NX_SEPOLIA_RPC']
    : HAUS_RPC_DEFAULTS['0xaa36a7'],
  '0x2105': process.env['NX_BASE_RPC']
    ? process.env['NX_BASE_RPC']
    : HAUS_RPC_DEFAULTS['0x2105'],
};
export const GRAPH_API_KEYS = {
  '0x1': process.env['NX_GRAPH_API_KEY_MAINNET'],
  '0x64': process.env['NX_GRAPH_API_KEY_MAINNET'],
  '0xaa36a7': process.env['NX_GRAPH_API_KEY_MAINNET'],
  '0x2105': process.env['NX_GRAPH_API_KEY_MAINNET'],
  '0xa4b1': process.env['NX_GRAPH_API_KEY_MAINNET'],
  '0x89': process.env['NX_GRAPH_API_KEY_MAINNET'],
  '0xa': process.env['NX_GRAPH_API_KEY_MAINNET'],
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
  '0x64': process.env['NX_GNOSISSCAN_KEY'],
  '0x89': process.env['NX_POLYGONSCAN_KEY'],
  '0xa': process.env['NX_OPTIMISMSCAN_KEY'],
  '0xa4b1': process.env['NX_ARBISCAN_KEY'],
  '0xaa36a7': process.env['NX_ETHERSCAN_KEY'],
  '0x2105': process.env['NX_BASESCAN_KEY'],
};
