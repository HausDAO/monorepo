import React, { ReactNode } from 'react';

import { IconType } from 'react-icons';

export type TagProps = {
  children: ReactNode;
  tagColor: 'blue' | 'green' | 'pink' | 'violet' | 'yellow' | 'red'; // TODO Create shared types file in root of atoms. Share between this and badge
  className?: string;
  IconLeft?: IconType;
  IconRight?: IconType;
};
