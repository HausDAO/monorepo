import React, { useMemo } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri/index.js';

import { generateExplorerLink } from '@daohaus/keychain-utils';
import { truncateAddress } from '@daohaus/utils';

import { MemberCardProps } from './MemberCard.types';

import { ParMd } from '../../atoms';

import {
  Dropdown,
  DropdownLink,
  DropdownText,
  DropdownMenuItem,
  ProfileAvatar,
} from '../../molecules';
import { MemberCardTrigger } from './MemberCard.styles';
import { useCopyToClipboard } from '../../../hooks';

export const MemberCard = ({
  className,
  profile,
  customProfileURI,
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
    <Dropdown
      className={className}
      align={'end'}
      trigger={
        <MemberCardTrigger
          // avatar
          variant="ghost"
          color="secondary"
          minWidth={minWidth}
          IconRight={RiArrowDropDownLine}
        >
          <ProfileAvatar address={profile.address} image={profile.image} />
          {(profile.name || profile.ens) && (
            <ParMd>{profile.name ? profile.name : profile.ens}</ParMd>
          )}
          {!profile.name && !profile.ens && (
            <ParMd>{truncateAddress(profile.address)}</ParMd>
          )}
        </MemberCardTrigger>
      }
    >
      <DropdownMenuItem>
        <DropdownLink href={`${customProfileURI || profile.address}`}>
          <ParMd>View Profile</ParMd>
        </DropdownLink>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <DropdownLink href={explorerLink} linkType="external">
          <ParMd>Block Explorer</ParMd>
        </DropdownLink>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <DropdownText onClick={handleCopy}>
          <ParMd>Copy Address</ParMd>
        </DropdownText>
      </DropdownMenuItem>
    </Dropdown>
  );
};
