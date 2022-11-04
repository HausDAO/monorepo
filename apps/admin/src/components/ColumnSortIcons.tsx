import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import styled from 'styled-components';

const SorterContainer = styled.div`
  display: flex;
  flex-direction: column;

  div {
    height: 0.65rem;
  }
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
      <div className="up-arrow">
        <RiArrowUpSFill onClick={() => handleColumnSort(orderBy, 'asc')} />
      </div>
      <div className="down-arrow">
        <RiArrowDownSFill onClick={() => handleColumnSort(orderBy, 'desc')} />
      </div>
    </SorterContainer>
  );
};
