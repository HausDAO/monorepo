import { useContext } from 'react';
import { MolochV3DaoDataContext } from '../MolochV3DaoDataContext';
import { MolochV3Member } from '@daohaus/moloch-v3-data';
import { fetchMember } from '../utils';
import { ValidNetwork } from '@daohaus/keychain-utils';

type MolochV3DaoDataContextConnectedMembershipType = {
  connectedMembership: MolochV3Member | undefined;
  refreshMembership: () => Promise<void>;
};

export const useConnectedMembershipData =
  (): MolochV3DaoDataContextConnectedMembershipType => {
    const {
      memberData,
      daoid,
      daochain,
      graphApiKeys,
      address,
      setMemberData,
    } = useContext(MolochV3DaoDataContext);

    const refreshMembership = async () => {
      if (daoid && daochain && address) {
        const res = await fetchMember({
          daoid,
          daochain: daochain as ValidNetwork,
          address,
          graphApiKeys,
        });

        setMemberData((prevState) => {
          return { ...prevState, connectedMembership: res };
        });
      }
    };

    return {
      connectedMembership: memberData?.connectedMembership,
      refreshMembership,
    };
  };
