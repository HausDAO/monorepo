import { useMemo } from 'react';
import { Avatar } from '../../atoms';
import makeBlockie from 'ethereum-blockies-base64';
import styled from 'styled-components';

export type ProfileAvatarProps = Parameters<typeof Avatar>[0] & {
  address?: string;
  image?: string;
};

export const ProfileAvatar = ({
  address,
  image,
  ...props
}: ProfileAvatarProps) => {
  const blockie = useMemo(() => {
    if (address) {
      return <BlockieImg src={makeBlockie(address)} alt="user avatar" />;
    }
    return '?';
  }, [address]);

  return <Avatar {...props} src={image} fallback={blockie} />;
};
export const BlockieImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;
