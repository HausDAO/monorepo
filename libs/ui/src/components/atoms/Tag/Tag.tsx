import React from 'react';
import classNames from 'classnames';

import { TagProps } from './Tag.types';
import { BaseTag } from './Tag.styles';

export const Tag = ({
  className,
  children,
  tagColor,
  IconLeft,
  IconRight,
}: TagProps) => {
  const iconClasses = classNames({ tagColor });
  return (
    <BaseTag tagColor={tagColor || 'green'} className={className}>
      {IconLeft && <IconLeft className={`${iconClasses} icon-left`} />}
      {children}
      {IconRight && <IconRight className={`${iconClasses} icon-right`} />}
    </BaseTag>
  );
};
