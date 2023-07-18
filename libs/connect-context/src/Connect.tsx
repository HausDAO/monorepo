import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { Web3Modal } from '@web3modal/react';

import { HAUS_NETWORK_DATA, getNetworkById } from '@daohaus/keychain-utils';

import { ConnectProvider, ConnectProviderProps } from './ConnectContext';
import { wgmiChains } from './utils';

// cleanup - could move some of this into defaults.ts
if (!process.env['NX_WALLET_CONNECT_ID']) {
  throw new Error('You need to provide NX_WALLET_CONNECT_ID env variable');
}
export const projectId = process.env['NX_WALLET_CONNECT_ID'];

const chains = Object.values(wgmiChains);
const { publicClient } = configureChains(chains, [
  jsonRpcProvider({
    rpc: (chain) => {
      const network = getNetworkById(chain.id);
      return {
        http: network?.rpc || '',
      };
    },
  }),
  w3mProvider({ projectId }),
]);
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
export const ethereumClient = new EthereumClient(wagmiConfig, chains);

// todo: pass rpcs

export const Connect = ({
  children,
  networks = HAUS_NETWORK_DATA,
  daoId,
  daoChainId,
  lifeCycleFns,
}: ConnectProviderProps) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ConnectProvider
        networks={networks}
        daoId={daoId}
        daoChainId={daoChainId}
        lifeCycleFns={lifeCycleFns}
      >
        {children}
      </ConnectProvider>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </WagmiConfig>
  );
};
