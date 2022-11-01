import { AvatarBase, AvatarImage, AvatarFallback } from './Avatar.styles';

export type AvatarProps = {
  src?: string;
  alt?: string;
  fallback?: string | React.ReactNode;
  delayMs?: number;
  size?: string;
  className?: string;
};

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
