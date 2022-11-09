import React from 'react';
import classNames from 'classnames';

import { ProfileBtnAvatar, StyledProfileButton } from './ProfileButton.styles';
import { ProfileButtonProps } from './ProfileButton.types';

export const ProfileButton = React.forwardRef<
  HTMLButtonElement,
  ProfileButtonProps
>((props, ref) => {
  const {
    color = 'secondary',
    variant = 'solid',
    size = 'md',
    profile,
    IconRight,
    children,
    className,
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
      <ProfileBtnAvatar {...profile} size={size} />
      {children}
    </StyledProfileButton>
  );
});
