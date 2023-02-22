import { green } from '@radix-ui/colors';
import { font, ThemeOverrides } from '@daohaus/ui';
import './fonts.css';

export const themeOverrides: ThemeOverrides = {
  themeName: 'custom',
  rootBgColor: green.green10,
  font: {
    family: {
      ...font.family,
      body: `'Roboto', sans-serif`,
    },
  },
};
