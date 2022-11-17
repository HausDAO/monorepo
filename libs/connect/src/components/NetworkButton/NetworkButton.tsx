import { BiError } from 'react-icons/bi';
import styled from 'styled-components';

import { Keychain, getNetworkName, NetworkType } from '@daohaus/keychain-utils';

import {
  Button,
  Dropdown,
  DropdownMenuItem,
  DropdownMenuLabel,
  ParXs,
  widthQuery,
} from '@daohaus/ui';

import { useHausConnect } from '../../HausConnectContext';

export const NetworkButton = ({ isSm }: { isSm: boolean }) => {
  const { chainId, validNetwork, isConnected, daoChainId } = useHausConnect();

  if (!isConnected) return null;

  if (daoChainId && daoChainId !== chainId) {
    return <NotDaoNetwork isSm={isSm} />;
  }

  if (!validNetwork) return <NotSupportedNetwork isSm={isSm} />;

  return null;
};

export const getNetworkPanels = (
  availableNetworks: Keychain<NetworkType>,
  switchNetwork: (id: string) => void
) =>
  Object.values(availableNetworks).map((network, i) => {
    const handleNetworkSwitch = () => {
      switchNetwork(network.chainId);
    };
    return (
      <DropdownMenuItem key={i} asChild>
        <WarningButton
          color="secondary"
          fullWidth
          justify="flex-start"
          onClick={handleNetworkSwitch}
        >
          {network.name}
        </WarningButton>
      </DropdownMenuItem>
    );
  });

export const NotDaoNetwork = ({ isSm }: { isSm: boolean }) => {
  const { switchNetwork, daoChainId } = useHausConnect();

  const handleSwitchNetwork = () => {
    switchNetwork(daoChainId as string);
  };

  return (
    <WarningButton
      color="secondary"
      variant="outline"
      IconLeft={BiError}
      onClick={handleSwitchNetwork}
      size={isSm ? 'sm' : 'md'}
    >
      {isSm && daoChainId
        ? ''
        : `Switch to ${getNetworkName(daoChainId as string)}`}
    </WarningButton>
  );
};

export const NotSupportedNetwork = ({ isSm }: { isSm: boolean }) => {
  const { switchNetwork, networks } = useHausConnect();

  const innerButton = isSm ? (
    <WarningButton
      color="primary"
      variant="outline"
      size="sm"
      IconLeft={BiError}
    />
  ) : (
    <WarningButton color="primary" variant="outline" IconLeft={BiError}>
      Network Unavailable
    </WarningButton>
  );

  return (
    <Dropdown
      align="end"
      spacing="0.7rem"
      menuMinWidth="25.25rem"
      trigger={innerButton}
    >
      <DropdownMenuLabel>
        <ParXs>Switch to available network</ParXs>
      </DropdownMenuLabel>
      {getNetworkPanels(networks, switchNetwork)}
    </Dropdown>
  );
};

const WarningButton = styled(Button)`
  @media ${widthQuery.sm} {
    &.sm {
      min-width: 0;
      display: flex;
      margin-left: 1rem;
    }
    svg.icon-left {
      margin-right: 0;
    }
  }
`;
