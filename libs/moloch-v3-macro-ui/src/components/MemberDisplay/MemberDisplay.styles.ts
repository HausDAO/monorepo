import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { DropdownLinkStyles } from '@daohaus/ui';

export const MemberContainer = styled.div`
  button {
    padding-left: 0 !important;
  }
`;

export const StyledRouterLink = styled(RouterLink)`
  ${DropdownLinkStyles}
  :hover {
    text-decoration: none;
  }
`;
