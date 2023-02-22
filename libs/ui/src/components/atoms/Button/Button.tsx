import React from 'react';
import classNames from 'classnames';

import {
  LoadingAbsolute,
  StyledButton,
  StyledInvisibleSpan,
} from './Button.styles';
import type { ButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      IconLeft,
      IconRight,
      color = 'primary',
      variant = 'solid',
      size = 'md',
      isLoading = false,
      loadingText,
      fullWidth,
      justify = 'center',
      className,
      children,
      href,
      ...rest
    },
    ref
  ) => {
    const classes = classNames({
      [variant]: variant,
      [size]: size,
      'full-width': fullWidth,
    });

    return (
      <StyledButton
        {...rest}
        color={color}
        justify={justify}
        className={`${classes} ${className}`}
        ref={ref}
        type={!href ? type : undefined}
        as={href ? 'a' : 'button'}
        href={href ? href : undefined}
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
      >
        {IconLeft && <IconLeft className={`icon-left`} />}
        {isLoading && <LoadingAbsolute color={color} />}
        {isLoading ? (
          <StyledInvisibleSpan>{children}</StyledInvisibleSpan>
        ) : (
          children
        )}
        {IconRight && <IconRight className={`icon-right`} />}
      </StyledButton>
    );
  }
);
