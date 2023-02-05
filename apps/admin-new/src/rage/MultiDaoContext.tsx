import { isValidNetwork, ValidNetwork } from '@daohaus/keychain-utils';
import { EthAddress, isEthAddress } from '@daohaus/utils';
import React, { ReactNode, useContext } from 'react';
import { useParams } from 'react-router-dom';

type MultiDaoContextType = {
  daoId?: EthAddress;
  daoChain?: ValidNetwork;
};

export const MultiDaoContext = React.createContext<MultiDaoContextType>({
  daoId: undefined,
  daoChain: undefined,
});

export const MultiDaoProvider = ({ children }: { children: ReactNode }) => {
  const { daoChain, daoId } = useParams();

  isEthAddress(daoChain as EthAddress);

  return (
    <MultiDaoContext.Provider
      value={{
        daoChain: isValidNetwork(daoChain) ? daoChain : undefined,
        daoId: isEthAddress(daoId) ? daoId : undefined,
      }}
    >
      {children}
    </MultiDaoContext.Provider>
  );
};

export const useCurrentDao = () => useContext(MultiDaoContext);
