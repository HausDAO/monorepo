import styled from 'styled-components';

import { Theme } from '../../../types/theming';
import { DataSm } from '../../atoms';

export const AddressContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

export const AddressDataSm = styled(DataSm)`
  color: ${({ theme }: { theme: Theme }) => theme.secondary.step11};
`;

export const AddressCopyIcon = styled.div`
  cursor: pointer;
  margin-top: 0.5em;
`;
