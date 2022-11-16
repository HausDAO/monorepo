import React, { ReactNode } from 'react';

export type BadgeColor = 'blue' | 'green' | 'pink' | 'violet'; // TODO Create shared types file in root of atoms. Share between this and Tag
export type BadgeSize = 'sm' | 'lg';

export interface BadgeProps {
  badgeLabel: ReactNode;
  badgeSize?: BadgeSize;
  badgeColor?: BadgeColor;
  className?: string;
  children?: ReactNode;
}
