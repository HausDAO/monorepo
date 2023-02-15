import React from 'react';
import classNames from 'classnames';

import {
  LoadingAbsolute,
  StyledButton,
  StyledInvisibleSpan,
} from './Button.styles';
import type { IconButtonProps } from './IconButton.types';

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      type = 'button',
      isLoading = false,
      Icon,
      color = 'primary',
      variant = 'solid',
      size = 'md',
      className,
      ...rest
    },
    ref
  ) => {
    const classes = classNames({
      [variant]: variant,
      [size]: size,
    });

    return (
      <StyledButton
        {...rest}
        justify="center"
        color={color}
        className={`${classes} ${className}`}
        ref={ref}
        type={type}
      >
        {isLoading && <LoadingAbsolute />}
        {isLoading && Icon ? (
          <StyledInvisibleSpan>
            <Icon />
          </StyledInvisibleSpan>
        ) : (
          <Icon />
        )}
      </StyledButton>
    );
  }
);
