import { useDHConnect } from '@daohaus/connect';
import { H4, Input, Link, SingleColumnLayout, useDebounce } from '@daohaus/ui';
import React from 'react';
import { useDaosByUser } from '@daohaus/moloch-v3-hooks';
import { Dao_Filter } from '@daohaus/moloch-v3-data';
import { JSONDisplay } from '../components/JSONDisplay';

export const Home = () => {
  const { address } = useDHConnect();
  const [daoFilter, setDaoFilter] = React.useState<Dao_Filter | undefined>();

  const debouncedSearchTerm = useDebounce(daoFilter, 500);

  const { daos, isLoading, error } = useDaosByUser({
    userAddress: address as string,
    daoFilter: debouncedSearchTerm,
  });
  if (!address) return <div>Not connected</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearch = (e: any) => {
    setDaoFilter({
      name_contains_nocase: e.target.value,
    });
  };

  return (
    <SingleColumnLayout>
      <div style={{ width: '70rem' }}>
        <H4>DAOs</H4>
        <Input id="test" onChange={handleSearch} placeholder="dummy-search" />
        {daos?.length ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {daos.map((dao) => (
              <Link key={dao.dao} href={`molochv3/${dao.networkId}/${dao.dao}`}>
                {dao.name}
              </Link>
            ))}
          </div>
        ) : (
          <div>No daos</div>
        )}
        <H4>Data</H4>
        {daos && <JSONDisplay data={daos} />}
      </div>
    </SingleColumnLayout>
  );
};
