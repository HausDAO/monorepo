import styled from 'styled-components';
import {
  H3,
  ParMd,
  ProfileAvatar,
  DataIndicator,
  AddressDisplay,
  ParSm,
  Button,
  Link,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';

import { TDao, useConnectedMembership } from '@daohaus/dao-context';
import { TagList } from '../components/TagList';
import { useParams } from 'react-router-dom';
import { charLimit, Keychain } from '@daohaus/common-utilities';

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
  const isMobile = useBreakpoint(widthQuery.sm);

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
          <div className="tags">
            <DataIndicator
              label="Description"
              data={dao.description}
              size="sm"
            />
          </div>
          {dao.tags && (
            <div className="tags">
              <TagList tags={dao.tags} />
            </div>
          )}
        </div>
        <div>
          <ParMd>DAO Contracts</ParMd>
          <div className="contract">
            <ParSm>Moloch v3</ParSm>
            <AddressDisplay
              address={dao.id}
              copy
              explorerNetworkId={daochain as keyof Keychain}
              truncate={isMobile}
            />
          </div>
          <div className="contract">
            <ParSm>Gnosis Safe (Treasury)</ParSm>
            <AddressDisplay
              address={dao.safeAddress}
              copy
              truncate={isMobile}
              explorerNetworkId={daochain as keyof Keychain}
            />
          </div>
          <div className="contract">
            <ParSm>Voting Token</ParSm>
            <AddressDisplay
              address={dao.sharesAddress}
              copy
              truncate={isMobile}
              explorerNetworkId={daochain as keyof Keychain}
            />
          </div>
          <div className="contract">
            <ParSm>Non-Voting Token</ParSm>
            <AddressDisplay
              address={dao.lootAddress}
              copy
              truncate={isMobile}
              explorerNetworkId={daochain as keyof Keychain}
            />
          </div>
        </div>
      </MetaContent>
    </>
  );
};
