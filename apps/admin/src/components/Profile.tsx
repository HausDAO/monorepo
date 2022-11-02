import styled from 'styled-components';
import { indigoDark } from '@radix-ui/colors';

import {
  breakpoints,
  H5,
  ParLg,
  ParMd,
  Avatar,
  DataXs,
  AddressDisplay,
  DataIndicator,
  widthQuery,
} from '@daohaus/ui';
import { AccountProfile } from '@daohaus/utils';
import {
  formatLongDateFromSeconds,
  formatValueTo,
  fromWei,
  votingPowerPercentage,
} from '@daohaus/utils';
import { TMembership, useDao } from '@daohaus/moloch-v3-context';

import { MemberProfileMenu } from './MemberProfileMenu';

const AvatarLarge = styled(Avatar)`
  height: 12rem;
  width: 12rem;
`;

const PContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background: ${indigoDark.indigo5};
  padding: 2.8rem;
  min-height: 30rem;
  border-radius: 0.8rem;
  border: 0.1rem solid ${indigoDark.indigo5};
`;

const PSubContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const ProfileNameContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProfileMetadataContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;

  @media (min-width: ${breakpoints.xs}) {
    flex-direction: row;
    align-items: center;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DataGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: space-between;
  div {
    padding: 2rem 0;
    width: 18rem;

    @media ${widthQuery.sm} {
      min-width: 100%;
    }
  }
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
  profile: AccountProfile;
  membership: TMembership;
};

export const Profile = ({ profile, membership }: ProfileProps) => {
  const { dao } = useDao();

  return (
    <PContainer>
      <PSubContainer>
        <ProfileMetadataContainer>
          <AvatarLarge
            src={profile?.image || ''}
            size="lg"
            alt="profile image"
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
          <MemberProfileMenu memberAddress={membership.memberAddress} />
        )}
      </PSubContainer>
      {membership && dao && (
        <DataGrid>
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
          {membership.delegatingTo !== membership.memberAddress && (
            <DataIndicatorContainer>
              <DataIndicatorLabelMd>Delegating To</DataIndicatorLabelMd>
              <AddressDisplay address={membership.delegatingTo} truncate />
            </DataIndicatorContainer>
          )}
        </DataGrid>
      )}
    </PContainer>
  );
};
