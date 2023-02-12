import { BiError } from 'react-icons/bi/index.js';
import styled from 'styled-components';

import { Keychain, getNetworkName, NetworkType } from '@daohaus/keychain-utils';

import {
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  ParXs,
  widthQuery,
  DropdownContent,
  DropdownTrigger,
} from '@daohaus/ui';

import { useDHConnect } from '../../HausConnectContext';

export const NetworkButton = ({ isSm }: { isSm: boolean }) => {
  const { chainId, validNetwork, isConnected, daoChainId } = useDHConnect();

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
      <DropdownItem key={i} asChild>
        <WarningButton
          color="secondary"
          fullWidth
          justify="flex-start"
          onClick={handleNetworkSwitch}
        >
          {network.name}
        </WarningButton>
      </DropdownItem>
    );
  });

export const NotDaoNetwork = ({ isSm }: { isSm: boolean }) => {
  const { switchNetwork, daoChainId } = useDHConnect();

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
  const { switchNetwork, networks } = useDHConnect();

  // Mobile should be handled in the UI component
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
    <DropdownMenu>
      <DropdownTrigger color="primary" variant="outline" IconLeft={BiError}>
        {innerButton}
      </DropdownTrigger>
      <DropdownContent align="end">
        <DropdownLabel>
          <ParXs>Switch to available network</ParXs>
        </DropdownLabel>
        {getNetworkPanels(networks, switchNetwork)}
      </DropdownContent>
    </DropdownMenu>
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
