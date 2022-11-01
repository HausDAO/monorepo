import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';
import { Theme } from '../../types/theming';
import { font } from '.';

export const GlobalStyles = createGlobalStyle`
  ${normalize()}

  * {
    &,
    &::before,
    &::after {
      box-sizing: border-box;
    }
  }
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;

  #root {
     min-height: 100%;
     height: 100%;
     margin: 0px;
     padding: 0px;
  }

  h1, h2, h3, h4, h5, h6, p{
    margin: 0;
    line-height: ${font.lineHeight};
    letter-spacing: ${font.letterSpacing};
  }

  html {
    font-size: 10px;
    background-color: ${({ theme }: { theme: Theme }) => theme.rootBgColor};
  }
  body {
    font-family: ${font.family.body};
    color: ${({ theme }: { theme: Theme }) => theme.rootFontColor}
  }
  `;
