import React from 'react';
import classNames from 'classnames';
import { RiExternalLinkLine } from 'react-icons/ri';
import styled, { css, StyledComponent } from 'styled-components';

import { LinkProps } from './Link.types';
import { InternalLink, ExternalLink, LinkStyles } from './Link.styles';

type NewLinkProps<C extends React.ElementType> = {
  as?: C;
  disabled?: boolean;
};

type Props<C extends React.ElementType> = React.PropsWithChildren<
  NewLinkProps<C>
> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof NewLinkProps<C>>;

const UnstyledPolymorphicLink = <C extends React.ElementType = 'a'>({
  as,
  disabled,
  children,
  className,
  ...restProps
}: Props<C>) => {
  const Component = as || 'a';

  const classes = classNames({ disabled });

  return (
    <Component {...restProps} className={`${classes} ${className}`}>
      {children}
    </Component>
  );
};

export const NewLink = styled(UnstyledPolymorphicLink)`
  ${LinkStyles}
`;

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
