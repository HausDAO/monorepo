import styled from 'styled-components';
import { Bold, Button, Card, Theme, widthQuery } from '@daohaus/ui';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri/index.js';

export const HistoryListContainer = styled.div`
  max-width: 47.5rem;
`;

export const SafeContainer = styled(Card)`
  padding: 3rem;
  width: 100%;
  border: none;
  margin-bottom: 3rem;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
`;
export const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2rem 0;
  border-bottom: 1px solid #ffffff16;
`;

export const VisibleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
`;

export const StyledTitle = styled(Bold)`
  color: ${({ theme, active }: { theme: Theme; active: boolean }) =>
    active && theme.primary.step10};
`;

export const StyledUpArrow = styled(RiArrowUpSLine)`
  font-size: 4.8rem;
  font-weight: 900;
  color: ${({ theme }: { theme: Theme }) => theme.primary.step10};
`;

export const StyledDownArrow = styled(RiArrowDownSLine)`
  font-size: 4.8rem;
  font-weight: 900;
  color: ${({ theme }: { theme: Theme }) => theme.primary.step10};
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 2.5rem;
`;

export const VotesButton = styled(Button)`
  min-width: 10.6rem;
`;

export const ExpandedDataGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2.4rem;
`;
