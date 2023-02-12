import { ButtonProps } from '../../atoms/';

type OmittedProps = 'IconRight' | 'leftAlign';

export interface LoadingButtonProps extends Omit<ButtonProps, OmittedProps> {
  /* Shows loading spinner */
  loading: boolean;
  /* The label to show in the button when loading is true */
  loadingText?: string;
}
