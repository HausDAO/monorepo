import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { charLimit } from '@daohaus/utils';
import { Keychain } from '@daohaus/keychain-utils';

import {
  AddressDisplay,
  border,
  H4,
  ProfileAvatar,
  Theme,
  widthQuery,
  ParMd,
  Card,
  ParXs,
  Button,
  Link,
} from '@daohaus/ui';

import { TagList } from './TagList';
import { missingDaoProfileData } from '../utils/general';
import { daoProfileHasLinks } from '../utils/settingsHelper';
import { OverviewIconLinkList, OverviewLinkList } from './MetadataLinkLists';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';

const DaoProfileContainer = styled.div`
  width: 100%;
  border-radius: ${border.radius};
  border: 1px ${({ theme }: { theme: Theme }) => theme.secondary.step5} solid;
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step3};
  padding: 2.2rem;
  .avatar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.7rem;
    margin-bottom: 2.7rem;
    p {
      margin-right: auto;
    }
    @media ${widthQuery.xs} {
      flex-direction: column;
    }
  }
`;

const DaoProfileAvatar = styled(ProfileAvatar)`
  width: 18rem;
  height: 18rem;
`;

const MissingProfileCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.3rem;
`;

const TagListContainer = styled.div`
  margin-top: 2.8rem;
`;

type DaoProfileProps = {
  dao: MolochV3Dao;
};

export const DaoProfile = ({ dao }: DaoProfileProps) => {
  const { daochain, daoid } = useParams();

  const missingProfile = useMemo(() => {
    if (!missingDaoProfileData(dao)) return null;
    return (
      <MissingProfileCard>
        <ParXs>
          (ﾉ´ヮ`)ﾉ*: ･ﾟ Add some sparkle with a DAO avatar and description!
        </ParXs>
        <Link href={`/molochv3/${daochain}/${daoid}/settings`}>
          <Button>Go To Settings</Button>
        </Link>
      </MissingProfileCard>
    );
  }, [dao, daochain, daoid]);

  return (
    <DaoProfileContainer>
      <div className="avatar">
        <DaoProfileAvatar address={dao.id} image={dao.avatarImg} />
        <div>
          <H4>{charLimit(dao.name, 21)}</H4>
          <AddressDisplay
            address={dao.id}
            truncate
            copy
            explorerNetworkId={daochain as keyof Keychain}
          />
        </div>
      </div>

      {missingProfile || (
        <>
          <ParMd>{dao.description}</ParMd>

          {daoProfileHasLinks(dao.links) && (
            <>
              <OverviewLinkList links={dao.links} />
              <OverviewIconLinkList links={dao.links} />
            </>
          )}
          <TagListContainer>
            {dao.tags && <TagList tags={dao.tags} />}
          </TagListContainer>
        </>
      )}
    </DaoProfileContainer>
  );
};
