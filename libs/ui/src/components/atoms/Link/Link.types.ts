import { IconType } from 'react-icons/';

export interface LinkProps extends React.ComponentPropsWithRef<'a'> {
  href?: string;
  target?: string;
  RightIcon?: IconType | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  LeftIcon?: IconType | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  selected?: boolean;
  showExternalIcon?: boolean;
  disabled?: boolean;
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
