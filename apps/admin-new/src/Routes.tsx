import { ReactSetter } from '@daohaus/utils';
import React, { useEffect } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

export const Routes = ({
  setDaoChainId,
}: {
  setDaoChainId: ReactSetter<string | undefined>;
}) => {
  const location = useLocation();
  const pathMatch = matchPath('molochv3/:daochain/:daoid/*', location.pathname);

  useEffect(() => {
    if (pathMatch?.params?.daochain) {
      setDaoChainId(pathMatch?.params?.daochain);
    }
    if (!pathMatch?.params?.daochain) {
      setDaoChainId(undefined);
    }
  }, [pathMatch?.params?.daochain, setDaoChainId]);
};
