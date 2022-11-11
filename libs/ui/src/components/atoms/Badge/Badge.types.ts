import React, { ReactNode } from 'react';

export type BadgeColor = 'blue' | 'green' | 'pink' | 'violet';
export type BadgeSize = 'sm' | 'lg';

export interface BadgeProps {
  badgeLabel: ReactNode;
  badgeSize?: BadgeSize;
  badgeColor?: BadgeColor;
  className?: string;
  children?: ReactNode;
}
