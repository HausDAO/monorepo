import { useContext } from 'react';
import { MolochV3DaoContext } from '../MolochV3DaoContext';
import { fetchGeneric, MolochV3DaoData } from '../utils';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { MolochV3Dao } from '@daohaus/moloch-v3-data';

// TC Challenge: How to make these generic:
// 1. entityName: built off of daoData chunk for possible context:
// ie.) MolochV3DaoData in MolochV3DaoContext
// 2. context: how to initi with something other than  MolochV3DaoContext?
// 3. how to make the RecordDataContextType generic to that returned record type is defined when we set up the hook

type RecordDataContextType<T = MolochV3Dao> = {
  record: T | undefined;
  refreshEntity: () => Promise<void>;
};

export const useRecordData = <T, V>(
  entityName: keyof MolochV3DaoData['dao']
  // entityName: keyof MolochV3DaoData
  // entityName: keyof V
): RecordDataContextType<T> => {
  // ): RecordDataContextType<T> => {
  const { daoData, daoid, daochain, graphApiKeys, setDaoData } =
    useContext(MolochV3DaoContext);

  const refreshEntity = async () => {
    if (daoid && daochain) {
      const res = await fetchGeneric({
        daoid,
        daochain: daochain as ValidNetwork,
        graphApiKeys,
        entityName,
      });

      setDaoData((prevState) => {
        return { ...prevState, [entityName]: res };
      });
    }
  };

  return {
    record: daoData && daoData[entityName],
    refreshEntity,
  };
};
