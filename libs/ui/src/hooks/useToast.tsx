import { useContext } from 'react';
import { HausThemeContext } from '../theme';

export const useToast = () => {
  const { setToast } = useContext(HausThemeContext);

  const defaultToast = ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }): void => {
    setToast({
      title,
      description,
      toastType: 'default',
    });
  };

  const successToast = ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }): void => {
    setToast({
      title,
      description,
      toastType: 'success',
    });
  };

  const warningToast = ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }): void => {
    setToast({
      title,
      description,
      toastType: 'warning',
    });
  };

  const errorToast = ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }): void => {
    setToast({
      title,
      description,
      toastType: 'error',
    });
  };

  return {
    setToast,
    defaultToast,
    successToast,
    warningToast,
    errorToast,
  };
};
