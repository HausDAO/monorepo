import styled from 'styled-components';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { MolochV3Dao, MolochV3Member } from '@daohaus/moloch-v3-data';
import {
  H5,
  ParLg,
  DataXs,
  AddressDisplay,
  DataIndicator,
  ParMd,
} from '@daohaus/ui';
import {
  AccountProfile,
  formatLongDateFromSeconds,
  formatValueTo,
  fromWei,
  votingPowerPercentage,
} from '@daohaus/utils';

import { MemberProfileMenu } from './MemberProfileMenu';
import { MemberProfileAvatar } from './MemberProfileAvatar';

import {
  AvatarLarge,
  ProfileContainer,
  ProfileDataGrid,
  ProfileMetadataContainer,
  ProfileNameContainer,
  PSubContainer,
} from './MemberProfileCard.styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DataIndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DataIndicatorLabelMd = styled(ParMd)`
  margin-bottom: 0.5rem;
  opacity: 0.9;
`;

type ProfileProps = {
  daoChain: ValidNetwork;
  dao: MolochV3Dao;
  profile: AccountProfile;
  membership: MolochV3Member;
  allowLinks?: boolean;
};

export const MemberProfile = ({
  daoChain,
  dao,
  profile,
  membership,
  allowLinks = false,
}: ProfileProps) => {
  return (
    <ProfileContainer>
      <PSubContainer>
        <ProfileMetadataContainer>
          <AvatarLarge
            image={profile?.image || ''}
            size="lg"
            alt="profile image"
            address={profile.address}
          />
          <Container>
            <ProfileNameContainer>
              {profile?.name && <H5>{profile?.name || ''}</H5>}
              {profile?.emoji && (
                <ParLg as="span" role="img" aria-label="profile emoji">
                  {profile?.emoji || ''}
                </ParLg>
              )}
            </ProfileNameContainer>
            {membership && (
              <AddressDisplay
                address={membership.memberAddress}
                truncate
                textOverride={profile?.ens}
                copy
              />
            )}
            {membership && (
              <DataXs as="span">
                Joined {formatLongDateFromSeconds(membership?.createdAt)}
              </DataXs>
            )}
          </Container>
        </ProfileMetadataContainer>
        {membership && (
          <MemberProfileMenu
            daoChain={daoChain}
            daoId={dao.id}
            memberAddress={membership.memberAddress}
            allowLinks={allowLinks}
          />
        )}
      </PSubContainer>
      {membership && dao && (
        <>
          <ProfileDataGrid>
            <DataIndicator
              label="Power"
              data={formatValueTo({
                value: votingPowerPercentage(
                  dao?.totalShares || '0',
                  membership.delegateShares
                ),
                decimals: 2,
                format: 'percent',
              })}
            />
            <DataIndicator
              label="Voting Tokens"
              data={formatValueTo({
                value: fromWei(membership.shares),
                decimals: 2,
                format: 'number',
              })}
            />
            <DataIndicator
              label="Non-Voting Tokens"
              data={formatValueTo({
                value: fromWei(membership.loot),
                decimals: 2,
                format: 'number',
              })}
            />
          </ProfileDataGrid>
          {membership.delegatingTo !== membership.memberAddress && (
            <DataIndicatorContainer>
              <DataIndicatorLabelMd>Delegating To</DataIndicatorLabelMd>
              <MemberProfileAvatar
                daoChain={daoChain}
                daoId={dao.id}
                memberAddress={membership.delegatingTo}
                allowLinks={allowLinks}
              />
            </DataIndicatorContainer>
          )}
        </>
      )}
    </ProfileContainer>
  );
};
