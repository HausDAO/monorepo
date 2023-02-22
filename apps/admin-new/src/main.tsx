import { HausThemeProvider } from '@daohaus/ui';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { App } from './App';
import { themeOverrides } from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 20,
      staleTime: 1000 * 60 * 20,
    },
  },
});

root.render(
  <StrictMode>
    <HashRouter>
      <HausThemeProvider themeOverrides={themeOverrides}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </HausThemeProvider>
    </HashRouter>
  </StrictMode>
);
