import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AccountProfile, Keychain } from '@daohaus/utils';
import { Haus } from '@daohaus/moloch-v3-data';
import { MemberCard } from '@daohaus/ui';

import { fetchProfile } from '../utils/cacheProfile';

type MemberProfileProps = {
  memberAddress: string;
  daochain: keyof Keychain;
};

const MemberContainer = styled.div`
  button {
    padding-left: 0 !important;
  }
`;

export const MemberProfileAvatar = ({
  memberAddress,
  daochain,
}: MemberProfileProps) => {
  const [submitterProfile, setSubmitterProfile] = useState<AccountProfile>();

  const haus = Haus.create();

  const fetchMemberProfile = useCallback(
    async (address: string, setter: typeof setSubmitterProfile) => {
      const profile = await fetchProfile({ haus, address });
      setter(profile);
    },
    [haus]
  );

  useEffect(() => {
    if (!submitterProfile) {
      fetchMemberProfile(memberAddress, setSubmitterProfile);
    }
  }, [
    fetchMemberProfile,
    memberAddress,
    submitterProfile,
    setSubmitterProfile,
  ]);

  return (
    <MemberContainer>
      <MemberCard
        explorerNetworkId={daochain}
        profile={
          submitterProfile || {
            address: memberAddress,
          }
        }
      />
    </MemberContainer>
  );
};
