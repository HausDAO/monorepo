import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { HausThemeProvider } from '@daohaus/ui';
import { DHConnectProvider } from '@daohaus/connect';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <HausThemeProvider>
      <DHConnectProvider>
        <App />
      </DHConnectProvider>
    </HausThemeProvider>
  </StrictMode>
);
