import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { IconType } from 'react-icons/ri';

import { StyledButton } from './Button.styles';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export type ButtonJustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // ! Not Included untill talk with design
  // Shows loading spinner */
  loading?: boolean;
  // ! Not Included untill talk with design
  /* The label to show in the button when loading is true */
  loadingText?: string;
  /** Set theme color */
  color?: ButtonColor;
  /* Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Controls button variant */
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  /* Toggle from fit-content to width 100% of the button element */
  fullWidth?: boolean;
  /* Add justify-content as prop for button content */
  justify?: ButtonJustifyContent;
  /* Adds icon before button label */
  IconLeft?: IconType | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  /* Adds icon after button label */
  IconRight?: IconType | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

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
        {IconLeft && <IconLeft className="icon-left" />}
        {children}
        {IconRight && <IconRight className="icon-right" />}
      </StyledButton>
    );
  }
);
