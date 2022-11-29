import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import {
  ReactNode,
  useEffect,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  fetchAllDaoData,
  fetchAllMemberData,
  MolochV3DaoData,
  MolochV3MemberData,
} from './utils';

export type MolochV3DaoDataContextType = {
  address: string | null | undefined;
  daoid: string | null | undefined;
  daochain: string | null | undefined;
  graphApiKeys: Keychain | undefined;
  daoData: MolochV3DaoData | undefined;
  setDaoData: Dispatch<SetStateAction<MolochV3DaoData>>;
  memberData: MolochV3MemberData | undefined;
  setMemberData: Dispatch<SetStateAction<MolochV3MemberData>>;
  refreshAll: () => Promise<void>;
};

const defaultData = {
  address: undefined,
  daoid: undefined,
  daochain: undefined,
  graphApiKeys: undefined,
  daoData: undefined,
  setDaoData: async () => {
    return;
  },
  memberData: undefined,
  setMemberData: async () => {
    return;
  },
  refreshAll: async () => {
    return;
  },
};

export const MolochV3DaoDataContext =
  createContext<MolochV3DaoDataContextType>(defaultData);

type MolochV3DaoDataProps = {
  address: string | null | undefined;
  daoid: string | null | undefined;
  daochain: string | null | undefined;
  graphApiKeys: Keychain | undefined;
  children: ReactNode;
};

export const MolochV3DaoDataProvider = ({
  address,
  daoid,
  daochain,
  graphApiKeys,
  children,
}: MolochV3DaoDataProps) => {
  const [daoData, setDaoData] = useState<MolochV3DaoData>({});
  const [memberData, setMemberData] = useState<MolochV3MemberData>({});

  useEffect(() => {
    // TODO: shouldUpdate
    const fetchDaoData = async () => {
      if (daoid && daochain) {
        const res = await fetchAllDaoData({
          daoid,
          daochain: daochain as ValidNetwork,
          graphApiKeys,
        });

        setDaoData(res);
      }
    };

    if (daoid && daochain) {
      fetchDaoData();
    }
  }, [daoid, daochain, graphApiKeys]);

  useEffect(() => {
    const fetchMemberData = async () => {
      // TODO: shouldUpdate
      if (daoid && daochain && address) {
        const res = await fetchAllMemberData({
          daoid,
          daochain: daochain as ValidNetwork,
          address,
          graphApiKeys,
        });

        setMemberData(res);
      }
    };

    if (daoid && daochain && address) {
      fetchMemberData();
    }
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

      setMemberData(res);
    }
  };

  return (
    <MolochV3DaoDataContext.Provider
      value={{
        address,
        daoid,
        daochain,
        graphApiKeys,
        daoData,
        setDaoData,
        memberData,
        setMemberData,
        refreshAll,
      }}
    >
      {children}
    </MolochV3DaoDataContext.Provider>
  );
};
