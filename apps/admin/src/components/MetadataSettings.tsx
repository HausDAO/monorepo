import styled from 'styled-components';
import {
  H3,
  ParMd,
  ProfileAvatar,
  DataIndicator,
  Button,
  Link,
} from '@daohaus/ui';

import { TDao, useConnectedMembership } from '@daohaus/moloch-v3-context';
import { TagList } from '../components/TagList';
import { useParams } from 'react-router-dom';
import {
  charLimit,
  formatDateTimeFromSeconds,
  formatLongDateFromSeconds,
  formatShortDateTimeFromSeconds,
} from '@daohaus/utils';

const MetaCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

const MetaContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 3.4rem;
  .icon {
    margin-top: 1.2rem;
  }
  .section-middle {
    max-width: 37rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  .tags {
    margin-top: 2.9rem;
  }
  .contract {
    margin: 1.2rem 0;
  }
`;

const DaoProfileAvatar = styled(ProfileAvatar)`
  width: 8.9rem;
  height: 8.9rem;
`;

type MetadataSettingsProps = {
  dao: TDao;
};

export const MetadataSettings = ({ dao }: MetadataSettingsProps) => {
  const { daochain, daoid } = useParams();
  const { connectedMembership } = useConnectedMembership();

  return (
    <>
      <MetaCardHeader>
        <H3>Metadata</H3>
        {connectedMembership && Number(connectedMembership.shares) && (
          <Link href={`/molochv3/${daochain}/${daoid}/settings/update`}>
            <Button color="secondary">Update Settings</Button>
          </Link>
        )}
      </MetaCardHeader>
      <MetaContent>
        <div>
          <ParMd>Icon</ParMd>
          <div className="icon">
            <DaoProfileAvatar address={dao.id} image={dao.avatarImg} />
          </div>
        </div>
        <div className="section-middle">
          <DataIndicator
            label="DAO Name"
            data={charLimit(dao.name, 21)}
            size="sm"
          />
          <DataIndicator
            label="Summon Date"
            data={formatLongDateFromSeconds(dao.createdAt)}
            size="sm"
          />

          <DataIndicator label="Description" data={dao.description} size="sm" />
          {dao.tags && (
            <div className="tags">
              <TagList tags={dao.tags} />
            </div>
          )}
        </div>
      </MetaContent>
    </>
  );
};
