import { useContext } from 'react';
import { DaoContext } from '../DaoContext';
import { DaoConnectDaoType } from '../utils/types';

export const useDao = (): DaoConnectDaoType => {
  const { dao, isDaoLoading, refreshDao, refreshAll } = useContext(DaoContext);
  return {
    dao,
    isDaoLoading,
    refreshDao,
    refreshAll,
  };
};
