import React from 'react';
import { useCurrentDao, useDaoData } from '@daohaus/moloch-v3-hooks';
import { SingleColumnLayout } from '@daohaus/ui';
import { DaoSettings } from '@daohaus/moloch-v3-macro-ui';
import { Keychain } from '@daohaus/keychain-utils';

export const Settings = () => {
  const { daoChain } = useCurrentDao();
  const { dao } = useDaoData();

  return (
    <SingleColumnLayout title="Settings">
      {dao && (
        <DaoSettings
          daoChain={daoChain as keyof Keychain}
          daoId={dao.id}
          includeLinks={true}
        />
        // <GovernanceSettings
        //   daoChain={daoChain as keyof Keychain}
        //   dao={dao}
        //   includeLinks={true}
        // />
      )}
    </SingleColumnLayout>
  );
};
