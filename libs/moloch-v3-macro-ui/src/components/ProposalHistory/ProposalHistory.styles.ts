import styled from 'styled-components';
import { Bold, Button, widthQuery } from '@daohaus/ui';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri/index.js';

export const HistoryListContainer = styled.div`
  min-width: 40.5rem;
  @media ${widthQuery.xs} {
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

export const StyledTitle = styled(Bold)<{ active: boolean }>`
  color: ${({ theme, active }) => active && theme.primary.step10};
`;

export const StyledUpArrow = styled(RiArrowUpSLine)`
  font-size: 4.8rem;
  font-weight: 900;
  color: ${({ theme }) => theme.primary.step10};
`;

export const StyledDownArrow = styled(RiArrowDownSLine)`
  font-size: 4.8rem;
  font-weight: 900;
  color: ${({ theme }) => theme.primary.step10};
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
export const VotesListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const VotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-top: 3rem;
  min-width: 50rem;
  max-height: 50rem;
  @media ${widthQuery.sm} {
    min-width: 100%;
  }
  overflow: auto;
  padding-right: 1rem;
`;

export const VoteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 3rem 0;
  @media ${widthQuery.sm} {
    margin: 1.2rem 0;
  }
`;
