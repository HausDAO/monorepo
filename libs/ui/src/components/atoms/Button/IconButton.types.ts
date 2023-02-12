import { IconType } from 'react-icons/lib/esm';

import { ButtonProps } from './Button.types';

type OmittedButtonProps =
  | 'IconLeft'
  | 'IconRight'
  | 'justify'
  | 'fullWidth'
  | 'loadingText';

export interface IconButtonProps extends Omit<ButtonProps, OmittedButtonProps> {
  Icon: IconType | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
