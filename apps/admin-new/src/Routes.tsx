import { ReactSetter } from '@daohaus/utils';
import { useEffect } from 'react';
import {
  matchPath,
  useLocation,
  Routes as RoutesDom,
  Route,
} from 'react-router-dom';
import { DaoContainer } from './layout/DaoContainer';
import { HomeContainer } from './layout/HomeContainer';
import { DaoOverview } from './pages/DaoOverview';
import { Home } from './pages/Home';
import { Members } from './pages/Members';
import { Proposals } from './pages/Proposals';
import { Safes } from './pages/Safes';
import { Settings } from './pages/Settings';
import { MULTI_DAO_ROUTER } from '@daohaus/moloch-v3-hooks';
import { Proposal } from './pages/Proposal';
import { Member } from './pages/Member';
import { FormTest } from './pages/FormTest';

export const Routes = ({
  setDaoChainId,
}: {
  setDaoChainId: ReactSetter<string | undefined>;
}) => {
  const location = useLocation();
  const pathMatch = matchPath('molochv3/:daochain/:daoid/*', location.pathname);

  useEffect(() => {
    if (pathMatch?.params?.daochain) {
      setDaoChainId(pathMatch?.params?.daochain);
    }
    if (!pathMatch?.params?.daochain) {
      setDaoChainId(undefined);
    }
  }, [pathMatch?.params?.daochain, setDaoChainId]);

  return (
    <RoutesDom>
      <Route path="/" element={<HomeContainer />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path={MULTI_DAO_ROUTER} element={<DaoContainer />}>
        <Route index element={<DaoOverview />} />
        <Route path="proposals" element={<Proposals />} />
        <Route path="members" element={<Members />} />
        <Route path="safes" element={<Safes />} />
        <Route path="settings" element={<Settings />} />
        <Route path="proposal/:proposalId" element={<Proposal />} />
        <Route path="member/:memberAddress" element={<Member />} />
        <Route path="formtest" element={<FormTest />} />
      </Route>
    </RoutesDom>
  );
};
