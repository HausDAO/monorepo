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
  input: {
    bg: secondaryDark.step3,
    border: secondaryDark.step3,
    color: secondaryDark.step12,
    placeholder: secondaryDark.step11,
    hover: {
      bg: secondaryDark.step4,
      border: secondaryDark.step4,
    },
    focus: {
      bg: secondaryDark.step3,
      border: secondaryDark.step6,
    },
    disabled: {
      bg: neutralDark.step5,
      border: neutralDark.step5,
      color: neutralDark.step10,
      placeholder: neutralDark.step10,
    },
    success: {
      border: successDark.step9,
    },
    warning: {
      border: warningDark.step9,
    },
    error: {
      border: dangerDark.step9,
    },
    icon: {
      color: secondaryDark.step11,
    },
  },
  link: {
    color: primaryDark.step10,
  },
  loading: {
    primary: {
      color: primaryDark.step11,
      bg: primaryDark.step8,
    },
    secondary: {
      color: secondaryDark.step11,
      bg: secondaryDark.step8,
    },
    success: {
      color: successDark.step11,
      bg: successDark.step8,
    },
    warning: {
      color: warningDark.step11,
      bg: warningDark.step8,
    },
    danger: {
      color: dangerDark.step11,
      bg: dangerDark.step8,
    },
  },
  radio: {
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
      bg: primaryDark.step9,
      border: primaryDark.step9,
      hover: {
        bg: primaryDark.step10,
        border: primaryDark.step10,
      },
      focus: {
        bg: primaryDark.step9,
        border: primaryDark.step11,
      },
      disabled: {
        bg: neutralDark.step9,
        border: neutralDark.step9,
      },
    },
    indicator: {
      bg: primaryDark.step3,
      disabled: {
        bg: neutralDark.step1,
      },
    },
  },
  select: {
    bg: secondaryDark.step2,
    border: 'transparent',
    color: secondaryDark.step11,
    hover: {
      bg: secondaryDark.step4,
      border: secondaryDark.step4,
    },
    focus: {
      bg: secondaryDark.step3,
      border: secondaryDark.step6,
    },
    disabled: {
      bg: neutralDark.step5,
      color: neutralDark.step5,
      placeholder: neutralDark.step10,
    },
    success: {
      border: successDark.step9,
    },
    warning: {
      border: warningDark.step9,
    },
    error: {
      border: dangerDark.step9,
    },
    option: {
      bg: secondaryDark.step3,
      color: secondaryDark.step11,
    },
    icon: {
      color: secondaryDark.step11,
    },
  },
  switch: {
    base: {
      bg: secondaryDark.step6,
      disabled: {
        bg: neutralDark.step6,
      },
      active: {
        bg: primaryDark.step6,
        disabled: {
          bg: neutralDark.step6,
        },
      },
    },
    indicator: {
      bg: secondaryDark.step9,
      border: secondaryDark.step9,
      hover: {
        bg: secondaryDark.step10,
        border: secondaryDark.step10,
      },
      focus: {
        bg: secondaryDark.step9,
        border: secondaryDark.step11,
      },
      disabled: {
        bg: neutralDark.step9,
        border: neutralDark.step9,
      },
      active: {
        bg: primaryDark.step9,
        border: primaryDark.step9,
        hover: {
          bg: primaryDark.step10,
          border: primaryDark.step10,
        },
        focus: {
          bg: primaryDark.step9,
          border: primaryDark.step11,
        },
        disabled: {
          bg: neutralDark.step9,
          border: neutralDark.step9,
        },
      },
    },
    label: {
      color: secondaryDark.step12,
      disabled: {
        color: neutralDark.step9,
      },
    },
  },
  textarea: {
    bg: secondaryDark.step3,
    border: secondaryDark.step1,
    color: secondaryDark.step12,
    placeholder: secondaryDark.step11,
    hover: {
      bg: secondaryDark.step4,
      border: secondaryDark.step4,
    },
    focus: {
      bg: secondaryDark.step3,
      border: secondaryDark.step6,
    },
    disabled: {
      bg: neutralDark.step5,
      border: neutralDark.step5,
      placeholder: neutralDark.step10,
    },
    success: {
      border: successDark.step9,
    },
    warning: {
      border: warningDark.step9,
    },
    error: {
      border: dangerDark.step9,
    },
  },
  tooltip: {
    icon: {
      color: primaryDark.step9,
    },
    content: {
      bg: secondaryDark.step6,
      color: secondaryDark.step12,
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
  input: {
    bg: secondary.step3,
    border: secondary.step3,
    color: secondary.step12,
    placeholder: secondary.step11,
    hover: {
      bg: secondary.step4,
      border: secondary.step4,
    },
    focus: {
      bg: secondary.step3,
      border: secondary.step6,
    },
    disabled: {
      bg: neutral.step5,
      border: neutral.step5,
      color: neutral.step10,
      placeholder: neutral.step10,
    },
    success: {
      border: success.step9,
    },
    warning: {
      border: warning.step9,
    },
    error: {
      border: danger.step9,
    },
    icon: {
      color: secondary.step11,
    },
  },
  link: {
    color: primary.step10,
  },
  loading: {
    primary: {
      color: primary.step11,
      bg: primary.step8,
    },
    secondary: {
      color: secondary.step11,
      bg: secondary.step8,
    },
    success: {
      color: success.step11,
      bg: success.step8,
    },
    warning: {
      color: warning.step11,
      bg: warning.step8,
    },
    danger: {
      color: danger.step11,
      bg: danger.step8,
    },
  },
  radio: {
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
      bg: primary.step9,
      border: primary.step9,
      hover: {
        bg: primary.step10,
        border: primary.step10,
      },
      focus: {
        bg: primary.step9,
        border: primary.step11,
      },
      disabled: {
        bg: neutral.step9,
        border: neutral.step9,
      },
    },
    indicator: {
      bg: primary.step3,
      disabled: {
        bg: neutral.step1,
      },
    },
  },
  select: {
    bg: secondary.step2,
    border: 'transparent',
    color: secondary.step11,
    hover: {
      bg: secondary.step4,
      border: secondary.step4,
    },
    focus: {
      bg: secondary.step3,
      border: secondary.step6,
    },
    disabled: {
      bg: neutral.step5,
      color: neutral.step5,
      placeholder: neutral.step10,
    },
    success: {
      border: success.step9,
    },
    warning: {
      border: warning.step9,
    },
    error: {
      border: danger.step9,
    },
    option: {
      bg: secondary.step3,
      color: secondary.step11,
    },
    icon: {
      color: secondary.step11,
    },
  },
  switch: {
    base: {
      bg: secondary.step6,
      disabled: {
        bg: neutral.step6,
      },
      active: {
        bg: primary.step6,
        disabled: {
          bg: neutral.step6,
        },
      },
    },
    indicator: {
      bg: secondary.step9,
      border: secondary.step9,
      hover: {
        bg: secondary.step10,
        border: secondary.step10,
      },
      focus: {
        bg: secondary.step9,
        border: secondary.step11,
      },
      disabled: {
        bg: neutral.step9,
        border: neutral.step9,
      },
      active: {
        bg: primary.step9,
        border: primary.step9,
        hover: {
          bg: primary.step10,
          border: primary.step10,
        },
        focus: {
          bg: primary.step9,
          border: primary.step11,
        },
        disabled: {
          bg: neutral.step9,
          border: neutral.step9,
        },
      },
    },
    label: {
      color: secondary.step12,
      disabled: {
        color: neutral.step9,
      },
    },
  },
  textarea: {
    bg: secondary.step3,
    border: secondary.step1,
    color: secondary.step12,
    placeholder: secondary.step11,
    hover: {
      bg: secondary.step4,
      border: secondary.step4,
    },
    focus: {
      bg: secondary.step3,
      border: secondary.step6,
    },
    disabled: {
      bg: neutral.step5,
      border: neutral.step5,
      placeholder: neutral.step10,
    },
    success: {
      border: success.step9,
    },
    warning: {
      border: warning.step9,
    },
    error: {
      border: danger.step9,
    },
  },
  tooltip: {
    icon: {
      color: primary.step9,
    },
    content: {
      bg: secondary.step6,
      color: secondary.step12,
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
