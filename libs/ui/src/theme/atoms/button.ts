import {
  primary,
  secondary,
  primaryDark,
  secondaryDark,
  success,
  successDark,
  warning,
  warningDark,
  danger,
  dangerDark,
} from '../global/colors';

export interface ButtonTheme {
  solid: {
    text: string;
    bg: string;
    border: string;
    bgHover: string;
    borderHover: string;
    bgFocus: string;
    borderFocus: string;
    bgDisabled: string;
    borderDisabled: string;
  };
  outline: {
    text: string;
    border: string;
    hover: string;
    focus: string;
    disabled: string;
  };
  ghost: {
    text: string;
    bgHover: string;
    borderFocus: string;
    disabled: string;
  };
  link: {
    text: string;
    hover: string;
    focus: string;
    disabled: string;
  };
}

export const primaryDarkBtn: ButtonTheme = {
  solid: {
    text: primaryDark.step1,
    bg: primaryDark.step9,
    border: primaryDark.step9,
    bgHover: primaryDark.step10,
    borderHover: primaryDark.step10,
    bgFocus: primaryDark.step9,
    borderFocus: primaryDark.step11,
    bgDisabled: primaryDark.step6,
    borderDisabled: primaryDark.step6,
  },
  outline: {
    text: primaryDark.step9,
    border: primaryDark.step9,
    hover: primaryDark.step10,
    focus: primaryDark.step11,
    disabled: primaryDark.step6,
  },
  ghost: {
    text: primaryDark.step10,
    bgHover: primaryDark.step3,
    borderFocus: primaryDark.step4,
    disabled: primaryDark.step8,
  },
  link: {
    text: primaryDark.step9,
    hover: primaryDark.step10,
    focus: primaryDark.step11,
    disabled: primaryDark.step6,
  },
};

export const secondaryDarkBtn: ButtonTheme = {
  solid: {
    text: secondaryDark.step12,
    bg: secondaryDark.step6,
    border: secondaryDark.step6,
    bgHover: secondaryDark.step7,
    borderHover: secondaryDark.step7,
    bgFocus: secondaryDark.step6,
    borderFocus: secondaryDark.step8,
    bgDisabled: secondaryDark.step3,
    borderDisabled: secondaryDark.step3,
  },
  outline: {
    text: secondaryDark.step9,
    border: secondaryDark.step9,
    hover: secondaryDark.step10,
    focus: secondaryDark.step11,
    disabled: secondaryDark.step6,
  },
  ghost: {
    text: secondaryDark.step10,
    bgHover: secondaryDark.step3,
    borderFocus: secondaryDark.step4,
    disabled: secondaryDark.step8,
  },
  link: {
    text: secondaryDark.step9,
    hover: secondaryDark.step10,
    focus: secondaryDark.step11,
    disabled: secondaryDark.step6,
  },
};

export const successDarkBtn: ButtonTheme = {
  solid: {
    text: successDark.step1,
    bg: successDark.step9,
    border: successDark.step9,
    bgHover: successDark.step10,
    borderHover: successDark.step10,
    bgFocus: successDark.step9,
    borderFocus: successDark.step11,
    bgDisabled: successDark.step6,
    borderDisabled: successDark.step6,
  },
  outline: {
    text: successDark.step9,
    border: successDark.step9,
    hover: successDark.step10,
    focus: successDark.step11,
    disabled: successDark.step6,
  },
  ghost: {
    text: successDark.step10,
    bgHover: successDark.step3,
    borderFocus: successDark.step4,
    disabled: successDark.step8,
  },
  link: {
    text: successDark.step9,
    hover: successDark.step10,
    focus: successDark.step11,
    disabled: successDark.step6,
  },
};

export const warningDarkBtn: ButtonTheme = {
  solid: {
    text: warningDark.step1,
    bg: warningDark.step9,
    border: warningDark.step9,
    bgHover: warningDark.step10,
    borderHover: warningDark.step10,
    bgFocus: warningDark.step9,
    borderFocus: warningDark.step11,
    bgDisabled: warningDark.step6,
    borderDisabled: warningDark.step6,
  },
  outline: {
    text: warningDark.step9,
    border: warningDark.step9,
    hover: warningDark.step10,
    focus: warningDark.step11,
    disabled: warningDark.step6,
  },
  ghost: {
    text: warningDark.step10,
    bgHover: warningDark.step3,
    borderFocus: warningDark.step4,
    disabled: warningDark.step8,
  },
  link: {
    text: warningDark.step9,
    hover: warningDark.step10,
    focus: warningDark.step11,
    disabled: warningDark.step6,
  },
};

export const dangerDarkBtn: ButtonTheme = {
  solid: {
    text: dangerDark.step1,
    bg: dangerDark.step9,
    border: dangerDark.step9,
    bgHover: dangerDark.step10,
    borderHover: dangerDark.step10,
    bgFocus: dangerDark.step9,
    borderFocus: dangerDark.step11,
    bgDisabled: dangerDark.step6,
    borderDisabled: dangerDark.step6,
  },
  outline: {
    text: dangerDark.step9,
    border: dangerDark.step9,
    hover: dangerDark.step10,
    focus: dangerDark.step11,
    disabled: dangerDark.step6,
  },
  ghost: {
    text: dangerDark.step10,
    bgHover: dangerDark.step3,
    borderFocus: dangerDark.step4,
    disabled: dangerDark.step8,
  },
  link: {
    text: dangerDark.step9,
    hover: dangerDark.step10,
    focus: dangerDark.step11,
    disabled: dangerDark.step6,
  },
};

export const primaryBtn: ButtonTheme = {
  solid: {
    text: primary.step1,
    bg: primary.step9,
    border: primary.step9,
    bgHover: primary.step10,
    borderHover: primary.step10,
    bgFocus: primary.step9,
    borderFocus: primary.step11,
    bgDisabled: primary.step6,
    borderDisabled: primary.step6,
  },
  outline: {
    text: primary.step9,
    border: primary.step9,
    hover: primary.step10,
    focus: primary.step11,
    disabled: primary.step6,
  },
  ghost: {
    text: primary.step10,
    bgHover: primary.step3,
    borderFocus: primary.step4,
    disabled: primary.step8,
  },
  link: {
    text: primary.step9,
    hover: primary.step10,
    focus: primary.step11,
    disabled: primary.step6,
  },
};

export const secondaryBtn: ButtonTheme = {
  solid: {
    text: secondary.step12,
    bg: secondary.step6,
    border: secondary.step6,
    bgHover: secondary.step7,
    borderHover: secondary.step7,
    bgFocus: secondary.step6,
    borderFocus: secondary.step8,
    bgDisabled: secondary.step3,
    borderDisabled: secondary.step3,
  },
  outline: {
    text: secondary.step9,
    border: secondary.step9,
    hover: secondary.step10,
    focus: secondary.step11,
    disabled: secondary.step6,
  },
  ghost: {
    text: secondary.step10,
    bgHover: secondary.step3,
    borderFocus: secondary.step4,
    disabled: secondary.step8,
  },
  link: {
    text: secondary.step9,
    hover: secondary.step10,
    focus: secondary.step11,
    disabled: secondary.step6,
  },
};

export const successBtn: ButtonTheme = {
  solid: {
    text: success.step1,
    bg: success.step9,
    border: success.step9,
    bgHover: success.step10,
    borderHover: success.step10,
    bgFocus: success.step9,
    borderFocus: success.step11,
    bgDisabled: success.step6,
    borderDisabled: success.step6,
  },
  outline: {
    text: success.step9,
    border: success.step9,
    hover: success.step10,
    focus: success.step11,
    disabled: success.step6,
  },
  ghost: {
    text: success.step10,
    bgHover: success.step3,
    borderFocus: success.step4,
    disabled: success.step8,
  },
  link: {
    text: success.step9,
    hover: success.step10,
    focus: success.step11,
    disabled: success.step6,
  },
};

export const warningBtn: ButtonTheme = {
  solid: {
    text: warning.step1,
    bg: warning.step9,
    border: warning.step9,
    bgHover: warning.step10,
    borderHover: warning.step10,
    bgFocus: warning.step9,
    borderFocus: warning.step11,
    bgDisabled: warning.step6,
    borderDisabled: warning.step6,
  },
  outline: {
    text: warning.step9,
    border: warning.step9,
    hover: warning.step10,
    focus: warning.step11,
    disabled: warning.step6,
  },
  ghost: {
    text: warning.step10,
    bgHover: warning.step3,
    borderFocus: warning.step4,
    disabled: warning.step8,
  },
  link: {
    text: warning.step9,
    hover: warning.step10,
    focus: warning.step11,
    disabled: warning.step6,
  },
};

export const dangerBtn: ButtonTheme = {
  solid: {
    text: danger.step1,
    bg: danger.step9,
    border: danger.step9,
    bgHover: danger.step10,
    borderHover: danger.step10,
    bgFocus: danger.step9,
    borderFocus: danger.step11,
    bgDisabled: danger.step6,
    borderDisabled: danger.step6,
  },
  outline: {
    text: danger.step9,
    border: danger.step9,
    hover: danger.step10,
    focus: danger.step11,
    disabled: danger.step6,
  },
  ghost: {
    text: danger.step10,
    bgHover: danger.step3,
    borderFocus: danger.step4,
    disabled: danger.step8,
  },
  link: {
    text: danger.step9,
    hover: danger.step10,
    focus: danger.step11,
    disabled: danger.step6,
  },
};
