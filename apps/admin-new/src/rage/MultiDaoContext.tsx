import React, { ReactNode } from 'react';

type MultiDaoContextType = {
  daoId?: string;
  daoChain?: string;
};

export const MultiDaoContext = React.createContext<MultiDaoContextType>({
  daoId: undefined,
  daoChain: undefined,
});

export const MultiDaoProvider = ({
  children,
  daoChain,
  daoId,
}: {
  children: ReactNode;
  daoChain?: string;
  daoId?: string;
}) => {
  return (
    <MultiDaoContext.Provider value={{ daoChain, daoId }}>
      {children}
    </MultiDaoContext.Provider>
  );
};
