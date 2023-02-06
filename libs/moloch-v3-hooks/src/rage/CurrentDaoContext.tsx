import { ValidNetwork } from '@daohaus/keychain-utils';
import { ArbitraryState, EthAddress } from '@daohaus/utils';
import React, { ReactNode, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

type CurrentDaoContextType = {
  daoId?: EthAddress;
  daoChain?: ValidNetwork;
  updateFilter: (filterKey: string, filter: any) => void;
  getFilter: (filterKey: string) => any;
};

export const CurrentDaoContext = React.createContext<CurrentDaoContextType>({
  daoId: undefined,
  daoChain: undefined,
  updateFilter: () => undefined,
  getFilter: () => undefined,
});

type CurrentContextProps = {
  children: ReactNode;
  targetDao?: {
    daoId: EthAddress;
    daoChain: ValidNetwork;
  };
};

export const CurrentDaoProvider = ({
  children,
  targetDao,
}: CurrentContextProps) => {
  const { daoChain, daoId } = useParams<{
    daoId: EthAddress;
    daoChain: ValidNetwork;
  }>();
  const [currentFilters, setFilter] = useState<ArbitraryState>({});

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFilter = (filterKey: string, filter: any) => {
    setFilter((prevState) => ({ ...prevState, [filterKey]: filter }));
  };

  const getFilter = (filterKey: string) => {
    return currentFilters?.[filterKey];
  };
  return (
    <CurrentDaoContext.Provider
      value={{
        daoChain: targetDao?.daoChain || daoChain,
        daoId: targetDao?.daoId || daoId,
        updateFilter,
        getFilter,
      }}
    >
      {children}
    </CurrentDaoContext.Provider>
  );
};

export const useCurrentDao = () => useContext(CurrentDaoContext);
