import React, { ReactNode } from 'react';

import { BaseCard } from './Card.styles';

export type CardProps = {
  children: ReactNode;
  className?: string;
  success?: boolean;
  warning?: boolean;
  error?: boolean;
  width?: string;
};

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
