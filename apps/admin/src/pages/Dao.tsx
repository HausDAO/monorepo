import { useParams, Outlet, useLocation } from 'react-router-dom';
import { DHLayout, useDHConnect } from '@daohaus/connect';
import { useConnectedMember, useDao } from '@daohaus/moloch-v3-context';
import { TXBuilder } from '@daohaus/tx-builder';
import { useMemo } from 'react';
import styled from 'styled-components';
import { H4, ProfileAvatar } from '@daohaus/ui';

const DaoNavElmContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.7rem;
`;

const DaoProfileAvatar = styled(ProfileAvatar)`
  width: 4.8rem;
  height: 4.8rem;
`;

export function Dao() {
  const { daochain, daoid } = useParams();
  const location = useLocation();
  const { provider, address } = useDHConnect();
  const { dao } = useDao();
  const { connectedMember } = useConnectedMember();

  const daoNavElm = useMemo(() => {
    if (dao) {
      return (
        <DaoNavElmContainer>
          <DaoProfileAvatar image={dao.avatarImg} address={dao.id} />
          <H4>{dao.name}</H4>
        </DaoNavElmContainer>
      );
    }
  }, [dao]);

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
        leftNav={daoNavElm}
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
