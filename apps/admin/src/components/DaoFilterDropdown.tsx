import {
  Button,
  DropdownMenu,
  DropdownContent,
  DropdownLabel,
  DropdownItem,
  ParSm,
  DropdownButtonTrigger,
} from '@daohaus/ui';
import { MouseEvent, useMemo } from 'react';
import { RiCheckLine, RiFilterFill } from 'react-icons/ri/index.js';
import styled from 'styled-components';
import { FILTER_TYPE } from '../utils/hub';
import { useDHConnect } from '@daohaus/connect';

// HOW CAN THIS BE GENERALIZED?

type DAOFilterDropdownProps = {
  filterNetworks: string[];
  toggleNetworkFilter: (event: MouseEvent<HTMLButtonElement>) => void;
  filterDelegate: string;
  toggleDelegateFilter: (event: MouseEvent<HTMLButtonElement>) => void;
};

const IconFilter = styled(RiFilterFill)`
  height: 1.8rem;
  width: 1.8rem;
  display: flex;
  fill: ${({ theme }) => theme.secondary.step10};

  &:hover {
    fill: ${({ theme }) => theme.secondary.step10};
  }
`;

export const DAOFilterDropdown = ({
  filterNetworks,
  toggleNetworkFilter,
  filterDelegate,
  toggleDelegateFilter,
}: DAOFilterDropdownProps) => {
  const { networks } = useDHConnect();
  const networkButtons = useMemo(() => {
    return Object.values(networks).map((network) => {
      const isActive = filterNetworks.includes(network.chainId);

      return (
        <DropdownItem key={network.chainId} asChild>
          <Button
            value={network.chainId}
            onClick={toggleNetworkFilter}
            className={isActive ? 'selected' : ''}
            color="secondary"
            justify="flex-start"
            fullWidth
            IconRight={isActive ? RiCheckLine : undefined}
          >
            <div style={{ width: '100%' }}>{network.name}</div>
          </Button>
        </DropdownItem>
      );
    });
  }, [networks, toggleNetworkFilter, filterNetworks]);

  return (
    <DropdownMenu>
      {/* !MARK Update Trigger to allow whatever */}
      <DropdownButtonTrigger color="secondary" IconLeft={IconFilter}>
        Filters
      </DropdownButtonTrigger>
      <DropdownContent align="end">
        <DropdownLabel>
          <ParSm>Networks</ParSm>
        </DropdownLabel>
        {networkButtons}
        <DropdownLabel>
          <ParSm>Delegation</ParSm>
        </DropdownLabel>
        {/* !Mark These should be Dropdown Checkboxes I believe but just getting it working first */}
        <DropdownItem asChild>
          <Button
            color="secondary"
            justify="flex-start"
            fullWidth
            value={FILTER_TYPE.DELEGATING}
            onClick={toggleDelegateFilter}
            IconRight={
              filterDelegate === FILTER_TYPE.DELEGATING
                ? RiCheckLine
                : undefined
            }
            className={
              filterDelegate === FILTER_TYPE.DELEGATING ? 'selected' : ''
            }
          >
            <div style={{ width: '100%' }}>I am a Delegate</div>
          </Button>
        </DropdownItem>
        <DropdownItem asChild>
          <Button
            color="secondary"
            justify="flex-start"
            fullWidth
            value={FILTER_TYPE.DELEGATING_TO}
            onClick={toggleDelegateFilter}
            IconRight={
              filterDelegate === FILTER_TYPE.DELEGATING_TO
                ? RiCheckLine
                : undefined
            }
            className={
              filterDelegate === FILTER_TYPE.DELEGATING_TO ? 'selected' : ''
            }
          >
            <div style={{ width: '100%' }}>I have a Delegate</div>
          </Button>
        </DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
};
