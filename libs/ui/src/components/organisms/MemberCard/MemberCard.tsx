import React, { useMemo } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri/index.js';

import { generateExplorerLink } from '@daohaus/keychain-utils';
import { truncateAddress } from '@daohaus/utils';

import { MemberCardProps } from './MemberCard.types';

import { ParMd } from '../../atoms';

import {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from '../../molecules/Dropdown';
import { MemberCardTrigger } from './MemberCard.styles';
import { useCopyToClipboard } from '../../../hooks';

const TestProfile = {
  name: 'DAO Guy',
  ens: 'daoguy.eth',
  address: '0xA8cadC2268B01395f8573682fb9DD00Bd582E8A0',
};

export const MemberCard = ({
  className,
  profile,
  profileUrl,
  explorerNetworkId,
  minWidth = '17.8rem',
}: MemberCardProps) => {
  const copy = useCopyToClipboard();

  const explorerLink = useMemo(() => {
    if (explorerNetworkId) {
      return generateExplorerLink({
        chainId: explorerNetworkId,
        address: profile.address,
        type: 'address',
      });
    }
  }, [profile, explorerNetworkId]);

  const handleCopy = () => {
    copy(profile.address, 'Success!');
  };

  return (
    <DropdownMenu>
      <DropdownTrigger profile={TestProfile}></DropdownTrigger>
      <DropdownContent align="end">
        <DropdownItem>Click Me</DropdownItem>
        <DropdownItem disabled>I'm Disabled</DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
};
