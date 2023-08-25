import { useCurrentDao, useDaoData } from '@daohaus/moloch-v3-hooks';
import { SingleColumnLayout } from '@daohaus/ui';
import { DaoOverview as DaoOverviewCard } from '@daohaus/moloch-v3-macro-ui';
import { Keychain } from '@daohaus/keychain-utils';

export const DaoOverview = () => {
  const { daoChain } = useCurrentDao();
  const { dao } = useDaoData();

  return (
    <SingleColumnLayout>
      {dao && (
        <DaoOverviewCard daoChain={daoChain as keyof Keychain} daoId={dao.id} />
      )}
    </SingleColumnLayout>
  );
};
