import { KeychainList } from '..';
import { Keychain } from './types';

export const ENDPOINTS: KeychainList = {
  V3_SUBGRAPH: {
    '0x1':
      'https://gateway.thegraph.com/api/[api-key]/subgraphs/id/GfHFdFmiSwW1PKtnDhhcxhArwtTjVuMnXxQ5XcETF1bP',
    '0x5': 'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-goerli',
    '0x64': 'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-gnosis',
  },
  EXPLORER: {
    '0x1': 'https://etherscan.io',
    '0x5': 'https://goerli.etherscan.io',
    '0x64': 'https://gnosisscan.io/',
  },
  GNOSIS_API: {
    '0x1': 'https://safe-transaction.mainnet.io/api/v1',
    '0x5': 'https://safe-transaction.goerli.gnosis.io/api/v1',
    '0x64': 'https://safe-transaction.xdai.gnosis.io/api/v1',
  },
  GAS_ESTIMATE: {
    '0x1':
      'https://safe-transaction.mainnet.gnosis.io/api/v1/safes/<<safeId>>/multisig-transactions/estimations/',
    '0x5':
      'https://safe-transaction.goerli.gnosis.io/api/v1/safes/<<safeId>>/multisig-transactions/estimations/',
    '0x64':
      'https://safe-transaction.xdai.gnosis.io/api/v1/safes/<<safeId>>/multisig-transactions/estimations/',
  },
  GNOSIS_SAFE_UI: {
    '0x1': 'https://gnosis-safe.io/app/eth',
    '0x5': 'https://gnosis-safe.io/app/gor',
    '0x64': 'https://gnosis-safe.io/app/gno',
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
export const HAUS_RPC = {
  '0x1': `https://${process.env['NX_RIVET_KEY']}.eth.rpc.rivet.cloud/`,
  '0x5': `https://${process.env['NX_RIVET_KEY']}.goerli.rpc.rivet.cloud/`,
  '0x64': 'https://rpc.gnosischain.com/',
  '0xa': 'https://mainnet.optimism.io',
  '0x89': 'https://polygon-rpc.com/',
  '0xa4b1': 'https://arb1.arbitrum.io/rpc',
  '0xa4ec': 'https://forno.celo.org',
};
