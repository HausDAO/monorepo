import { useContext } from 'react';
import { MolochV3DaoContext } from '../MolochV3DaoContext';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import { fetchDao } from '../utils';
import { ValidNetwork } from '@daohaus/keychain-utils';

type MolochV3DaoContextDaoType = {
  dao: MolochV3Dao | undefined;
  refreshDao: () => Promise<void>;
  refreshAll: () => Promise<void>;
};

export const useDao = (): MolochV3DaoContextDaoType => {
  const { daoData, daoid, daochain, graphApiKeys, setDaoData, refreshAll } =
    useContext(MolochV3DaoContext);

  const refreshDao = async () => {
    if (daoid && daochain) {
      const res = await fetchDao({
        daoid,
        daochain: daochain as ValidNetwork,
        graphApiKeys,
      });

      setDaoData((prevState) => {
        return { ...prevState, dao: res };
      });
    }
  };

  return {
    dao: daoData?.dao,
    refreshDao,
    refreshAll,
  };
};
