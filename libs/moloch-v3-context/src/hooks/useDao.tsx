import { useContext } from 'react';
import { MolochV3Context } from '../MolochV3Context';
import { MolochV3ContextDaoType } from '../utils/types';

export const useDao = (): MolochV3ContextDaoType => {
  const { dao, isDaoLoading, refreshDao, refreshAll } =
    useContext(MolochV3Context);
  return {
    dao,
    isDaoLoading,
    refreshDao,
    refreshAll,
  };
};
