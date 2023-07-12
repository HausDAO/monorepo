import 'styled-components';
import { DAOhausTheme } from './types/theming';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends DAOhausTheme {}
}
