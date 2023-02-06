/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidNetwork } from '@daohaus/keychain-utils';
import { ArbitraryState, EthAddress } from '@daohaus/utils';
import React, { ReactNode, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

type CurrentDaoContextType = {
  daoId?: EthAddress;
  daoChain?: ValidNetwork;
  updateFilter: (filterKey: string, filter: any) => void;
  updateOrder: (filterKey: string, filter: any) => void;
  getOrder: (filterKey: string) => any;
  getFilter: (filterKey: string) => any;
};

export const CurrentDaoContext = React.createContext<CurrentDaoContextType>({
  daoId: undefined,
  daoChain: undefined,
  updateFilter: () => undefined,
  getFilter: () => undefined,
  updateOrder: () => undefined,
  getOrder: () => undefined,
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
  const [currentOrders, setOrder] = useState<ArbitraryState>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFilter = (filterKey: string, filter: any) => {
    setFilter((prevState) => ({ ...prevState, [filterKey]: filter }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateOrder = (orderKey: string, order: any) => {
    setOrder((prevState) => ({ ...prevState, [orderKey]: order }));
  };
  const getFilter = (filterKey: string) => {
    return currentFilters?.[filterKey];
  };
  const getOrder = (orderKey: string) => {
    return currentOrders?.[orderKey];
  };
  return (
    <CurrentDaoContext.Provider
      value={{
        daoChain: targetDao?.daoChain || daoChain,
        daoId: targetDao?.daoId || daoId,
        updateFilter,
        getFilter,
        updateOrder,
        getOrder,
      }}
    >
      {children}
    </CurrentDaoContext.Provider>
  );
};

export const useCurrentDao = () => useContext(CurrentDaoContext);
