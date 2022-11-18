import { Noun } from '@daohaus/utils';
import {
  Button,
  SingleColumnLayout,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';
import { indigoDark } from '@radix-ui/colors';
import { ChangeEvent, MouseEvent, ReactNode } from 'react';
import { RiGridFill, RiListCheck } from 'react-icons/ri';
import styled from 'styled-components';
import { sortOptions } from '../utils/hub';
import { DAOFilterDropdown } from './DaoFilterDropdown';
import { ListType } from './HomeDashboard';
import SearchInput from './SearchInput';
import { SortDropdown } from './SortDropdown';

type ListActionsProps = {
  children: ReactNode;
  searchTerm: string;
  filterNetworks: string[];
  listType: ListType;
  toggleListType: () => void;
  toggleNetworkFilter: (event: MouseEvent<HTMLButtonElement>) => void;
  filterDelegate: string;
  toggleDelegateFilter: (event: MouseEvent<HTMLButtonElement>) => void;
  sortBy: string;
  switchSortBy: (event: ChangeEvent<HTMLSelectElement>) => void;
  setSearchTerm: (term: string) => void;
  totalDaos: number;
  noun: Noun;
};

const IconGrid = styled(RiGridFill)`
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
  fill: ${indigoDark.indigo10};
  :hover {
    fill: ${indigoDark.indigo10};
  }
`;

const IconList = styled(RiListCheck)`
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
  fill: ${indigoDark.indigo10};
  :hover {
    fill: ${indigoDark.indigo10};
  }
`;

const ControlBarBox = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1.6rem;
  .list-toggle {
    margin-right: auto;
  }
  @media ${widthQuery.sm} {
    flex-direction: column;
  }
`;

export const ListActions = ({
  children,
  searchTerm,
  setSearchTerm,
  totalDaos,
  noun,
  filterNetworks,
  filterDelegate,
  toggleNetworkFilter,
  toggleDelegateFilter,
  toggleListType,
  listType,
  sortBy,
  switchSortBy,
}: ListActionsProps) => {
  const isMobile = useBreakpoint(widthQuery.sm);

  return (
    <SingleColumnLayout>
      <ControlBarBox>
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          totalItems={totalDaos}
          noun={noun}
          full={isMobile}
        />
        <DAOFilterDropdown
          filterNetworks={filterNetworks}
          filterDelegate={filterDelegate}
          toggleDelegateFilter={toggleDelegateFilter}
          toggleNetworkFilter={toggleNetworkFilter}
        />
        {isMobile || (
          <Button
            color="secondary"
            onClick={toggleListType}
            IconLeft={listType === ListType.Table ? IconGrid : IconList}
            className="list-toggle"
          >
            {listType === ListType.Table ? 'Card View' : 'List View'}
          </Button>
        )}
        <SortDropdown
          id="dao-sort"
          value={sortBy}
          onChange={switchSortBy}
          options={sortOptions}
        />
      </ControlBarBox>
      {children}
    </SingleColumnLayout>
  );
};
