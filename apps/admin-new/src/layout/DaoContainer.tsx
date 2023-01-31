import { DHLayout } from '@daohaus/connect';
import { Outlet, useLocation, useParams } from 'react-router-dom';

export const DaoContainer = () => {
  const { daochain, daoid } = useParams();

  const location = useLocation();

  const navLinks = [
    { label: 'Hub', href: `/` },
    { label: 'DAO', href: `/molochv3/${daochain}/${daoid}` },
    { label: 'Proposals', href: `/molochv3/${daochain}/${daoid}/proposals` },
    { label: 'Safes', href: `/molochv3/${daochain}/${daoid}/safes` },
    { label: 'Members', href: `/molochv3/${daochain}/${daoid}/members` },
  ];

  const moreLinks = [
    { label: 'Settings', href: `/molochv3/${daochain}/${daoid}/settings` },
    { label: 'Profile', href: `/molochv3/${daochain}/${daoid}/members/0x0` },
  ];

  return (
    <DHLayout
      pathname={location.pathname}
      navLinks={navLinks}
      dropdownLinks={moreLinks}
    >
      <Outlet />
    </DHLayout>
  );
};
