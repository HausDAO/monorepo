import { useMemo } from 'react';
import { H3, H4, DataIndicator } from '@daohaus/ui';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import {
  charLimit,
  formatValueTo,
  fromWei,
  lowerCaseLootToken,
  toWholeUnits,
} from '@daohaus/utils';

import { ValidNetwork } from '@daohaus/keychain-utils';
import {
  GovernanceContainer,
  SettingsContainer,
  TokenDataGrid,
  TokensHeader,
} from './DaoSettings.styles';
import { ButtonRouterLink } from '../Layout';

type TokenSettingsProps = {
  dao: MolochV3Dao;
  daoChain: ValidNetwork;
  includeLinks?: boolean;
};

export const TokenSettings = ({
  dao,
  daoChain,
  includeLinks = false,
}: TokenSettingsProps) => {
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
              Update Tokens
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
    </SettingsContainer>
  );
};
