import {
  blue,
  blueDark,
  violet,
  violetDark,
  pink,
  pinkDark,
  green,
  greenDark,
  yellow,
  yellowDark,
  red,
  redDark,
} from '@radix-ui/colors';
import { Theme } from '../types/theming';

import {
  primary,
  primaryDark,
  secondary,
  secondaryDark,
  secondaryDarkA,
  neutral,
  neutralDark,
  dangerDark,
  warningDark,
  successDark,
  success,
  danger,
  warning,
  info,
  infoDark,
  primaryDarkA,
  primaryA,
  secondaryA,
} from './global/colors';
import { font } from './global/font';

import {
  primaryDarkBtn,
  dangerDarkBtn,
  secondaryDarkBtn,
  successDarkBtn,
  warningDarkBtn,
  primaryBtn,
  secondaryBtn,
  successBtn,
  dangerBtn,
  warningBtn,
} from './atoms/button';

export const defaultDarkTheme: Theme = {
  themeName: 'dark',
  transparent: 'transparent',
  rootBgColor: neutralDark.step1,
  rootFontColor: secondaryDark.step12,
  primary: { ...primaryDark },
  primaryA: { ...primaryDarkA },
  secondary: { ...secondaryDark },
  secondaryA: { ...secondaryDarkA },
  success: { ...successDark },
  warning: { ...warningDark },
  danger: { ...dangerDark },
  info: { ...infoDark },
  neutral: { ...neutralDark },
  ...blueDark,
  ...violetDark,
  ...pinkDark,
  ...greenDark,
  ...yellowDark,
  ...redDark,
  // *** ATOMS *** //
  button: {
    primary: primaryDarkBtn,
    secondary: secondaryDarkBtn,
    success: successDarkBtn,
    warning: warningDarkBtn,
    danger: dangerDarkBtn,
  },
  // *** MOLECULES *** //
  toast: {
    icon: {
      default: successDark.step9,
      success: successDark.step9,
      warning: warningDark.step9,
      error: dangerDark.step9,
    },
  },
  font: {
    family: font.family,
  },
};

export const defaultLightTheme: Theme = {
  themeName: 'light',
  transparent: 'transparent',
  rootBgColor: secondary.step1,
  rootFontColor: secondary.step12,
  primary: { ...primary },
  primaryA: { ...primaryA },
  secondary: { ...secondary },
  secondaryA: { ...secondaryA },
  success: { ...success },
  warning: { ...warning },
  danger: { ...danger },
  info: { ...info },
  neutral: { ...neutral },
  ...blue,
  ...violet,
  ...pink,
  ...green,
  ...yellow,
  ...red,
  // *** Will remove Button in ticket to Migrate to Button V2 *** //
  button: {
    primary: primaryBtn,
    secondary: secondaryBtn,
    success: successBtn,
    warning: warningBtn,
    danger: dangerBtn,
  },
  // *** Toast needs a slight refacto for Icons *** //
  toast: {
    icon: {
      default: success.step9,
      success: success.step9,
      warning: warning.step9,
      error: danger.step9,
    },
  },
  font: {
    family: font.family,
  },
};
