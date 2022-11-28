import { Keychain, ValidNetwork } from '@daohaus/keychain-utils';
import { ReactNode, useMemo } from 'react';
import { fetchDao } from './utils';

type MolochV3DaoDataProps = {
  address: string | null | undefined;
  daoid: string | null | undefined;
  daochain: string | null | undefined;
  graphApiKeys: Keychain | undefined;
  children: ReactNode;
};

export const MolochV3DaoData = ({
  address,
  daoid,
  daochain,
  graphApiKeys,
  children,
}: MolochV3DaoDataProps) => {
  const initialDaoData = useMemo(async () => {
    if (daoid && daochain) {
      const daoRes = await fetchDao({
        daoid,
        daochain: daochain as ValidNetwork,
        graphApiKeys,
      });

      console.log('daoRes', daoRes);
    }
    return null;
  }, [daoid, daochain, graphApiKeys]);

  return (
    <>
      <p>poopin</p>
      {children}
    </>
    // <MolochV3ContextProvider
    //   address={address}
    //   daoid={daoid}
    //   daochain={daochain}
    //   graphApiKeys={{ '0x1': process.env['NX_GRAPH_API_KEY_MAINNET'] }}
    // >
    //   <Dao />
    // </MolochV3ContextProvider>
  );
};

export default MolochV3DaoData;
