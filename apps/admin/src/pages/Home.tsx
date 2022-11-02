import { useHausConnect } from '@daohaus/daohaus-connect-feature';
import { useParams } from 'react-router-dom';
import { HomeDashboard } from '../components/HomeDashboard';
import { HomeNotConnected } from '../components/HomeNotConnected';

export function Home() {
  const { isConnected } = useHausConnect();
  const { profile } = useParams();

  return profile && isConnected ? <HomeDashboard /> : <HomeNotConnected />;
}

export default Home;
