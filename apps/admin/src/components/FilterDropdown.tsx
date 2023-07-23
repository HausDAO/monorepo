import { MouseEvent } from 'react';
import styled from 'styled-components';
import { AiOutlineCheck } from 'react-icons/ai';
import { RiFilterFill } from 'react-icons/ri/index.js';

import {
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownButtonTrigger,
  DropdownContent,
} from '@daohaus/ui';
import { indigoDark } from '@radix-ui/colors';
import { PROPOSAL_FILTERS } from '../utils/constants';

const IconFilter = styled(RiFilterFill)`
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
  fill: ${indigoDark.indigo10};
  :hover {
    fill: ${indigoDark.indigo10};
  }
`;

type FilterDropdownProps = {
  filter: string;
  toggleFilter: (event: MouseEvent<HTMLButtonElement>) => void;
};

const FilterDropdown = ({ filter, toggleFilter }: FilterDropdownProps) => {
  return (
    <DropdownMenu>
      {/* !MARK Update Trigger to allow whatever to be passed */}
      <DropdownButtonTrigger color="secondary" IconLeft={IconFilter}>
        {filter ? `${PROPOSAL_FILTERS[filter]}` : 'Filter'}
      </DropdownButtonTrigger>
      <DropdownContent align="start">
        {Object.keys(PROPOSAL_FILTERS).map((filterKey) => {
          return (
            <DropdownItem asChild key={filterKey}>
              <Button
                color="secondary"
                justify="flex-start"
                fullWidth
                value={filterKey}
                onClick={toggleFilter}
                IconRight={filter === filterKey ? AiOutlineCheck : undefined}
                className={filter === filterKey ? 'selected' : ''}
              >
                {PROPOSAL_FILTERS[filterKey]}
              </Button>
            </DropdownItem>
          );
        })}
      </DropdownContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
