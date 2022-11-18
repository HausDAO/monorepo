import { useDHConnect } from '@daohaus/connect';
import { useParams } from 'react-router-dom';
import { HomeDashboard } from '../components/HomeDashboard';
import { HomeNotConnected } from '../components/HomeNotConnected';

export function Home() {
  const { isConnected } = useDHConnect();
  const { profile } = useParams();

  return profile && isConnected ? <HomeDashboard /> : <HomeNotConnected />;
}

export default Home;
