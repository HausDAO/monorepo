import { DHLayout } from '@daohaus/connect';
import { Footer, H4 } from '@daohaus/ui';
import { Outlet, useLocation } from 'react-router-dom';

export const HomeContainer = () => {
  const location = useLocation();

  return (
    <DHLayout
      leftNav={<H4>DAOhaus Admin Tool</H4>}
      pathname={location.pathname}
      navLinks={[{ label: 'Hub', href: `/` }]}
      footer={<Footer />}
    >
      <Outlet />
    </DHLayout>
  );
};
