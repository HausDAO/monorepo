import React from 'react';
import { IconType } from 'react-icons';

export interface LinkProps extends React.ComponentPropsWithRef<'a'> {
  href?: string;
  Icon?: IconType;
  LeftIcon?: IconType | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  selected?: boolean;
  disabled?: boolean;
  linkType?: 'external' | 'no-icon-external';
  hideIcon?: boolean;
}

type NewElementProps<Element extends React.ElementType> = {
  as?: Element;
  disabled?: boolean;
};

export type PolymorphicLinkProps<Element extends React.ElementType> =
  React.PropsWithChildren<NewElementProps<Element>> &
    Omit<
      React.ComponentPropsWithoutRef<Element>,
      keyof NewElementProps<Element>
    >;
