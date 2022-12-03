import {
  Routes as RoutesDom,
  Route,
  Outlet,
  useLocation,
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
import RageQuit from './pages/RageQuit';
import { DHConnectProvider, DHLayout, useDHConnect } from '@daohaus/connect';
import { useEffect, useState } from 'react';
import { HeaderAvatar } from './components/HeaderAvatar';

const HomeContainer = () => {
  const location = useLocation();
  const { address, profile } = useDHConnect();

  return (
    <DHLayout
      leftNav={
        profile?.displayName &&
        address && (
          <HeaderAvatar
            name={profile?.displayName}
            address={address}
            imgUrl={profile?.image}
          />
        )
      }
      pathname={location.pathname}
      navLinks={[{ label: 'Hub', href: `/` }]}
    >
      <Outlet />
    </DHLayout>
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
    <DHConnectProvider daoChainId={daoChainId}>
      <RoutesDom>
        <Route path="/" element={<HomeContainer />}>
          <Route path="/" element={<Home />} />
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
    </DHConnectProvider>
  );
};

export default Routes;
