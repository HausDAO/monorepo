// FOR DEMONSTRATIOn
export const limitedNetworkTest = {
  '0x1': {
    chainId: '0x1',
    networkId: 1,
    name: 'Mainnet',
    symbol: 'ETH',
    rpc: `https://${process.env.VITE_RIVET_KEY}.eth.rpc.rivet.cloud/`,
    explorer: 'https://etherscan.io',
  },
  '0x5': {
    chainId: '0x5',
    networkId: 5,
    name: 'Goerli',
    symbol: 'ETH',
    rpc: `https://${process.env.VITE_RIVET_KEY}.goerli.rpc.rivet.cloud/`,
    explorer: 'https://goerli.etherscan.io',
  },
  '0x2a': {
    chainId: '0x2a',
    networkId: 42,
    name: 'Kovan',
    symbol: 'ETH',
    rpc: `https://kovan.infura.io/v3/${process.env.VITE_INFURA_PROJECT_ID}`,
    explorer: 'https://kovan.etherscan.io',
  },
};
