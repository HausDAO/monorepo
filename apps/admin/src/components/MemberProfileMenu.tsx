import { useMemo } from 'react';
import { RiMore2Fill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useConnectedMembership } from '@daohaus/moloch-v3-context';
import {
  Dropdown,
  DropdownMenuItem,
  DropdownButton,
  font,
  Theme,
  Dialog,
  DialogTrigger,
  DialogContent,
  DropdownLink,
  DropdownText,
} from '@daohaus/ui';

import ManageDelegate from './ManageDelegate';

export const ProfileMenuTrigger = styled(DropdownButton)`
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

export const ProfileMenuLink = styled(DropdownLink)`
  font-weight: ${font.weight.bold};
`;

const ProfileMenuText = styled(DropdownText)`
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
  const { connectedMembership } = useConnectedMembership();

  const enableActions = useMemo(() => {
    return (
      connectedMembership &&
      connectedMembership?.memberAddress !== memberAddress &&
      Number(connectedMembership.shares) > 0
    );
  }, [connectedMembership, memberAddress]);

  const isMenuForConnectedMember = useMemo(() => {
    return connectedMembership?.memberAddress === memberAddress;
  }, [connectedMembership, memberAddress]);

  return (
    <Dropdown
      menuMinWidth="17.8rem"
      trigger={<ProfileMenuTrigger IconLeft={RiMore2Fill} size="sm" />}
      side="left"
    >
      {isMenuForConnectedMember && (
        <>
          <DropdownMenuItem key="delegate" asChild>
            <Dialog>
              <DialogTrigger asChild>
                <ProfileMenuText>Delegate</ProfileMenuText>
              </DialogTrigger>
              <DialogContent title="Manage Delegate">
                <ManageDelegate />
              </DialogContent>
            </Dialog>
          </DropdownMenuItem>
          <DropdownMenuItem key="ragequit" asChild>
            <ProfileMenuLink
              href={`/molochv3/${daochain}/${daoid}/members/ragequit`}
            >
              Rage Quit
            </ProfileMenuLink>
          </DropdownMenuItem>
        </>
      )}

      {!isMenuForConnectedMember && (
        <>
          <DropdownMenuItem key="delegateTo" asChild>
            <Dialog>
              <DialogTrigger asChild>
                <ProfileMenuText className={enableActions ? '' : 'disabled'}>
                  Delegate To
                </ProfileMenuText>
              </DialogTrigger>
              <DialogContent title="Manage Delegate">
                <ManageDelegate defaultMember={memberAddress} />
              </DialogContent>
            </Dialog>
          </DropdownMenuItem>
          <DropdownMenuItem key="guildkick" asChild>
            <ProfileMenuLink
              className={enableActions ? '' : 'disabled'}
              href={`/molochv3/${daochain}/${daoid}/new-proposal?formLego=GUILDKICK&defaultValues=${JSON.stringify(
                {
                  memberAddress: memberAddress,
                }
              )}`}
            >
              Guild Kick
            </ProfileMenuLink>
          </DropdownMenuItem>
        </>
      )}
    </Dropdown>
  );
};
