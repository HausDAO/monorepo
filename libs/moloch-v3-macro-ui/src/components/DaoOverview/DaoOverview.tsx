import { DataIndicator, H4, SingleColumnLayout } from '@daohaus/ui';
import {
  charLimit,
  formatValueTo,
  fromWei,
  lowerCaseLootToken,
} from '@daohaus/utils';
import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import { DaoProfile } from './DaoProfile';
import { DataGrid, OverviewCard, TokensCard } from './DaoOverview.styles';
import { useDaoData } from '@daohaus/moloch-v3-hooks';

type DaoOverviewProps = {
  daoChain: ValidNetwork;
  daoId: string;
  graphApiKeys?: Keychain;
};

export const DaoOverview = ({
  daoChain,
  daoId,
  graphApiKeys,
}: DaoOverviewProps) => {
  const { dao } = useDaoData({
    daoChain,
    daoId,
    graphApiKeys,
  });

  if (!dao) return null;

  return (
    <SingleColumnLayout>
      {dao && (
        <>
          <OverviewCard>
            <DaoProfile dao={dao} />
            <DataGrid>
              <DataIndicator
                label="Total in Safes"
                data={formatValueTo({
                  value: dao.fiatTotal,
                  decimals: 2,
                  format: 'currencyShort',
                })}
              />
              <DataIndicator label="Members" data={dao.activeMemberCount} />
              <DataIndicator label="Proposals" data={dao.proposalCount} />
              <DataIndicator
                label="Active Proposals"
                data={dao.activeProposals?.length || '0'}
              />
            </DataGrid>
          </OverviewCard>
          <TokensCard>
            <H4>Tokens</H4>
            <DataGrid>
              <DataIndicator
                label="Voting"
                data={charLimit(dao.shareTokenName, 20)}
              />
              <DataIndicator
                label="Supply"
                data={formatValueTo({
                  value: fromWei(dao.totalShares),
                  decimals: 2,
                  format: 'numberShort',
                })}
              />
            </DataGrid>
            <DataGrid>
              <DataIndicator
                label="Non-Voting"
                data={charLimit(lowerCaseLootToken(dao.lootTokenName), 20)}
              />
              <DataIndicator
                label="Supply"
                data={formatValueTo({
                  value: fromWei(dao.totalLoot),
                  decimals: 2,
                  format: 'numberShort',
                })}
              />
            </DataGrid>
          </TokensCard>
        </>
      )}
    </SingleColumnLayout>
  );
};

export default DaoOverview;
