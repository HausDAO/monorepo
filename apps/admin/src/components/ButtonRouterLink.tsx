import { Link as RouterLink } from 'react-router-dom';
import React, { ComponentProps } from 'react';
import { Button } from '@daohaus/ui';

type ProfileLinkProps = {
  href?: string;
  to: string;
  selected?: boolean;
  disabled?: boolean;
  linkType?: 'internal' | 'external' | 'no-icon-external';
  hideIcon?: boolean;
  target?: string;
  rel?: string;
} & Partial<ComponentProps<typeof Button>>;

export const ButtonRouterLink = ({
  to,
  target,
  disabled,
  children,
  linkType,
  hideIcon,
  rel,
  ...buttonProps
}: ProfileLinkProps) => {
  return (
    <RouterLink to={to} target={target} className="button-link" rel={rel}>
      <Button disabled={disabled} {...buttonProps}>
        {children}
      </Button>
    </RouterLink>
  );
};
