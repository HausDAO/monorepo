import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  AddressDisplay,
  Card,
  H4,
  Link,
  ParXs,
  Theme,
  Bold,
  DataIndicator,
  widthQuery,
} from '@daohaus/ui';
import {
  formatValueTo,
  generateGnosisUiLink,
  Keychain,
} from '@daohaus/common-utilities';

import { TDao } from '@daohaus/dao-context';

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

  .safe-link {
    padding: 0.9rem;
    background-color: ${({ theme }: { theme: Theme }) => theme.secondary.step5};
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

type VaultOverviewProps = {
  dao: TDao;
};

export const VaultOverview = ({ dao }: VaultOverviewProps) => {
  const { daochain } = useParams();

  return (
    <VaultOverviewCard>
      <VaultCardHeader>
        <div>
          <H4>Main Treasury</H4>
          <AddressDisplay
            address={dao?.safeAddress}
            truncate
            copy
            explorerNetworkId={daochain as keyof Keychain}
          />
        </div>
        <div className="safe-link">
          <Link
            linkType="external"
            href={generateGnosisUiLink({
              chainId: daochain as keyof Keychain,
              address: dao.safeAddress,
            })}
          >
            <ParXs>
              <Bold>Gnosis Safe</Bold>
            </ParXs>
          </Link>
        </div>
      </VaultCardHeader>
      <DataGrid>
        <DataIndicator
          label="Balance"
          data={formatValueTo({
            value: dao.fiatTotal,
            decimals: 2,
            format: 'currencyShort',
          })}
        />
        <DataIndicator label="Tokens" data={dao.tokenBalances.length} />
      </DataGrid>
    </VaultOverviewCard>
  );
};
