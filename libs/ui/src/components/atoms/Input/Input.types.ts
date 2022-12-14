import { IconType } from 'react-icons/lib/cjs';

import { Field } from '../../../types/formAndField';

export type InputProps = Field & {
  icon?: IconType;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  className?: string;
};
