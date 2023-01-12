import { useMemo } from 'react';
import { RiMore2Fill } from 'react-icons/ri/index.js';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useConnectedMember } from '@daohaus/moloch-v3-context';
import {
  Dropdown,
  DropdownMenuItem,
  font,
  Theme,
  Dialog,
  DialogTrigger,
  DialogContent,
  DropdownLink,
  DropdownText,
  Button,
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
      <Dropdown
        menuMinWidth="17.8rem"
        trigger={
          <ProfileMenuTrigger
            IconLeft={RiMore2Fill}
            size="sm"
            variant="ghost"
          />
        }
        side="left"
      >
        {isMenuForConnectedMember && (
          <>
            <DropdownMenuItem key="delegate" asChild>
              <DialogTrigger asChild>
                <ProfileMenuText>Delegate</ProfileMenuText>
              </DialogTrigger>
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
              <DialogTrigger asChild>
                <ProfileMenuText className={enableActions ? '' : 'disabled'}>
                  Delegate To
                </ProfileMenuText>
              </DialogTrigger>
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
      <DialogContent title="Manage Delegate">
        <ManageDelegate
          defaultMember={!isMenuForConnectedMember ? memberAddress : undefined}
        />
      </DialogContent>
    </Dialog>
  );
};
