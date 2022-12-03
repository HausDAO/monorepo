import { useDHConnect } from '@daohaus/connect';
import { HomeDashboard } from '../components/HomeDashboard';
import { HomeNotConnected } from '../components/HomeNotConnected';

export function Home() {
  const { isConnected, address } = useDHConnect();

  return address && isConnected ? <HomeDashboard /> : <HomeNotConnected />;
}

export default Home;
