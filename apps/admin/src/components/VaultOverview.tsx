import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  AddressDisplay,
  Card,
  H4,
  Link,
  ParXs,
  Bold,
  DataIndicator,
  widthQuery,
  Tag,
} from '@daohaus/ui';
import { formatValueTo, generateGnosisUiLink } from '@daohaus/utils';
import { Keychain } from '@daohaus/keychain-utils';

import { DaoSafe, MolochV3Dao } from '@daohaus/moloch-v3-data';
import { VaultMenu } from './VaultMenu';

const VaultOverviewCard = styled(Card)`
  background-color: ${({ theme }) => theme.secondary.step3};
  border: none;
  padding: 3rem;
  width: 100%;
`;

const VaultCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 3rem;

  .right-section {
    display: flex;
  }

  .safe-link {
    padding: 0.9rem;
    background-color: ${({ theme }) => theme.secondary.step5};
    border-radius: 4px;
  }
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

const TagSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.8rem;
`;

type VaultOverviewProps = {
  dao: MolochV3Dao;
  vault: DaoSafe;
};

export const VaultOverview = ({ dao, vault }: VaultOverviewProps) => {
  const { daochain } = useParams();
  const isTreasury = vault.safeAddress === dao.safeAddress;
  return (
    <VaultOverviewCard>
      <VaultCardHeader>
        <div>
          <H4>{vault.name}</H4>
          <TagSection>
            <AddressDisplay
              address={vault.safeAddress}
              truncate
              copy
              explorerNetworkId={daochain as keyof Keychain}
            />
            {isTreasury && <Tag tagColor="pink">Ragequittable</Tag>}
          </TagSection>
        </div>
        <div className="right-section">
          <div className="safe-link">
            <Link
              href={generateGnosisUiLink({
                chainId: daochain as keyof Keychain,
                address: vault.safeAddress,
              })}
            >
              <ParXs>
                <Bold>Gnosis Safe</Bold>
              </ParXs>
            </Link>
          </div>
          <VaultMenu
            ragequittable={vault.ragequittable}
            safeAddress={vault.safeAddress}
          />
        </div>
      </VaultCardHeader>
      <DataGrid>
        <DataIndicator
          label="Balance"
          data={formatValueTo({
            value: vault.fiatTotal,
            decimals: 2,
            format: 'currencyShort',
          })}
        />
        <DataIndicator label="Tokens" data={vault.tokenBalances.length} />
      </DataGrid>
    </VaultOverviewCard>
  );
};
