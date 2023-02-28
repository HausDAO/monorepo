import styled from 'styled-components';
import { indigoDark } from '@radix-ui/colors';

export const Table = styled.table`
  width: 100%;
  font-size: 1.6rem;
  line-height: 2.4rem;
  border-collapse: collapse;
  text-align: left;
  margin-bottom: 2rem;
`;

export const Thead = styled.thead``;

export const Th = styled.th`
  color: ${indigoDark.indigo11};
  border-bottom: 1px solid ${indigoDark.indigo5};
  padding: 2rem 0.5rem;
`;

export const HeaderCellContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  /* gap: 1rem; */
`;

export const Tr = styled.tr``;

export const Td = styled.td`
  padding: 2rem 0.5rem;
`;

export const TBody = styled.tbody``;
