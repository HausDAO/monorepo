import { IconType } from 'react-icons/lib/esm';

export interface IApp {
  name: string;
  url: string;
  icon?: IconType | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export type AppSwitcherProps = {
  trigger: IApp;
  apps: IApp[];
  spacing?: string;
  width?: string;
  menuBg?: string;
  className?: string;
};
