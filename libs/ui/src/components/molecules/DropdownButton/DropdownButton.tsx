import React from 'react';
import classNames from 'classnames';

import { RiArrowDropDownLine } from 'react-icons/ri';
import { ButtonProps } from '../../atoms/Button';
import { DropdownAvatar, DropdownButtonBase } from './DropdownButton.styles';
import { ProfileAvatarProps } from '../ProfileAvatar/ProfileAvatar';

type OmittedProps = 'IconLeft';
export interface DropdownButtonProps extends Omit<ButtonProps, OmittedProps> {
  /* Profile Avatar stils on the left of button */
  profile: Omit<ProfileAvatarProps, 'size'>;
}

export const DropdownButton = React.forwardRef<
  HTMLButtonElement,
  DropdownButtonProps
>((props, ref) => {
  const {
    IconRight = RiArrowDropDownLine,
    children,
    className,
    color = 'secondary',
    variant = 'solid',
    size = 'md',
    profile,
    ...rest
  } = props;

  const classes = classNames({
    [variant]: variant,
    [size]: size,
    profile: true,
  });

  return (
    <DropdownButtonBase
      {...rest}
      color={color}
      size={size}
      variant={variant}
      className={`${classes} ${className}`}
      ref={ref}
      IconRight={IconRight}
    >
      {profile && <DropdownAvatar {...profile} size={size} />}
      {children}
    </DropdownButtonBase>
  );
});
