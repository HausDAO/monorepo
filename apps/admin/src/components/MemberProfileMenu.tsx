import { useMemo } from 'react';
import { RiMore2Fill } from 'react-icons/ri/index.js';
import { useParams, Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { useConnectedMember } from '@daohaus/moloch-v3-context';
import {
  font,
  Theme,
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DropdownMenu,
  DropdownIconTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLinkStyles,
  DropdownLabel,
} from '@daohaus/ui';

import ManageDelegate from './ManageDelegate';

export const ProfileMenuTrigger = styled(Button)`
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
    width: 5rem;
  }
`;

export const ProfileMenuLink = styled(RouterLink)`
  ${DropdownLinkStyles}
  font-weight: ${font.weight.bold};
`;

const ProfileMenuText = styled(DropdownLabel)`
  border-radius: 2px;
  color: ${(props) => props.theme.secondary.step12};
  font-weight: ${font.weight.bold};
  cursor: pointer;
  display: flex;
  padding: 1rem;
  transition: 0.2s all;
  width: 100%;
  font-size: ${font.size.md};

  svg {
    margin-left: 0.3rem;
  }

  :hover {
    background-color: ${(props) => props.theme.secondary.step4};
    border-color: ${(props) => props.theme.secondary.step8};
    text-decoration: none;
  }

  &.disabled {
    color: ${(props) => props.theme.secondary.step11};
  }
`;

type MemberProfileMenuProps = {
  memberAddress: string;
};

export const MemberProfileMenu = ({
  memberAddress,
}: MemberProfileMenuProps) => {
  const { daoid, daochain } = useParams();
  const { connectedMember } = useConnectedMember();

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

  if (!connectedMember) return null;

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
              <DropdownItem key="ragequit" asChild>
                <ProfileMenuLink
                  to={`/molochv3/${daochain}/${daoid}/members/ragequit`}
                >
                  Rage Quit
                </ProfileMenuLink>
              </DropdownItem>
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
              <DropdownItem key="guildkick" asChild>
                <ProfileMenuLink
                  className={enableActions ? '' : 'disabled'}
                  to={`/molochv3/${daochain}/${daoid}/new-proposal?formLego=GUILDKICK&defaultValues=${JSON.stringify(
                    {
                      memberAddress: memberAddress,
                    }
                  )}`}
                >
                  Guild Kick
                </ProfileMenuLink>
              </DropdownItem>
            </>
          )}
        </DropdownContent>
      </DropdownMenu>
      <DialogContent title="Manage Delegate">
        <ManageDelegate
          defaultMember={!isMenuForConnectedMember ? memberAddress : undefined}
        />
      </DialogContent>
    </Dialog>
  );
};
