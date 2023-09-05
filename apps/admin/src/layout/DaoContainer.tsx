import { Outlet, useLocation, useParams } from 'react-router-dom';

import { DHLayout, useDHConnect } from '@daohaus/connect';
import { CurrentDaoProvider, useDaoData } from '@daohaus/moloch-v3-hooks';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { TXBuilder } from '@daohaus/tx-builder';
import { Footer } from '@daohaus/ui';

import { HeaderAvatar } from '../components/HeaderAvatar';

export const DaoContainer = () => {
  const { address, publicClient } = useDHConnect();
  const { daoChain, daoId, proposalId, memberAddress } = useParams<{
    daoChain: ValidNetwork;
    daoId: string;
    proposalId: string;
    memberAddress: string;
  }>();

  const { dao } = useDaoData({
    daoId: daoId as string,
    daoChain: daoChain as string,
  });

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
    {
      label: 'Profile',
      href: `/molochv3/${daoChain}/${daoId}/member/${address}`,
    },
  ];

  return (
    <TXBuilder
      chainId={daoChain}
      daoId={daoId}
      safeId={dao?.safeAddress}
      appState={{ dao, userAddress: address }}
      publicClient={publicClient}
    >
      <DHLayout
        pathname={location.pathname}
        navLinks={navLinks}
        dropdownLinks={moreLinks}
        footer={<Footer />}
        leftNav={
          dao?.name &&
          dao?.id && (
            <HeaderAvatar
              name={dao.name}
              address={dao.id}
              imgUrl={dao?.avatarImg}
            />
          )
        }
      >
        <CurrentDaoProvider
          userAddress={address}
          targetDao={{
            daoChain,
            daoId,
            proposalId,
            memberAddress,
          }}
        >
          <Outlet />
        </CurrentDaoProvider>
      </DHLayout>
    </TXBuilder>
  );
};
