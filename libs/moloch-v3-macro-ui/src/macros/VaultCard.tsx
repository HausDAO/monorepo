import React, { useMemo } from 'react';
import styled from 'styled-components';

import { DaoVault, MolochV3Dao } from '@daohaus/moloch-v3-data';
import {
  AddressDisplay,
  Bold,
  Card,
  DataIndicator,
  H4,
  Link,
  ParXs,
  Tag,
  Theme,
  widthQuery,
} from '@daohaus/ui';
import { formatValueTo, generateGnosisUiLink } from '@daohaus/utils';
import { Keychain } from '@daohaus/keychain-utils';
import { DataGrid } from '../components';

const VaultContainer = styled(Card)`
  padding: 3rem;
  width: 100%;
  border: none;
  margin-bottom: 3rem;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
`;

const VaultOverviewCard = styled(Card)`
  background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step3};
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
    background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step5};
    border-radius: 4px;
  }
`;

const TagSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.8rem;
`;

type VaultOverviewProps = {
  dao: MolochV3Dao;
  vault: DaoVault;
  daochain: string;
};

export const VaultCard = ({ dao, vault, daochain }: VaultOverviewProps) => {
  const isTreasury = useMemo(() => {
    return vault.safeAddress === dao.safeAddress;
  }, [vault, dao]);

  return (
    <VaultContainer>
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
                linkType="external"
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
    </VaultContainer>
  );
};
