import styled from 'styled-components';

import {
  Card,
  DataIndicator,
  H4,
  SingleColumnLayout,
  widthQuery,
} from '@daohaus/ui';
import { useDao } from '@daohaus/moloch-v3-context';
import { DaoProfile } from '../components/DaoProfile';
import {
  charLimit,
  formatValueTo,
  fromWei,
  lowerCaseLootToken,
} from '@daohaus/utils';

const OverviewCard = styled(Card)`
  width: 64rem;
  padding: 2rem;
  border: none;
  margin-bottom: 3.4rem;
  @media ${widthQuery.md} {
    max-width: 100%;
    min-width: 0;
  }
`;

const TokensCard = styled(OverviewCard)`
  padding: 2.4rem;
`;

const DataGrid = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;

  div {
    padding: 2rem 0;
  }
`;

export function DaoOverview() {
  const { dao } = useDao();

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
}

export default DaoOverview;
