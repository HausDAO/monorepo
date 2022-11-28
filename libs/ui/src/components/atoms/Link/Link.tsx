import React from 'react';
import classNames from 'classnames';
import { RiExternalLinkLine } from 'react-icons/ri';

import { LinkProps, PolymorphicLinkProps } from './Link.types';
import { StyledLink } from './Link.styles';

// TODO Refactor React Router out
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href = '/',
      target = '_blank',
      linkType = 'external',
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
    return (
      <StyledLink
        href={href}
        className={`${classes} ${className}`}
        target={target}
        ref={ref}
        rel="noopener noreferrer"
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
      </StyledLink>
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
