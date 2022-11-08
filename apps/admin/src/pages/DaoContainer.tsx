import { useParams } from 'react-router-dom';
import { useHausConnect } from '@daohaus/connect';
import { MolochV3ContextProvider } from '@daohaus/moloch-v3-context';
import Dao from './Dao';

export function DaoContainer() {
  const { daochain, daoid } = useParams();
  const { address } = useHausConnect();

  return (
    <MolochV3ContextProvider
      address={address}
      daoid={daoid}
      daochain={daochain}
      graphApiKeys={{ '0x1': process.env['NX_GRAPH_API_KEY_MAINNET'] }}
    >
      <Dao />
    </MolochV3ContextProvider>
  );
}

export default Dao;
