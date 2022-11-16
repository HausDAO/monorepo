import React from 'react';
import classNames from 'classnames';

import { StyledButton } from './Button.styles';
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
      fullWidth,
      justify = 'center',
      className,
      children,
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
        type={type}
      >
        {IconLeft && <IconLeft className={`${className} icon-left`} />}
        {children}
        {IconRight && <IconRight className={`${className} icon-right`} />}
      </StyledButton>
    );
  }
);
