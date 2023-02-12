import React from 'react';
import { IconType } from 'react-icons/lib/esm';

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

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  /* Set color as defined by the theme */
  color?: ButtonColor;
  /* Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Controls button variant */
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  /* Shows loading spinner */
  isLoading?: boolean;
  /* The label to show in the button when loading is true */
  loadingText?: string;
  /* Toggle from fit-content to width 100% of the button element */
  fullWidth?: boolean;
  /* Passing in the href prop changes to dom element from a button to a link */
  href?: string;
  /* Add justify-content as prop for button content */
  justify?: ButtonJustifyContent;
  /* Adds icon before button label */
  IconLeft?: IconType | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  /* Adds icon after button label */
  IconRight?: IconType | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
