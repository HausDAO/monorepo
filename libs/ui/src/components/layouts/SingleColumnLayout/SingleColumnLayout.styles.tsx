import { widthQuery } from '../../../theme/global/breakpoints';
import styled from 'styled-components';

export const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 110rem;
`;

export const ColumnHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 5rem;
  width: 100%;
  .subtitle {
    margin-bottom: 1.2rem;
    opacity: 0.6;
  }
  .title {
    margin-bottom: 3rem;
  }
  .description {
    margin-bottom: 5rem;
  }
  @media ${widthQuery.sm} {
    margin-top: 3rem;
  }
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitleContainerWithActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  @media ${widthQuery.sm} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ActionButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  @media ${widthQuery.sm} {
    width: 100%;
    flex-direction: column;
  }
`;
