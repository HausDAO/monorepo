import { Avatar } from '../../atoms';

export type ProfileAvatarProps = Parameters<typeof Avatar>[0] & {
  address?: string;
  image?: string;
};
