import { DHLayout } from '@daohaus/connect';
import { Outlet, useLocation } from 'react-router-dom';

export const HomeContainer = () => {
  const location = useLocation();
  // const { address, profile } = useDHConnect();

  return (
    <DHLayout
      // leftNav={
      //   profile?.displayName &&
      //   address && (
      //     <HeaderAvatar
      //       name={profile?.displayName}
      //       address={address}
      //       imgUrl={profile?.image}
      //     />
      //   )
      // }
      pathname={location.pathname}
      navLinks={[{ label: 'Hub', href: `/` }]}
    >
      <Outlet />
    </DHLayout>
  );
};
