import { useParams } from 'react-router-dom';
import { useDHConnect } from '@daohaus/connect';
import {
  MolochV3ContextProvider,
  MolochV3DaoData,
} from '@daohaus/moloch-v3-context';
import Dao from './Dao';
import { useMemo } from 'react';

export function DaoContainer() {
  const { daochain, daoid } = useParams();
  const { address } = useDHConnect();

  const graphApiKeys = useMemo(() => {
    return { '0x1': process.env['NX_GRAPH_API_KEY_MAINNET'] };
  }, []);

  return (
    <MolochV3DaoData
      address={address}
      daoid={daoid}
      daochain={daochain}
      graphApiKeys={graphApiKeys}
    >
      {/* <MolochV3ContextProvider
        address={address}
        daoid={daoid}
        daochain={daochain}
        graphApiKeys={{ '0x1': process.env['NX_GRAPH_API_KEY_MAINNET'] }}
      >
        <Dao />
      </MolochV3ContextProvider> */}
    </MolochV3DaoData>
  );
}

export default Dao;
