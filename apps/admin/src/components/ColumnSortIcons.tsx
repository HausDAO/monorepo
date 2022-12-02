import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri/index.js';
import styled from 'styled-components';

const SorterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
`;

type ColumnSortIconsProps = {
  orderBy: string;
  handleColumnSort: (orderBy: string, orderDirection: 'asc' | 'desc') => void;
};

export const ColumnSortIcons = ({
  orderBy,
  handleColumnSort,
}: ColumnSortIconsProps) => {
  return (
    <SorterContainer>
      <RiArrowUpSFill onClick={() => handleColumnSort(orderBy, 'asc')} />

      <RiArrowDownSFill onClick={() => handleColumnSort(orderBy, 'desc')} />
    </SorterContainer>
  );
};
