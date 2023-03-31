// FOR DEMONSTRATIOn
export const limitedNetworkTest = {
  '0x1': {
    chainId: '0x1',
    networkId: 1,
    name: 'Mainnet',
    symbol: 'ETH',
    rpc: `https://${process.env.NX_RIVET_KEY}.eth.rpc.rivet.cloud/`,
    explorer: 'https://etherscan.io',
  },
  '0x5': {
    chainId: '0x5',
    networkId: 5,
    name: 'Goerli',
    symbol: 'ETH',
    rpc: `https://${process.env.NX_RIVET_KEY}.goerli.rpc.rivet.cloud/`,
    explorer: 'https://goerli.etherscan.io',
  },
};
