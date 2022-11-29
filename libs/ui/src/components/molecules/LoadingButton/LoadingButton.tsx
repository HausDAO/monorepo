import React from 'react';
import classNames from 'classnames';

import { LoadingButtonProps } from './LoadingButton.types';
import {
  LoadingAbsolute,
  StyledInvisibleSpan,
  StyledLoadingButton,
} from './LoadingButton.styles';

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
    IconLeft,
    ...rest
  } = props;

  const classes = classNames({
    [variant]: variant,
    [size]: size,
    loading,
  });

  return (
    <StyledLoadingButton
      {...rest}
      color={color}
      size={size}
      variant={variant}
      className={`${classes} ${className}`}
      ref={ref}
      IconLeft={IconLeft}
    >
      {loading && <LoadingAbsolute />}
      {loading ? (
        <StyledInvisibleSpan>{children}</StyledInvisibleSpan>
      ) : (
        children
      )}
    </StyledLoadingButton>
  );
});
