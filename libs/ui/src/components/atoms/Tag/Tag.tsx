import classNames from 'classnames';
import { ReactNode, RefObject, forwardRef } from 'react';

import { IconType } from 'react-icons';

import { BaseTag } from './Tag.styles';

export type TagProps = {
  children: ReactNode;
  tagColor: 'blue' | 'green' | 'pink' | 'violet' | 'yellow' | 'red';
  className?: string;
  IconLeft?: IconType;
  IconRight?: IconType;
};

type Ref =
  | ((instance: HTMLBaseElement | null) => void)
  | RefObject<HTMLBaseElement>
  | null
  | undefined;

export const Tag = forwardRef(
  (
    { className, children, tagColor, IconLeft, IconRight }: TagProps,
    ref: Ref
  ) => {
    const iconClasses = classNames({ tagColor });
    return (
      <BaseTag tagColor={tagColor || 'green'} className={className}>
        {IconLeft && <IconLeft className={`${iconClasses} icon-left`} />}
        {children}
        {IconRight && <IconRight className={`${iconClasses} icon-right`} />}
      </BaseTag>
    );
  }
);
