import React from 'react';

import { BaseCard } from './Card.styles';
import type { CardProps } from './Card.types';

export const Card = ({
  className,
  width = 'fit-content',
  children,
}: CardProps) => {
  return (
    <BaseCard className={className} width={width}>
      {children}
    </BaseCard>
  );
};
