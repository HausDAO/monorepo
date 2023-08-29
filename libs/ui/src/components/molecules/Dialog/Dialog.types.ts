import { DialogContentProps } from '@radix-ui/react-dialog';
import { ButtonProps } from '../../atoms';

export type DialogProps = DialogContentProps & {
  title: string;
  description?: string;
  alignButtons?: 'start' | 'end';
  leftButton?: ButtonProps;
  rightButton?: ButtonProps & {
    $closeDialog?: boolean;
  };
};
