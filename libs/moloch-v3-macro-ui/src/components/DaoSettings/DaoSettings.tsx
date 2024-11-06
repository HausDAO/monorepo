import { useDaoData } from '@daohaus/moloch-v3-hooks';
import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';

import { MetadataSettings } from './MetadataSettings';
import { ContractSettings } from './ContractSettings';
import { GovernanceSettings } from './GovernanceSettings';
import { ShamanSettings } from './ShamanSettings';

import { TokenSettings } from './TokenSettings';

type DaoSettingsProps = {
  daoChain: ValidNetwork;
  daoId: string;
  includeLinks?: boolean;
  graphApiKeys?: Keychain;
  showFarcasterLink?: boolean;
};

export const DaoSettings = ({
  daoChain,
  daoId,
  includeLinks = false,
  graphApiKeys,
  showFarcasterLink,
}: DaoSettingsProps) => {
  const { dao } = useDaoData({
    daoChain,
    daoId,
    graphApiKeys,
  });

  if (!dao) return null;

  return (
    <>
      <MetadataSettings
        dao={dao}
        daoChain={daoChain}
        includeLinks={includeLinks}
        showFarcasterLink={showFarcasterLink}
      />

      <ContractSettings dao={dao} daoChain={daoChain} />

      <GovernanceSettings
        dao={dao}
        daoChain={daoChain}
        includeLinks={includeLinks}
      />

      <TokenSettings
        dao={dao}
        daoChain={daoChain}
        includeLinks={includeLinks}
      />

      <ShamanSettings
        dao={dao}
        daoChain={daoChain}
        includeLinks={includeLinks}
      />
    </>
  );
};
