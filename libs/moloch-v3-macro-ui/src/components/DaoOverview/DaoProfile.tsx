import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { charLimit } from '@daohaus/utils';
import { Keychain } from '@daohaus/keychain-utils';

import { AddressDisplay, H4, ParMd, ParXs, Button, Link } from '@daohaus/ui';

import { TagList } from './TagList';
import {
  OverviewIconLinkList,
  OverviewLinkList,
} from '../Layout/MetadataLinkLists';
import { MolochV3Dao, DaoProfileLink } from '@daohaus/moloch-v3-data';
import {
  DaoProfileAvatar,
  DaoProfileContainer,
  MissingProfileCard,
  TagListContainer,
} from './DaoOverview.styles';

export const missingDaoProfileData = (dao: MolochV3Dao): boolean => {
  if (!dao?.profile || !dao.profile.length) return true;
  return dao.description === '' && dao.avatarImg === '';
};

export const daoProfileHasLinks = (
  links: MolochV3Dao['links']
): boolean | undefined => {
  return links?.some((link: DaoProfileLink) => link.url);
};

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
