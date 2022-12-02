import { Button, Link } from '@daohaus/ui';
import React, { ComponentProps } from 'react';

type ProfileLinkProps = {
  href?: string;
  to?: string;
  selected?: boolean;
  disabled?: boolean;
  linkType?: 'external' | 'no-icon-external';
  hideIcon?: boolean;
  target?: string;
  rel?: string;
} & Partial<ComponentProps<typeof Button>>;

export const ButtonRouterLink = ({
  href,
  to,
  selected,
  target,
  disabled,
  children,
  linkType,
  hideIcon,
  rel,
  ...buttonProps
}: ProfileLinkProps) => {
  return (
    <Link
      href={href}
      selected={selected}
      disabled={disabled}
      linkType={linkType}
      hideIcon={hideIcon}
      target={target}
      className="button-link"
      rel={rel}
    >
      <Button disabled={disabled} {...buttonProps}>
        {children}
      </Button>
    </Link>
  );
};
