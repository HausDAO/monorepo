import { green } from '@radix-ui/colors';
import { font } from '@daohaus/ui';
import './fonts.css';

export const themeOverrides: any = {
  themeName: 'custom',
  rootBgColor: green.green10,
  font: {
    family: {
      ...font.family,
      body: `'Roboto', sans-serif`,
    },
  },
};
