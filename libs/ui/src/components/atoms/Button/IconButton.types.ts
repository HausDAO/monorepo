import { IconType } from 'react-icons';

import { ButtonProps } from './Button.types';

type OmittedButtonProps = 'IconLeft' | 'IconRight' | 'justify' | 'fullWidth';

export interface IconButtonProps extends Omit<ButtonProps, OmittedButtonProps> {
  Icon: IconType | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
