import { Outlet, useLocation, useParams } from 'react-router-dom';

import { DHLayout, useDHConnect } from '@daohaus/connect';
import { CurrentDaoProvider, useDaoData } from '@daohaus/moloch-v3-hooks';
import { ValidNetwork } from '@daohaus/keychain-utils';
import { TXBuilder } from '@daohaus/tx-builder';
import { Footer } from '@daohaus/ui';

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
    { label: 'Home', href: `/` },
    { label: 'DAO', href: `/molochv3/${daoChain}/${daoId}` },
    { label: 'Form Test', href: `/molochv3/${daoChain}/${daoId}/formtest` },
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
        footer={<Footer />}
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
