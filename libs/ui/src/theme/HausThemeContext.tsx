import { createContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { ReactSetter } from '@daohaus/utils';

import { GlobalStyles } from './global/globalStyles';
import { defaultDarkTheme, defaultLightTheme } from './theme';
import { Theme } from '../types/theming';
import './global/fonts.css';
import {
  Toast,
  ToastProps,
  ToastProvider,
} from '../components/molecules/Toast';

type HausUI = {
  theme: Theme;
  setTheme: ReactSetter<Theme>;
  toggleLightDark: () => void;
  setToast: (toast: ToastProps) => void;
};

type ProviderProps = {
  children: ReactNode;
  defaultDark?: Theme;
  defaultLight?: Theme;
  startDark?: boolean;
};

export const HausThemeContext = createContext<HausUI>({
  theme: defaultDarkTheme,
  setTheme: () => null,
  toggleLightDark: (): void => undefined,
  setToast: (): void => undefined,
});

const DEFAULT_TOAST_DURATION = 6000;

export const HausThemeProvider = ({
  children,
  defaultDark = defaultDarkTheme,
  defaultLight = defaultLightTheme,
  startDark = true,
}: ProviderProps) => {
  const [theme, setTheme] = useState(startDark ? defaultDark : defaultLight);
  const [toast, setToast] = useState<ToastProps | null>(null);
  useEffect(() => {
    setTheme(startDark ? defaultDark : defaultLight);
  }, [startDark, defaultDark, defaultLight]);

  const toggleLightDark = () => {
    setTheme((prevState) =>
      prevState.themeName === defaultDark.themeName ? defaultLight : defaultDark
    );
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setToast(null);
    }
  };

  return (
    <HausThemeContext.Provider
      value={{ theme, setTheme, toggleLightDark, setToast }}
    >
      <ThemeProvider theme={theme}>
        <ToastProvider duration={toast?.duration || DEFAULT_TOAST_DURATION}>
          <>
            {toast && <Toast {...toast} onOpenChange={handleOpenChange} />}
            {children}
            <GlobalStyles theme={theme} />
          </>
        </ToastProvider>
      </ThemeProvider>
    </HausThemeContext.Provider>
  );
};

export default HausThemeProvider;
