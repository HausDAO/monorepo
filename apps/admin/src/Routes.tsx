import {
  Routes as RoutesDom,
  Route,
  Outlet,
  useLocation,
  useParams,
  useNavigate,
  matchPath,
} from 'react-router-dom';

import Home from './pages/Home';
import DaoOverview from './pages/DaoOverview';
import Members from './pages/Members';
import Member from './pages/Member';
import Proposals from './pages/Proposals';
import Safes from './pages/Safes';
import FormTest from './pages/FormTest';
import Settings from './pages/Settings';
import NewProposal from './pages/NewProposal';
import UpdateSettings from './pages/UpdateSettings';
import ProposalDetails from './pages/ProposalDetails';
import { DaoContainer } from './pages/DaoContainer';
import { Banner } from '@daohaus/ui';
import RageQuit from './pages/RageQuit';
import {
  HausConnectProvider,
  HausLayout,
  useHausConnect,
} from '@daohaus/connect';
import { useEffect, useLayoutEffect, useState } from 'react';

const HomeContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isConnected, address } = useHausConnect();
  const { profile } = useParams();

  useLayoutEffect(() => {
    if (isConnected && address && profile) {
      return;
    }
    if (isConnected && !profile) {
      navigate(`/${address}`);
      window.location.href = `#/${address}`;
    }
  }, [isConnected, address, profile, navigate]);
  return (
    <HausLayout
      pathname={location.pathname}
      navLinks={[{ label: 'Hub', href: `/${address}` }]}
    >
      <Outlet />
    </HausLayout>
  );
};

const Routes = () => {
  const [daoChainId, setDaoChainId] = useState<string | undefined>();
  const location = useLocation();
  const pathMatch = matchPath('molochv3/:daochain/:daoid/*', location.pathname);

  useEffect(() => {
    if (pathMatch?.params?.daochain) {
      setDaoChainId(pathMatch?.params?.daochain);
    }
    if (daoChainId && !pathMatch?.params?.daochain) {
      setDaoChainId(undefined);
    }
  }, [pathMatch?.params?.daochain, setDaoChainId, daoChainId]);

  return (
    <HausConnectProvider daoChainId={daoChainId}>
      <Banner />
      <RoutesDom>
        <Route path="/" element={<HomeContainer />}>
          <Route path="/:profile" element={<Home />} />
        </Route>
        <Route path="molochv3/:daochain/:daoid" element={<DaoContainer />}>
          <Route index element={<DaoOverview />} />
          <Route path="formtest" element={<FormTest />} />
          <Route path="proposals" element={<Proposals />} />
          <Route path="new-proposal" element={<NewProposal />} />
          <Route path="proposals/:proposalId" element={<ProposalDetails />} />
          <Route path="safes" element={<Safes />} />
          <Route path="members" element={<Members />} />
          <Route path="members/:memberAddress" element={<Member />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/update" element={<UpdateSettings />} />
          <Route path="members/ragequit" element={<RageQuit />} />
        </Route>
      </RoutesDom>
    </HausConnectProvider>
  );
};

export default Routes;
