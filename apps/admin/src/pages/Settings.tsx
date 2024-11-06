import React from 'react';
import { useCurrentDao, useDaoData } from '@daohaus/moloch-v3-hooks';
import { SingleColumnLayout } from '@daohaus/ui';
import { DaoSettings } from '@daohaus/moloch-v3-macro-ui';
import { Keychain } from '@daohaus/keychain-utils';
import { farcastleChain } from '@daohaus/utils';

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
          showFarcasterLink={farcastleChain(daoChain)}
        />
      )}
    </SingleColumnLayout>
  );
};
