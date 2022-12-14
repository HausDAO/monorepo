import {
  ToastProps as RadixToastProps,
  ToastProviderProps,
  ToastViewportProps,
} from '@radix-ui/react-toast';

export type ToastLinksProps = {
  actionAltText?: string;
  leftLink?: {
    path: string;
    text: string;
  };
  rightLink?: {
    path: string;
    text: string;
  };
};

export type ToastType = 'default' | 'success' | 'warning' | 'error';

export type ToastProps = RadixToastProps &
  ToastProviderProps &
  ToastViewportProps & {
    title: string;
    description?: string;
    toastType?: ToastType;
    ariaLabelClose?: string;
    toastLinks?: ToastLinksProps;
  };
