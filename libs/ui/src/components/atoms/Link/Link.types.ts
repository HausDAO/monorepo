import { IconType } from 'react-icons';

export interface LinkProps extends React.ComponentPropsWithRef<'a'> {
  /* Makes link disabled */
  disabled?: boolean;
  /* Makes link open in new tab */
  external?: boolean;
  /* The element or component to use in place of `a` */
  as?: React.ElementType;
  /* Action to perform when clicked */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  /* React node */
  children?: React.ReactNode;
  href?: string;
  Icon?: IconType;
  LeftIcon?: IconType | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  selected?: boolean;
  linkType?: 'internal' | 'external' | 'no-icon-external';
  hideIcon?: boolean;
}
