import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { border, DropdownLinkStyles, Theme } from "@daohaus/ui";

export const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
  padding: 2.8rem 3.6rem;

  border-radius: ${border.radius};
  border: 1px ${({ theme }: { theme: Theme }) => theme.secondary.step5} solid;
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step3};

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
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 3rem;
`;

export const StyledRouterLink = styled(RouterLink)`
${DropdownLinkStyles}
:hover {
  text-decoration: none;
}
`;
