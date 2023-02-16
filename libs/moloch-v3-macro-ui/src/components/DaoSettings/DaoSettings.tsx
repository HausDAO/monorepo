import { useDaoData } from '@daohaus/moloch-v3-hooks';
import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';

import { MetadataSettings } from './MetadataSettings';
import { ContractSettings } from './ContractSettings';
import { GovernanceSettings } from './GovernanceSettings';
import { ShamanSettings } from './ShamanSettings';

import { SettingsContainer } from './DaoSettings.styles';

type DaoSettingsProps = {
  daoChain: ValidNetwork;
  daoId: string;
  includeLinks?: boolean;
  graphApiKeys?: Keychain;
};

export const DaoSettings = ({
  daoChain,
  daoId,
  includeLinks = false,
  graphApiKeys,
}: DaoSettingsProps) => {
  const { dao } = useDaoData({
    daoChain,
    daoId,
    graphApiKeys,
  });

  if (!dao) return null;

  return (
    <>
      <SettingsContainer>
        <MetadataSettings
          dao={dao}
          daoChain={daoChain}
          includeLinks={includeLinks}
        />
      </SettingsContainer>

      <SettingsContainer>
        <ContractSettings dao={dao} daoChain={daoChain} />
      </SettingsContainer>

      <SettingsContainer>
        <GovernanceSettings
          dao={dao}
          daoChain={daoChain}
          includeLinks={includeLinks}
        />
      </SettingsContainer>

      <SettingsContainer>
        <ShamanSettings
          dao={dao}
          daoChain={daoChain}
          includeLinks={includeLinks}
        />
      </SettingsContainer>
    </>
  );
};
