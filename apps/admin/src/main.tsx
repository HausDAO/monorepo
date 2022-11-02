import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Buffer } from 'buffer';

import { HausThemeProvider } from '@daohaus/ui';

import Routes from './Routes';

// This solves an issue when using WalletConnect and intercept Txs to create dao proposals
// Related open issue: https://github.com/WalletConnect/walletconnect-monorepo/issues/748
window.Buffer = window.Buffer || Buffer;

const container = document.getElementById('root');

//reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
// THis is how react wants to render the app.
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <StrictMode>
    <HashRouter>
      <HausThemeProvider>
        <Routes />
      </HausThemeProvider>
    </HashRouter>
  </StrictMode>
);
