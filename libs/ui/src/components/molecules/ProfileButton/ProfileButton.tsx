import React from 'react';
import classNames from 'classnames';
import { RiArrowDropDownLine } from 'react-icons/ri';

import { DropdownAvatar, StyledProfileButton } from './ProfileButton.styles';
import { ProfileButtonProps } from './ProfileButton.types';

export const ProfileButton = React.forwardRef<
  HTMLButtonElement,
  ProfileButtonProps
>((props, ref) => {
  const {
    IconRight,
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
    <StyledProfileButton
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
    </StyledProfileButton>
  );
});
