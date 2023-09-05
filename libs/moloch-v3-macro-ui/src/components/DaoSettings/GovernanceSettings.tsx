import { useMemo } from 'react';
import { H3, DataIndicator, ParSm } from '@daohaus/ui';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import {
  formatPeriods,
  formatValueTo,
  fromWei,
  INFO_COPY,
  toWholeUnits,
} from '@daohaus/utils';

import { getNetwork, ValidNetwork } from '@daohaus/keychain-utils';
import {
  DataGrid,
  GovernanceCardHeader,
  GovernanceContainer,
  SettingsContainer,
  StyledLink,
} from './DaoSettings.styles';
import { ButtonRouterLink } from '../Layout';

type GovernanceSettingsProps = {
  dao: MolochV3Dao;
  daoChain: ValidNetwork;
  includeLinks?: boolean;
};

export const GovernanceSettings = ({
  dao,
  daoChain,
  includeLinks = false,
}: GovernanceSettingsProps) => {
  const networkData = useMemo(() => {
    if (!daoChain) return null;
    return getNetwork(daoChain);
  }, [daoChain]);

  const defaultValues = useMemo(() => {
    if (!dao) return null;
    return {
      votingPeriod: dao.votingPeriod,
      votingPeriodUnits: 'seconds',
      gracePeriodUnits: 'seconds',
      gracePeriod: dao.gracePeriod,
      quorum: dao.quorumPercent,
      minRetention: dao.minRetentionPercent,
      sponsorThreshold: toWholeUnits(dao.sponsorThreshold),
      newOffering: toWholeUnits(dao.proposalOffering),
      vStake: dao.sharesPaused,
      nvStake: dao.lootPaused,
    };
  }, [dao]);

  return (
    <SettingsContainer>
      <GovernanceContainer>
        <GovernanceCardHeader>
          <H3>Governance Settings</H3>
          {includeLinks && (
            <ButtonRouterLink
              color="secondary"
              to={`/molochv3/${daoChain}/${
                dao.id
              }/new-proposal?formLego=UPDATE_GOV_SETTINGS&defaultValues=${JSON.stringify(
                defaultValues
              )}`}
            >
              Update Governance
            </ButtonRouterLink>
          )}
        </GovernanceCardHeader>
        <div className="description">
          <ParSm>
            <StyledLink
              href="https://moloch.daohaus.club/configuration/governance-configuration"
              target="_blank"
              rel="noreferrer"
            >
              Review the documenation
            </StyledLink>{' '}
            for additional details on governance settings. Updates to settings
            will go through a proposal.
          </ParSm>
        </div>
        <DataGrid>
          <DataIndicator
            size="sm"
            label="Voting Period"
            data={formatPeriods(dao.votingPeriod)}
            info={INFO_COPY.VOTING_PERIOD}
          />
          <DataIndicator
            size="sm"
            label="Grace Period"
            data={formatPeriods(dao.gracePeriod)}
            info={INFO_COPY.GRACE_PERIOD}
          />
          <DataIndicator
            size="sm"
            label="New Offering"
            data={`${fromWei(dao.proposalOffering)} ${networkData?.symbol}`}
            info={INFO_COPY.NEW_OFFERING}
          />
        </DataGrid>
        <DataGrid>
          <DataIndicator
            size="sm"
            label="Quorum %"
            data={formatValueTo({
              value: dao.quorumPercent,
              format: 'percent',
            })}
            info={INFO_COPY.QUORUM}
          />
          <DataIndicator
            size="sm"
            label="Min Retention %"
            data={formatValueTo({
              value: dao.minRetentionPercent,
              format: 'percent',
            })}
            info={INFO_COPY.MIN_RETENTION}
          />
          <DataIndicator
            size="sm"
            label="Sponsor Threshold"
            data={`${fromWei(dao.sponsorThreshold)} Voting Tokens`}
            info={INFO_COPY.SPONSOR_THRESHOLD}
          />
        </DataGrid>
      </GovernanceContainer>
    </SettingsContainer>
  );
};
