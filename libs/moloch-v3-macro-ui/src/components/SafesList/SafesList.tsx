import React from 'react';

import { useDaoData } from '@daohaus/moloch-v3-hooks';
import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import { SafeCard } from '../SafeCard';

type SafesProps = {
  daoChain: ValidNetwork;
  daoId: string;
  includeLinks?: boolean;
  graphApiKeys?: Keychain;
};

export const SafesList = ({
  daoChain,
  daoId,
  includeLinks = false,
  graphApiKeys,
}: SafesProps) => {
  const { dao } = useDaoData({
    daoChain,
    daoId,
    graphApiKeys,
  });

  if (!dao) return null;

  return (
    <>
      {dao.vaults
        .sort((a, b) => Number(b.ragequittable) - Number(a.ragequittable))
        .map(
          (vault) =>
            dao &&
            vault && (
              <SafeCard
                dao={dao}
                daoChain={daoChain}
                safe={vault}
                includeLinks={includeLinks}
                key={vault.id}
              />
            )
        )}
    </>
  );
};
