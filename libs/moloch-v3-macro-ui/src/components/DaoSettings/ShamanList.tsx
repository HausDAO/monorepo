import { AddressDisplay, DataSm } from '@daohaus/ui';
import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';

import { ButtonRouterLink } from '../Layout';

import { ShamanListContainer } from './DaoSettings.styles';

type ShamanListProps = {
  shamen: MolochV3Dao['shamen'];
  daoChain: ValidNetwork;
  daoId: string;
  includeLinks?: boolean;
};

export const ShamanList = ({
  shamen,
  daoChain,
  daoId,
  includeLinks,
}: ShamanListProps) => {
  return (
    <>
      <ShamanListContainer>
        <div className="contract">
          <DataSm>Contract</DataSm>
        </div>
        <div>
          <DataSm>Permissions</DataSm>
        </div>
      </ShamanListContainer>
      {shamen &&
        shamen.map((shaman) => (
          <ShamanListContainer key={`${shaman.id}-${shaman.permissions}`}>
            <span className="contract">
              <AddressDisplay
                address={shaman.shamanAddress}
                explorerNetworkId={daoChain as keyof Keychain}
              />
            </span>
            <div className="manage">
              <DataSm>{shaman.permissions}</DataSm>
              {includeLinks && (
                <ButtonRouterLink
                  size="sm"
                  color="secondary"
                  to={`/molochv3/${daoChain}/${daoId}/new-proposal?formLego=UPDATE_SHAMAN&defaultValues=${JSON.stringify(
                    {
                      shamanAddress: shaman.shamanAddress,
                      shamanPermission: shaman.permissions,
                    }
                  )}`}
                >
                  Manage
                </ButtonRouterLink>
              )}
            </div>
          </ShamanListContainer>
        ))}
    </>
  );
};
