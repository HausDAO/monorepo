import { useContext } from 'react';
import { MolochV3DaoContext } from '../MolochV3DaoContext';
import { MolochV3Member } from '@daohaus/moloch-v3-data';
import { fetchMember } from '../utils';
import { ValidNetwork } from '@daohaus/keychain-utils';

type MolochV3DaoContextConnectedMemberType = {
  connectedMember: MolochV3Member | undefined;
  refreshMembership: () => Promise<void>;
};

export const useConnectedMember = (): MolochV3DaoContextConnectedMemberType => {
  const {
    connectedMemberData,
    daoid,
    daochain,
    graphApiKeys,
    address,
    setConnectedMemberData,
  } = useContext(MolochV3DaoContext);

  const refreshMembership = async () => {
    if (daoid && daochain && address) {
      const res = await fetchMember({
        daoid,
        daochain: daochain as ValidNetwork,
        address,
        graphApiKeys,
      });

      setConnectedMemberData((prevState) => {
        return { ...prevState, connectedMember: res };
      });
    }
  };

  return {
    connectedMember: connectedMemberData?.connectedMember,
    refreshMembership,
  };
};
