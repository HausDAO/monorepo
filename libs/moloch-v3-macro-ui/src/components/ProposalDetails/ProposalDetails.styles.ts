import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { border, DropdownLinkStyles } from '@daohaus/ui';

export const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
  padding: 2.8rem 3.6rem;

  border-radius: ${border.radius};
  border: 1px ${({ theme }) => theme.secondary.step5} solid;
  background-color: ${({ theme }) => theme.secondary.step3};

  .description {
    word-break: break-word;
  }

  .proposal-link {
    margin-top: 1.2rem;
  }
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 3rem;
  margin-top: 3rem;
`;

export const StyledRouterLink = styled(RouterLink)`
  ${DropdownLinkStyles}
  &:hover {
    text-decoration: none;
  }
`;
