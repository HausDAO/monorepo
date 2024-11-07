import {
  H3,
  ParMd,
  DataIndicator,
  Tooltip,
  AddressDisplay,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';

import {
  charLimit,
  farcastleChain,
  formatLongDateFromSeconds,
  ZERO_ADDRESS,
} from '@daohaus/utils';
import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';

import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import {
  DaoProfileAvatar,
  MetaCardHeader,
  MetaCardLinks,
  MetaContent,
  SettingsContainer,
  WarningContainer,
} from './DaoSettings.styles';
import { useDHConnect } from '@daohaus/connect';
import { useDaoMember } from '@daohaus/moloch-v3-hooks';
import { ButtonRouterLink, SettingsLinkList, TagList } from '../Layout';
import { daoProfileHasLinks } from '../../utils/daoDataDisplayHelpers';
import { useMemo } from 'react';
import { FarcastleButton } from './FarcastleButton';

type MetadataSettingsProps = {
  dao: MolochV3Dao;
  daoChain: ValidNetwork;
  includeLinks?: boolean;
};

export const MetadataSettings = ({
  dao,
  daoChain,
  includeLinks,
}: MetadataSettingsProps) => {
  const { address } = useDHConnect();
  const { member } = useDaoMember({
    daoId: dao.id,
    daoChain: daoChain as keyof Keychain,
    memberAddress: address,
  });

  const enableActions = useMemo(() => {
    return member && Number(member.shares) > 0;
  }, [member]);

  const isMobile = useBreakpoint(widthQuery.sm);

  return (
    <SettingsContainer>
      <MetaCardHeader>
        <H3>Metadata</H3>
        <MetaCardLinks>
          {includeLinks && enableActions && (
            <ButtonRouterLink
              color="secondary"
              to={`/molochv3/${daoChain}/${dao.id}/settings/update`}
            >
              Update Metadata
            </ButtonRouterLink>
          )}
          {farcastleChain(daoChain) && (
            <FarcastleButton daoId={dao.id} daoChain={daoChain} />
          )}
        </MetaCardLinks>
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
        <div className="links">
          {daoProfileHasLinks(dao.links) && (
            <SettingsLinkList links={dao.links} />
          )}
          {dao.forwarder !== ZERO_ADDRESS && (
            <WarningContainer>
              <div className="title">
                <ParMd>Forwarder Address</ParMd>
                <Tooltip content="Forwarder Address is the contract used to sign and send transactions without the original sender paying for gas." />
              </div>
              <AddressDisplay
                address={dao.sharesAddress}
                copy
                truncate={isMobile}
                explorerNetworkId={daoChain as keyof Keychain}
              />
            </WarningContainer>
          )}
        </div>
      </MetaContent>
    </SettingsContainer>
  );
};
