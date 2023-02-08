import { useDaoData } from '@daohaus/moloch-v3-hooks';
import { SingleColumnLayout } from '@daohaus/ui';
import { JSONDisplay } from '../components/JSONDisplay';

export const DaoOverview = () => {
  const { dao } = useDaoData();

  return (
    <SingleColumnLayout>
      <JSONDisplay data={dao} />
    </SingleColumnLayout>
  );
};
