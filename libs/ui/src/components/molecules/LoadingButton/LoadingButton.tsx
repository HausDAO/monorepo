import React from 'react';
import classNames from 'classnames';

import { Button, ButtonProps } from '../../atoms/';
import { LoadingAbsolute, StyledInvisibleSpan } from './LoadingButton.styles';

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
  const {
    loading = false,
    loadingText,
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
    <Button
      {...rest}
      color={color}
      size={size}
      variant={variant}
      className={`${classes} ${className}`}
      ref={ref}
    >
      {loading && <LoadingAbsolute color={color} />}
      {loading ? (
        <StyledInvisibleSpan>{children}</StyledInvisibleSpan>
      ) : (
        children
      )}
    </Button>
  );
});
