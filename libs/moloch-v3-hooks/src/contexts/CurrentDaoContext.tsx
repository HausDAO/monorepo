/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidNetwork } from '@daohaus/keychain-utils';
import { ArbitraryState } from '@daohaus/utils';
import React, { ReactNode, useContext, useState } from 'react';

type CurrentDaoContextType = {
  daoId?: string;
  daoChain?: ValidNetwork;
  proposalId?: string;
  memberAddress?: string;
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

type TargetDao = {
  daoId?: string;
  daoChain?: ValidNetwork;
  proposalId?: string;
  memberAddress?: string;
};

type CurrentContextProps = {
  children: ReactNode;
  targetDao: TargetDao;
};

export const CurrentDaoProvider = ({
  children,
  targetDao,
}: CurrentContextProps) => {
  const [currentFilters, setFilter] = useState<ArbitraryState>({});
  const [currentOrders, setOrder] = useState<ArbitraryState>({});

  const updateFilter = (filterKey: string, filter: any) => {
    setFilter((prevState) => ({ ...prevState, [filterKey]: filter }));
  };

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
        daoChain: targetDao?.daoChain,
        daoId: targetDao?.daoId,
        proposalId: targetDao?.proposalId,
        memberAddress: targetDao?.memberAddress,
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
