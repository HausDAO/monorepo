import 'styled-components';

export type ButtonColorTargets = {
  text: string;
  bg: string;
  border: string;
  hoverBg: string;
  hoverBorder: string;
  focusBg: string;
  focusBorder: string;
  disabledBg: string;
  disabledBorder: string;
  outline: string;
  outlineHover: string;
  outlineFocus: string;
  outlineDisabled: string;
};

export interface BtnTargets {
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

type ColorSteps = {
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  step5: string;
  step6: string;
  step7: string;
  step8: string;
  step9: string;
  step10: string;
  step11: string;
  step12: string;
};
declare module 'styled-components' {
  export interface DefaultTheme {
    themeName: string;
    rootBgColor: string;
    rootFontColor: string;
    transparent: string;
    primary: ColorSteps;
    primaryA: ColorSteps;
    secondary: ColorSteps;
    secondaryA: ColorSteps;
    neutral: ColorSteps;
    success: ColorSteps;
    warning: ColorSteps;
    danger: ColorSteps;
    info: ColorSteps;
    blue1: string;
    blue2: string;
    blue3: string;
    blue4: string;
    blue5: string;
    blue6: string;
    blue7: string;
    blue8: string;
    blue9: string;
    blue10: string;
    blue11: string;
    blue12: string;
    violet1: string;
    violet2: string;
    violet3: string;
    violet4: string;
    violet5: string;
    violet6: string;
    violet7: string;
    violet8: string;
    violet9: string;
    violet10: string;
    violet11: string;
    violet12: string;
    pink1: string;
    pink2: string;
    pink3: string;
    pink4: string;
    pink5: string;
    pink6: string;
    pink7: string;
    pink8: string;
    pink9: string;
    pink10: string;
    pink11: string;
    pink12: string;
    green1: string;
    green2: string;
    green3: string;
    green4: string;
    green5: string;
    green6: string;
    green7: string;
    green8: string;
    green9: string;
    green10: string;
    green11: string;
    green12: string;
    yellow1: string;
    yellow2: string;
    yellow3: string;
    yellow4: string;
    yellow5: string;
    yellow6: string;
    yellow7: string;
    yellow8: string;
    yellow9: string;
    yellow10: string;
    yellow11: string;
    yellow12: string;
    red1: string;
    red2: string;
    red3: string;
    red4: string;
    red5: string;
    red6: string;
    red7: string;
    red8: string;
    red9: string;
    red10: string;
    red11: string;
    red12: string;
    button: {
      primary: BtnTargets;
      secondary: BtnTargets;
      success: BtnTargets;
      warning: BtnTargets;
      danger: BtnTargets;
    };
    toast: {
      icon: {
        default: string;
        success: string;
        warning: string;
        error: string;
      };
    };
    font: {
      family: {
        body: string;
        data: string;
      };
    };
  }
  export interface DefaultThemeOverrides extends Partial<DefaultTheme> {
    themeName: string;
  }
}
