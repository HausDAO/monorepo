import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { SafeConnector } from '@wagmi/connectors/safe';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
// WalletConnect v2 included whenever a NX_WALLET_CONNECT_ID is provided (no extra enable flag)
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

import {
  HAUS_NETWORK_DATA,
  VIEM_CHAINS,
  getNetworkById,
} from '@daohaus/keychain-utils';

import { ConnectProvider, ConnectProviderProps } from './ConnectContext';
import { logChains } from './utils/debug';

// Ensure Buffer global for libraries (e.g., walletconnect QR, qrcode) that expect Node Buffer
// Some build setups (webpack 5) do not auto-polyfill core modules.
// Safe to run always; no-op if already defined.
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { Buffer } = require('buffer');
  if (typeof window !== 'undefined' && !(window as unknown as { Buffer?: unknown }).Buffer) {
    (window as unknown as { Buffer?: unknown }).Buffer = Buffer;
  }
} catch (err) {
  // Buffer polyfill failed – non-fatal.
}

// Legacy Web3Modal artifacts removed; no external modal client.

const chains = Object.values(VIEM_CHAINS);
// Debug log of chain list
logChains(chains as unknown as { id: number; name?: string }[]);
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
  ],
  { retryCount: 10 }
);
const includeSafe = process.env['NX_CONNECT_DISABLE_SAFE'] !== 'true';
const walletConnectProjectId = process.env['NX_WALLET_CONNECT_ID'];

const baseConnectors = [
  // Injected first: rename so it doesn't clash label-wise with MetaMask when present
  new InjectedConnector({
    chains,
    options: { shimDisconnect: true, name: 'Browser Wallet' },
  }),
  new MetaMaskConnector({ chains, options: { shimDisconnect: true } }),
  new CoinbaseWalletConnector({
    chains,
    options: { appName: 'DAOhaus Admin' },
  }),
  ...(includeSafe
    ? [
        new SafeConnector({
          chains,
          options: {
            allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
            debug: false,
          },
        }),
      ]
    : []),
  ...(walletConnectProjectId
    ? [
        new WalletConnectConnector({
          chains,
          options: {
            projectId: walletConnectProjectId,
            showQrModal: true, // uses WC's standalone QR (not Web3Modal UI)
          },
        }),
      ]
    : []),
];

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: baseConnectors,
  publicClient,
});
// Placeholder for backward compatibility; no external client now
export const ethereumClient = undefined as unknown as Record<string, never>;

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
    </WagmiConfig>
  );
};
