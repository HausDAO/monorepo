import { createContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

import { ReactSetter } from '@daohaus/utils';

import { GlobalStyles } from './global/globalStyles';
import { defaultDarkTheme, defaultLightTheme } from './theme';

import './global/fonts.css';
import {
  Toast,
  ToastProps,
  ToastProvider,
} from '../components/molecules/Toast';
import { ThemeOverrides } from '../types/theming';

type HausUI = {
  theme: DefaultTheme;
  setTheme: ReactSetter<DefaultTheme>;
  toggleLightDark: () => void;
  setToast: (toast: ToastProps) => void;
};

type ProviderProps = {
  children: ReactNode;
  defaultDark?: DefaultTheme;
  defaultLight?: DefaultTheme;
  startDark?: boolean;
  themeOverrides?: ThemeOverrides;
};

export const HausThemeContext = createContext<HausUI>({
  theme: defaultDarkTheme,
  setTheme: () => null,
  toggleLightDark: (): void => undefined,
  setToast: (): void => undefined,
});

const DEFAULT_TOAST_DURATION = 6000;

const mergeThemeProperties = (
  theme: DefaultTheme,
  overrides?: ThemeOverrides
) => ({
  ...theme,
  ...overrides,
});

export const HausThemeProvider = ({
  children,
  defaultDark = defaultDarkTheme,
  defaultLight = defaultLightTheme,
  startDark = true,
  themeOverrides,
}: ProviderProps) => {
  const [theme, setTheme] = useState(
    mergeThemeProperties(startDark ? defaultDark : defaultLight, themeOverrides)
  );
  const [toast, setToast] = useState<ToastProps | null>(null);
  useEffect(() => {
    setTheme(
      mergeThemeProperties(
        startDark ? defaultDark : defaultLight,
        themeOverrides
      )
    );
  }, [startDark, defaultDark, defaultLight, themeOverrides]);

  const toggleLightDark = () => {
    setTheme((prevState) =>
      mergeThemeProperties(
        prevState.themeName === defaultDark.themeName
          ? defaultLight
          : defaultDark,
        themeOverrides
      )
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
