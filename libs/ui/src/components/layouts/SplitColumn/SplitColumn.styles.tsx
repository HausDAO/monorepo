import { widthQuery } from '../../../theme/global/breakpoints';
import styled from 'styled-components';

export const StyledSplitColumn = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
`;

export const StyledRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 3.6rem;

  .left-section,
  .right-section {
    width: 24rem;
    @media ${widthQuery.sm} {
      width: 100%;
      margin-bottom: 1.6rem;
    }
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
  }
`;
