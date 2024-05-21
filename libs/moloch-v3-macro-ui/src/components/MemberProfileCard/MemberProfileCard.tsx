import { ValidNetwork } from '@daohaus/keychain-utils';
import { MolochV3Member } from '@daohaus/moloch-v3-data';
import { useDaoData, useProfile } from '@daohaus/moloch-v3-hooks';
import {
  ParLg,
  Loading,
} from '@daohaus/ui';

import {
  AlertContainer,
  LoadingContainer,
  MProfileCard,
} from './MemberProfileCard.styles';
import { MemberProfile } from './MemberProfile';
import { MemberTokens } from './MemberTokens';

type MemberProfileCardProps = {
  daoChain: ValidNetwork;
  daoId: string;
  member: MolochV3Member;
  allowLinks?: boolean;
  allowMemberMenu?: boolean;
};

export const MemberProfileCard = ({
  daoChain,
  daoId,
  member,
  allowLinks = false,
  allowMemberMenu = false,
}: MemberProfileCardProps) => {
  const { dao, isLoading: isLoadingDao } = useDaoData({
    daoChain,
    daoId,
  });
  const { profile: currentProfile, isLoading: isLoadingProfile } = useProfile({
    address: member?.memberAddress || '',
  });

  if (
    !member ||
    (!dao && !isLoadingDao) ||
    (!currentProfile && !isLoadingProfile)
  )
    return (
      <AlertContainer>
        <ParLg className="warn">Member Profile Not Found</ParLg>
      </AlertContainer>
    );

  return (
    <MProfileCard>
      {(!dao || !member || !currentProfile) && (
        <LoadingContainer>
          <Loading size={120} />
        </LoadingContainer>
      )}
      {dao && member && currentProfile && (
        <>
          <MemberProfile
            daoChain={daoChain}
            dao={dao}
            profile={currentProfile}
            membership={member}
            allowLinks={allowLinks}
            allowMemberMenu={allowMemberMenu}
          />
          <MemberTokens daoChain={daoChain} dao={dao} member={member} />
        </>
      )}
    </MProfileCard>
  );
};
