import { useDHConnect } from '@daohaus/connect';
import { Link, SingleColumnLayout } from '@daohaus/ui';
import React from 'react';
import { useDaosByUser } from '../hooks/useDaosByUser';

export const Home = () => {
  const { address } = useDHConnect();
  const { daos, isLoading, error } = useDaosByUser({
    userAddress: address as string,
  });
  if (!address) return <div>Not connected</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;
  if (daos?.length === 0) return <div>No daos</div>;

  return (
    <SingleColumnLayout>
      {daos?.map((dao) => (
        <Link key={dao.dao} href={`molochv3/${dao.networkId}/${dao.dao}`}>
          {dao.name}
        </Link>
      ))}
    </SingleColumnLayout>
  );
};
