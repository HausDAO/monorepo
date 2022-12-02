import React from 'react';
import classNames from 'classnames';
import { RiExternalLinkLine } from 'react-icons/ri/index.js';

import { LinkProps } from './Link.types';
import { InternalLink, ExternalLink } from './Link.styles';

// TODO Refactor React Router out
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
