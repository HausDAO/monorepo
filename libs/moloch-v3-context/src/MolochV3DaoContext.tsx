import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import { ReactNode, useEffect, createContext, useState } from 'react';
import {
  fetchAllDaoData,
  fetchAllMemberData,
  MolochV3DaoContextType,
  MolochV3DaoData,
  MolochV3ConnectedMemberData,
} from './utils';

const defaultData = {
  address: undefined,
  daoid: undefined,
  daochain: undefined,
  graphApiKeys: undefined,
  daoData: undefined,
  setDaoData: async () => {
    return;
  },
  connectedMemberData: undefined,
  setConnectedMemberData: async () => {
    return;
  },
  refreshAll: async () => {
    return;
  },
};

export const MolochV3DaoContext =
  createContext<MolochV3DaoContextType>(defaultData);

type MolochV3DaoProps = {
  address: string | null | undefined;
  daoid: string | null | undefined;
  daochain: string | null | undefined;
  graphApiKeys: Keychain | undefined;
  children: ReactNode;
};

export const MolochV3DaoProvider = ({
  address,
  daoid,
  daochain,
  graphApiKeys,
  children,
}: MolochV3DaoProps) => {
  const [daoData, setDaoData] = useState<MolochV3DaoData>({});
  const [connectedMemberData, setConnectedMemberData] =
    useState<MolochV3ConnectedMemberData>({});

  useEffect(() => {
    let shouldUpdate = true;
    const fetchDaoData = async () => {
      if (daoid && daochain) {
        const res = await fetchAllDaoData({
          daoid,
          daochain: daochain as ValidNetwork,
          graphApiKeys,
        });

        if (shouldUpdate) {
          setDaoData(res);
        }
      }
    };

    if (daoid && daochain) {
      fetchDaoData();
    }

    return () => {
      shouldUpdate = false;
    };
  }, [daoid, daochain, graphApiKeys]);

  useEffect(() => {
    let shouldUpdate = true;
    const fetchMemberData = async () => {
      if (daoid && daochain && address) {
        const res = await fetchAllMemberData({
          daoid,
          daochain: daochain as ValidNetwork,
          address,
          graphApiKeys,
        });
        if (shouldUpdate) {
          setConnectedMemberData(res);
        }
      }
    };
    if (daoid && daochain && address) {
      fetchMemberData();
    }
    if (!address) setConnectedMemberData({});
    return () => {
      shouldUpdate = false;
    };
  }, [daoid, daochain, graphApiKeys, address]);

  const refreshAll = async () => {
    if (daoid && daochain) {
      const res = await fetchAllDaoData({
        daoid,
        daochain: daochain as ValidNetwork,
        graphApiKeys,
      });

      setDaoData(res);
    }
    if (daoid && daochain && address) {
      const res = await fetchAllMemberData({
        daoid,
        daochain: daochain as ValidNetwork,
        address,
        graphApiKeys,
      });

      setConnectedMemberData(res);
    }
  };

  return (
    <MolochV3DaoContext.Provider
      value={{
        address,
        daoid,
        daochain,
        graphApiKeys,
        daoData,
        setDaoData,
        connectedMemberData,
        setConnectedMemberData,
        refreshAll,
      }}
    >
      {children}
    </MolochV3DaoContext.Provider>
  );
};
