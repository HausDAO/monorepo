import { useParams, Outlet, useLocation } from 'react-router-dom';
import { HausLayout, useHausConnect } from '@daohaus/connect';
import { useConnectedMembership, useDao } from '@daohaus/moloch-v3-context';
import { TXBuilder } from '@daohaus/tx-builder';
import { useMemo } from 'react';

export function Dao() {
  const { daochain, daoid } = useParams();
  const location = useLocation();
  const { provider, address } = useHausConnect();
  const { dao } = useDao();
  const { connectedMembership } = useConnectedMembership();

  const moreLinks = useMemo(() => {
    if (connectedMembership) {
      return [
        {
          label: 'Settings',
          href: `/molochv3/${daochain}/${daoid}/settings`,
        },
        {
          label: 'Profile',
          href: `/molochv3/${daochain}/${daoid}/members/${connectedMembership.memberAddress}`,
        },
      ];
    } else {
      return [
        {
          label: 'Settings',
          href: `/molochv3/${daochain}/${daoid}/settings`,
        },
      ];
    }
  }, [connectedMembership, daochain, daoid]);

  return (
    <TXBuilder
      chainId={daochain}
      provider={provider}
      safeId={dao?.safeAddress}
      daoId={daoid}
      appState={{ dao }}
    >
      <HausLayout
        pathname={location.pathname}
        navLinks={[
          { label: 'Hub', href: `/${address}` },
          {
            label: 'DAO',
            href: `/molochv3/${daochain}/${daoid}`,
          },
          {
            label: 'Proposals',
            href: `/molochv3/${daochain}/${daoid}/proposals`,
          },

          { label: 'Safes', href: `/molochv3/${daochain}/${daoid}/safes` },
          {
            label: 'Members',
            href: `/molochv3/${daochain}/${daoid}/members`,
          },
        ]}
        dropdownLinks={moreLinks}
      >
        <Outlet />
      </HausLayout>
    </TXBuilder>
  );
}

export default Dao;
