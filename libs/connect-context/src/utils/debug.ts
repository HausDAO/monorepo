/* Debug helpers for inspecting injected wallets before opening Web3Modal */

// Enable by setting NX_CONNECT_DEBUG=true in env (or toggling window.__CONNECT_DEBUG = true)
const isDebug = () => {
  if (
    typeof window !== 'undefined' &&
    (window as unknown as { __CONNECT_DEBUG?: boolean }).__CONNECT_DEBUG
  )
    return true;
  return process.env['NX_CONNECT_DEBUG'] === 'true';
};

type ProviderLike = Record<string, unknown> & {
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
  isBraveWallet?: boolean;
  isFrame?: boolean;
  isTally?: boolean;
  isTrust?: boolean;
  isLedger?: boolean;
  providers?: ProviderLike[];
};

export const collectInjectedProviders = (): ProviderLike[] => {
  if (typeof window === 'undefined') return [];
  const eth = (window as unknown as { ethereum?: ProviderLike }).ethereum;
  if (!eth) return [];
  if (Array.isArray(eth.providers)) return eth.providers as ProviderLike[];
  return [eth];
};

export const logInjectedWallets = () => {
  if (!isDebug()) return;
  try {
    const providers = collectInjectedProviders();
    // Normalize & extract recognizable flags
    const summarized = providers.map((p, idx) => ({
      index: idx,
      flags: Object.keys(p)
        .filter(
          (k) => k.startsWith('is') && (p as Record<string, unknown>)[k] === true
        )
        .join(','),
      isMetaMask: !!p.isMetaMask,
      isCoinbase: !!p.isCoinbaseWallet,
      isBrave: !!p.isBraveWallet,
      isFrame: !!p.isFrame,
      isTally: !!p.isTally,
      isTrust: !!p.isTrust,
      isLedger: !!p.isLedger,
    }));
    // eslint-disable-next-line no-console
    console.group('[ConnectDebug] Injected Wallet Providers');
    if (!summarized.length) {
      // eslint-disable-next-line no-console
      console.warn('[ConnectDebug] No window.ethereum providers detected');
    } else {
      // eslint-disable-next-line no-console
      console.table(summarized);
    }
    // eslint-disable-next-line no-console
    console.groupEnd();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[ConnectDebug] Error logging injected wallets', err);
  }
};

export const logChains = (chains: { id: number; name?: string }[]) => {
  if (!isDebug()) return;
  try {
    // eslint-disable-next-line no-console
    console.group('[ConnectDebug] Chains');
    // eslint-disable-next-line no-console
    console.table(
      chains.map((c) => ({
        id: c.id,
        hex: '0x' + c.id.toString(16),
        name: c.name,
      }))
    );
    // eslint-disable-next-line no-console
    console.groupEnd();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[ConnectDebug] Error logging chains', err);
  }
};
