import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Theme } from '../../../types/theming';
import { font } from '../../../theme/global/font';

export const LinkStyles = css`
  align-items: center;
  color: ${({ theme }: { theme: Theme }) => theme.primary.step10};
  cursor: pointer;
  display: inline-flex;
  font-family: ${font.family.body};
  font-weight: ${font.weight.reg};
  font-size: ${font.size.md};
  text-decoration: none;
  letter-spacing: 1.5px;
  :hover {
    text-decoration: underline;
  }

  .icon-left {
    width: 25px;
    margin-right: 0.5rem;
  }

  svg {
    margin-left: 0.3rem;
  }
  &.button-link {
    :hover {
      text-decoration: none;
    }
  }
`;

export const ExternalLink = styled.a`
  ${LinkStyles}
`;

export const InternalLink = styled(Link)`
  ${LinkStyles}
`;

export const StyledLink = styled.a`
  ${LinkStyles}
`;
