import React, { PropsWithChildren, useMemo } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri/index.js';

import { generateExplorerLink } from '@daohaus/keychain-utils';
import { truncateAddress } from '@daohaus/utils';

import {
  MemberCardProps,
  MemberCardExplorerLinkProps,
} from './MemberCard.types';

import { ParMd } from '../../atoms';

import {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLink,
} from '../../molecules/Dropdown';
import { MemberCardTrigger } from './MemberCard.styles';
import { useCopyToClipboard } from '../../../hooks';

const TestProfile = {
  name: 'DAO Guy',
  ens: 'daoguy.eth',
  address: '0xA8cadC2268B01395f8573682fb9DD00Bd582E8A0',
};

export const MemberCard = ({
  align = 'end',
  color,
  children,
}: PropsWithChildren<MemberCardProps>) => {
  return (
    <DropdownMenu>
      <DropdownTrigger color={color} profile={TestProfile}></DropdownTrigger>
      <DropdownContent color={color} align={align}>
        {children}
      </DropdownContent>
    </DropdownMenu>
  );
};

export const MemberCardExplorerLink = ({
  explorerNetworkId,
  profileAddress,
  children,
}: PropsWithChildren<MemberCardExplorerLinkProps>) => {
  const explorerLink = useMemo(() => {
    if (explorerNetworkId) {
      return generateExplorerLink({
        chainId: explorerNetworkId,
        address: profileAddress,
        type: 'address',
      });
    }
  }, [profileAddress, explorerNetworkId]);
  return (
    <DropdownItem asChild>
      <DropdownLink href={explorerLink}>{children}</DropdownLink>
    </DropdownItem>
  );
};

export const MemberCardCopyAddress = ({
  profileAddress,
  children,
}: PropsWithChildren<{ profileAddress: string }>) => {
  const copy = useCopyToClipboard();

  const handleCopy = () => {
    copy(profileAddress, 'Success!');
  };
  return <DropdownItem onClick={handleCopy}>{children}</DropdownItem>;
};
