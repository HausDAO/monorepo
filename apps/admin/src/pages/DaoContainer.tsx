import { useParams } from 'react-router-dom';
import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { DaoContextProvider } from '@daohaus/dao-context';
import Dao from './Dao';

export function DaoContainer() {
  const { daochain, daoid } = useParams();
  const { address } = useHausConnect();

  return (
    <DaoContextProvider
      address={address}
      daoid={daoid}
      daochain={daochain}
      graphApiKeys={{ '0x1': import.meta.env['VITE_GRAPH_API_KEY_MAINNET'] }}
    >
      <Dao />
    </DaoContextProvider>
  );
}

export default Dao;
