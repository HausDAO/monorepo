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
import { useConnectedMember, useDao } from '@daohaus/moloch-v3-context';
import { VaultOverview } from '../components/VaultOverview';
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
  const { connectedMember } = useConnectedMember();

  const isMobile = useBreakpoint(widthQuery.sm);

  return (
    <SingleColumnLayout
      title="Safes"
      actions={
        connectedMember && (
          <Dialog>
            <DialogTrigger asChild>
              <Button color="secondary" fullWidth={isMobile}>
                New Safe
              </Button>
            </DialogTrigger>

            <DialogContent title="Add Safe">
              <AddSafeForm />
            </DialogContent>
          </Dialog>
        )
      }
    >
      {dao?.vaults
        .sort((a, b) => Number(b.ragequittable) - Number(a.ragequittable))
        .map(
          (vault) =>
            dao &&
            vault && (
              <VaultContainer key={vault.id}>
                <VaultOverview dao={dao} vault={vault} />
              </VaultContainer>
            )
        )}
    </SingleColumnLayout>
  );
}

export default Safes;
