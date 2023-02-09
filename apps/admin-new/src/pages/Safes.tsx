import { ValidNetwork } from '@daohaus/keychain-utils';
import { useCurrentDao, useDaoData } from '@daohaus/moloch-v3-hooks';
import { Link, ParLg, SingleColumnLayout } from '@daohaus/ui';
import { generateGnosisUiLink } from '@daohaus/utils';
import React from 'react';
import { JSONDisplay } from '../components/JSONDisplay';

export const Safes = () => {
  const { daoChain } = useCurrentDao();
  const { dao } = useDaoData();

  return (
    <SingleColumnLayout>
      <ParLg>Treasury</ParLg>
      <Link
        linkType="external"
        href={generateGnosisUiLink({
          chainId: daoChain as ValidNetwork,
          address: dao?.safeAddress,
        })}
      >
        {dao?.safeAddress}
      </Link>
      <ParLg>Safes</ParLg>
      <JSONDisplay data={dao?.vaults} />

      {/* <VaultCard */}
    </SingleColumnLayout>
  );
};
