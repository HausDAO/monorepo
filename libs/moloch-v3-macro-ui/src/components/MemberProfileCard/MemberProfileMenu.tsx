import { useMemo } from 'react';
import { RiMore2Fill } from 'react-icons/ri/index.js';

import { useDHConnect } from '@daohaus/connect';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { useConnectedMember } from '@daohaus/moloch-v3-hooks';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DropdownMenu,
  DropdownIconTrigger,
  DropdownContent,
  DropdownItem,
} from '@daohaus/ui';

import { ManageDelegate } from './ManageDelegate';
import { ProfileMenuLink, ProfileMenuText } from './MemberProfileCard.styles';

type MemberProfileMenuProps = {
  daoChain: ValidNetwork;
  daoId: string;
  memberAddress: string;
  allowLinks?: boolean;
};

export const MemberProfileMenu = ({
  daoChain,
  daoId,
  memberAddress,
  allowLinks = false,
}: MemberProfileMenuProps) => {
  const { address } = useDHConnect();
  const { connectedMember } = useConnectedMember({
    daoChain,
    daoId,
    memberAddress: address as string,
  });

  const enableActions = useMemo(() => {
    return (
      connectedMember &&
      connectedMember?.memberAddress !== memberAddress &&
      Number(connectedMember.shares) > 0
    );
  }, [connectedMember, memberAddress]);

  const isMenuForConnectedMember = useMemo(() => {
    return connectedMember?.memberAddress === memberAddress;
  }, [connectedMember, memberAddress]);

  if (!connectedMember || !allowLinks) return null;

  return (
    <Dialog>
      <DropdownMenu>
        {/* !Mark Trigger should be configurable, Allow for us to use Icon buttons for Mobile dropdowns */}
        <DropdownIconTrigger
          Icon={RiMore2Fill}
          color="primary"
          variant="ghost"
        />
        <DropdownContent side="left">
          {isMenuForConnectedMember && (
            <>
              <DropdownItem key="delegate" asChild>
                <DialogTrigger asChild>
                  <ProfileMenuText>Delegate</ProfileMenuText>
                </DialogTrigger>
              </DropdownItem>
              {allowLinks && (
                <DropdownItem key="ragequit" asChild>
                  <ProfileMenuLink
                    to={`/molochV3/${daoChain}/${daoId}/members/ragequit`}
                  >
                    Rage Quit
                  </ProfileMenuLink>
                </DropdownItem>
              )}
            </>
          )}

          {!isMenuForConnectedMember && (
            <>
              <DropdownItem key="delegateTo" asChild>
                <DialogTrigger asChild>
                  <ProfileMenuText className={enableActions ? '' : 'disabled'}>
                    Delegate To
                  </ProfileMenuText>
                </DialogTrigger>
              </DropdownItem>
              {allowLinks && (
                <DropdownItem key="guildkick" asChild>
                  <ProfileMenuLink
                    className={enableActions ? '' : 'disabled'}
                    to={`/molochV3/${daoChain}/${daoId}/new-proposal?formLego=GUILDKICK&defaultValues=${JSON.stringify(
                      {
                        memberAddress: memberAddress,
                      }
                    )}`}
                  >
                    Guild Kick
                  </ProfileMenuLink>
                </DropdownItem>
              )}
            </>
          )}
        </DropdownContent>
      </DropdownMenu>
      <DialogContent title="Manage Delegate">
        <ManageDelegate
          daoChain={daoChain}
          daoId={daoId}
          defaultMember={!isMenuForConnectedMember ? memberAddress : undefined}
        />
      </DialogContent>
    </Dialog>
  );
};
