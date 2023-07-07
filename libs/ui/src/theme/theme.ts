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
  avatar: {
    bg: neutralDark.step9,
  },
  button: {
    primary: primaryDarkBtn,
    secondary: secondaryDarkBtn,
    success: successDarkBtn,
    warning: warningDarkBtn,
    danger: dangerDarkBtn,
  },
  card: {
    bg: secondaryDark.step2,
    border: secondaryDark.step5,
  },
  checkbox: {
    bg: secondaryDark.step3,
    border: secondaryDark.step6,
    hover: {
      bg: secondaryDark.step4,
      border: secondaryDark.step6,
    },
    focus: {
      bg: secondaryDark.step3,
      border: secondaryDark.step7,
    },
    disabled: {
      bg: neutralDark.step2,
      border: neutralDark.step6,
    },
    active: {
      bg: primaryDark.step3,
      border: primaryDark.step9,
      hover: {
        bg: primaryDark.step4,
        border: primaryDark.step9,
      },
      focus: {
        bg: primaryDark.step3,
        border: primaryDark.step10,
      },
      disabled: {
        bg: neutralDark.step2,
        border: neutralDark.step6,
      },
    },
    indicator: {
      color: primaryDark.step9,
      disabled: {
        color: neutralDark.step2,
      },
    },
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
  font: {
    family: font.family,
  },
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
  // *** ATOMS *** //
  avatar: {
    bg: neutral.step9,
  },
  button: {
    primary: primaryBtn,
    secondary: secondaryBtn,
    success: successBtn,
    warning: warningBtn,
    danger: dangerBtn,
  },
  card: {
    bg: secondary.step2,
    border: secondary.step5,
  },
  checkbox: {
    bg: secondary.step3,
    border: secondary.step6,
    hover: {
      bg: secondary.step4,
      border: secondary.step6,
    },
    focus: {
      bg: secondary.step3,
      border: secondary.step7,
    },
    disabled: {
      bg: neutral.step2,
      border: neutral.step6,
    },
    active: {
      bg: primary.step3,
      border: primary.step9,
      hover: {
        bg: primary.step4,
        border: primary.step9,
      },
      focus: {
        bg: primary.step3,
        border: primary.step10,
      },
      disabled: {
        bg: neutral.step2,
        border: neutral.step6,
      },
    },
    indicator: {
      color: primary.step9,
      disabled: {
        color: neutral.step2,
      },
    },
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
};
