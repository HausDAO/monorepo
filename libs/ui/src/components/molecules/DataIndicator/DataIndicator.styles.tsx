import styled from 'styled-components';
import { ParMd, ParSm } from '../../atoms';

export const DataIndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DataIndicatorLabelMd = styled(ParMd)`
  margin-bottom: 0.5rem;
  opacity: 0.9;
`;

export const DataIndicatorLabelSm = styled(ParSm)`
  opacity: 0.9;
`;
