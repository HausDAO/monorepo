import { DHLayout } from '@daohaus/connect';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { CurrentDaoProvider } from '@daohaus/moloch-v3-hooks';

export const DaoContainer = () => {
  const { daoChain, daoId } = useParams();

  const location = useLocation();

  const navLinks = [
    { label: 'Hub', href: `/` },
    { label: 'DAO', href: `/molochv3/${daoChain}/${daoId}` },
    { label: 'Proposals', href: `/molochv3/${daoChain}/${daoId}/proposals` },
    { label: 'Safes', href: `/molochv3/${daoChain}/${daoId}/safes` },
    { label: 'Members', href: `/molochv3/${daoChain}/${daoId}/members` },
  ];

  const moreLinks = [
    { label: 'Settings', href: `/molochv3/${daoChain}/${daoId}/settings` },
    { label: 'Profile', href: `/molochv3/${daoChain}/${daoId}/members/0x0` },
  ];

  return (
    <DHLayout
      pathname={location.pathname}
      navLinks={navLinks}
      dropdownLinks={moreLinks}
    >
      <CurrentDaoProvider>
        <Outlet />
      </CurrentDaoProvider>
    </DHLayout>
  );
};
