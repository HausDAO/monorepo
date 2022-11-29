import { useParams, Outlet, useLocation } from 'react-router-dom';
import { DHLayout, useDHConnect } from '@daohaus/connect';
import { useConnectedMember, useDao } from '@daohaus/moloch-v3-context';
import { TXBuilder } from '@daohaus/tx-builder';
import { useMemo } from 'react';

export function Dao() {
  const { daochain, daoid } = useParams();
  const location = useLocation();
  const { provider, address } = useDHConnect();
  const { dao } = useDao();
  const { connectedMember } = useConnectedMember();

  const moreLinks = useMemo(() => {
    if (connectedMember) {
      return [
        {
          label: 'Settings',
          href: `/molochv3/${daochain}/${daoid}/settings`,
        },
        {
          label: 'Profile',
          href: `/molochv3/${daochain}/${daoid}/members/${connectedMember.memberAddress}`,
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
  }, [connectedMember, daochain, daoid]);

  return (
    <TXBuilder
      chainId={daochain}
      provider={provider}
      safeId={dao?.safeAddress}
      daoId={daoid}
      appState={{ dao }}
    >
      <DHLayout
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
      </DHLayout>
    </TXBuilder>
  );
}

export default Dao;
