import styled from 'styled-components';
import {
  H3,
  ParMd,
  ProfileAvatar,
  DataIndicator,
  Button,
  Link,
  Card,
  Theme,
  Tooltip,
  AddressDisplay,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';

import { TDao, useConnectedMembership } from '@daohaus/moloch-v3-context';
import { TagList } from '../components/TagList';
import { useParams } from 'react-router-dom';
import { charLimit, formatLongDateFromSeconds, Keychain } from '@daohaus/utils';
import { daoProfileHasLinks } from '../utils/settingsHelper';

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
  .contract {
    margin: 1.2rem 0;
  }
`;

const DaoProfileAvatar = styled(ProfileAvatar)`
  width: 8.9rem;
  height: 8.9rem;
`;

const WarningContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${({ theme }: { theme: Theme }) => theme.warning.step3};
  border-color: ${({ theme }: { theme: Theme }) => theme.warning.step7};
  .title {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }
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
        <div>
          {daoProfileHasLinks(dao.links) && <ParMd>Links</ParMd>}
          {dao.txHash === '0x0' && (
            <WarningContainer>
              <div className="title">
                <ParMd>Forwarder Address</ParMd>
                <Tooltip content="Forwarder Address is the contract used to sign and send transactions without the original sender paying for gas." />
              </div>
              <AddressDisplay
                address={dao.sharesAddress}
                copy
                truncate={isMobile}
                explorerNetworkId={daochain as keyof Keychain}
              />
            </WarningContainer>
          )}
        </div>
      </MetaContent>
    </>
  );
};
