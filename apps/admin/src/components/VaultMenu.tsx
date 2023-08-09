import { useMemo } from 'react';
import { RiMore2Fill } from 'react-icons/ri/index.js';
import { useParams, Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { useConnectedMember } from '@daohaus/moloch-v3-context';
import {
  DropdownMenu,
  DropdownItem,
  font,
  Button,
  DropdownIconTrigger,
  DropdownContent,
  DropdownLinkStyles,
} from '@daohaus/ui';
import { getNetwork } from '@daohaus/keychain-utils';

export const VaultMenuTrigger = styled(Button)`
  padding: 0 4px 0 4px;

  &[data-state='open'] {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  svg.icon-right {
    color: ${({ theme }) => theme.primary.step9};
  }

  svg.icon-left {
    margin-right: 0;
    margin: 5rem;
  }
`;

// !Mark I believe this is supposed to be a RouterLink, but I'm not 100% sure
export const VaultMenuLink = styled(RouterLink)`
  ${DropdownLinkStyles}
  font-weight: ${font.weight.bold};
`;

type VaultMenuProps = {
  ragequittable: boolean;
  safeAddress: string;
};

export const VaultMenu = ({ ragequittable, safeAddress }: VaultMenuProps) => {
  const { daoid, daochain } = useParams();
  const { connectedMember } = useConnectedMember();

  const enableActions = useMemo(() => {
    return (
      connectedMember && Number(connectedMember.sharesLootDelegateShares) > 0
    );
  }, [connectedMember]);

  const networkData = useMemo(() => {
    if (!daochain) return null;
    return getNetwork(daochain);
  }, [daochain]);

  if (!enableActions) return null;

  return (
    <DropdownMenu>
      <DropdownIconTrigger Icon={RiMore2Fill} size="sm" variant="ghost" />
      <DropdownContent>
        <>
          <DropdownItem key="erc20" asChild>
            <VaultMenuLink
              to={`/molochv3/${daochain}/${daoid}/new-proposal?formLego=${
                ragequittable
                  ? 'TRANSFER_ERC20'
                  : `TRANSFER_ERC20_SIDECAR&defaultValues={"safeAddress":"${safeAddress}"}`
              }`}
            >
              Transfer ERC-20
            </VaultMenuLink>
          </DropdownItem>
          <DropdownItem key="eth" asChild>
            <VaultMenuLink
              to={`/molochv3/${daochain}/${daoid}/new-proposal?formLego=${
                ragequittable
                  ? 'TRANSFER_NETWORK_TOKEN'
                  : `TRANSFER_NETWORK_TOKEN_SIDECAR&defaultValues={"safeAddress":"${safeAddress}"}`
              }`}
            >
              Transfer {networkData?.symbol}
            </VaultMenuLink>
          </DropdownItem>
          <DropdownItem key="txbuilder" asChild>
            <VaultMenuLink
              to={`/molochv3/${daochain}/${daoid}/new-proposal?formLego=${
                ragequittable
                  ? 'MULTICALL'
                  : `MULTICALL_SIDECAR&defaultValues={"safeAddress":"${safeAddress}"}`
              }`}
            >
              Tx Builder
            </VaultMenuLink>
          </DropdownItem>
        </>
      </DropdownContent>
    </DropdownMenu>
  );
};
