import React from 'react';
import classNames from 'classnames';
import { useTheme } from 'styled-components';

import { Theme } from '../../../types/theming';
import { ButtonProps, Spinner } from '../../atoms/';
import { StyledLoadingButton } from './LoadingButton.styles';

type OmittedProps = 'IconLeft' | 'IconRight' | 'leftAlign';

export interface LoadingButtonProps extends Omit<ButtonProps, OmittedProps> {
  // Shows loading spinner */
  loading: boolean;

  /* The label to show in the button when loading is true */
  loadingText?: string;
}

export const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  LoadingButtonProps
>((props, ref) => {
  const theme = useTheme() as Theme;
  const {
    loading = false,
    children,
    className,
    color = 'secondary',
    variant = 'solid',
    size = 'md',
    ...rest
  } = props;

  const classes = classNames({
    [variant]: variant,
    [size]: size,
    profile: true,
  });

  return (
    <StyledLoadingButton
      {...rest}
      color={color}
      size={size}
      variant={variant}
      className={`${classes} ${className}`}
      ref={ref}
    >
      {loading && (
        <Spinner
          topColor={theme.primary.step8}
          bottomColor={theme.primary.step11}
          size={'2.8rem'}
          strokeWidth=".3rem"
        />
      )}
      {children}
    </StyledLoadingButton>
  );
});
