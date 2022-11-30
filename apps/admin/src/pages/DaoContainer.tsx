import { useParams } from 'react-router-dom';
import { useDHConnect } from '@daohaus/connect';
import { MolochV3DaoProvider } from '@daohaus/moloch-v3-context';
import Dao from './Dao';

const graphApiKeys = { '0x1': process.env['NX_GRAPH_API_KEY_MAINNET'] };

export function DaoContainer() {
  const { daochain, daoid } = useParams();
  const { address } = useDHConnect();

  return (
    <MolochV3DaoProvider
      address={address}
      daoid={daoid}
      daochain={daochain}
      graphApiKeys={graphApiKeys}
    >
      <Dao />
    </MolochV3DaoProvider>
  );
}

export default Dao;
