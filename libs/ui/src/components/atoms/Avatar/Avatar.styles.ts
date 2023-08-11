import * as RadixAvatar from '@radix-ui/react-avatar';
import styled from 'styled-components';

const sizes: Record<string, string> = {
  sm: '2.5rem',
  md: '3.5rem',
  lg: '4.5rem',
  xl: '5.5rem',
};
const handleSizing = (size: string) => (sizes[size] ? sizes[size] : size);

export const AvatarBase = styled(RadixAvatar.Root)<{ size: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;
  border-radius: 100%;
  width: ${({ size }: { size: string }) => handleSizing(size)};
  height: ${({ size }: { size: string }) => handleSizing(size)};
`;
export const AvatarFallback = styled(RadixAvatar.Fallback)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.avatar.bg};
`;

export const AvatarImage = styled(RadixAvatar.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;
