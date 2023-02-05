import { ValidNetwork } from '@daohaus/keychain-utils';
import { EthAddress } from '@daohaus/utils';
import React, { ReactNode, useContext } from 'react';
import { useParams } from 'react-router-dom';

type CurrentDaoContextType = {
  daoId?: EthAddress;
  daoChain?: ValidNetwork;
};

export const CurrentDaoContext = React.createContext<CurrentDaoContextType>({
  daoId: undefined,
  daoChain: undefined,
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

  return (
    <CurrentDaoContext.Provider
      value={{
        daoChain: targetDao?.daoChain || daoChain,
        daoId: targetDao?.daoId || daoId,
      }}
    >
      {children}
    </CurrentDaoContext.Provider>
  );
};

export const useCurrentDao = () => useContext(CurrentDaoContext);
