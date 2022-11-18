import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';

import { ConnectProvider } from '@daohaus/connect-context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ConnectProvider>
      <App />
    </ConnectProvider>
  </StrictMode>
);
