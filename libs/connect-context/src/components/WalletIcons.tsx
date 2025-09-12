import React from 'react';
// Local copies of brand assets (moved here to avoid app->lib dependency cycles)
// They may resolve either to a ReactComponent (SVGR) or a URL string depending on tooling.
import metaMaskAsset from '../assets/icons/MetaMask-icon-fox.svg';
import coinbaseAsset from '../assets/icons/coinbase_wallet_appicon.svg';
import walletConnectAsset from '../assets/icons/walletconnect-icon.svg';

const renderImportedSvg = (
  mod: any,
  size: number,
  fallback: React.ReactNode,
  alt: string
): React.ReactNode => {
  if (!mod) return fallback;
  const possible = mod.default ?? mod; // CommonJS vs ES interop
  if (typeof possible === 'string') {
    return (
      <img
        src={possible}
        width={size}
        height={size}
        alt={alt}
        style={{ display: 'block' }}
        loading="lazy"
        decoding="async"
      />
    );
  }
  // Assume it's a React component
  const Cmp = possible as React.ComponentType<React.SVGProps<SVGSVGElement>>;
  return <Cmp width={size} height={size} aria-label={alt} />;
};

export const IconMetaMask: React.FC<{ size?: number }> = ({ size = 20 }) => {
  const Fallback = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 142 136.878"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <path fill="#FF5C16" d="M132.682 132.192 102.099 123.086 79.036 136.873l-16.092-.007-23.077-13.78L9.298 132.192 0 100.801l9.299-34.839L0 36.507 9.299 0l47.766 28.538h27.85L132.682 0l9.299 36.507-9.299 29.455 9.299 34.839-9.299 31.391Z" />
    </svg>
  );
  const inner = renderImportedSvg(metaMaskAsset, size, Fallback, 'MetaMask');
  return <IconWrapper brand="metamask">{inner}</IconWrapper>;
};

export const IconCoinbaseWallet: React.FC<{ size?: number }> = ({ size = 20 }) => {
  const Fallback = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <rect width="100" height="100" rx="22" fill="#0052FF" />
      <rect x="28" y="28" width="44" height="44" rx="8" fill="#fff" />
      <rect x="44" y="44" width="12" height="12" rx="2" fill="#0052FF" />
    </svg>
  );
  const inner = renderImportedSvg(coinbaseAsset, size, Fallback, 'Coinbase Wallet');
  return <IconWrapper brand="coinbase">{inner}</IconWrapper>;
};

export const IconWalletConnect: React.FC<{ size?: number }> = ({ size = 20 }) => {
  const inner = renderImportedSvg(
    walletConnectAsset,
    size,
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 240"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <path
        d="M82 70c53-47 139-47 192 0l6 5 2 2 8 8c2 2 2 4 0 6l-28 28c-1 1-3 1-5 0l-11-10c-34-30-85-30-119 0l-12 11c-1 1-3 1-5 0L82 91c-2-2-2-4 0-6l8-8 2-2 6-5zM380 123l-24-22c-2-2-4-2-6 0l-27 25c-1 1-1 3 0 4l15 14c2 2 2 4 0 6l-52 46c-2 2-4 2-6 0l-52-46c-1-2-3-2-5 0l-52 46c-2 2-4 2-6 0l-52-46c-2-2-4-2-6 0l-52 46c-2 2-4 2-6 0L5 150c-2-2-2-4 0-6l76-69c53-47 139-47 192 0l76 69c2 2 2 4 0 6l-15 14c-2 2-2 4 0 6l15 14c2 2 4 2 6 0l24-22c15-13 15-37 0-50z"
        fill="#3396FF"
      />
    </svg>,
    'WalletConnect'
  );
  return <IconWrapper brand="walletconnect">{inner}</IconWrapper>;
};

export const IconBrowserWallet: React.FC<{ size?: number }> = ({ size = 20 }) => {
  const inner = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block' }}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
  return <IconWrapper brand="browser">{inner}</IconWrapper>;
};

// Wrapper adds consistent background and sizing for visibility on dark surfaces.
const IconWrapper: React.FC<{ brand: string; children: React.ReactNode }> = ({ brand, children }) => {
  const brandColorMap: Record<string, string> = {
    metamask: '#1F1A17',
    coinbase: '#0B3CFF',
    walletconnect: '#122B46',
    browser: 'var(--secondary-step3, #2d2d2d)',
  };
  const borderColor = 'rgba(255,255,255,0.08)';
  return (
    <span
      style={{
        width: 28,
        height: 28,
        minWidth: 28,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: brandColorMap[brand] || 'var(--secondary-step3, #2d2d2d)',
        border: `1px solid ${borderColor}`,
        borderRadius: 6,
        boxSizing: 'border-box',
      }}
    >
      {children}
    </span>
  );
};

export const connectorIcon = (id: string): React.ReactNode => {
  switch (id) {
    case 'metaMask':
      return <IconMetaMask />;
    case 'coinbaseWallet':
      return <IconCoinbaseWallet />;
    case 'walletConnect':
      return <IconWalletConnect />;
    case 'injected':
      return <IconBrowserWallet />;
    default:
      return <IconBrowserWallet />;
  }
};
