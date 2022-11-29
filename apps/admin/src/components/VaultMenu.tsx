import { useMemo } from 'react';
import { RiMore2Fill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { useConnectedMember } from '@daohaus/moloch-v3-context';
import {
  Dropdown,
  DropdownMenuItem,
  font,
  Theme,
  DropdownLink,
  Button,
} from '@daohaus/ui';
import { getNetwork } from '@daohaus/keychain-utils';

export const VaultMenuTrigger = styled(Button)`
  padding: 0 4px 0 4px;

  &[data-state='open'] {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  svg.icon-right {
    color: ${({ theme }: { theme: Theme }) => theme.primary.step9};
  }

  svg.icon-left {
    margin-right: 0;
  }
`;

export const VaultMenuLink = styled(DropdownLink)`
  font-weight: ${font.weight.bold};
`;

type VaultMenuProps = {
  ragequittable: boolean;
  safeAddress: string;
};

export const VaultMenu = ({ ragequittable, safeAddress }: VaultMenuProps) => {
  const { daoid, daochain } = useParams();
  const { connectedMember } = useConnectedMember();
  const theme = useTheme();

  const enableActions = useMemo(() => {
    return connectedMember && Number(connectedMember.shares) > 0;
  }, [connectedMember]);

  const networkData = useMemo(() => {
    if (!daochain) return null;
    return getNetwork(daochain);
  }, [daochain]);

  if (!enableActions) return null;

  return (
    <Dropdown
      menuMinWidth="17.8rem"
      trigger={
        <VaultMenuTrigger IconLeft={RiMore2Fill} size="sm" variant="ghost" />
      }
      side="left"
      menuBg={theme.secondary.step6}
    >
      <>
        <DropdownMenuItem key="erc20" asChild>
          <VaultMenuLink
            href={`/molochv3/${daochain}/${daoid}/new-proposal?formLego=${
              ragequittable
                ? 'TRANSFER_ERC20'
                : `TRANSFER_ERC20_SIDECAR&defaultValues={"safeAddress":"${safeAddress}"}`
            }`}
          >
            Transfer ERC-20
          </VaultMenuLink>
        </DropdownMenuItem>
        <DropdownMenuItem key="eth" asChild>
          <VaultMenuLink
            href={`/molochv3/${daochain}/${daoid}/new-proposal?formLego=${
              ragequittable
                ? 'TRANSFER_NETWORK_TOKEN'
                : `TRANSFER_NETWORK_TOKEN_SIDECAR&defaultValues={"safeAddress":"${safeAddress}"}`
            }`}
          >
            Transfer {networkData?.symbol}
          </VaultMenuLink>
        </DropdownMenuItem>
      </>
    </Dropdown>
  );
};
