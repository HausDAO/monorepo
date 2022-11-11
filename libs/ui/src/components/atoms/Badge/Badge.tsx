import React from 'react';

import { Bold, ParMd, ParXs } from '../Typography';
import { BaseBadge } from './Badge.styles';
import { BadgeProps } from './Badge.types';

export const Badge = ({
  className,
  badgeLabel,
  badgeSize = 'sm',
  badgeColor = 'blue',
}: BadgeProps) => {
  return (
    <BaseBadge
      badgeColor={badgeColor}
      badgeSize={badgeSize}
      className={className}
    >
      {badgeSize === 'sm' && (
        <ParXs>
          <Bold>{badgeLabel}</Bold>
        </ParXs>
      )}
      {badgeSize === 'lg' && (
        <ParMd>
          <Bold>{badgeLabel}</Bold>
        </ParMd>
      )}
    </BaseBadge>
  );
};
