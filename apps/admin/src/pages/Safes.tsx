import styled from 'styled-components';

import {
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTrigger,
  SingleColumnLayout,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';
import { useDao } from '@daohaus/moloch-v3-context';
import { VaultOverview } from '../components/VaultOverview';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { getNetwork } from '@daohaus/utils';
import { ButtonLink } from '../components/ButtonLink';
import AddSafeForm from '../components/AddSafeForm';

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
        <Dialog>
          <DialogTrigger asChild>
            <Button color="secondary" fullWidth={isMobile}>
              New Safe
            </Button>
          </DialogTrigger>

          <ButtonLink
            href={`/molochv3/${daochain}/${daoid}/new-proposal?formLego=TRANSFER_ERC20`}
            color="secondary"
            fullWidth={isMobile}
          >
            Request ERC-20
          </ButtonLink>

          <ButtonLink
            href={`/molochv3/${daochain}/${daoid}/new-proposal?formLego=TRANSFER_NETWORK_TOKEN`}
            color="secondary"
            fullWidth={isMobile}
          >
            Request {networkData?.symbol}
          </ButtonLink>

          <DialogContent title="Add Safe">
            <AddSafeForm />
          </DialogContent>
        </Dialog>
      }
    >
      {dao?.vaults.map((vault) => (
        <VaultContainer>
          {dao && vault && (
            <VaultOverview dao={dao} vault={vault} key={vault.id} />
          )}
        </VaultContainer>
      ))}
    </SingleColumnLayout>
  );
}

export default Safes;
