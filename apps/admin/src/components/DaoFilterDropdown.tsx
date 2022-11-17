import {
  Button,
  Dropdown,
  DropdownButton,
  DropdownMenuItem,
  DropdownMenuLabel,
  ParSm,
  Theme,
} from '@daohaus/ui';
import { MouseEvent, useMemo } from 'react';
import { RiCheckLine, RiFilterFill } from 'react-icons/ri';
import styled, { useTheme } from 'styled-components';
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
  fill: ${({ theme }: { theme: Theme }) => theme.secondary.step10};

  :hover {
    fill: ${({ theme }: { theme: Theme }) => theme.secondary.step10};
  }
`;

export const DAOFilterDropdown = ({
  filterNetworks,
  toggleNetworkFilter,
  filterDelegate,
  toggleDelegateFilter,
}: DAOFilterDropdownProps) => {
  const theme = useTheme();
  const { networks } = useDHConnect();
  const networkButtons = useMemo(() => {
    return Object.values(networks).map((network) => {
      const isActive = filterNetworks.includes(network.chainId);

      return (
        <DropdownMenuItem key={network.chainId} asChild>
          <DropdownButton
            value={network.chainId}
            onClick={toggleNetworkFilter}
            className={isActive ? 'selected' : ''}
            color="secondary"
            justify="flex-start"
            fullWidth
            IconRight={isActive ? RiCheckLine : undefined}
          >
            <div style={{ width: '100%' }}>{network.name}</div>
          </DropdownButton>
        </DropdownMenuItem>
      );
    });
  }, [networks, toggleNetworkFilter, filterNetworks]);

  return (
    <Dropdown
      align="end"
      menuBg={theme.secondary.step6}
      menuMinWidth="25rem"
      spacing=".6rem"
      trigger={
        <Button color="secondary" IconLeft={IconFilter}>
          Filters
        </Button>
      }
    >
      <DropdownMenuLabel>
        <ParSm>Networks</ParSm>
      </DropdownMenuLabel>
      {networkButtons}
      <DropdownMenuLabel>
        <ParSm>Delegation</ParSm>
      </DropdownMenuLabel>
      <DropdownMenuItem asChild>
        <DropdownButton
          color="secondary"
          justify="flex-start"
          fullWidth
          value={FILTER_TYPE.DELEGATING}
          onClick={toggleDelegateFilter}
          IconRight={
            filterDelegate === FILTER_TYPE.DELEGATING ? RiCheckLine : undefined
          }
          className={
            filterDelegate === FILTER_TYPE.DELEGATING ? 'selected' : ''
          }
        >
          <div style={{ width: '100%' }}>I am a Delegate</div>
        </DropdownButton>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <DropdownButton
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
        </DropdownButton>
      </DropdownMenuItem>
    </Dropdown>
  );
};
