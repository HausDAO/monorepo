import { useMemo } from 'react';
import { H3, H4, DataIndicator, ParSm } from '@daohaus/ui';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import {
  charLimit,
  formatPeriods,
  formatValueTo,
  fromWei,
  INFO_COPY,
  lowerCaseLootToken,
  toWholeUnits,
} from '@daohaus/utils';

import { getNetwork, ValidNetwork } from '@daohaus/keychain-utils';
import {
  DataGrid,
  GovernanceCardHeader,
  GovernanceContainer,
  StyledLink,
  TokenDataGrid,
  TokensHeader,
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
            Update DAO Settings
          </ButtonRouterLink>
        )}
      </GovernanceCardHeader>
      <div className="description">
        <ParSm>
          <StyledLink
            href="https://moloch.daohaus.fun/configuration/governance-configuration"
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
          data={formatValueTo({ value: dao.quorumPercent, format: 'percent' })}
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
      <TokensHeader>
        <H3 className="tokens">DAO Tokens</H3>
        {includeLinks && (
          <ButtonRouterLink
            color="secondary"
            to={`/molochv3/${daoChain}/${
              dao.id
            }/new-proposal?formLego=TOKEN_SETTINGS&defaultValues=${JSON.stringify(
              defaultValues
            )}`}
          >
            Update Token Settings
          </ButtonRouterLink>
        )}
      </TokensHeader>
      <H4>Voting</H4>
      <TokenDataGrid>
        <DataIndicator
          size="sm"
          label="Total"
          data={formatValueTo({
            value: fromWei(dao.totalShares),
            decimals: 2,
            format: 'number',
          })}
        />
        <DataIndicator size="sm" label="Symbol" data={dao.shareTokenSymbol} />
        <DataIndicator
          size="sm"
          label="Name"
          data={charLimit(dao.shareTokenName, 12)}
        />
        <DataIndicator
          size="sm"
          label="Transferability"
          data={dao.sharesPaused ? 'Off' : 'On'}
        />
      </TokenDataGrid>
      <H4>Non-Voting</H4>
      <TokenDataGrid>
        <DataIndicator
          size="sm"
          label="Total"
          data={formatValueTo({
            value: fromWei(dao.totalLoot),
            decimals: 2,
            format: 'number',
          })}
        />
        <DataIndicator size="sm" label="Symbol" data={dao.lootTokenSymbol} />
        <DataIndicator
          size="sm"
          label="Name"
          data={charLimit(lowerCaseLootToken(dao.lootTokenName), 12)}
        />
        <DataIndicator
          size="sm"
          label="Transferability"
          data={dao.lootPaused ? 'Off' : 'On'}
        />
      </TokenDataGrid>
    </GovernanceContainer>
  );
};
