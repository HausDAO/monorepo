import React, { ComponentProps } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
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

const StyledRouterLink = styled(RouterLink)`
  text-decoration: none;
  color: unset;
  &:hover {
    text-decoration: none;
  }
`;

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
    <StyledRouterLink to={to} target={target} className="button-link" rel={rel}>
      <Button disabled={disabled} {...buttonProps}>
        {children}
      </Button>
    </StyledRouterLink>
  );
};
