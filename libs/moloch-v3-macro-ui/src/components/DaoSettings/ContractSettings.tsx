import {
  H3,
  AddressDisplay,
  ParSm,
  useBreakpoint,
  widthQuery,
} from '@daohaus/ui';
import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';

import {
  MetaCardHeader,
  MetaContent,
  SettingsContainer,
} from './DaoSettings.styles';

type ContractSettingsProps = {
  dao: MolochV3Dao;
  daoChain: ValidNetwork;
};

export const ContractSettings = ({ dao, daoChain }: ContractSettingsProps) => {
  const isMobile = useBreakpoint(widthQuery.sm);

  return (
    <SettingsContainer>
      <MetaCardHeader>
        <H3>Contracts</H3>
      </MetaCardHeader>
      <MetaContent>
        <div>
          <ParSm>Moloch v3</ParSm>
          <AddressDisplay
            address={dao.id}
            copy
            explorerNetworkId={daoChain as keyof Keychain}
            truncate={isMobile}
          />
        </div>
        <div>
          <ParSm>Gnosis Safe (Treasury)</ParSm>
          <AddressDisplay
            address={dao.safeAddress}
            copy
            truncate={isMobile}
            explorerNetworkId={daoChain as keyof Keychain}
          />
        </div>
        <div>
          <ParSm>Voting Token</ParSm>
          <AddressDisplay
            address={dao.sharesAddress}
            copy
            truncate={isMobile}
            explorerNetworkId={daoChain as keyof Keychain}
          />
        </div>
        <div>
          <ParSm>Non-Voting Token</ParSm>
          <AddressDisplay
            address={dao.lootAddress}
            copy
            truncate={isMobile}
            explorerNetworkId={daoChain as keyof Keychain}
          />
        </div>
      </MetaContent>
    </SettingsContainer>
  );
};
