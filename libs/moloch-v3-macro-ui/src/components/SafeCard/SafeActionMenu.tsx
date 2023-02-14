import { useMemo } from 'react';
import { RiMore2Fill } from 'react-icons/ri/index.js';
import { useTheme } from 'styled-components';
import { useConnectedMember } from '@daohaus/moloch-v3-context';
import { Dropdown, DropdownMenuItem } from '@daohaus/ui';
import { getNetwork } from '@daohaus/keychain-utils';
import { SafeActionMenuLink, SafeActionMenuTrigger } from './SafeCard.styles';
import { useDaoMember } from '@daohaus/moloch-v3-hooks';

type SafeActionMenuProps = {
  ragequittable: boolean;
  safeAddress: string;
  daoChain: string;
  daoId: string;
};

export const SafeActionMenu = ({
  ragequittable,
  safeAddress,
  daoChain,
  daoId,
}: SafeActionMenuProps) => {
  // const { member } = useDaoMember({
  //   daoChain,
  //   daoId,
  //   memberAddress:
  // });
  const theme = useTheme();

  // const enableActions = useMemo(() => {
  //   return connectedMember && Number(connectedMember.shares) > 0;
  // }, [connectedMember]);

  const networkData = useMemo(() => {
    if (!daoChain) return null;
    return getNetwork(daoChain);
  }, [daoChain]);

  // if (!enableActions) return null;

  return (
    <Dropdown
      menuMinWidth="17.8rem"
      trigger={
        <SafeActionMenuTrigger
          IconRight={RiMore2Fill}
          size="sm"
          variant="ghost"
        />
      }
      side="left"
      menuBg={theme.secondary.step6}
    >
      <>
        <DropdownMenuItem key="erc20" asChild>
          <SafeActionMenuLink
            href={`/molochv3/${daoChain}/${daoId}/new-proposal?formLego=${
              ragequittable
                ? 'TRANSFER_ERC20'
                : `TRANSFER_ERC20_SIDECAR&defaultValues={"safeAddress":"${safeAddress}"}`
            }`}
          >
            Transfer ERC-20
          </SafeActionMenuLink>
        </DropdownMenuItem>
        <DropdownMenuItem key="eth" asChild>
          <SafeActionMenuLink
            href={`/molochv3/${daoChain}/${daoId}/new-proposal?formLego=${
              ragequittable
                ? 'TRANSFER_NETWORK_TOKEN'
                : `TRANSFER_NETWORK_TOKEN_SIDECAR&defaultValues={"safeAddress":"${safeAddress}"}`
            }`}
          >
            Transfer {networkData?.symbol}
          </SafeActionMenuLink>
        </DropdownMenuItem>
        <DropdownMenuItem key="txbuilder" asChild>
          <SafeActionMenuLink
            href={`/molochv3/${daoChain}/${daoId}/new-proposal?formLego=${
              ragequittable
                ? 'MULTICALL'
                : `MULTICALL_SIDECAR&defaultValues={"safeAddress":"${safeAddress}"}`
            }`}
          >
            Tx Builder
          </SafeActionMenuLink>
        </DropdownMenuItem>
      </>
    </Dropdown>
  );
};
