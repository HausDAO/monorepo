import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useSwitchNetwork, useNetwork } from 'wagmi';
import { Button } from '@daohaus/ui';
import { connectorIcon } from './WalletIcons';

type Props = {
  open: boolean;
  onClose: () => void;
  defaultChainId?: number;
};

export const InternalConnectModal = ({ open, onClose, defaultChainId }: Props) => {
  const { connectAsync, connectors, isLoading, pendingConnector, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const [switching, setSwitching] = useState(false);
  // Last used connector id stored in localStorage. Must be declared before any conditional return to keep hook order stable.
  const LAST_KEY = 'dh:lastConnector';
  const [lastUsed, setLastUsed] = useState<string | null>(() => {
    try {
      return typeof window !== 'undefined'
        ? window.localStorage.getItem(LAST_KEY)
        : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (open && defaultChainId && chain && chain.id !== defaultChainId && switchNetwork) {
      setSwitching(true);
      switchNetwork(defaultChainId);
      setSwitching(false);
    }
  }, [open, defaultChainId, chain, switchNetwork]);

  if (!open) return null;

  // Prefer MetaMask: if MetaMask is available, hide the generic injected (Browser Wallet) entry.
  // If MetaMask is NOT available, hide the dedicated metaMask connector (some providers misreport) and show generic injected.
  const hasMetaMask = connectors.some((c) => c.id === 'metaMask' && c.ready) ||
    (typeof (window as any)?.ethereum !== 'undefined' && (window as any).ethereum?.isMetaMask);

  const filteredConnectors = connectors.filter((c) => {
    // Hide generic injected when MetaMask present
    if (hasMetaMask && c.id === 'injected') return false;
    // If MetaMask not actually detected, hide the dedicated metaMask connector
    if (!hasMetaMask && c.id === 'metaMask') return false;
    // Hide Safe connector completely if it isn't ready (outside Safe iframe)
    if (c.id === 'safe' && !c.ready) return false;
    return true;
  });

  const markLastUsed = (id: string) => {
    try {
      window.localStorage.setItem(LAST_KEY, id);
      setLastUsed(id);
    } catch {/* ignore storage issues */}
  };

  return (
    <div style={overlayStyles}>
      <div style={modalStyles}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Connect Wallet</h3>
          <button onClick={onClose} style={closeBtnStyles} aria-label="Close connect modal">
            ×
          </button>
        </div>
        {isConnected && (
          <div style={{ margin: '8px 0 16px' }}>
            <Button
              size="sm"
              onClick={() => {
                disconnect();
                onClose();
              }}
              fullWidth
            >
              Disconnect
            </Button>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filteredConnectors.map((c) => {
            const isPending = isLoading && pendingConnector?.id === c.id;
            return (
              <Button
                key={c.id}
                disabled={!c.ready || isPending || switching}
                onClick={async () => {
                  try {
                    // If WalletConnect, close our internal modal first so its own modal isn't obscured.
                    if (c.id === 'walletConnect') {
                      onClose();
                      // Small delay to allow unmount animation/DOM removal (if any) before WC modal injects.
                      // Not strictly required but guards against flicker.
                      await Promise.resolve();
                    }
                    await connectAsync({ connector: c, chainId: defaultChainId });
                    markLastUsed(c.id);
                    if (c.id !== 'walletConnect') {
                      onClose();
                    }
                  } catch (err) {
                    // Swallow connect errors – surfaced by wagmi error state below.
                  }
                }}
                fullWidth
              >
                <span style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {connectorIcon(c.id)}
                    <span>{c.name || 'Unknown Wallet'}</span>
                  </span>
                  <span style={{ fontSize: 11, opacity: 0.75 }}>
                    {c.id === lastUsed && 'Recent'}
                    {isPending && 'Connecting'}
                    {!c.ready && 'Unsupported'}
                  </span>
                </span>
              </Button>
            );
          })}
        </div>
        {error && (
          <p style={{ color: 'var(--error-100)', fontSize: 12, marginTop: 12 }}>
            {(error as Error).message}
          </p>
        )}
      </div>
    </div>
  );
};

const overlayStyles: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};

const modalStyles: React.CSSProperties = {
  width: 360,
  maxWidth: '90%',
  background: 'var(--surface-100, #1e1e1e)',
  borderRadius: 12,
  padding: 20,
  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
};

const closeBtnStyles: React.CSSProperties = {
  border: 'none',
  background: 'transparent',
  color: 'inherit',
  fontSize: 24,
  cursor: 'pointer',
  lineHeight: 1,
};

export default InternalConnectModal;
