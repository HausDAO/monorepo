import { useContext } from 'react';
import { MolochV3DaoDataContext } from '../MolochV3DaoDataContext';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';
import { fetchDao } from '../utils';
import { ValidNetwork } from '@daohaus/keychain-utils';

type MolochV3DaoDataContextDaoType = {
  dao: MolochV3Dao | undefined;
  refreshDao: () => Promise<void>;
  refreshAll: () => Promise<void>;
};

export const useDaoData = (): MolochV3DaoDataContextDaoType => {
  const { daoData, daoid, daochain, graphApiKeys, setDaoData, refreshAll } =
    useContext(MolochV3DaoDataContext);

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
