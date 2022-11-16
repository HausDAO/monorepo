import styled from 'styled-components';
import {
  H3,
  AddressDisplay,
  ParSm,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';

import { TDao } from '@daohaus/moloch-v3-context';
import { useParams } from 'react-router-dom';
import { Keychain } from '@daohaus/utils';

const MetaCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

const MetaContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 3.4rem;
`;

type ContractSettingsProps = {
  dao: TDao;
};

export const ContractSettings = ({ dao }: ContractSettingsProps) => {
  const { daochain } = useParams();
  const isMobile = useBreakpoint(widthQuery.sm);

  return (
    <>
      <MetaCardHeader>
        <H3>Contracts</H3>
      </MetaCardHeader>
      <MetaContent>
        <div>
          <ParSm>Moloch v3</ParSm>
          <AddressDisplay
            address={dao.id}
            copy
            explorerNetworkId={daochain as keyof Keychain}
            truncate={isMobile}
          />
        </div>
        <div>
          <ParSm>Gnosis Safe (Treasury)</ParSm>
          <AddressDisplay
            address={dao.safeAddress}
            copy
            truncate={isMobile}
            explorerNetworkId={daochain as keyof Keychain}
          />
        </div>
        <div>
          <ParSm>Voting Token</ParSm>
          <AddressDisplay
            address={dao.sharesAddress}
            copy
            truncate={isMobile}
            explorerNetworkId={daochain as keyof Keychain}
          />
        </div>
        <div>
          <ParSm>Non-Voting Token</ParSm>
          <AddressDisplay
            address={dao.lootAddress}
            copy
            truncate={isMobile}
            explorerNetworkId={daochain as keyof Keychain}
          />
        </div>
      </MetaContent>
    </>
  );
};
