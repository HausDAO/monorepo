import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AccountProfile } from '@daohaus/utils';
import { Keychain } from '@daohaus/keychain-utils';

import { MemberCard } from '@daohaus/ui';

import { fetchProfile } from '../utils/cacheProfile';

type MemberProfileProps = {
  memberAddress: string;
  daochain: keyof Keychain;
  daoid?: string;
};

const MemberContainer = styled.div`
  button {
    padding-left: 0 !important;
  }
`;

export const MemberProfileAvatar = ({
  memberAddress,
  daochain,
  daoid,
}: MemberProfileProps) => {
  const [memberProfile, setMemberProfile] = useState<AccountProfile>();
  const customProfileURI =
    daoid && daoid && `/molochv3/${daochain}/${daoid}/members/${memberAddress}`;

  const fetchMemberProfile = useCallback(
    async (address: string, setter: typeof setMemberProfile) => {
      const profile = await fetchProfile(address);
      setter(profile);
    },
    []
  );

  useEffect(() => {
    if (
      !memberProfile ||
      memberProfile.address.toLowerCase() !== memberAddress.toLowerCase()
    ) {
      fetchMemberProfile(memberAddress, setMemberProfile);
    }
  }, [fetchMemberProfile, memberAddress, memberProfile, setMemberProfile]);

  return (
    <MemberContainer>
      <MemberCard
        explorerNetworkId={daochain}
        profileUrl={customProfileURI}
        minWidth="4rem"
        profile={
          memberProfile || {
            address: memberAddress,
          }
        }
      />
    </MemberContainer>
  );
};
