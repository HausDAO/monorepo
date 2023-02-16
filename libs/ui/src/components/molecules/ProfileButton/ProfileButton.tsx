import React from 'react';
import classNames from 'classnames';

import { ProfileBtnAvatar, StyledProfileButton } from './ProfileButton.styles';
import { ProfileButtonProps } from './ProfileButton.types';
import { truncateAddress } from '@daohaus/utils';

export const ProfileButton = React.forwardRef<
  HTMLButtonElement,
  ProfileButtonProps
>((props, ref) => {
  const {
    color = 'secondary',
    variant = 'solid',
    size = 'md',
    profile,
    avatarOnly = false,
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
      IconRight={!avatarOnly ? IconRight : undefined}
    >
      <ProfileBtnAvatar
        address={profile.address}
        image={profile.image}
        size={size}
      />
      {!avatarOnly && (
        <div className="interior">
          {profile.name && profile.name}
          {!profile.name && profile.ens && profile.ens}
          {!profile.name &&
            !profile.ens &&
            profile.address &&
            truncateAddress(profile.address)}
          {children}
        </div>
      )}
    </StyledProfileButton>
  );
});
