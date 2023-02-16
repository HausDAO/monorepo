import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { charLimit } from '@daohaus/utils';
import { Keychain } from '@daohaus/keychain-utils';

import { AddressDisplay, H4, ParMd, ParXs, Button, Link } from '@daohaus/ui';

import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import {
  DaoProfileAvatar,
  DaoProfileContainer,
  MissingProfileCard,
  TagListContainer,
} from './DaoOverview.styles';
import {
  daoProfileHasLinks,
  missingDaoProfileData,
} from '../../utils/daoDataDisplayHelpers';
import { OverviewIconLinkList, OverviewLinkList, TagList } from '../Layout';

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
