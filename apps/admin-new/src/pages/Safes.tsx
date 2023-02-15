import React from 'react';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { useCurrentDao, useDaoData } from '@daohaus/moloch-v3-hooks';
import { DataLg, Link, ParLg, SingleColumnLayout } from '@daohaus/ui';
import { generateGnosisUiLink } from '@daohaus/utils';
import { SafeCard, SafesList } from '@daohaus/moloch-v3-macro-ui';
import { JSONDisplay } from '../components/JSONDisplay';

export const Safes = () => {
  const { daoChain } = useCurrentDao();
  const { dao } = useDaoData();

  return (
    <SingleColumnLayout>
      <ParLg>Treasury</ParLg>
      <Link
        href={generateGnosisUiLink({
          chainId: daoChain as ValidNetwork,
          address: dao?.safeAddress,
        })}
      >
        {dao?.safeAddress}
      </Link>
      <ParLg>Safes</ParLg>
      <JSONDisplay data={dao?.vaults} />

      <hr />

      {dao && daoChain && (
        <>
          <DataLg>single vault component</DataLg>
          <SafeCard
            dao={dao}
            safe={dao.vaults[0]}
            daoChain={daoChain}
            includeLinks={true}
          />

          <hr />
          <DataLg>all vaults component</DataLg>

          <SafesList daoChain={daoChain} daoId={dao.id} includeLinks={true} />
        </>
      )}
    </SingleColumnLayout>
  );
};
