import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import {
  ReactNode,
  useEffect,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { fetchAllDaoData, MolochV3DaoData } from './utils';

export type MolochV3DaoDataContextType = {
  address: string | null | undefined;
  daoid: string | null | undefined;
  daochain: string | null | undefined;
  graphApiKeys: Keychain | undefined;
  daoData?: MolochV3DaoData;
  setDaoData: Dispatch<SetStateAction<MolochV3DaoData>>;
};

const defaultDaoData = {
  address: undefined,
  daoid: undefined,
  daochain: undefined,
  graphApiKeys: undefined,
  dao: undefined,
  setDaoData: async () => {
    return;
  },
};

export const MolochV3DaoDataContext =
  createContext<MolochV3DaoDataContextType>(defaultDaoData);

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

  useEffect(() => {
    // TODO: shouldUpdate
    const fetchDaoData = async () => {
      if (daoid && daochain) {
        const res = await fetchAllDaoData({
          daoid,
          daochain: daochain as ValidNetwork,
          graphApiKeys,
        });

        console.log('res', res);
        setDaoData(res);
      }
    };

    if (daoid && daochain) {
      fetchDaoData();
    }
  }, [daoid, daochain, graphApiKeys]);

  useEffect(() => {
    if (address) {
      console.log('fetch address related elements');
    }
  }, [daoid, daochain, graphApiKeys, address]);

  return (
    <MolochV3DaoDataContext.Provider
      value={{ address, daoid, daochain, graphApiKeys, daoData, setDaoData }}
    >
      {children}
    </MolochV3DaoDataContext.Provider>
  );
};
