import React from 'react';

export interface AvatarProps {
  /* Image src desired for Avatar */
  src?: string;
  /* Alt text for Image defined above */
  alt?: string;
  /* Fallback can be a string like users initials or a React Component */
  fallback?: string | React.ReactNode;
  /* Delay before fallback is used */
  delayMs?: number;
  /* Size of Avatar */
  size?: string;
  /* HTMLAttribute for adding classes to component  */
  className?: string;
}
