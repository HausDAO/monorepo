import { AvatarBase, AvatarImage, AvatarFallback } from './Avatar.styles';
import type { AvatarProps } from './Avatar.types';

export const Avatar = ({
  src,
  size = 'sm',
  alt = 'Picture of an Avatar',
  delayMs = 500,
  fallback = 'X',
  className,
}: AvatarProps) => {
  return (
    <AvatarBase size={size} className={className}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback delayMs={src ? delayMs : 0}>{fallback}</AvatarFallback>
    </AvatarBase>
  );
};
