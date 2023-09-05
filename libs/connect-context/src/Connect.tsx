import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { SafeConnector } from '@wagmi/connectors/safe';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { Web3Modal } from '@web3modal/react';

import {
  HAUS_NETWORK_DATA,
  VIEM_CHAINS,
  getNetworkById,
} from '@daohaus/keychain-utils';

import { ConnectProvider, ConnectProviderProps } from './ConnectContext';

if (!process.env['NX_WALLET_CONNECT_ID']) {
  throw new Error('You need to provide NX_WALLET_CONNECT_ID env variable');
}
export const projectId = process.env['NX_WALLET_CONNECT_ID'];

const chains = Object.values(VIEM_CHAINS);
const { publicClient } = configureChains(
  chains,
  [
    jsonRpcProvider({
      rpc: (chain) => {
        const network = getNetworkById(chain.id);
        return {
          http: network?.rpc || '',
        };
      },
    }),
    w3mProvider({ projectId }),
  ],
  { retryCount: 10 }
);
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    ...w3mConnectors({ projectId, chains }),
    new SafeConnector({
      chains,
      options: {
        allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
        debug: false,
      },
    }),
  ],
  publicClient,
});
export const ethereumClient = new EthereumClient(wagmiConfig, chains);

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
