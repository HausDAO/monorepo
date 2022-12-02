import { MouseEvent } from 'react';
import styled, { useTheme } from 'styled-components';
import { AiOutlineCheck } from 'react-icons/ai';
import { RiFilterFill } from 'react-icons/ri/index.js';

import { Button, Dropdown, DropdownMenuItem, Theme } from '@daohaus/ui';
import { indigoDark } from '@radix-ui/colors';
import { PROPOSAL_FILTERS } from '../utils/constants';

const DropdownButton = styled(Button)`
  &.selected {
    background-color: ${(props: { theme: Theme }) =>
      props.theme.secondary.step9};
  }
`;

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
  const theme = useTheme();

  return (
    <Dropdown
      align="start"
      menuBg={theme.secondary.step6}
      menuMinWidth="25rem"
      spacing=".6rem"
      trigger={
        <Button color="secondary" IconLeft={IconFilter}>
          {filter ? `${PROPOSAL_FILTERS[filter]}` : 'Filter'}
        </Button>
      }
    >
      {Object.keys(PROPOSAL_FILTERS).map((filterKey) => {
        return (
          <DropdownMenuItem asChild key={filterKey}>
            <DropdownButton
              color="secondary"
              justify="flex-start"
              fullWidth
              value={filterKey}
              onClick={toggleFilter}
              IconRight={filter === filterKey ? AiOutlineCheck : undefined}
              className={filter === filterKey ? 'selected' : ''}
            >
              {PROPOSAL_FILTERS[filterKey]}
            </DropdownButton>
          </DropdownMenuItem>
        );
      })}
    </Dropdown>
  );
};

export default FilterDropdown;
