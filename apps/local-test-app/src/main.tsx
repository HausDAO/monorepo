import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { formatDateFromSeconds } from '@daohaus/utils';
import App from './app/app';
import { HausThemeProvider } from '@daohaus/ui';
import { HausConnectProvider } from '@daohaus/connect';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <HausThemeProvider>
      <HausConnectProvider>
        <App />
      </HausConnectProvider>
    </HausThemeProvider>
  </StrictMode>
);
