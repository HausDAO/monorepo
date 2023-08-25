import React, { useState } from 'react';
import {
  useConnectedMember,
  useCurrentDao,
  useDaoData,
} from '@daohaus/moloch-v3-hooks';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  SingleColumnLayout,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';
import { SafesList } from '@daohaus/moloch-v3-macro-ui';
import AddSafeForm from '../components/AddSafeForm';

export const Safes = () => {
  const { daoChain } = useCurrentDao();
  const { dao } = useDaoData();
  const { connectedMember } = useConnectedMember();
  const [open, setOpen] = useState(false);
  const isMobile = useBreakpoint(widthQuery.sm);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SingleColumnLayout
      title="Safes"
      actions={
        connectedMember && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button color="secondary" fullWidth={isMobile}>
                New Safe
              </Button>
            </DialogTrigger>

            <DialogContent title="Add Safe">
              <AddSafeForm onSuccess={handleClose} />
            </DialogContent>
          </Dialog>
        )
      }
    >
      {dao && daoChain && (
        <SafesList daoChain={daoChain} daoId={dao.id} includeLinks={true} />
      )}
    </SingleColumnLayout>
  );
};
