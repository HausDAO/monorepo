import styled from 'styled-components';

import {
  Card,
  SingleColumnLayout,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';
import { useDao } from '@daohaus/dao-context';
import { VaultOverview } from '../components/VaultOverview';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { getNetwork } from '@daohaus/common-utilities';
import { ButtonLink } from '../components/ButtonLink';

const VaultContainer = styled(Card)`
  padding: 3rem;
  width: 100%;
  border: none;
  @media ${widthQuery.lg} {
    max-width: 100%;
    min-width: 0;
  }
`;

export function Safes() {
  const { dao } = useDao();
  const { daoid, daochain } = useParams();
  const networkData = useMemo(() => {
    if (!daochain) return null;
    return getNetwork(daochain);
  }, [daochain]);
  const isMobile = useBreakpoint(widthQuery.sm);

  return (
    <SingleColumnLayout
      title="Safes"
      actions={
        <>
          <ButtonLink
            href={`/molochv3/${daochain}/${daoid}/new-proposal?formLego=TRANSFER_ERC20`}
            color="secondary"
            fullWidth={isMobile}
            // centerAlign={isMobile}
          >
            Request ERC-20
          </ButtonLink>

          <ButtonLink
            href={`/molochv3/${daochain}/${daoid}/new-proposal?formLego=TRANSFER_NETWORK_TOKEN`}
            color="secondary"
            fullWidth={isMobile}
            // centerAlign={isMobile}
          >
            Request {networkData?.symbol}
          </ButtonLink>
        </>
      }
    >
      <VaultContainer>{dao && <VaultOverview dao={dao} />}</VaultContainer>
    </SingleColumnLayout>
  );
}

export default Safes;
