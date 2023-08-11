import styled from 'styled-components';

import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import { Card, DataIndicator, widthQuery } from '@daohaus/ui';
import {
  charLimit,
  formatValueTo,
  fromWei,
  lowerCaseLootToken,
} from '@daohaus/utils';

const MembersOverviewCard = styled(Card)`
  background-color: ${({ theme }) => theme.secondary.step3};
  border: none;
  padding: 3rem;
  width: 100%;
`;

const DataGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-content: space-between;
  div {
    padding: 2rem 0;
    width: 19.7rem;

    @media ${widthQuery.sm} {
      min-width: 100%;
    }
  }
`;

type MembersOverviewProps = {
  dao: MolochV3Dao;
};

export const MembersOverview = ({ dao }: MembersOverviewProps) => {
  return (
    <MembersOverviewCard>
      <DataGrid>
        <DataIndicator label="Token Holders" data={dao.activeMemberCount} />
        <DataIndicator label="Shamans" data={dao.shamen?.length || '0'} />
        <DataIndicator
          label={charLimit(dao.shareTokenName, 12)}
          data={formatValueTo({
            value: fromWei(dao.totalShares),
            decimals: 2,
            format: 'numberShort',
          })}
        />
        <DataIndicator
          label={charLimit(lowerCaseLootToken(dao.lootTokenName), 12)}
          data={formatValueTo({
            value: fromWei(dao.totalLoot),
            decimals: 2,
            format: 'numberShort',
          })}
        />
      </DataGrid>
    </MembersOverviewCard>
  );
};
