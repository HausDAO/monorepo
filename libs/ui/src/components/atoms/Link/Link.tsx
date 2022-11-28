import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';
import { RiExternalLinkLine } from 'react-icons/ri';
import styled from 'styled-components';

import { LinkProps, PolymorphicLinkProps } from './Link.types';
import { InternalLink, ExternalLink, StyledLink } from './Link.styles';

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

export const UnstyledPolymorphicLink = <
  Element extends React.ElementType = 'a'
>({
  as,
  disabled,
  children,
  className,
  ...restProps
}: PolymorphicLinkProps<Element>) => {
  const Component = as || 'a';

  const classes = classNames({ disabled });

  return (
    <Component {...restProps} className={`${classes} ${className}`}>
      {children}
    </Component>
  );
};
