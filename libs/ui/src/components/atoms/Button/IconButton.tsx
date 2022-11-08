import React from 'react';
import classNames from 'classnames';

import { StyledButton } from './Button.styles';
import { IconButtonProps } from './IconButton.types';

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      type = 'button',
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
        {Icon && <Icon />}
      </StyledButton>
    );
  }
);
