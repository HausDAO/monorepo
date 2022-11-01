import React from 'react';
import classNames from 'classnames';
import { IconType } from 'react-icons/ri';
import { RiExternalLinkLine } from 'react-icons/ri';

import { InternalLink, ExternalLink } from './Link.styles';

export interface LinkProps extends React.ComponentPropsWithRef<'a'> {
  href?: string;
  Icon?: IconType;
  LeftIcon?:
    | IconType
    | React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
          title?: string | undefined;
        }
      >;
  selected?: boolean;
  disabled?: boolean;
  linkType?: 'internal' | 'external' | 'no-icon-external';
  hideIcon?: boolean;
}

// TODO Better way to do types
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href = '/',
      target = '_blank',
      linkType = 'internal',
      selected,
      disabled,
      Icon,
      LeftIcon,
      className,
      children,
    },
    ref
  ) => {
    const classes = classNames({ selected, disabled });
    if (linkType === 'external' || linkType === 'no-icon-external') {
      return (
        <ExternalLink
          href={href}
          className={`${classes} ${className}`}
          target={target}
          ref={ref}
        >
          {LeftIcon && <LeftIcon className="icon-left" />}
          {children}
          {linkType === 'external' ? (
            Icon ? (
              <Icon />
            ) : (
              <RiExternalLinkLine />
            )
          ) : null}
        </ExternalLink>
      );
    }
    return (
      <InternalLink to={href} className={`${classes} ${className}`} ref={ref}>
        {children}
        {Icon && <Icon />}
      </InternalLink>
    );
  }
);
