import React from 'react';
import classNames from 'classnames';
import { RiExternalLinkLine } from 'react-icons/ri/index.js';

import { LinkProps, PolymorphicLinkProps } from './Link.types';
import { StyledLink } from './Link.styles';

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href = '/',
      target = '_blank',
      external = true,
      selected,
      disabled,
      RightIcon,
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
      >
        {LeftIcon && <LeftIcon className="icon-left" />}
        {children}
        {(external && <RiExternalLinkLine />) || (RightIcon && <RightIcon />)}
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
