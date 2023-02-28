import { ValidNetwork } from '@daohaus/keychain-utils';
import { MolochV3Member } from '@daohaus/moloch-v3-data';
import { useDaoData, useProfile } from '@daohaus/moloch-v3-hooks';
import { DataIndicator, ParLg, Spinner } from '@daohaus/ui';
import { formatValueTo, memberUsdValueShare } from '@daohaus/utils';

import {
  LoadingContainer,
  MProfileCard,
  ValueRow,
} from './MemberProfileCard.styles';
import { MemberProfile } from './MemberProfile';
import { MemberTokens } from './MemberTokens';

type MemberProfileCardProps = {
  daoChain: ValidNetwork;
  daoId: string;
  member: MolochV3Member;
};

export const MemberProfileCard = ({
  daoChain,
  daoId,
  member,
}: MemberProfileCardProps) => {
  const { dao, isFetched: isDaoFetched } = useDaoData({
    daoChain,
    daoId,
  });
  const { profile: currentProfile, isFetched: isProfileFetched } = useProfile({
    address: member?.memberAddress || '',
  });

  if (
    !member ||
    (!dao && isDaoFetched) ||
    (!currentProfile && isProfileFetched)
  )
    return <ParLg>Member Profile Not Found</ParLg>;

  return (
    <MProfileCard>
      {(!dao || !member || !currentProfile) && (
        <LoadingContainer>
          <Spinner size="12rem" />
        </LoadingContainer>
      )}
      {dao && member && currentProfile && (
        <>
          <MemberProfile
            daoChain={daoChain}
            dao={dao}
            profile={currentProfile}
            membership={member}
          />
          <ValueRow>
            <DataIndicator
              label="Total Exit Amount"
              data={formatValueTo({
                value: memberUsdValueShare(
                  dao?.fiatTotal || 0,
                  dao?.totalShares || 0,
                  dao?.totalLoot || 0,
                  member?.shares || 0,
                  member?.loot || 0
                ),
                decimals: 2,
                format: 'currency',
              })}
            />
          </ValueRow>
          <MemberTokens daoChain={daoChain} dao={dao} member={member} />
        </>
      )}
    </MProfileCard>
  );
};
